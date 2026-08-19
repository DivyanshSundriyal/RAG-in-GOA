import type { RagService } from './RagService';
import type { GuardrailStatus, RagQueryOptions, RagQueryResponse } from '../../types/rag';
import {
  sarvamService,
  isEnglishLanguageTag,
  resolveNativeLanguage,
  detectRomanizedLanguage,
} from './SarvamService';

interface FastApiEvidenceChunk {
  id: string;
  query_id?: number | string | null;
  title?: string;
  eng_query?: string;
  english_passage?: string;
  snippet?: string;
  score: number;
  used_in_context?: boolean;
  document_type?: string;
  vector_id?: string;
}

interface FastApiQueryResponse {
  english: string;
  native: string;
  timing?: {
    guardrails?: number;
    embedding?: number;
    retrieval?: number;
    llm_first_token?: number;
    llm?: number;
    transcription?: number;
    total?: number;
  };
  time_taken?: Record<string, number>;
  retrieval?: {
    strategy?: string;
    chunks_retrieved?: number;
    min_score?: number;
    top_k?: number;
    results?: FastApiEvidenceChunk[];
  };
  guardrail?: {
    status?: string;
    reason?: string | null;
  };
  language?: string | null;
  raw_user_query?: string | null;
}

function mapGuardrailStatus(status?: string): GuardrailStatus {
  const allowed: GuardrailStatus[] = [
    'allowed',
    'off_topic',
    'unsafe',
    'no_context',
    'low_confidence',
    'backend_failure',
  ];
  if (status && allowed.includes(status as GuardrailStatus)) {
    return status as GuardrailStatus;
  }
  return 'allowed';
}

