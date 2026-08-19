export type PipelineState =
  | 'IDLE'
  | 'LISTENING'
  | 'TRANSCRIBING'
  | 'RETRIEVING'
  | 'GENERATING'
  | 'SUCCESS'
  | 'REJECTED'
  | 'ERROR';

export type GuardrailStatus =
  | 'allowed'
  | 'off_topic'
  | 'unsafe'
  | 'no_context'
  | 'low_confidence'
  | 'backend_failure';

export interface Transcription {
  text: string;
  confidence: number;
  language?: string;
}

export interface Answer {
  text: string;
  confidence: number;
  grounded: boolean;
  summary?: string;
  english?: string;
  native?: string;
}

export interface EvidenceSource {
  id: string;
  title: string;
  score: number;
  snippet: string;
  documentType?: string;
  vectorId?: string;
}

export interface RetrievalResult {
  strategy: 'hybrid-semantic' | 'bm25-rerank' | 'dense-vector';
  chunksRetrieved: number;
  results: EvidenceSource[];
}

export interface PerformanceMetrics {
  transcriptionMs: number;
  /** Sarvam mayura translate latency (query → English for retrieval) */
  translationMs?: number;
  retrievalMs: number;
  generationMs: number;
  guardrailMs: number;
  totalMs: number;
  embeddingMs?: number;
  /** @deprecated Removed from active UI; kept optional for mock compatibility */
  p50?: number;
  /** @deprecated Removed from active UI; kept optional for mock compatibility */
  p70?: number;
  /** @deprecated Removed from active UI; kept optional for mock compatibility */
  p100?: number;
}

export interface GuardrailResult {
  status: GuardrailStatus;
  reason?: string;
  suggestedAction?: string;
}

export interface RagQueryOptions {
  isVoice?: boolean;
  demoMode?: boolean;
  sttLatencyMs?: number;
  language?: string;
  rawLanguageCode?: string;
}

export interface RagQueryResponse {
  id: string;
  timestamp: string;
  /** Original user transcript / typed text */
  query: string;
  /** Sarvam-translated English used for retrieval (shown under the question) */
  englishQuery?: string;
  transcription: Transcription;
  answer: Answer;
  retrieval: RetrievalResult;
  performance: PerformanceMetrics;
  guardrail: GuardrailResult;
}

export interface MockConfig {
  listeningMs: number;
  transcriptionMs: number;
  retrievalMs: number;
  generationMs: number;
}
