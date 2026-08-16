import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, HelpCircle, RefreshCw, Lock, Radio } from 'lucide-react';
import type { GuardrailStatus } from '../../types/rag';

interface GuardrailBannerProps {
  guardrail: {
    status: GuardrailStatus;
    reason?: string;
    suggestedAction?: string;
  };
  query?: string;
  onRetry: () => void;
}

export const GuardrailBanner: React.FC<GuardrailBannerProps> = memo(({ guardrail, query, onRetry }) => {
  const getGuardrailConfig = () => {
    switch (guardrail.status) {
      case 'off_topic':
        return {
          title: 'OUTSIDE SCOPE',
          subtitle: 'This question is outside available domain knowledge base.',
          icon: HelpCircle,
          badgeColor: 'bg-[#FFD400] text-[#004E32]',
          defaultAction: 'Try asking about RAG performance benchmarks or STT specifications.'
        };
      case 'unsafe':
        return {
          title: 'REQUEST BLOCKED',
          subtitle: 'This safety policy prevented execution for this request.',
          icon: Lock,
          badgeColor: 'bg-[#FF0B78] text-[#FFFDF5]',
          defaultAction: 'Avoid asking for passwords, private credentials, or unsafe topics.'
        };
      case 'no_context':
        return {
          title: 'NOT ENOUGH CONTEXT',
          subtitle: 'We couldn’t find reliable evidence in the vector index.',
          icon: AlertTriangle,
          badgeColor: 'bg-[#FFD400] text-[#004E32]',
          defaultAction: 'Rephrase your query to use keywords present in the document corpus.'
        };
      case 'low_confidence':
        return {
          title: 'LOW GROUNDING CONFIDENCE',
          subtitle: 'Retrieved evidence fell below factuality verification threshold.',
          icon: ShieldAlert,
          badgeColor: 'bg-[#FF0B78] text-[#FFFDF5]',
          defaultAction: 'Be more specific about document titles or technical metrics.'
        };
      case 'backend_failure':
      default:
        return {
          title: 'SYSTEM OFFLINE / SEARCH FAILED',
          subtitle: 'Unable to reach vector retrieval or transcription engine.',
          icon: Radio,
          badgeColor: 'bg-[#FF0B78] text-[#FFFDF5]',
          defaultAction: 'Check your internet connection or click Try Again.'
        };
    }
  };

  const config = getGuardrailConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-[#F7F0DB] border-4 border-[#003622] rounded-3xl p-6 sm:p-8 shadow-[8px_12px_0px_#003622] text-[#004E32] my-6 gpu-layer"
    >
      <div className="flex items-center space-x-3 mb-4">
        <span className={`px-3 py-1 rounded-full font-mono text-xs font-black uppercase tracking-wider border-2 border-[#003622] shadow-[2px_2px_0px_#003622] ${config.badgeColor} flex items-center gap-1.5`}>
          <Icon className="w-4 h-4" />
          {config.title}
        </span>
      </div>

      {query && (
        <div className="mb-4 font-sans text-sm font-semibold text-[#004E32]/80 italic">
          Query: “{query}”
        </div>
      )}

      <p className="font-sans text-base sm:text-lg font-bold text-[#004E32] mb-3">
        {guardrail.reason || config.subtitle}
      </p>

      <div className="bg-[#FFFDF5] p-4 rounded-2xl border-2 border-[#003622] font-mono text-xs text-[#006B3C] mb-6">
        <span className="font-bold uppercase text-[#FF0B78] block mb-1">RECOMMENDED RECOVERY:</span>
        {guardrail.suggestedAction || config.defaultAction}
      </div>

      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-[#006B3C] hover:bg-[#004E32] text-[#FFD400] font-mono text-xs font-bold tracking-wider border-2 border-[#003622] shadow-[3px_4px_0px_#003622] transition-all flex items-center gap-2 cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>TRY ANOTHER QUESTION</span>
      </button>
    </motion.div>
  );
});

GuardrailBanner.displayName = 'GuardrailBanner';