function adaptApiResponse(
  payload: FastApiQueryResponse,
  rawQuery: string,
  language: string,
  sttLatencyMs?: number,
  translationMs: number = 0,
  englishQuery?: string,
): RagQueryResponse {
  const timing = payload.timing || {};
  const results = (payload.retrieval?.results || []).map((chunk, index) => ({
    id: chunk.id || chunk.vector_id || `chunk_${index}`,
    title: chunk.title || chunk.eng_query || `Passage ${index + 1}`,
    score: Number(chunk.score ?? 0),
    snippet: chunk.snippet || chunk.english_passage || '',
    documentType: chunk.document_type || 'dense-vector',
    vectorId: chunk.vector_id || chunk.id,
  }));

  const transcriptionMs =
    sttLatencyMs && sttLatencyMs > 0
      ? Math.round(sttLatencyMs)
      : Math.round(timing.transcription || 0);
  const translateMs = Math.round(translationMs || 0);
  const retrievalMs = Math.round(timing.retrieval || 0);
  const generationMs = Math.round(timing.llm || timing.llm_first_token || 0);
  const guardrailMs = Math.round(timing.guardrails || 0);
  const embeddingMs = Math.round(timing.embedding || 0);

  // Backend total already includes STT when frontend sent stt_latency_ms; add client-side translate
  const backendTotal = Math.round(timing.total || 0);
  const totalMs =
    (backendTotal > 0
      ? backendTotal
      : transcriptionMs + retrievalMs + generationMs + guardrailMs + embeddingMs) + translateMs;

  const nativeAnswer = (payload.native || '').trim();
  const englishAnswer = (payload.english || '').trim();
  const displayAnswer = nativeAnswer || englishAnswer;
  const guardStatus = mapGuardrailStatus(payload.guardrail?.status);

  return {
    id: `query_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    query: rawQuery,
    // Always store the English retrieval string for the UI "EN:" line under the question
    englishQuery: (englishQuery || rawQuery).trim(),
    transcription: {
      text: rawQuery,
      confidence: 0.95,
      language,
    },
    answer: {
      text: displayAnswer,
      confidence: guardStatus === 'allowed' ? 0.92 : 0.4,
      grounded: guardStatus === 'allowed',
      summary: englishAnswer || displayAnswer,
      english: englishAnswer,
      native: nativeAnswer,
    },
    retrieval: {
      strategy: 'dense-vector',
      chunksRetrieved: payload.retrieval?.chunks_retrieved ?? results.length,
      results,
    },
    performance: {
      transcriptionMs,
      translationMs: translateMs,
      retrievalMs,
      generationMs,
      guardrailMs,
      embeddingMs,
      totalMs,
    },
    guardrail: {
      status: guardStatus,
      reason: payload.guardrail?.reason || undefined,
    },
  };
}

export class ApiRagService implements RagService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');
  }

  async query(input: string, options?: RagQueryOptions): Promise<RagQueryResponse> {
    const rawQuery = input.trim();
    const isVoice = Boolean(options?.isVoice);

    // 1) Detect native language from typed/spoken text (not from global UI tag)
    const language = resolveNativeLanguage({
      text: rawQuery,
      sarvamLanguageCode: options?.rawLanguageCode,
      sarvamDetected: options?.language as import('../../data/translations').SupportedLanguage | undefined,
    });

    // 2) Sarvam: native → proper English for vector search; measure latency like STT
    let englishQuery = rawQuery;
    let translationMs = 0;
    const needsTranslate = !isEnglishLanguageTag(language) || Boolean(detectRomanizedLanguage(rawQuery));

    if (needsTranslate) {
      if (!sarvamService.hasApiKey) {
        console.error(
          '❌ Cannot translate query to English: VITE_SARVAM_API_KEY missing in FRONTEND/.env.local. Restart Vite after adding it.',
        );
      } else {
        const translateStart = performance.now();
        let translated = await sarvamService.translateText(rawQuery, 'en-IN', language);
        if (!translated?.trim() || translated.trim().toLowerCase() === rawQuery.toLowerCase()) {
          const retry = await sarvamService.translateText(rawQuery, 'en-IN', 'auto');
          if (retry?.trim() && retry.trim().toLowerCase() !== rawQuery.toLowerCase()) {
            translated = retry;
          }
        }
        translationMs = Math.round(performance.now() - translateStart);
        if (translated?.trim() && translated.trim().toLowerCase() !== rawQuery.toLowerCase()) {
          englishQuery = translated.trim();
        } else {
          console.warn(
            `⚠️ Sarvam did not return a different English string for: "${rawQuery}". Retrieval will use the raw text.`,
          );
        }
        console.log(
          `🔀 [TYPED/VOICE TRANSLATE] ${language} → en-IN in ${translationMs}ms\n` +
            `   "${rawQuery}" → "${englishQuery}"`,
        );
      }
    }

    console.log(
      `🌐 [MULTILINGUAL DUAL-TRANSLATION RAG PIPELINE]\n` +
        ` ├─ Mode: ${isVoice ? 'voice' : 'typed'}\n` +
        ` ├─ 🎙️ Raw User Query (${language}) : "${rawQuery}"\n` +
        ` ├─ 🔀 English for Retrieval : "${englishQuery}" (translate ${translationMs}ms)\n` +
        ` └─ 🚀 POST /query : { query, language: "${language}", raw_user_query }`,
    );

    const response = await fetch(`${this.baseUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: englishQuery,
        language,
        raw_user_query: rawQuery,
        // Only real voice STT goes to the backend; typed translate time stays client-side
        stt_latency_ms: isVoice ? (options?.sttLatencyMs ?? null) : null,
        is_voice: isVoice,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(`API error: ${response.status} ${response.statusText}${errBody ? ` — ${errBody}` : ''}`);
    }

    const payload = (await response.json()) as FastApiQueryResponse;
    const adapted = adaptApiResponse(
      payload,
      rawQuery,
      language,
      isVoice ? options?.sttLatencyMs : undefined,
      translationMs,
      englishQuery,
    );

    // Typed: mirror translate latency into the STT column so that slot is not 0ms
    if (!isVoice && translationMs > 0) {
      adapted.performance.transcriptionMs = translationMs;
      adapted.performance.translationMs = translationMs;
    }

    return adapted;
  }

  async transcribe(_audioBlob?: Blob | string): Promise<{ text: string; confidence: number; durationMs: number }> {
    return { text: '', confidence: 0, durationMs: 0 };
  }

  async retrieve(_queryText: string): Promise<{ chunks: number; strategy: string; durationMs: number }> {
    return { chunks: 0, strategy: 'dense-vector', durationMs: 0 };
  }

  async generate(
    _queryText: string,
    _contextChunks: unknown[],
  ): Promise<{ answer: string; grounded: boolean; durationMs: number }> {
    return { answer: '', grounded: false, durationMs: 0 };
  }

  async healthCheck(): Promise<{
    voiceOnline: boolean;
    ragReady: boolean;
    vectorDbConnected: boolean;
    modelReady: boolean;
    latencyMs: number;
  }> {
    const start = performance.now();
    try {
      const res = await fetch(`${this.baseUrl}/health`);
      const latencyMs = Math.round(performance.now() - start);
      if (res.ok) {
        const data = await res.json();
        const connected = data.qdrant === 'connected' || String(data.qdrant || '').startsWith('connected');
        return {
          voiceOnline: true,
          ragReady: data.status === 'ok',
          vectorDbConnected: connected,
          modelReady: data.status === 'ok',
          latencyMs,
        };
      }
    } catch {
      // offline
    }
    return {
      voiceOnline: false,
      ragReady: false,
      vectorDbConnected: false,
      modelReady: false,
      latencyMs: 0,
    };
  }
}
