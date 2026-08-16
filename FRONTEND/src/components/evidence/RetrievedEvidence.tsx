import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Database, Layers } from 'lucide-react';
import type { RetrievalResult } from '../../types/rag';
import { useLanguage } from '../../context/LanguageContext';

interface RetrievedEvidenceProps {
  retrieval: RetrievalResult;
}

export const RetrievedEvidence: React.FC<RetrievedEvidenceProps> = memo(({ retrieval }) => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(retrieval.results[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#006B3C] border-2 border-[#79C968]/40 rounded-3xl p-5 sm:p-6 shadow-[6px_8px_0px_#003622] text-[#FFFDF5] my-6 gpu-layer">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#79C968]/30">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-[#FFD400]" />
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#FFD400]">
            {t('retrievedEvidenceTitle')}
          </h3>
          <span className="bg-[#FF0B78] text-[#FFFDF5] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
            {retrieval.chunksRetrieved} {t('chunksCount')}
          </span>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-[#79C968]">
          <Layers className="w-3.5 h-3.5" />
          <span className="uppercase font-bold">{t('strategyTag')} {retrieval.strategy}</span>
        </div>
      </div>

      {/* Source Cards List */}
      <div className="space-y-3">
        {retrieval.results.map((doc, idx) => {
          const isExpanded = expandedId === doc.id;
          const scorePercent = Math.round(doc.score * 100);

          return (
            <div
              key={doc.id}
              className="bg-[#004E32] border border-[#79C968]/30 rounded-2xl overflow-hidden transition-all hover:border-[#FFD400]"
            >
              {/* Row Header */}
              <button
                onClick={() => toggleExpand(doc.id)}
                className="w-full p-4 flex items-center justify-between text-left font-sans cursor-pointer hover:bg-[#006B3C]/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-[#FFD400] text-[#004E32] font-mono text-xs font-black flex items-center justify-center border border-[#003622]">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-mono text-xs sm:text-sm font-bold text-[#F7F0DB]">
                      {doc.title}
                    </h4>
                    {doc.documentType && (
                      <span className="font-mono text-[10px] text-[#79C968] block">
                        {doc.documentType} • {doc.vectorId || 'vec_idx'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Score Pill */}
                  <span className="bg-[#79C968]/20 border border-[#79C968] text-[#79C968] font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {scorePercent}% {t('matchScore')}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#FFD400]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#F7F0DB]/60" />
                  )}
                </div>
              </button>

              {/* Expandable Snippet Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 border-t border-[#79C968]/20 bg-[#003622]/60"
                  >
                    <div className="p-3 bg-[#F7F0DB] text-[#004E32] rounded-xl font-sans text-xs sm:text-sm font-medium mt-3 border border-[#003622] leading-relaxed relative">
                      <span className="font-mono text-[9px] font-extrabold text-[#FF0B78] uppercase block mb-1">
                        {t('vectorSnippet')}
                      </span>
                      “{doc.snippet}”
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
});

RetrievedEvidence.displayName = 'RetrievedEvidence';
