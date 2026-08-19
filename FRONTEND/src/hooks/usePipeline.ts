import { useState, useCallback, useEffect } from 'react';
import type { PipelineState, RagQueryOptions, RagQueryResponse } from '../types/rag';
import { getRagService } from '../services/rag';

const HISTORY_STORAGE_KEY = 'ragingoa.history.v1';
const HISTORY_LIMIT = 7;

function loadHistoryFromStorage(): RagQueryResponse[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, HISTORY_LIMIT) as RagQueryResponse[];
  } catch {
    return [];
  }
}

function persistHistory(items: RagQueryResponse[]): void {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items.slice(0, HISTORY_LIMIT)));
  } catch {
    // Quota / private mode — ignore
  }
}

interface UsePipelineReturn {
  pipelineState: PipelineState;
  currentResponse: RagQueryResponse | null;
  historyList: RagQueryResponse[];
  errorMessage: string | null;
  runPipeline: (queryText: string, options?: RagQueryOptions) => Promise<void>;
  resetPipeline: () => void;
  restoreFromHistory: (response: RagQueryResponse) => void;
}

export function usePipeline(fastDemo: boolean = false): UsePipelineReturn {
  const [pipelineState, setPipelineState] = useState<PipelineState>('IDLE');
  const [currentResponse, setCurrentResponse] = useState<RagQueryResponse | null>(null);
  const [historyList, setHistoryList] = useState<RagQueryResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setHistoryList(loadHistoryFromStorage());
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, fastDemo ? ms * 0.2 : ms));

  const runPipeline = useCallback(
    async (queryText: string, options?: RagQueryOptions) => {
      if (!queryText.trim()) return;

      setErrorMessage(null);
      const useMock = Boolean(options?.demoMode || fastDemo);
      const ragService = getRagService(!useMock, useMock);

      try {
        if (options?.isVoice && useMock) {
          setPipelineState('LISTENING');
          await delay(300);
        }

        if (useMock) {
          setPipelineState('TRANSCRIBING');
          await delay(200);
          setPipelineState('RETRIEVING');
          await delay(300);
          setPipelineState('GENERATING');
          await delay(400);
        } else {
          // Typed: TRANSCRIBING covers Sarvam language-detect + translate (like STT for voice)
          // Voice: STT already finished in Ask; jump to retrieval/generation
          if (!options?.isVoice) {
            setPipelineState('TRANSCRIBING');
          } else {
            setPipelineState('RETRIEVING');
          }
        }

        const result = await ragService.query(queryText, {
          ...options,
          isVoice: options?.isVoice ?? false,
          demoMode: useMock,
        });

        if (!useMock) {
          setPipelineState('GENERATING');
        }

        if (options?.sttLatencyMs && options.sttLatencyMs > 0 && options?.isVoice) {
          result.performance.transcriptionMs = Math.round(options.sttLatencyMs);
        }

        // Typed stores translate in both STT + Translate for display — count once in total
        const translateMs = result.performance.translationMs || 0;
        const displayPartsSum = options?.isVoice
          ? (result.performance.transcriptionMs || 0) +
            translateMs +
            result.performance.retrievalMs +
            result.performance.generationMs +
            result.performance.guardrailMs +
            (result.performance.embeddingMs || 0)
          : (result.performance.translationMs || result.performance.transcriptionMs || 0) +
            result.performance.retrievalMs +
            result.performance.generationMs +
            result.performance.guardrailMs +
            (result.performance.embeddingMs || 0);

        if (!result.performance.totalMs || result.performance.totalMs < displayPartsSum) {
          result.performance.totalMs = Math.max(result.performance.totalMs || 0, displayPartsSum);
        }

        setCurrentResponse(result);
        setHistoryList((prev) => {
          const next = [result, ...prev.filter((item) => item.id !== result.id)].slice(0, HISTORY_LIMIT);
          persistHistory(next);
          return next;
        });

        if (result.guardrail.status !== 'allowed') {
          setPipelineState('REJECTED');
        } else {
          setPipelineState('SUCCESS');
        }
      } catch (err: unknown) {
        console.error('Pipeline execution error:', err);
        const message = err instanceof Error ? err.message : 'An unexpected pipeline error occurred.';
        setErrorMessage(message);
        setPipelineState('ERROR');
      }
    },
    [fastDemo],
  );

  const resetPipeline = useCallback(() => {
    setPipelineState('IDLE');
    setCurrentResponse(null);
    setErrorMessage(null);
  }, []);

  const restoreFromHistory = useCallback((response: RagQueryResponse) => {
    setCurrentResponse(response);
    setPipelineState(response.guardrail.status !== 'allowed' ? 'REJECTED' : 'SUCCESS');
  }, []);

  return {
    pipelineState,
    currentResponse,
    historyList,
    errorMessage,
    runPipeline,
    resetPipeline,
    restoreFromHistory,
  };
}
