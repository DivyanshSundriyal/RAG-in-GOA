import type { SupportedLanguage } from '../../data/translations';

export interface SarvamSttResult {
  text: string;
  confidence: number;
  latencyMs: number;
  modelUsed: string;
  /** Mapped UI language when recognizable */
  detectedLanguage?: SupportedLanguage;
  /** Raw Sarvam language_code (e.g. hi-IN) — preferred for backend language tag */
  rawLanguageCode?: string;
}

export const detectLanguageFromScript = (text: string): SupportedLanguage => {
  if (!text) return 'en';
  // Gurmukhi script (Punjabi)
  if (/[\u0A00-\u0A7F]/.test(text)) {
    return 'pa';
  }
  // Kannada script
  if (/[\u0C80-\u0CFF]/.test(text)) {
    return 'kn';
  }
  // Devanagari script (Hindi, Marathi, Konkani)
  if (/[\u0900-\u097F]/.test(text)) {
    if (text.includes('आहे') || text.includes('आहात') || text.includes('मराठी') || text.includes('काय') || text.includes('करा') || text.includes('विचार')) {
      return 'mr';
    }
    return 'hi';
  }
  return 'en';
};

/** Detect romanized (Latin-script) Indian-language queries that script detection misses. */
export const detectRomanizedLanguage = (text: string): SupportedLanguage | null => {
  const t = text.toLowerCase();
  if (!t.trim() || /[\u0900-\u097F\u0A00-\u0A7F\u0C80-\u0CFF]/.test(text)) {
    return null;
  }

  const hindiCues =
    /\b(aaj|kal|kya|kyun|kyon|hai|hain|hoon|hota|hote|hoti|konse|kaun|kaunsa|kaunsi|sabse|bada|badi|bade|chhota|rang|asmaan|ashman|aasmaan|kahan|kahaan|kaise|mujhe|aap|nahi|nahin|batao|bataao|namaste|dhanyavad|kitna|kitne|wala|wali|desert|color|colour)\b/;
  const marathiCues = /\b(ahe|aahot|kay|kasa|kashi|maza|mazi|tumhi|namaskar|sang|sangaa)\b/;
  const punjabiCues = /\b(ki|hai|haan|tusi|mainu|kiwen|kithe|dass|sat\s?sri\s?akal)\b/;

  if (hindiCues.test(t)) return 'hi';
  if (marathiCues.test(t)) return 'mr';
  if (punjabiCues.test(t)) return 'pa';
  return null;
};

/**
 * Resolve the native language tag for the backend bilingual answer.
 * Based on the QUERY / Sarvam STT only — never on the global UI language selector.
 */
export const resolveNativeLanguage = (opts: {
  text: string;
  sarvamLanguageCode?: string;
  sarvamDetected?: SupportedLanguage;
}): string => {
  const raw = (opts.sarvamLanguageCode || '').trim().toLowerCase();
  if (raw && !raw.startsWith('en') && raw !== 'unknown') {
    return raw; // e.g. hi-IN
  }
  if (opts.sarvamDetected && opts.sarvamDetected !== 'en') {
    return opts.sarvamDetected;
  }
  const fromScript = detectLanguageFromScript(opts.text);
  if (fromScript !== 'en') return fromScript;

  const romanized = detectRomanizedLanguage(opts.text);
  if (romanized) return romanized;

  return 'en';
};

