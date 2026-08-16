import type { RagService } from './RagService';
import type { RagQueryResponse } from '../../types/rag';

export class ApiRagService implements RagService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
  }

  async query(input: string, options?: { isVoice?: boolean; demoMode?: boolean }): Promise<RagQueryResponse> {
    const response = await fetch(`${this.baseUrl}/rag/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: input,
        sessionId: `session_${Date.now()}`,
        isVoice: options?.isVoice || false,
        demoMode: options?.demoMode || false,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async transcribe(audioBlob?: Blob | string): Promise<{ text: string; confidence: number; durationMs: number }> {
    const formData = new FormData();
    if (audioBlob instanceof Blob) {
      formData.append('audio', audioBlob, 'recording.wav');
    }

    const response = await fetch(`${this.baseUrl}/rag/transcribe`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Transcription API error: ${response.status}`);
    }

    return await response.json();
  }

  async retrieve(queryText: string): Promise<{ chunks: number; strategy: string; durationMs: number }> {
    const response = await fetch(`${this.baseUrl}/rag/retrieve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryText }),
    });

    return await response.json();
  }

  async generate(queryText: string, contextChunks: unknown[]): Promise<{ answer: string; grounded: boolean; durationMs: number }> {
    const response = await fetch(`${this.baseUrl}/rag/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryText, contextChunks }),
    });

    return await response.json();
  }

  async healthCheck(): Promise<{ voiceOnline: boolean; ragReady: boolean; vectorDbConnected: boolean; modelReady: boolean; latencyMs: number }> {
    try {
      const res = await fetch(`${this.baseUrl}/health`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback status if offline
    }
    return {
      voiceOnline: false,
      ragReady: false,
      vectorDbConnected: false,
      modelReady: false,
      latencyMs: 0
    };
  }
}
