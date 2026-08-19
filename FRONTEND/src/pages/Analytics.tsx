import React, { memo, startTransition, useEffect, useMemo, useState } from 'react';
import { BarChart3, Zap, ShieldCheck, CheckCircle2, Play, LoaderCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { RagQueryResponse } from '../types/rag';
import {
  loadBenchmarkResult,
  runRagBenchmark,
  type BenchmarkResult,
} from '../services/rag/benchmark';

interface AnalyticsPageProps {
  historyList: RagQueryResponse[];
}

function avg(values: number[]): number {
  if (!values.length) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = memo(({ historyList }) => {
  const { t } = useLanguage();
  const [benchmark, setBenchmark] = useState<BenchmarkResult | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [benchmarkError, setBenchmarkError] = useState<string | null>(null);

  useEffect(() => {
    setBenchmark(loadBenchmarkResult());
  }, []);

  const handleRunBenchmark = async () => {
    if (isBenchmarking) return;
    setIsBenchmarking(true);
    setBenchmarkError(null);
    setProgress({ completed: 0, total: 50 });
    try {
      const result = await runRagBenchmark((completed, total) => {
        startTransition(() => setProgress({ completed, total }));
      });
      setBenchmark(result);
    } catch (error) {
      setBenchmarkError(error instanceof Error ? error.message : 'Benchmark failed.');
    } finally {
      setIsBenchmarking(false);
    }
  };

  const stats = useMemo(() => {
    const speechPrep = historyList.map((h) => {
      const stt = h.performance.transcriptionMs || 0;
      const translate = h.performance.translationMs || 0;
      if (stt > 0 && translate > 0 && stt === translate) return stt;
      return stt + translate;
    });
    const retrievalCore = historyList.map(
      (h) =>
        (h.performance.guardrailMs || 0) +
        (h.performance.embeddingMs || 0) +
        (h.performance.retrievalMs || 0),
    );
    const retrieval = historyList.map((h) => h.performance.retrievalMs || 0);
    const embedding = historyList.map((h) => h.performance.embeddingMs || 0);
    const generation = historyList.map((h) => h.performance.generationMs || 0);
    const guardrail = historyList.map((h) => h.performance.guardrailMs || 0);
    const chunks = historyList.map((h) => h.retrieval.chunksRetrieved || 0);
    const grounded = historyList.filter((h) => h.guardrail.status === 'allowed').length;
    const rejected = historyList.length - grounded;
    const latest = historyList[0];

    const avgSpeechPrep = avg(speechPrep);
    const avgRetrievalCore = avg(retrievalCore);
    const avgRetrieval = avg(retrieval);
    const avgEmbedding = avg(embedding);
    const avgGeneration = avg(generation);
    const avgGuardrail = avg(guardrail);
    const stageSum = Math.max(
      1,
      avgSpeechPrep + avgGuardrail + avgEmbedding + avgRetrieval + avgGeneration,
    );

    return {
      count: historyList.length,
      avgTotal: avgRetrievalCore,
      avgSpeechPrep,
      avgRetrieval,
      avgEmbedding,
      avgGeneration,
      avgGuardrail,
      avgChunks: avg(chunks),
      grounded,
      rejected,
      latestTotal: latest
        ? (latest.performance.guardrailMs || 0) +
          (latest.performance.embeddingMs || 0) +
          (latest.performance.retrievalMs || 0)
        : 0,
      latestRetrieval: latest?.performance.retrievalMs ?? 0,
      latestGeneration: latest?.performance.generationMs ?? 0,
      latestSpeechPrep: latest
        ? (() => {
            const stt = latest.performance.transcriptionMs || 0;
            const tr = latest.performance.translationMs || 0;
            return stt > 0 && tr > 0 && stt === tr ? stt : stt + tr;
          })()
        : 0,
      pipelineBreakdown: [
        {
          name: 'STT + Translate',
          ms: avgSpeechPrep,
          percentage: Math.round((avgSpeechPrep / stageSum) * 100),
          color: 'bg-[#FFD400]',
        },
        {
          name: t('stageGuardrail'),
          ms: avgGuardrail,
          percentage: Math.round((avgGuardrail / stageSum) * 100),
          color: 'bg-[#F7F0DB]',
        },
        {
          name: 'Embedding',
          ms: avgEmbedding,
          percentage: Math.round((avgEmbedding / stageSum) * 100),
          color: 'bg-[#79C968]/70',
        },
        {
          name: t('stageRetrieval'),
          ms: avgRetrieval,
          percentage: Math.round((avgRetrieval / stageSum) * 100),
          color: 'bg-[#79C968]',
        },
        {
          name: t('stageGeneration'),
          ms: avgGeneration,
          percentage: Math.round((avgGeneration / stageSum) * 100),
          color: 'bg-[#FF0B78]',
        },
      ],
    };
  }, [historyList, t]);

  const metrics = [
    {
      label: 'Queries Stored',
      value: String(stats.count),
      target: 'Last 7 max',
      color: 'bg-[#FFD400] text-[#004E32]',
    },
    {
      label: t('avgLatencyLabel'),
      value: stats.count ? `${stats.avgTotal}ms` : '—',
      target: 'Guard+Embed+Retrieval',
      color: 'bg-[#79C968] text-[#004E32]',
    },
    {
      label: 'Most Recent Total',
      value: stats.count ? `${stats.latestTotal}ms` : '—',
      target: 'Guard+Embed+Retrieval',
      color: 'bg-[#79C968] text-[#004E32]',
    },
    {
      label: 'Grounded / Rejected',
      value: `${stats.grounded}/${stats.rejected}`,
      target: `Avg chunks ${stats.avgChunks}`,
      color: 'bg-[#FF0B78] text-[#FFFDF5]',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-20 lg:pb-4 min-h-[calc(100vh-65px)] lg:h-[calc(100vh-80px)] flex flex-col justify-start overflow-y-auto lg:overflow-hidden relative z-10 select-none space-y-3">
      <div className="flex items-center space-x-3 pb-2 border-b-2 border-[#006B3C] shrink-0 pt-1 sm:pt-0">
        <BarChart3 className="w-7 h-7 text-[#FFD400]" />
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-black text-[#FFD400]">
            {t('analyticsTitle')}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#FFFDF5] font-extrabold mt-0.5 drop-shadow">
            {t('analyticsSub')}
          </p>
        </div>
      </div>

      <section className="bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-4 sm:p-5 shadow-[4px_5px_0px_#003622] text-[#00140B]">
        <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
          <div>
            <h2 className="font-mono text-sm sm:text-base font-black uppercase tracking-wider">
              RAG percentile benchmark
            </h2>
            <p className="font-sans text-xs sm:text-sm font-bold text-[#004E32]/80 mt-1">
              50 English retrieval runs. Full query + retrieval guardrails (length, injection, ban list, PII, min-score), embedding, and Qdrant. Excludes only STT and the final LLM call.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRunBenchmark}
            disabled={isBenchmarking}
            className="px-4 py-2 rounded-xl bg-[#006B3C] text-[#FFD400] border-2 border-[#003622] shadow-[2px_3px_0px_#003622] font-mono text-xs font-black uppercase flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isBenchmarking ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            {isBenchmarking ? `${progress.completed} / ${progress.total}` : 'Run benchmark'}
          </button>
        </div>

        {benchmark ? (
          <>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: 'P50', value: benchmark.p50, note: 'Typical' },
                { label: 'P70', value: benchmark.p70, note: '70% complete' },
                { label: 'P100', value: benchmark.p100, note: 'Slowest run' },
              ].map((item) => (
                <div key={item.label} className="bg-[#004E32] rounded-xl p-3 border-2 border-[#003622]">
                  <span className="font-mono text-[10px] sm:text-xs font-black text-[#79C968]">{item.label}</span>
                  <span className="block font-mono text-2xl sm:text-3xl font-black text-[#FFD400]">
                    {item.value}<small className="text-xs text-[#F7F0DB]">ms</small>
                  </span>
                  <span className="font-mono text-[9px] text-[#F7F0DB]/80">{item.note}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] font-bold text-[#004E32] mt-3">
              {benchmark.samples.length} samples · average {benchmark.averageMs}ms · last run {new Date(benchmark.completedAt).toLocaleString()}
            </p>
            {benchmark.p100 > 200 && (
              <p className="font-sans text-xs font-bold text-[#FF0B78] mt-2">
                P100 exceeds 200ms. Cold embedding or Qdrant network activity can cause occasional slow runs.
              </p>
            )}
          </>
        ) : (
          <p className="font-mono text-xs font-black text-[#004E32]">
            Run benchmark to compute P50/P70/P100.
          </p>
        )}
        {benchmarkError && <p className="font-mono text-xs font-bold text-[#FF0B78] mt-3">{benchmarkError}</p>}
      </section>

      {stats.count === 0 ? (
        <div className="bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-6 shadow-[4px_5px_0px_#003622] text-[#00140B]">
          <p className="font-mono text-sm font-black">
            No query history yet. Run a text or voice query on Ask to populate real analytics.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-3.5 shadow-[3px_4px_0px_#003622] text-[#001D11] flex flex-col justify-between"
          >
            <span className="font-mono text-[10px] font-black tracking-wider text-[#003622] uppercase">
              {item.label}
            </span>
            <div className="my-1">
              <span className="font-mono text-xl sm:text-3xl font-black text-[#00140B]">
                {item.value}
              </span>
            </div>
            <span
              className={`font-mono text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full inline-block w-fit uppercase border border-[#003622]/40 ${item.color}`}
            >
              {item.target}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 flex-1 overflow-hidden">
        <div className="lg:col-span-8 bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-4 sm:p-5 shadow-[4px_5px_0px_#003622] text-[#00140B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#003622]/10 pb-2">
              <h2 className="font-mono text-xs sm:text-sm font-black text-[#00140B] uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF0B78]" />
                {t('stageLatencyTitle')}
              </h2>
              <span className="font-mono text-[10px] font-black text-[#00140B] bg-[#FFD400] px-2 py-0.5 rounded-full border border-[#003622]">
                Avg of last {stats.count || 0}
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3 my-2">
              {stats.pipelineBreakdown.map((stage) => (
                <div key={stage.name} className="space-y-1">
                  <div className="flex justify-between font-mono text-xs sm:text-sm font-black text-[#00140B]">
                    <span>{stage.name}</span>
                    <span className="text-[#00140B]">{stage.ms}ms</span>
                  </div>
                  <div className="w-full bg-[#003622]/15 h-3 sm:h-3.5 rounded-full overflow-hidden border border-[#003622]/40 p-0.5">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${Math.min(100, stage.percentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-[#003622]/20 flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-black text-[#00140B]">
            <span className="text-[#00140B] font-extrabold">{t('totalEndToEndLabel')}</span>
            <span className="text-sm font-black text-[#00140B] bg-[#79C968] text-[#004E32] px-2.5 py-0.5 rounded-full border border-[#003622]">
              {stats.count ? `${stats.avgTotal}ms avg` : '—'}
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 bg-[#006B3C] border-3 border-[#79C968]/50 rounded-2xl p-4 sm:p-5 shadow-[4px_5px_0px_#003622] text-[#FFFDF5] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-[#79C968]/30">
              <ShieldCheck className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-mono text-xs sm:text-sm font-black text-[#FFD400] uppercase tracking-wider">
                Recent Timing Snapshot
              </h2>
            </div>

            <div className="space-y-2.5 font-sans text-xs">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#79C968] shrink-0 mt-0.5" />
                <span className="font-bold text-[#FFFDF5]">
                  Latest STT + Translate: {stats.latestSpeechPrep}ms
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#79C968] shrink-0 mt-0.5" />
                <span className="font-bold text-[#FFFDF5]">Latest retrieval: {stats.latestRetrieval}ms</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#79C968] shrink-0 mt-0.5" />
                <span className="font-bold text-[#FFFDF5]">Latest generation: {stats.latestGeneration}ms</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#79C968] shrink-0 mt-0.5" />
                <span className="font-bold text-[#FFFDF5]">
                  Core total (G+E+R): {stats.latestTotal}ms
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-[#004E32] border border-[#79C968]/40 text-center font-mono text-[10px] sm:text-xs font-black text-[#FFD400]">
            Live aggregates from localStorage history (max 7)
          </div>
        </div>
      </div>
    </div>
  );
});

AnalyticsPage.displayName = 'AnalyticsPage';
