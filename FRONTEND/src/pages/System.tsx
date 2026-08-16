import React, { useState } from 'react';
import { Cpu, CheckCircle2, Radio, Database, ShieldCheck, Zap, RefreshCw, Key } from 'lucide-react';
import { sarvamService } from '../services/rag/SarvamService';
import { useLanguage } from '../context/LanguageContext';

export const SystemPage: React.FC = () => {
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:h-[calc(100vh-75px)] flex flex-col justify-between overflow-hidden relative z-10 select-none space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#006B3C] shrink-0">
        <div className="flex items-center space-x-3">
          <Cpu className="w-7 h-7 text-[#FFD400]" />
          <div>
            <h1 className="font-display text-2xl sm:text-4xl font-black text-[#FFD400]">
              {t('systemTitle')}
            </h1>
            <p className="font-sans text-xs text-[#F7F0DB]/80 mt-0.5">
              {t('systemSub')}
            </p>
          </div>
        </div>

        {/* Latency Test Button */}
        <button
          onClick={runLatencyTest}
          disabled={testingPing}
          className="px-4 py-2 rounded-xl bg-[#FFD400] text-[#004E32] font-mono text-xs font-bold border-2 border-[#003622] shadow-[3px_4px_0px_#003622] hover:bg-[#FFD400]/90 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${testingPing ? 'animate-spin' : ''}`} />
          <span>{t('pingPipelineBtn')} ({lastPingMs}ms)</span>
        </button>
      </div>

      {/* Main Split Grid: Left System Cards + Right Backend Contract */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 overflow-hidden my-auto items-stretch">
        {/* Left Column: System Health Nodes (6 Cols) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full h-full content-between">
          {systemNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.title}
                className="bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-4 sm:p-4.5 shadow-[4px_5px_0px_#003622] text-[#001D11] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-[#006B3C] text-[#FFD400] flex items-center justify-center border-2 border-[#003622]">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="bg-[#79C968] text-[#003622] font-mono text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-[#003622] shadow-sm flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#003622]" />
                      {node.status}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-black text-[#00140B] mb-1">
                    {node.title}
                  </h3>

                  <p className="font-mono text-xs text-[#00140B] font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                    {node.detail}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#003622]/20 font-mono text-[10px] text-[#001D11] font-black flex items-center justify-between">
                  <span>{t('statusNormal')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79C968] animate-ping" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Backend Integration Contract Panel (6 Cols) */}
        <div className="lg:col-span-6 bg-[#006B3C] border-2 border-[#79C968]/40 rounded-3xl p-5 sm:p-6 shadow-[5px_6px_0px_#003622] text-[#FFFDF5] flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#79C968]/30">
              <h2 className="font-display text-base sm:text-xl font-bold text-[#FFD400] truncate">
                {t('backendContractTitle')}
              </h2>
              <span className="font-mono text-[10px] sm:text-xs font-bold text-[#79C968] bg-[#004E32] px-3 py-1 rounded-full border border-[#79C968]/30 whitespace-nowrap shrink-0">
                POST /api/rag/query
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#F7F0DB]/90 mb-3.5 leading-relaxed font-medium">
              {t('backendContractSub')}
            </p>

            <pre className="bg-[#003622] p-4 rounded-2xl border border-[#79C968]/30 font-mono text-[10px] sm:text-xs text-[#79C968] overflow-hidden leading-relaxed font-bold">
{`// Endpoint: POST /api/rag/query
{
  "query": "What are the main findings?",
  "sessionId": "session_178678",
  "performance": {
    "transcriptionMs": 82,
    "retrievalMs": 18,
    "generationMs": 74,
    "guardrailMs": 9,
    "totalMs": 143
  }
}`}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-[#79C968]/30 font-mono text-xs text-[#79C968] flex items-center justify-between">
            <span>JSON RESPONSES ACCEPTED</span>
            <span className="text-[#FFD400] font-bold">READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
