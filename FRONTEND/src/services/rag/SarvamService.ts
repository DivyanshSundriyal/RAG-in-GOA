export interface SarvamSttResult {
  text: string;
  confidence: number;
  latencyMs: number;
  modelUsed: string;
}

export class SarvamService {
  private apiKey: string;
  private activeAudio: HTMLAudioElement | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_SARVAM_API_KEY || '';
  }

  public get hasApiKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  public stopSpeech(): void {
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Send text to Sarvam AI Translation API (mayura:v1)
   */
  async translateText(text: string, targetLangCode: string = 'hi-IN'): Promise<string | null> {
    if (!this.hasApiKey || !text.trim()) return null;

    const langMap: Record<string, string> = {
      hi: 'hi-IN',
      gom: 'mr-IN',
      mr: 'mr-IN',
      kn: 'kn-IN',
      pa: 'pa-IN',
      en: 'en-IN',
    };

    const targetCode = langMap[targetLangCode] || targetLangCode;
    if (targetCode === 'en-IN') return text;

    const endpoints = [
      'https://api.sarvam.ai/translate',
      '/api/sarvam/translate',
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': this.apiKey,
          },
          body: JSON.stringify({
            input: text,
            source_language_code: 'en-IN',
            target_language_code: targetCode,
            speaker_gender: 'Female',
            mode: 'formal',
            model: 'mayura:v1',
          }),
        });

        if (res.ok) {
          const data = await res.json();
          return data.translated_text || data.translation || null;
        }
      } catch (e) {
        console.warn(`Translation endpoint ${url} failed:`, e);
      }
    }

    return null;
  }

  /**
   * Send audio Blob to Sarvam AI Speech-to-Text API (saaras:v3 with fallback to saarika:v2.5)
   */
  async transcribeAudio(
    audioBlob: Blob,
    langCode: string = 'unknown'
  ): Promise<SarvamSttResult | null> {
    if (!this.hasApiKey || !audioBlob || audioBlob.size < 100) {
      console.warn('Sarvam STT Skipped: Invalid key or empty audio payload');
      return null;
    }

    const startTime = performance.now();
    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      gom: 'mr-IN',
      kn: 'kn-IN',
      pa: 'pa-IN',
      unknown: 'unknown',
    };
    const targetLang = langMap[langCode] || langCode || 'unknown';

    // Model hierarchy: saaras:v3 primary, saarika:v2.5 fallback
    const modelsToTry = ['saaras:v3', 'saarika:v2.5'];
    const endpoints = [
      'https://api.sarvam.ai/speech-to-text',
      '/api/sarvam/speech-to-text',
    ];

    for (const model of modelsToTry) {
      for (const endpointUrl of endpoints) {
        try {
          console.log(`🎙️ Attempting Sarvam STT model=${model} endpoint=${endpointUrl} lang=${targetLang} blobSize=${audioBlob.size}B`);

          const formData = new FormData();
          formData.append('file', audioBlob, 'speech.wav');
          formData.append('model', model);
          if (targetLang !== 'unknown') {
            formData.append('language_code', targetLang);
          }

          const res = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
              'api-subscription-key': this.apiKey,
            },
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            const latencyMs = Math.round(performance.now() - startTime);
            console.log(`✅ Sarvam STT Success (${model}, ${latencyMs}ms):`, data);

            const transcriptText = data.transcript || data.text || '';
            if (transcriptText.trim()) {
              return {
                text: transcriptText.trim(),
                confidence: data.confidence || 0.96,
                latencyMs,
                modelUsed: model,
              };
            }
          } else {
            const errBody = await res.text();
            console.warn(`⚠️ Sarvam STT (${model} via ${endpointUrl}) HTTP ${res.status}:`, errBody);
          }
        } catch (err) {
          console.warn(`❌ Sarvam STT network error (${model} via ${endpointUrl}):`, err);
        }
      }
    }

    return null;
  }

  /**
   * Convert answer text to speech audio via Sarvam AI Text-to-Speech API (bulbul:v2 with speaker 'anushka')
   */
  async speakText(text: string, langCode: string = 'en-IN'): Promise<boolean> {
    this.stopSpeech();

    if (this.hasApiKey) {
      const endpoints = [
        'https://api.sarvam.ai/text-to-speech',
        '/api/sarvam/text-to-speech',
      ];

      for (const endpointUrl of endpoints) {
        try {
          const res = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-subscription-key': this.apiKey,
            },
            body: JSON.stringify({
              inputs: [text.slice(0, 400)],
              target_language_code: langCode,
              speaker: 'anushka', // Upgraded to supported speaker in bulbul:v2
              pitch: 0,
              pace: 0.85,
              loudness: 1.5,
              speech_sample_rate: 22050,
              enable_preprocessing: true,
              model: 'bulbul:v2', // Upgraded to bulbul:v2
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.audios && data.audios[0]) {
              const audioSrc = `data:audio/wav;base64,${data.audios[0]}`;
              const audio = new Audio(audioSrc);
              this.activeAudio = audio;
              audio.play();
              return true;
            }
          }
        } catch (e) {
          console.warn(`Sarvam TTS failed via ${endpointUrl}:`, e);
        }
      }
    }

    // Window SpeechSynthesis Fallback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      return true;
    }

    return false;
  }
}

export const sarvamService = new SarvamService();