export const isEnglishLanguageTag = (lang: string | undefined | null): boolean => {
  if (!lang) return true;
  return lang.toLowerCase().replace('_', '-').split('-')[0] === 'en';
};

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
   * Translate via Sarvam Mayura. For romanized Indic text, prefer source_language_code=auto.
   */
  async translateText(text: string, targetLangCode: string = 'en-IN', sourceLangCode?: string): Promise<string | null> {
    if (!this.hasApiKey || !text.trim()) {
      if (!this.hasApiKey) {
        console.warn(
          '⚠️ Sarvam translate skipped: VITE_SARVAM_API_KEY is missing. Add it to FRONTEND/.env.local and restart Vite.',
        );
      }
      return null;
    }

    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      gom: 'mr-IN',
      kn: 'kn-IN',
      pa: 'pa-IN',
      pn: 'pa-IN',
    };

    const toBcp47 = (code: string | undefined, fallback: string): string => {
      if (!code) return fallback;
      const trimmed = code.trim();
      if (trimmed.toLowerCase() === 'auto') return 'auto';
      if (trimmed.includes('-')) return trimmed.replace('_', '-');
      const base = trimmed.toLowerCase().split(/[-_]/)[0];
      return langMap[base] || `${base}-IN`;
    };

    const target = toBcp47(targetLangCode, 'en-IN');
    const isLatinOnly = /^[\x00-\x7F]*$/.test(text) && /[a-zA-Z]/.test(text);
    const hasIndicScript = /[\u0900-\u097F\u0A00-\u0A7F\u0C80-\u0CFF]/.test(text);

    // Romanized Hindi/Punjabi/Marathi: Mayura handles this best with source=auto
    let source: string;
    if (isLatinOnly && !hasIndicScript && target.startsWith('en')) {
      source = 'auto';
    } else if (sourceLangCode) {
      source = toBcp47(sourceLangCode, 'auto');
    } else {
      const detectedScript = detectLanguageFromScript(text);
      const romanized = detectRomanizedLanguage(text);
      source = toBcp47(romanized || detectedScript, 'auto');
      if (source.startsWith('en') && romanized) {
        source = 'auto';
      }
    }

    if (source === target) {
      // Still try auto→en for romanized that was mis-tagged as English
      if (!(isLatinOnly && detectRomanizedLanguage(text))) {
        return text;
      }
      source = 'auto';
    }

    const endpoints = [
      'https://api.sarvam.ai/translate',
      '/api/sarvam/translate',
    ];

    const bodyBase = {
      input: text,
      source_language_code: source,
      target_language_code: target,
      speaker_gender: 'Female',
      mode: 'formal',
      model: 'mayura:v1',
    };

    for (const endpointUrl of endpoints) {
      try {
        const res = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': this.apiKey,
          },
          body: JSON.stringify(bodyBase),
        });

        if (res.ok) {
          const data = await res.json();
          const out = (data.translated_text || '').trim();
          if (out) {
            console.log(`✅ Sarvam translate (${source} → ${target}): "${text}" → "${out}"`);
            return out;
          }
        } else {
          const errBody = await res.text();
          console.warn(`⚠️ Sarvam Translate HTTP ${res.status} (${source} -> ${target}):`, errBody);
        }
      } catch (e) {
        console.warn(`❌ Sarvam Translate network error via ${endpointUrl}:`, e);
      }
    }

    // Fallback: explicit hi-IN if auto failed
    if (source === 'auto') {
      try {
        const res = await fetch('https://api.sarvam.ai/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': this.apiKey,
          },
          body: JSON.stringify({
            ...bodyBase,
            source_language_code: 'hi-IN',
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.translated_text?.trim()) {
            return data.translated_text.trim();
          }
        }
      } catch {
        // ignore
      }
    }

    return null;
  }

  /**
   * Transcribe recorded audio blob via Sarvam AI Speech-to-Text API (saaras:v3 with auto language detection)
   */
  async transcribeAudio(audioBlob: Blob, langCode: string = 'unknown'): Promise<SarvamSttResult | null> {
    if (!this.hasApiKey) return null;

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
            const rawLang = data.language_code || '';

            if (transcriptText.trim()) {
              let detected: SupportedLanguage = detectLanguageFromScript(transcriptText.trim());
              if (rawLang.startsWith('pa')) detected = 'pa';
              else if (rawLang.startsWith('hi')) detected = 'hi';
              else if (rawLang.startsWith('mr')) detected = 'mr';
              else if (rawLang.startsWith('kn')) detected = 'kn';

              return {
                text: transcriptText.trim(),
                confidence: data.confidence || 0.96,
                latencyMs,
                modelUsed: model,
                detectedLanguage: detected,
                rawLanguageCode: rawLang,
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
              speaker: 'anushka',
              pitch: 0,
              pace: 0.85,
              loudness: 1.5,
              speech_sample_rate: 22050,
              enable_preprocessing: true,
              model: 'bulbul:v2',
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
