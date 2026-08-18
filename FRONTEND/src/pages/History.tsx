import React, { useState } from 'react';
import { History as HistoryIcon, Search, ShieldCheck, ShieldAlert, Clock, ArrowUpRight } from 'lucide-react';
import type { RagQueryResponse } from '../types/rag';
import { getLocalizedMockResponses } from '../data/mockQueries';
import { useLanguage } from '../context/LanguageContext';

interface HistoryPageProps {
  historyList: RagQueryResponse[];
  onSelectQuery: (resp: RagQueryResponse) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ historyList, onSelectQuery }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'grounded' | 'rejected'>('all');

  const localizedMocks = getLocalizedMockResponses(t);
  const defaultHistory = Object.values(localizedMocks);

  const combinedHistory = historyList.length > 0 ? historyList : defaultHistory;

  const filteredItems = combinedHistory.filter((item) => {
    const matchesSearch = item.query.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'grounded') return matchesSearch && item.guardrail.status === 'allowed';
    if (filterStatus === 'rejected') return matchesSearch && item.guardrail.status !== 'allowed';
    return matchesSearch;
  });

  return (
    <div className="w-full max-w-full px-2 sm:px-4 lg:px-5 py-6 sm:py-8 relative z-10 pb-24 lg:pb-8">
      {/* Header Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-[#006B3C]">
        <div>
          <div className="flex items-center space-x-2">
            <HistoryIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD400]" />
            <h1 className="font-display text-2xl sm:text-5xl font-black text-[#FFD400]">
              {t('historyTitle')}
            </h1>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#FFFDF5] font-extrabold mt-1 drop-shadow">
            {t('historySub')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 bg-[#006B3C] p-1.5 rounded-2xl border border-[#79C968]/40 overflow-x-auto max-w-full">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all min-h-[36px] cursor-pointer touch-manipulation active:scale-95 shrink-0 ${
              filterStatus === 'all' ? 'bg-[#FFD400] text-[#004E32]' : 'text-[#F7F0DB] hover:text-[#FFD400]'
            }`}
          >
            {t('filterAll')} ({combinedHistory.length})
          </button>
          <button
            onClick={() => setFilterStatus('grounded')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all min-h-[36px] cursor-pointer touch-manipulation active:scale-95 shrink-0 ${
              filterStatus === 'grounded' ? 'bg-[#79C968] text-[#004E32]' : 'text-[#F7F0DB] hover:text-[#79C968]'
            }`}
          >
            {t('filterGrounded')}
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all min-h-[36px] cursor-pointer touch-manipulation active:scale-95 shrink-0 ${
              filterStatus === 'rejected' ? 'bg-[#FF0B78] text-[#FFFDF5]' : 'text-[#F7F0DB] hover:text-[#FF0B78]'
            }`}
          >
            {t('filterGuardrails')}
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="w-full mb-6">
        <div className="relative bg-[#F7F0DB] rounded-2xl border-2 border-[#003622] p-1 shadow-[4px_4px_0px_#003622]">
          <Search className="w-5 h-5 text-[#004E32]/50 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-12 pr-4 py-2.5 bg-transparent font-sans font-bold text-sm sm:text-base text-[#004E32] placeholder-[#004E32]/50 focus:outline-none min-h-[44px]"
          />
        </div>
      </div>

      {/* Query List Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isAllowed = item.guardrail.status === 'allowed';
          return (
            <div
              key={item.id}
              onClick={() => onSelectQuery(item)}
              className="bg-[#F7F0DB] border-3 border-[#003622] rounded-2xl p-4 sm:p-5 shadow-[4px_6px_0px_#003622] text-[#004E32] hover:translate-y-[-3px] active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between group touch-manipulation"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold text-[#006B3C] uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </span>

                  <div className="flex items-center space-x-2">
                    <span className="bg-[#006B3C] text-[#FFD400] font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.performance.totalMs}ms
                    </span>
                    {isAllowed ? (
                      <span className="bg-[#79C968]/30 text-[#006B3C] font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {t('filterGrounded')}
                      </span>
                    ) : (
                      <span className="bg-[#FF0B78]/20 text-[#FF0B78] font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        {t('filterGuardrails')}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-[#004E32] group-hover:text-[#FF0B78] transition-colors mb-2">
                  “{item.query}”
                </h3>

                <p className="font-sans text-xs text-[#004E32]/80 line-clamp-2 mb-4">
                  {item.answer.text}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#003622]/10 font-mono text-xs text-[#006B3C] font-bold">
                <span>{item.retrieval.chunksRetrieved} {t('chunksCount')}</span>
                <span className="flex items-center gap-1 text-[#FF0B78] group-hover:translate-x-1 transition-transform">
                  {t('viewAnswerBtn')} <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
