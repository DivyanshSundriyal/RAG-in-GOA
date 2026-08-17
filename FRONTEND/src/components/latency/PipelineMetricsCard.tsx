import React, { memo } from 'react';
import { Zap, Clock } from 'lucide-react';
import type { PerformanceMetrics } from '../../types/rag';
import { useLanguage } from '../../context/LanguageContext';

interface PipelineMetricsCardProps {
  metrics: PerformanceMetrics;
}

export const PipelineMetricsCard: React.FC<PipelineMetricsCardProps> = memo(({ metrics }) => {
  const { t } = useLanguage();

  const steps = [
    { label: t('stageSTT'), ms: metrics.transcriptionMs, color: 'bg-[#FFD400]' },
    { label: t('stageRetrieval'), ms: metrics.retrievalMs, color: 'bg-[#79C968]' },
    { label: t('stageGeneration'), ms: metrics.generationMs, color: 'bg-[#FF0B78]' },
    { label: t('stageGuardrail'), ms: metrics.guardrailMs, color: 'bg-[#F7F0DB]' },
  ];

  return (
    <div className="w-full bg-[#006B3C] border-2 border-[#79C968]/40 rounded-3xl p-3.5 sm:p-5 shadow-[6px_8px_0px_#003622] text-[#FFFDF5] my-2 sm:my-4 gpu-layer overflow-hidden">
      {/* Header - Single-line non-wrapped title and target badge */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#79C968]/30 mb-3">
        <div className="flex items-center space-x-1.5 min-w-0 flex-1">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD400] shrink-0" />
          <h3 className="font-display text-xs sm:text-sm lg:text-base font-bold text-[#FFD400] truncate">
            {t('pipelinePerformanceTitle')}
          </h3>
        </div>

        <span className="bg-[#79C968]/20 border border-[#79C968] text-[#79C968] font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shrink-0 whitespace-nowrap">
          <Clock className="w-3 h-3 shrink-0" />
          <span>{t('target200ms')}</span>
        </span>
      </div>

      {/* Main Latency Hero Stat */}
      <div className="flex items-baseline justify-between mb-3 bg-[#004E32] p-3 sm:p-4 rounded-2xl border border-[#79C968]/30 gap-2">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#79C968] uppercase block">
            {t('totalLatencyLabel')}
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-black text-[#FFD400]">
            {metrics.totalMs}<span className="text-xs sm:text-sm text-[#F7F0DB] font-normal">ms</span>
          </span>
        </div>

        {/* Quantile Percentiles P50, P70, P100 */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 font-mono text-[10px] sm:text-xs text-right shrink-0">
          <div className="bg-[#006B3C] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-[#79C968]/30">
            <span className="text-[8px] sm:text-[9px] text-[#79C968] block font-bold">P50</span>
            <span className="font-bold text-[#F7F0DB]">{metrics.p50}ms</span>
          </div>
          <div className="bg-[#006B3C] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-[#79C968]/30">
            <span className="text-[8px] sm:text-[9px] text-[#79C968] block font-bold">P70</span>
            <span className="font-bold text-[#F7F0DB]">{metrics.p70}ms</span>
          </div>
          <div className="bg-[#006B3C] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-[#79C968]/30">
            <span className="text-[8px] sm:text-[9px] text-[#FF0B78] block font-bold">P100</span>
            <span className="font-bold text-[#FFD400]">{metrics.p100}ms</span>
          </div>
        </div>
      </div>

      {/* Latency Breakdown Bar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 font-mono text-xs">
        {steps.map((step) => (
          <div key={step.label} className="bg-[#004E32] p-2 rounded-xl border border-[#79C968]/20 flex flex-col justify-between">
            <span className="text-[8px] sm:text-[9px] text-[#79C968] font-bold uppercase truncate">{step.label}</span>
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
