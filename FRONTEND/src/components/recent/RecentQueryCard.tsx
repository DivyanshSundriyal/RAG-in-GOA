import React, { memo } from 'react';
import { History, ShieldCheck } from 'lucide-react';
import type { RagQueryResponse } from '../../types/rag';
import { useLanguage } from '../../context/LanguageContext';

interface RecentQueryCardProps {
  response: RagQueryResponse;
  onRestore: (resp: RagQueryResponse) => void;
}

export const RecentQueryCard: React.FC<RecentQueryCardProps> = memo(({ response, onRestore }) => {
  const { t } = useLanguage();

  return (
    <div 
      onClick={() => onRestore(response)}
      className="w-full bg-[#F7F0DB] border-2 border-[#003622] rounded-2xl p-4 shadow-[4px_4px_0px_#003622] text-[#001D11] hover:translate-y-[-2px] transition-all cursor-pointer group gpu-layer"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5 font-mono text-[10px] font-black text-[#003622] uppercase">
          <History className="w-3.5 h-3.5 text-[#FF0B78]" />
          <span>{t('recentQueryTitle')}</span>
        </div>

        <span className="bg-[#003622] text-[#FFD400] font-mono text-[10px] font-black px-2 py-0.5 rounded-full">
          {response.performance.totalMs}ms
        </span>
      </div>

      <p className="font-sans text-xs sm:text-sm font-black line-clamp-2 text-[#00140B] group-hover:text-[#FF0B78] transition-colors mb-2 leading-snug">
        “{response.query}”
      </p>

      <div className="flex items-center justify-between font-mono text-[10px] text-[#001D11] pt-2 border-t border-[#003622]/20 font-black">
        <span className="flex items-center gap-1 font-black text-[#003622]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#79C968]" />
          {t('groundedBadge')}
        </span>
        <span className="text-[#001D11] font-extrabold">{response.timestamp}</span>
      </div>
    </div>
  );
});

RecentQueryCard.displayName = 'RecentQueryCard';
