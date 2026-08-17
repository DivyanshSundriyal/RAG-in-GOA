import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Database, Layers } from 'lucide-react';
import type { RetrievalResult } from '../../types/rag';
import { useLanguage } from '../../context/LanguageContext';
import type { SupportedLanguage } from '../../data/translations';

interface RetrievedEvidenceProps {
  retrieval: RetrievalResult;
}

export const RetrievedEvidence: React.FC<RetrievedEvidenceProps> = memo(({ retrieval }) => {
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(retrieval.results[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getLocalizedSnippet = (snippet: string, lang: SupportedLanguage): string => {
    if (snippet.includes('Vector search chunk matching user query:') || snippet.includes('Semantic relevance verified')) {
      const match = snippet.match(/"([^"]+)"/);
      const queryPart = match ? match[1] : '';

      if (lang === 'pa') {
        return `ਵੈਕਟਰ ਖੋਜ ਟੁਕੜਾ ਯੂਜ਼ਰ ਸਵਾਲ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ: "${queryPart}"। ਸਥਾਨਕ ਇੰਡੈਕਸ ਨਾਲ ਅਰਥ ਸ਼ੁੱਧਤਾ ਦੀ ਪੁਸ਼ਟੀ ਕੀਤੀ ਗਈ।`;
      }
      if (lang === 'hi') {
        return `वेक्टर खोज टुकड़ा उपयोगकर्ता प्रश्न से मेल खाता है: "${queryPart}"। स्थानीय सूचकांक के साथ अर्थ प्रासंगिकता की पुष्टि की गई।`;
      }
      if (lang === 'mr' || lang === 'gom') {
        return `व्हॅक्टर शोध तुकडा वापरकर्ता प्रश्नाशी जुळतो: "${queryPart}". स्थानिक निर्देशांकाविरुद्ध अर्थपूर्ण सुसंगतता सत्यापित केली.`;
      }
      if (lang === 'kn') {
        return `ವೆಕ್ಟರ್ ಹುಡುಕಾಟ ತುಣುಕು ಬಳಕೆದಾರರ ಪ್ರಶ್ನೆಗೆ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತದೆ: "${queryPart}". ಸ್ಥಳೀಯ ಸೂಚ್ಯಂಕದ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.`;
      }
    }
    return snippet;
  };

  const getLocalizedTitle = (title: string, lang: SupportedLanguage): string => {
    if (title.includes('Dynamic Retrieval Unit')) {
      if (lang === 'pa') return 'HH GOA 2026 ਡਾਇਨਾਮਿਕ ਰੀਟ੍ਰੀਵਲ ਯੂਨਿਟ';
      if (lang === 'hi') return 'HH GOA 2026 डायनामिक रिट्रीवल यूनिट';
      if (lang === 'mr' || lang === 'gom') return 'HH GOA 2026 डायनामिक रीट्रिव्हल युनिट';
      if (lang === 'kn') return 'HH GOA 2026 ಡೈನಾಮಿಕ್ ಹಿಂಪಡೆಯುವಿಕೆ ಘಟಕ';
    }
    if (title.includes('Benchmark') || title.includes('Sub-200ms')) {
      if (lang === 'pa') return 'ਸਬ-200ms ਵੌਇਸ RAG ਸਿਸਟਮ ਬੈਂਚਮਾਰਕ';
      if (lang === 'hi') return 'सब-200ms वॉइस RAG सिस्टम बेंचमार्क';
      if (lang === 'mr' || lang === 'gom') return 'सब-200ms व्हॉइस RAG सिस्टम बेंचमार्क';
      if (lang === 'kn') return 'ಸಬ್-200ms ವಾಯ್ಸ್ RAG ಸಿಸ್ಟಮ್ ಬೆಂಚ್‌ಮಾರ್ಕ್';
    }
    return title;
  };

  return (
    <div className="w-full bg-[#006B3C] border-2 border-[#79C968]/40 rounded-3xl p-4 sm:p-6 shadow-[6px_8px_0px_#003622] text-[#FFFDF5] my-4 sm:my-6 gpu-layer overflow-hidden">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#79C968]/30">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-[#FFD400] shrink-0" />
          <h3 className="font-display text-base sm:text-xl font-bold tracking-tight text-[#FFD400]">
            {t('retrievedEvidenceTitle')}
          </h3>
          <span className="bg-[#FF0B78] text-[#FFFDF5] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
            {retrieval.chunksRetrieved} {t('chunksCount')}
          </span>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-[#79C968]">
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span className="uppercase font-bold">{t('strategyTag')} {retrieval.strategy}</span>
        </div>
      </div>

      {/* Source Cards List */}
      <div className="space-y-3">
        {retrieval.results.map((doc, idx) => {
          const isExpanded = expandedId === doc.id;
          const scorePercent = Math.round(doc.score * 100);
          const displayTitle = getLocalizedTitle(doc.title, language);
          const displaySnippet = getLocalizedSnippet(doc.snippet, language);

          return (
            <div
              key={doc.id}
              className="bg-[#004E32] border border-[#79C968]/30 rounded-2xl overflow-hidden transition-all hover:border-[#FFD400]"
            >
              {/* Row Header - Flexible layout to prevent right-edge clipping */}
              <button
                onClick={() => toggleExpand(doc.id)}
                className="w-full p-3 sm:p-4 flex items-center justify-between gap-2 text-left font-sans cursor-pointer hover:bg-[#006B3C]/50 transition-colors"
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0 flex-1">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#FFD400] text-[#004E32] font-mono text-xs font-black flex items-center justify-center border border-[#003622] shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-mono text-xs sm:text-sm font-bold text-[#F7F0DB] truncate">
                      {displayTitle}
                    </h4>
                    {doc.documentType && (
                      <span className="font-mono text-[10px] text-[#79C968] block truncate">
                        {doc.documentType} • {doc.vectorId || 'vec_idx'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {/* Score Pill */}
                  <span className="bg-[#79C968]/20 border border-[#79C968] text-[#79C968] font-mono text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {scorePercent}% {t('matchScore')}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#FFD400] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#F7F0DB]/60 shrink-0" />
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
                    className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-[#79C968]/20 bg-[#003622]/60"
                  >
                    <div className="p-3 bg-[#F7F0DB] text-[#004E32] rounded-xl font-sans text-xs sm:text-sm font-medium mt-3 border border-[#003622] leading-relaxed relative">
                      <span className="font-mono text-[9px] font-extrabold text-[#FF0B78] uppercase block mb-1">
                        {t('vectorSnippet')}
                      </span>
                      “{displaySnippet}”
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
