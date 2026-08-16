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
    <div className="w-full bg-[#006B3C] border-2 border-[#79C968]/40 rounded-3xl p-5 sm:p-6 shadow-[6px_8px_0px_#003622] text-[#FFFDF5] my-6 gpu-layer">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#79C968]/30 mb-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-[#FFD400]" />
          <h3 className="font-display text-lg font-bold text-[#FFD400]">
            {t('pipelinePerformanceTitle')}
          </h3>
        </div>

        <span className="bg-[#79C968]/20 border border-[#79C968] text-[#79C968] font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {t('target200ms')}
        </span>
      </div>

      {/* Main Latency Hero Stat */}
      <div className="flex items-baseline justify-between mb-4 bg-[#004E32] p-4 rounded-2xl border border-[#79C968]/30">
        <div>
          <span className="font-mono text-[10px] font-bold text-[#79C968] uppercase block">
            {t('totalLatencyLabel')}
          </span>
          <span className="font-mono text-3xl sm:text-4xl font-black text-[#FFD400]">
            {metrics.totalMs}<span className="text-base text-[#F7F0DB] font-normal">ms</span>
          </span>
        </div>

        {/* Quantile Percentiles P50, P70, P100 */}
        <div className="flex items-center space-x-2 font-mono text-xs text-right">
          <div className="bg-[#006B3C] px-2 py-1 rounded border border-[#79C968]/30">
            <span className="text-[9px] text-[#79C968] block font-bold">P50</span>
            <span className="font-bold text-[#F7F0DB]">{metrics.p50}ms</span>
          </div>
          <div className="bg-[#006B3C] px-2 py-1 rounded border border-[#79C968]/30">
            <span className="text-[9px] text-[#79C968] block font-bold">P70</span>
            <span className="font-bold text-[#F7F0DB]">{metrics.p70}ms</span>
          </div>
          <div className="bg-[#006B3C] px-2 py-1 rounded border border-[#79C968]/30">
            <span className="text-[9px] text-[#FF0B78] block font-bold">P100</span>
            <span className="font-bold text-[#FFD400]">{metrics.p100}ms</span>
          </div>
        </div>
      </div>

      {/* Latency Breakdown Bar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
        {steps.map((step) => (
          <div key={step.label} className="bg-[#004E32] p-2.5 rounded-xl border border-[#79C968]/20 flex flex-col justify-between">
            <span className="text-[9px] text-[#79C968] font-bold uppercase truncate">{step.label}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-bold text-[#F7F0DB] text-sm">{step.ms}ms</span>
              <span className={`w-2 h-2 rounded-full ${step.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

PipelineMetricsCard.displayName = 'PipelineMetricsCard';
