import React, { memo } from 'react';
import { Zap, Clock } from 'lucide-react';
import type { PerformanceMetrics } from '../../types/rag';
import { useLanguage } from '../../context/LanguageContext';

interface PipelineMetricsCardProps {
  metrics: PerformanceMetrics;
}

/** Combine STT + Translate without double-counting when typed flow mirrors translate into STT. */
function speechPrepMs(metrics: PerformanceMetrics): number {
  const stt = metrics.transcriptionMs || 0;
  const translate = metrics.translationMs || 0;
  if (stt > 0 && translate > 0 && stt === translate) return stt;
  return stt + translate;
}

/** Total shown = guardrails + embedding + retrieval only (excludes STT/translate & generation). */
function retrievalPipelineTotalMs(metrics: PerformanceMetrics): number {
  return (metrics.guardrailMs || 0) + (metrics.embeddingMs || 0) + (metrics.retrievalMs || 0);
}

export const PipelineMetricsCard: React.FC<PipelineMetricsCardProps> = memo(({ metrics }) => {
  const { t } = useLanguage();
  const totalMs = retrievalPipelineTotalMs(metrics);

  const steps = [
    {
      label: 'STT + Translate',
      ms: speechPrepMs(metrics),
      color: 'bg-[#FFD400]',
    },
    {
      label: t('stageGuardrail'),
      ms: metrics.guardrailMs || 0,
      color: 'bg-[#F7F0DB]',
    },
    {
      label: 'Embedding',
      ms: metrics.embeddingMs || 0,
      color: 'bg-[#79C968]/70',
    },
    {
      label: t('stageRetrieval'),
      ms: metrics.retrievalMs || 0,
      color: 'bg-[#79C968]',
    },
    {
      label: t('stageGeneration'),
      ms: metrics.generationMs || 0,
      color: 'bg-[#FF0B78]',
    },
  ];

  return (
    <div className="w-full bg-[#006B3C] border-2 border-[#79C968]/40 rounded-3xl p-3.5 sm:p-5 shadow-[6px_8px_0px_#003622] text-[#FFFDF5] my-2 sm:my-4 gpu-layer overflow-hidden">
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#79C968]/30 mb-3">
        <div className="flex items-center space-x-1.5 min-w-0 flex-1">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD400] shrink-0" />
          <h3 className="font-display text-xs sm:text-sm lg:text-base font-bold text-[#FFD400] truncate">
            {t('pipelinePerformanceTitle')}
          </h3>
        </div>

        <span className="bg-[#79C968]/20 border border-[#79C968] text-[#79C968] font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shrink-0 whitespace-nowrap">
          <Clock className="w-3 h-3 shrink-0" />
          <span>Actual timing</span>
        </span>
      </div>

      <div className="flex items-baseline justify-between mb-3 bg-[#004E32] p-3 sm:p-4 rounded-2xl border border-[#79C968]/30 gap-2">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#79C968] uppercase block">
            {t('totalLatencyLabel')}
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-black text-[#FFD400]">
            {totalMs}
            <span className="text-xs sm:text-sm text-[#F7F0DB] font-normal">ms</span>
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] text-[#79C968]/90 block mt-0.5 leading-snug">
            RAG pipeline time · excluding STT &amp; LLM
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 font-mono text-xs">
        {steps.map((step) => (
          <div
            key={step.label}
            className="bg-[#004E32] p-2 rounded-xl border border-[#79C968]/20 flex flex-col justify-between"
          >
            <span className="text-[8px] sm:text-[9px] text-[#79C968] font-bold uppercase truncate">
              {step.label}
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-bold text-[#F7F0DB] text-xs sm:text-sm">{step.ms}ms</span>
              <span className={`w-2 h-2 rounded-full ${step.color} shrink-0`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

PipelineMetricsCard.displayName = 'PipelineMetricsCard';
