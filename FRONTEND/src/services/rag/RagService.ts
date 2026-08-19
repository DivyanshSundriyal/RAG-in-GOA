import type { RagQueryOptions, RagQueryResponse } from '../../types/rag';

export interface RagService {
  /**
   * Execute full RAG pipeline (Voice or Typed query)
   */
  query(input: string, options?: RagQueryOptions): Promise<RagQueryResponse>;

  /**
   * Transcribe voice audio buffer or speech string
   */
  transcribe(audioBlob?: Blob | string): Promise<{ text: string; confidence: number; durationMs: number }>;

  /**
   * Perform vector retrieval for a query
   */
  retrieve(queryText: string): Promise<{ chunks: number; strategy: string; durationMs: number }>;

  /**
   * Generate answer based on retrieved context
   */
  generate(queryText: string, contextChunks: unknown[]): Promise<{ answer: string; grounded: boolean; durationMs: number }>;

  /**
   * Check system health and service status
   */
  healthCheck(): Promise<{
    voiceOnline: boolean;
    ragReady: boolean;
    vectorDbConnected: boolean;
    modelReady: boolean;
    latencyMs: number;
  }>;
}
