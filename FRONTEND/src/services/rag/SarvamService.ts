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

    try {
      const res = await fetch('https://api.sarvam.ai/translate', {
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
      console.warn('Sarvam AI Translation API failed, falling back to local dictionary', e);
    }
    return null;
  }

  /**
   * Send audio Blob to Sarvam AI Speech-to-Text API (saarika:v2)
   */
  async transcribeAudio(audioBlob: Blob): Promise<{ text: string; confidence: number } | null> {
    if (!this.hasApiKey || !audioBlob || audioBlob.size < 100) return null;

    try {
      const mimeType = audioBlob.type || 'audio/webm';
      const fileExt = mimeType.includes('mp4') ? 'speech.mp4' : 'speech.webm';

      const formData = new FormData();
      formData.append('file', audioBlob, fileExt);
      formData.append('model', 'saarika:v2');
      formData.append('language_code', 'en-IN');

      const res = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': this.apiKey,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return {
          text: data.transcript || data.text || '',
          confidence: data.confidence || 0.95,
        };
      } else {
        const errText = await res.text();
        console.warn('Sarvam STT API error response:', res.status, errText);
      }
    } catch (e) {
      console.warn('Sarvam STT API call failed:', e);
    }
    return null;
  }

  /**
   * Convert answer text to speech audio via Sarvam AI Text-to-Speech API (bulbul:v1)
   */
  async speakText(text: string, langCode: string = 'en-IN'): Promise<boolean> {
    this.stopSpeech();

    if (this.hasApiKey) {
      try {
        const res = await fetch('https://api.sarvam.ai/text-to-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': this.apiKey,
          },
          body: JSON.stringify({
            inputs: [text.slice(0, 400)],
            target_language_code: langCode,
            speaker: 'meera',
            pitch: 0,
            pace: 1.05,
            loudness: 1.5,
            speech_sample_rate: 22050,
            enable_preprocessing: true,
            model: 'bulbul:v1',
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
        console.warn('Sarvam TTS API failed, falling back to window.speechSynthesis', e);
      }
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      return true;
    }

    return false;
  }
}

export const sarvamService = new SarvamService();
