import React from 'react';
import { BarChart3, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AnalyticsPage: React.FC = () => {
  const { t } = useLanguage();

  const metrics = [
    { label: t('avgLatencyLabel'), value: '143ms', target: t('target200msTag'), color: 'bg-[#FFD400] text-[#004E32]' },
    { label: t('p50Label'), value: '128ms', target: t('p50Tag'), color: 'bg-[#79C968] text-[#004E32]' },
    { label: t('p70Label'), value: '151ms', target: t('p70Tag'), color: 'bg-[#79C968] text-[#004E32]' },
    { label: t('p100Label'), value: '188ms', target: t('p100Tag'), color: 'bg-[#FF0B78] text-[#FFFDF5]' },
  ];

  const pipelineBreakdown = [
    { name: `STT (${t('stageSTT')})`, ms: 82, percentage: 57, color: 'bg-[#FFD400]' },
    { name: t('stageRetrieval'), ms: 18, percentage: 13, color: 'bg-[#79C968]' },
    { name: t('stageGeneration'), ms: 74, percentage: 52, color: 'bg-[#FF0B78]' },
    { name: t('stageGuardrail'), ms: 9, percentage: 6, color: 'bg-[#F7F0DB]' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 lg:h-[calc(100vh-85px)] flex flex-col justify-between overflow-hidden relative z-10 select-none space-y-3">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-2.5 border-b-2 border-[#006B3C] shrink-0">
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

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 shrink-0">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-3.5 shadow-[4px_5px_0px_#003622] text-[#001D11] flex flex-col justify-between"
          >
            <span className="font-mono text-[10px] font-black tracking-wider text-[#003622] uppercase">
              {item.label}
            </span>
            <div className="my-1">
              <span className="font-mono text-2xl sm:text-3xl font-black text-[#00140B]">
                {item.value}
              </span>
            </div>
            <span className={`self-start px-2 py-0.5 rounded text-[10px] font-mono font-black border border-[#003622] ${item.color}`}>
              {item.target}
            </span>
          </div>
        ))}
      </div>

      {/* Main Breakdown Section - Leaving Clean Bottom Space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch overflow-hidden mb-2">
        {/* Latency Stage Breakdown */}
        <div className="lg:col-span-7 bg-[#006B3C] border-2 border-[#79C968]/40 rounded-3xl p-5 sm:p-5.5 shadow-[5px_6px_0px_#003622] text-[#FFFDF5] flex flex-col justify-between h-full">
          <div className="flex items-center space-x-2.5 mb-3 pb-2.5 border-b border-[#79C968]/30 shrink-0">
            <Zap className="w-5.5 h-5.5 text-[#FFD400]" />
            <h2 className="font-display text-lg sm:text-xl font-bold text-[#FFD400]">
              {t('stageLatencyTitle')}
            </h2>
          </div>

          {/* Stage Items & Progress Bars */}
          <div className="space-y-3.5 sm:space-y-4 my-auto">
            {pipelineBreakdown.map((stage) => (
              <div key={stage.name} className="space-y-1">
                <div className="flex justify-between font-mono text-xs sm:text-sm font-extrabold text-[#F7F0DB]">
                  <span>{stage.name}</span>
                  <span className="text-[#FFD400] text-xs sm:text-sm font-black">{stage.ms}ms</span>
                </div>
                <div className="w-full h-3 bg-[#004E32] rounded-full overflow-hidden border border-[#79C968]/40 p-0.5 shadow-inner">
                  <div
                    className={`h-full rounded-full ${stage.color}`}
                    style={{ width: `${Math.min(100, stage.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total Execution Latency Footer */}
          <div className="mt-3 pt-3 border-t border-[#79C968]/30 font-mono text-xs sm:text-sm flex items-center justify-between shrink-0">
            <span className="text-[#FFFDF5] font-black">{t('totalEndToEnd')}</span>
            <span className="text-xl sm:text-2xl font-black text-[#FFD400]">143ms</span>
          </div>
        </div>

        {/* Accuracy & Safety Stats */}
        <div className="lg:col-span-5 bg-[#F7F0DB] border-3 border-[#003622] rounded-3xl p-5 sm:p-5.5 shadow-[5px_6px_0px_#003622] text-[#001D11] flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center space-x-2.5 mb-3 pb-2.5 border-b-2 border-[#003622]/20 shrink-0">
              <ShieldCheck className="w-5.5 h-5.5 text-[#003622]" />
              <h2 className="font-display text-lg sm:text-xl font-black text-[#00140B]">
                {t('safetyGroundingTitle')}
              </h2>
            </div>

            <div className="space-y-3 my-auto">
              <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border-2 border-[#003622]">
                <span className="font-mono text-[10px] font-black text-[#003622] uppercase block mb-0.5">
                  {t('groundedRatioLabel')}
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-black text-[#00140B]">94.6%</span>
                <p className="font-sans text-[11px] text-[#00140B] font-bold mt-0.5 leading-snug">
                  {t('groundedRatioSub')}
                </p>
              </div>

              <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border-2 border-[#003622]">
                <span className="font-mono text-[10px] font-black text-[#FF0B78] uppercase block mb-0.5">
                  {t('guardrailRateLabel')}
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-black text-[#FF0B78]">3.2%</span>
                <p className="font-sans text-[11px] text-[#00140B] font-bold mt-0.5 leading-snug">
                  {t('guardrailRateSub')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#003622]/20 flex items-center space-x-2 text-[11px] font-mono font-black text-[#003622] shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#79C968]" />
            <span>{t('auditedTag')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
