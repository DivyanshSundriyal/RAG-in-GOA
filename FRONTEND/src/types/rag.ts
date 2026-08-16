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
  retrievalMs: number;
  generationMs: number;
  guardrailMs: number;
  totalMs: number;
  p50: number;
  p70: number;
  p100: number;
}

export interface GuardrailResult {
  status: GuardrailStatus;
  reason?: string;
  suggestedAction?: string;
}

export interface RagQueryResponse {
  id: string;
  timestamp: string;
  query: string;
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
