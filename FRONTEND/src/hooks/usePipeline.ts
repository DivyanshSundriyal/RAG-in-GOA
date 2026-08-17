import { useState, useCallback } from 'react';
import type { PipelineState, RagQueryResponse } from '../types/rag';
import { getRagService } from '../services/rag';

interface RunPipelineOptions {
  isVoice?: boolean;
  demoMode?: boolean;
  sttLatencyMs?: number;
}

interface UsePipelineReturn {
  pipelineState: PipelineState;
  currentResponse: RagQueryResponse | null;
  historyList: RagQueryResponse[];
  errorMessage: string | null;
  runPipeline: (queryText: string, options?: RunPipelineOptions) => Promise<void>;
  resetPipeline: () => void;
  restoreFromHistory: (response: RagQueryResponse) => void;
}

export function usePipeline(fastDemo: boolean = false): UsePipelineReturn {
  const [pipelineState, setPipelineState] = useState<PipelineState>('IDLE');
  const [currentResponse, setCurrentResponse] = useState<RagQueryResponse | null>(null);
  const [historyList, setHistoryList] = useState<RagQueryResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, fastDemo ? ms * 0.2 : ms));

  const runPipeline = useCallback(async (queryText: string, options?: RunPipelineOptions) => {
    if (!queryText.trim()) return;

    setErrorMessage(null);
    const ragService = getRagService(false, options?.demoMode || fastDemo);

    try {
      if (options?.isVoice) {
        setPipelineState('LISTENING');
        await delay(300);
      }
      
      setPipelineState('TRANSCRIBING');
      await delay(200);

      setPipelineState('RETRIEVING');
      await delay(300);

      setPipelineState('GENERATING');
      await delay(400);

      const result = await ragService.query(queryText, options);

      // Forward real Sarvam AI STT telemetry latency if available
      if (options?.sttLatencyMs && options.sttLatencyMs > 0) {
        result.performance.transcriptionMs = options.sttLatencyMs;
        result.performance.totalMs =
          result.performance.transcriptionMs +
          result.performance.retrievalMs +
          result.performance.generationMs +
          result.performance.guardrailMs;
      }

      setCurrentResponse(result);
      setHistoryList((prev) => [result, ...prev.filter((item) => item.id !== result.id)]);

      if (result.guardrail.status !== 'allowed') {
        setPipelineState('REJECTED');
      } else {
        setPipelineState('SUCCESS');
      }
    } catch (err: any) {
      console.error('Pipeline execution error:', err);
      setErrorMessage(err.message || 'An unexpected pipeline error occurred.');
      setPipelineState('ERROR');
    }
  }, [fastDemo]);

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
    restoreFromHistory
  };
}
