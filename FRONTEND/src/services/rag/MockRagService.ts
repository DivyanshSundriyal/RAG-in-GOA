import type { RagService } from './RagService';
import type { RagQueryResponse } from '../../types/rag';
import { MOCK_RESPONSES } from '../../data/mockQueries';

export class MockRagService implements RagService {
  private mockLatencyMultipler: number = 1.0;

  constructor(fastMode: boolean = false) {
    if (fastMode) {
      this.mockLatencyMultipler = 0.2;
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, Math.max(50, ms * this.mockLatencyMultipler)));
  }

  async query(input: string, options?: { isVoice?: boolean; demoMode?: boolean }): Promise<RagQueryResponse> {
    const isDemo = options?.demoMode || false;
    const speedFactor = isDemo ? 0.3 : 1.0;

    const cleanInput = input.trim().toLowerCase();
    let baseResponse: RagQueryResponse;

    if (cleanInput.includes('password') || cleanInput.includes('secret') || cleanInput.includes('bank')) {
      baseResponse = MOCK_RESPONSES.unsafe_query;
    } else if (cleanInput.includes('fifa') || cleanInput.includes('world cup') || cleanInput.includes('football')) {
      baseResponse = MOCK_RESPONSES.off_topic;
    } else if (cleanInput.includes('quantum') || cleanInput.includes('2040')) {
      baseResponse = MOCK_RESPONSES.no_context;
    } else if (cleanInput.includes('summar') || cleanInput.includes('relevant')) {
      baseResponse = MOCK_RESPONSES.summarize;
    } else if (cleanInput.includes('key') || cleanInput.includes('insight')) {
      baseResponse = MOCK_RESPONSES.key_insights;
    } else if (cleanInput.includes('compare') || cleanInput.includes('related')) {
      baseResponse = MOCK_RESPONSES.compare_docs;
    } else if (cleanInput.includes('finding') || cleanInput.includes('main')) {
      baseResponse = MOCK_RESPONSES.main_findings;
    } else {
      baseResponse = {
        id: `query_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        query: input,
        transcription: {
          text: input,
          confidence: 0.97,
          language: "en-IN"
        },
        answer: {
          text: `Grounded evidence for "${input}": The retrieved knowledge base confirms high consistency with HH GOA 2026 performance targets. All data chunks pass vector similarity thresholds.`,
          confidence: 0.94,
          grounded: true,
          summary: `Direct response grounded in vector context for '${input}'.`
        },
        retrieval: {
          strategy: "hybrid-semantic",
          chunksRetrieved: 4,
          results: [
            {
              id: "doc_dynamic_01",
              title: "HH GOA 2026 Dynamic Retrieval Unit",
              score: 0.95,
              snippet: `Vector search chunk matching user query: "${input}". Semantic relevance verified against local index.`,
              documentType: "Dynamic Index",
              vectorId: `vec_${Math.floor(Math.random() * 90000 + 10000)}`
            },
            {
              id: "doc_dynamic_02",
              title: "Sub-200ms Voice RAG System Benchmark",
              score: 0.91,
              snippet: "Measured pipeline total execution time: 143ms (P50: 128ms, P70: 151ms, P100: 188ms).",
              documentType: "Benchmark Audit",
              vectorId: "vec_88102"
            }
          ]
        },
        performance: {
          transcriptionMs: 82,
          retrievalMs: 18,
          generationMs: 74,
          guardrailMs: 9,
          totalMs: 143,
          p50: 128,
          p70: 151,
          p100: 188
        },
        guardrail: {
          status: "allowed"
        }
      };
    }

    // Always preserve exact user spoken transcription input
    const matchedResponse: RagQueryResponse = {
      ...baseResponse,
      id: `query_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      query: input.trim(),
      transcription: {
        ...baseResponse.transcription,
        text: input.trim(),
      },
    };

    await this.delay(100 * speedFactor);
    return matchedResponse;
  }

  async transcribe(audioBlob?: Blob | string): Promise<{ text: string; confidence: number; durationMs: number }> {
    await this.delay(500);
    return {
      text: typeof audioBlob === 'string' ? audioBlob : "What are the main findings discussed in this dataset?",
      confidence: 0.97,
      durationMs: 82
    };
  }

  async retrieve(_queryText: string): Promise<{ chunks: number; strategy: string; durationMs: number }> {
    await this.delay(300);
    return {
      chunks: 5,
      strategy: "hybrid-semantic",
      durationMs: 18
    };
  }

  async generate(_queryText: string, _contextChunks: unknown[]): Promise<{ answer: string; grounded: boolean; durationMs: number }> {
    await this.delay(600);
    return {
      answer: `Grounded response for "${_queryText}"...`,
      grounded: true,
      durationMs: 74
    };
  }

  async healthCheck(): Promise<{ voiceOnline: boolean; ragReady: boolean; vectorDbConnected: boolean; modelReady: boolean; latencyMs: number }> {
    return {
      voiceOnline: true,
      ragReady: true,
      vectorDbConnected: true,
      modelReady: true,
      latencyMs: 143
    };
  }
}
