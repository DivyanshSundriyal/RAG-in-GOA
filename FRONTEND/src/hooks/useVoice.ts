import { useState, useCallback, useRef, useEffect } from 'react';
import { sarvamService } from '../services/rag/SarvamService';

interface UseVoiceReturn {
  isListening: boolean;
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  volume: number;
  micPermissionDenied: boolean;
  startListening: () => void;
  stopListening: () => Promise<string>;
  resetTranscript: () => void;
  speakAnswer: (text: string) => void;
}

export function useVoice(_onSpeechComplete?: (finalText: string) => void): UseVoiceReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [volume, setVolume] = useState(0);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const listeningActiveRef = useRef<boolean>(false);
  const isNetworkErrorRef = useRef<boolean>(false);
  const recordedMimeTypeRef = useRef<string>('audio/webm');

  // Initialize Web Speech API
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

  // Audio Volume Analyzer & MediaRecorder audio blob stream
  const startVolumeAnalyzer = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setMicPermissionDenied(false);

      // Web Audio Volume Analyzer
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

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

      // Start MediaRecorder with browser-supported audio mime type
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
        recordedMimeTypeRef.current = mimeType;

        const recorder = new MediaRecorder(stream, { mimeType });
        recorder.ondataavailable = (e) => {
          if (e && e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };
        recorder.start(200);
        mediaRecorderRef.current = recorder;
      } catch (e) {
        console.warn('MediaRecorder failed to start:', e);
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
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // Ignore
      }
    }
    setVolume(0);
  }, []);

  const startListening = useCallback(() => {
    setTranscript('');
    setIsListening(true);
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

  const stopListening = useCallback(async (): Promise<string> => {
    setIsListening(false);
    listeningActiveRef.current = false;

    // Stop recorder to flush last data chunks
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // Ignore
      }
    }

    stopVolumeAnalyzer();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }

    let finalResult = transcript.trim();

    // If browser speech API didn't return text, transcribe full audio blob via Sarvam STT API
    if (!finalResult && audioChunksRef.current.length > 0 && sarvamService.hasApiKey) {
      try {
        const audioBlob = new Blob(audioChunksRef.current, { type: recordedMimeTypeRef.current });
        const sttResult = await sarvamService.transcribeAudio(audioBlob);
        if (sttResult?.text?.trim()) {
          finalResult = sttResult.text.trim();
          setTranscript(finalResult);
        }
      } catch (e) {
        console.warn('Sarvam STT fallback error:', e);
      }
    }

    return finalResult;
  }, [stopVolumeAnalyzer, transcript]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  const speakAnswer = useCallback((text: string) => {
    sarvamService.speakText(text);
  }, []);

  return {
    isListening,
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
