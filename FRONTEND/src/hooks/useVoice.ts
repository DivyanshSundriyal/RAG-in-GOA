import { useState, useCallback, useRef, useEffect } from 'react';
import { sarvamService } from '../services/rag/SarvamService';
import { encodeWAV } from '../utils/wavEncoder';

interface UseVoiceReturn {
  isListening: boolean;
  isTranscribing: boolean;
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  volume: number;
  micPermissionDenied: boolean;
  startListening: () => void;
  stopListening: (langCode?: string) => Promise<{ text: string; latencyMs: number }>;
  resetTranscript: () => void;
  speakAnswer: (text: string) => void;
}

export function useVoice(_onSpeechComplete?: (finalText: string) => void): UseVoiceReturn {
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [volume, setVolume] = useState(0);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const pcmSamplesRef = useRef<Float32Array[]>([]);
  const scriptNodeRef = useRef<ScriptProcessorNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const listeningActiveRef = useRef<boolean>(false);
  const isNetworkErrorRef = useRef<boolean>(false);

  // Initialize Web Speech API for instant interim streaming dictation
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = navigator.language || 'en-IN';

        recognition.onresult = (event: any) => {
          if (!event || !event.results) return;
          let liveSpeechText = '';
          const startIndex = typeof event.resultIndex === 'number' ? event.resultIndex : 0;
          for (let i = startIndex; i < event.results.length; i++) {
            if (event.results[i] && event.results[i][0] && event.results[i][0].transcript) {
              liveSpeechText += event.results[i][0].transcript;
            }
          }
          if (liveSpeechText.trim()) {
            setTranscript(liveSpeechText.trim());
          }
        };

        recognition.onerror = (event: any) => {
          if (!event) return;
          if (event.error === 'network' || event.error === 'aborted') {
            isNetworkErrorRef.current = true;
            return;
          }
          console.warn('Live Speech Recognition Error:', event.error);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setMicPermissionDenied(true);
          }
        };

        recognition.onend = () => {
          if (listeningActiveRef.current && recognitionRef.current && !isNetworkErrorRef.current) {
            try {
              recognitionRef.current.start();
            } catch {
              // Ignore
            }
          }
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Failed to initialize SpeechRecognition:', err);
      }
    }
  }, []);

  // Web Audio API AudioContext + 16kHz PCM Sample Capture + Volume Analyzer
  const startVolumeAnalyzer = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setMicPermissionDenied(false);

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000, // 16kHz native rate for Sarvam AI models
      });
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

      // 16kHz mono PCM sample collector
      pcmSamplesRef.current = [];
      const scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
      scriptNode.onaudioprocess = (e) => {
        if (!listeningActiveRef.current) return;
        const inputData = e.inputBuffer.getChannelData(0);
        pcmSamplesRef.current.push(new Float32Array(inputData));
      };
      source.connect(scriptNode);
      scriptNode.connect(audioCtx.destination);
      scriptNodeRef.current = scriptNode;

      // Dynamic Volume Meter
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        const avg = sum / dataArray.length;
        setVolume(Math.min(1, avg / 35));
        animFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();

      // Parallel MediaRecorder backup stream
      try {
        audioChunksRef.current = [];
        let mimeType = 'audio/webm';
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        }

        const recorder = new MediaRecorder(stream, { mimeType });
        recorder.ondataavailable = (e) => {
          if (e && e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };
        recorder.start(100);
        mediaRecorderRef.current = recorder;
      } catch (e) {
        console.warn('MediaRecorder fallback failed to start:', e);
      }

    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      setMicPermissionDenied(true);
    }
  }, []);

  const stopVolumeAnalyzer = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (scriptNodeRef.current) {
      try {
        scriptNodeRef.current.disconnect();
      } catch {
        // Ignore
      }
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setVolume(0);
  }, []);

  const startListening = useCallback(() => {
    setTranscript('');
    setIsListening(true);
    setIsTranscribing(false);
    listeningActiveRef.current = true;
    isNetworkErrorRef.current = false;
    startVolumeAnalyzer();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {
        // Recognition already active
      }
    }
  }, [startVolumeAnalyzer]);

  // Promise-based asynchronous audio capture flush sequence
  const stopAudioCapture = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      // 1. Process 16kHz PCM samples first
      if (pcmSamplesRef.current.length > 0) {
        let totalLen = 0;
        for (const chunk of pcmSamplesRef.current) totalLen += chunk.length;
        const merged = new Float32Array(totalLen);
        let offset = 0;
        for (const chunk of pcmSamplesRef.current) {
          merged.set(chunk, offset);
          offset += chunk.length;
        }

        if (merged.length > 1600) { // > 0.1 sec of audio
          const wavBlob = encodeWAV(merged, 16000);
          console.log(`🎙️ Encoded 16kHz PCM Mono WAV Blob. Size: ${wavBlob.size} bytes (${(merged.length / 16000).toFixed(2)}s)`);
          return resolve(wavBlob);
        }
      }

      // 2. Fallback to MediaRecorder async flush
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== 'inactive') {
        recorder.onstop = () => {
          if (audioChunksRef.current.length > 0) {
            const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
            resolve(blob);
          } else {
            resolve(null);
          }
        };
        recorder.stop();
      } else if (audioChunksRef.current.length > 0) {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        resolve(blob);
      } else {
        resolve(null);
      }
    });
  }, []);

  const stopListening = useCallback(async (langCode: string = 'unknown'): Promise<{ text: string; latencyMs: number }> => {
    setIsListening(false);
    listeningActiveRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }

    setIsTranscribing(true);
    let finalResult = transcript.trim();
    let sttLatencyMs = 0;

    try {
      // Asynchronously flush audio buffers
      const audioBlob = await stopAudioCapture();
      stopVolumeAnalyzer();

      if (audioBlob && audioBlob.size > 200 && sarvamService.hasApiKey) {
        const sttResponse = await sarvamService.transcribeAudio(audioBlob, langCode);
        if (sttResponse?.text?.trim()) {
          finalResult = sttResponse.text.trim();
          setTranscript(finalResult);
          sttLatencyMs = sttResponse.latencyMs;
        }
      }
    } catch (e) {
      console.warn('STT Transcription flush error:', e);
      stopVolumeAnalyzer();
    } finally {
      setIsTranscribing(false);
    }

    return { text: finalResult, latencyMs: sttLatencyMs };
  }, [stopVolumeAnalyzer, stopAudioCapture, transcript]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  const speakAnswer = useCallback((text: string) => {
    sarvamService.speakText(text);
  }, []);

  return {
    isListening,
    isTranscribing,
    transcript,
    setTranscript,
    volume,
    micPermissionDenied,
    startListening,
    stopListening,
    resetTranscript,
    speakAnswer,
  };
}
