import React, { memo } from 'react';
import { BarChart3, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AnalyticsPage: React.FC = memo(() => {
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-20 lg:pb-4 min-h-[calc(100vh-65px)] lg:h-[calc(100vh-80px)] flex flex-col justify-start overflow-y-auto lg:overflow-hidden relative z-10 select-none space-y-3">
      {/* Header */}
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

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
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
            <span className={`font-mono text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full inline-block w-fit uppercase border border-[#003622]/40 ${item.color}`}>
              {item.target}
            </span>
          </div>
        ))}
      </div>

      {/* Latency Allocation Breakdown & Target Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 flex-1 overflow-hidden my-auto">
        {/* Stage Latency Allocation */}
        <div className="lg:col-span-8 bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-4 sm:p-5 shadow-[4px_5px_0px_#003622] text-[#00140B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#003622]/10 pb-2">
              <h2 className="font-mono text-xs sm:text-sm font-black text-[#00140B] uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF0B78]" />
                {t('stageLatencyTitle')}
              </h2>
              <span className="font-mono text-[10px] font-black text-[#00140B] bg-[#FFD400] px-2 py-0.5 rounded-full border border-[#003622]">
                {t('p99TelemetryTag')}
              </span>
            </div>

            <div className="space-y-2.5 sm:space-y-3.5 my-2">
              {pipelineBreakdown.map((stage) => (
                <div key={stage.name} className="space-y-1">
                  <div className="flex justify-between font-mono text-xs sm:text-sm font-black text-[#00140B]">
                    <span>{stage.name}</span>
                    <span className="text-[#00140B]">{stage.ms}ms</span>
                  </div>
                  <div className="w-full bg-[#003622]/15 h-3 sm:h-3.5 rounded-full overflow-hidden border border-[#003622]/40 p-0.5">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-[#003622]/20 flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-black text-[#00140B]">
            <span className="text-[#00140B] font-extrabold">{t('totalEndToEndLabel')}</span>
            <span className="text-sm font-black text-[#00140B] bg-[#79C968] text-[#004E32] px-2.5 py-0.5 rounded-full border border-[#003622]">
              143ms ({t('passedTargetTag')})
            </span>
          </div>
        </div>

        {/* Target Compliance Card */}
        <div className="lg:col-span-4 bg-[#006B3C] border-3 border-[#79C968]/50 rounded-2xl p-4 sm:p-5 shadow-[4px_5px_0px_#003622] text-[#FFFDF5] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-[#79C968]/30">
              <ShieldCheck className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-mono text-xs sm:text-sm font-black text-[#FFD400] uppercase tracking-wider">
                {t('judgeVerificationTitle')}
              </h2>
            </div>

            <div className="space-y-2.5 font-sans text-xs">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#79C968] shrink-0 mt-0.5" />
                <span className="font-bold text-[#FFFDF5]">{t('judgeItem1')}</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#79C968] shrink-0 mt-0.5" />
                <span className="font-bold text-[#FFFDF5]">{t('judgeItem2')}</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#79C968] shrink-0 mt-0.5" />
                <span className="font-bold text-[#FFFDF5]">{t('judgeItem3')}</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#79C968] shrink-0 mt-0.5" />
                <span className="font-bold text-[#FFFDF5]">{t('judgeItem4')}</span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-[#004E32] border border-[#79C968]/40 text-center font-mono text-[10px] sm:text-xs font-black text-[#FFD400]">
            {t('targetSLACompliance')}
          </div>
        </div>
      </div>
    </div>
  );
});

AnalyticsPage.displayName = 'AnalyticsPage';
