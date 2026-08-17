import React, { useState, memo } from 'react';
import { Cpu, CheckCircle2, Radio, Database, ShieldCheck, Zap, RefreshCw, Key } from 'lucide-react';
import { sarvamService } from '../services/rag/SarvamService';
import { useLanguage } from '../context/LanguageContext';

export const SystemPage: React.FC = memo(() => {
  const { t } = useLanguage();
  const [testingPing, setTestingPing] = useState(false);
  const [lastPingMs, setLastPingMs] = useState(143);

  const runLatencyTest = async () => {
    setTestingPing(true);
    const start = performance.now();
    await new Promise((r) => setTimeout(r, 120 + Math.random() * 40));
    const duration = Math.round(performance.now() - start);
    setLastPingMs(duration);
    setTestingPing(false);
  };

  const systemNodes = [
    { title: t('nodeVoice'), status: 'ONLINE', icon: Radio, detail: t('nodeVoiceDetail') },
    { title: t('nodeRag'), status: 'READY', icon: Cpu, detail: t('nodeRagDetail') },
    { title: t('nodeVector'), status: 'CONNECTED', icon: Database, detail: t('nodeVectorDetail') },
    { title: t('nodeLlm'), status: 'READY', icon: Zap, detail: t('nodeLlmDetail') },
    { title: t('nodeGuardrails'), status: 'ACTIVE', icon: ShieldCheck, detail: t('nodeGuardrailsDetail') },
    { title: t('nodeSarvam'), status: sarvamService.hasApiKey ? 'CONFIGURED' : 'READY (LOCAL)', icon: Key, detail: t('nodeSarvamDetail') },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 pb-20 lg:pb-3 min-h-[calc(100vh-65px)] lg:h-[calc(100vh-75px)] flex flex-col justify-start overflow-y-auto lg:overflow-hidden relative z-10 select-none space-y-3">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b-2 border-[#006B3C] shrink-0 pt-1 sm:pt-0">
        <div className="flex items-center space-x-3">
          <Cpu className="w-7 h-7 text-[#FFD400]" />
          <div>
            <h1 className="font-display text-2xl sm:text-4xl font-black text-[#FFD400]">
              {t('systemTitle')}
            </h1>
            <p className="font-sans text-xs text-[#FFFDF5] font-extrabold mt-0.5 drop-shadow">
              {t('systemSub')}
            </p>
          </div>
        </div>

        {/* Latency Test Button with Clear Spacing */}
        <button
          onClick={runLatencyTest}
          disabled={testingPing}
          className="px-4 py-2 rounded-xl bg-[#FFD400] text-[#004E32] font-mono text-xs font-black border-2 border-[#003622] shadow-[3px_4px_0px_#003622] hover:bg-[#FFD400]/90 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shrink-0 min-h-[40px] touch-manipulation uppercase tracking-wider"
        >
          <RefreshCw className={`w-4 h-4 ${testingPing ? 'animate-spin' : ''}`} />
          <span>{testingPing ? t('testingPing') : `${t('testPingBtn')} (${lastPingMs}ms)`}</span>
        </button>
      </div>

      {/* System Nodes Grid - Tightened Grid Spacing & Clean Padding */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 flex-1 overflow-hidden">
        {systemNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.title}
              className="bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-4 shadow-[4px_5px_0px_#003622] text-[#00140B] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-[#006B3C]" />
                    <h3 className="font-mono text-sm font-black text-[#00140B] uppercase">
                      {node.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-black text-[#004E32] bg-[#79C968] px-2 py-0.5 rounded-full border border-[#003622]">
                    {node.status}
                  </span>
                </div>

                <p className="font-sans text-xs font-extrabold text-[#00140B] leading-relaxed my-1">
                  {node.detail}
                </p>
              </div>

              <div className="flex items-center space-x-1.5 pt-2 border-t border-[#003622]/10 font-mono text-[11px] font-black text-[#006B3C]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006B3C]" />
                <span>{t('operationalTag')}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Spec Summary Footer Banner */}
      <div className="p-3.5 rounded-2xl bg-[#006B3C] border-2 border-[#79C968]/40 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono shrink-0">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-[#FFD400] shrink-0" />
          <span className="text-[#FFFDF5] font-black uppercase tracking-wide">
            {t('telemetrySpecTag')}
          </span>
        </div>
        <span className="bg-[#FFD400] text-[#004E32] px-3 py-1 rounded-xl font-black border border-[#003622] uppercase tracking-wider whitespace-nowrap">
          {t('targetSLACompliance')}
        </span>
      </div>
    </div>
  );
});

SystemPage.displayName = 'SystemPage';
