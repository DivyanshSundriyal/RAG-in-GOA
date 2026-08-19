import React, { useState, memo } from 'react';
import { ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';
import { DEMO_GUARDRAIL_CHIPS } from '../../data/mockQueries';
import { useLanguage } from '../../context/LanguageContext';

interface TypedInputProps {
  onSubmitQuery: (query: string) => void;
  isBusy: boolean;
}

export const TypedInput: React.FC<TypedInputProps> = memo(({ onSubmitQuery, isBusy }) => {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isBusy) return;
    onSubmitQuery(inputText.trim());
    setInputText('');
  };

  const handleChipClick = (queryText: string) => {
    if (isBusy) return;
    onSubmitQuery(queryText);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-1 mt-0 mb-1 transition-all duration-300">
      {/* OR Separator */}
      <div className="flex items-center space-x-3 w-full justify-center text-[#F7F0DB] font-mono text-[10px] tracking-widest font-bold drop-shadow-sm my-0.5">
        <div className="h-[1px] bg-[#79C968]/60 flex-1 max-w-[50px]" />
        <span>{t('orSeparator')}</span>
        <div className="h-[1px] bg-[#79C968]/60 flex-1 max-w-[50px]" />
      </div>

      {/* Typed Input Container Pill */}
      <form 
        onSubmit={handleSubmit}
        className="w-full flex items-center bg-[#F7F0DB] border-2 border-[#003622] rounded-full p-1 shadow-[3px_4px_0px_#003622] focus-within:ring-2 focus-within:ring-[#FFD400] transition-all"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isBusy ? 'Detecting language & translating…' : t('typePlaceholder')}
          disabled={isBusy}
          className="flex-1 px-4 py-1.5 bg-transparent text-[#004E32] font-sans font-bold text-sm sm:text-base placeholder-[#004E32]/60 focus:outline-none min-h-[40px]"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isBusy}
          aria-label="Submit query"
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 border-[#003622] transition-all cursor-pointer touch-manipulation active:scale-95 shrink-0 ${
            inputText.trim() && !isBusy
              ? 'bg-[#006B3C] text-[#FFD400] shadow-[2px_2px_0px_#003622] hover:bg-[#004E32]'
              : 'bg-[#F7F0DB] text-[#004E32]/30 border-transparent cursor-not-allowed'
          }`}
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>

      {/* Suggestion Chips Section - Clear Vertical Spacing & High Visibility */}
      <div className="w-full flex flex-col items-center space-y-1 pt-0.5 px-1 sm:px-0">
        <div className="flex items-center justify-between w-full px-2">
          <span className="font-mono text-[10px] font-black tracking-widest text-[#FFD400] uppercase flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD400]" />
            {t('tryThese')}
          </span>

          <span className="font-mono text-[10px] font-black text-[#FFFDF5] bg-[#FF0B78] border border-[#003622] px-2 py-0.5 rounded-lg shadow-[1px_2px_0px_#003622] flex items-center gap-1 min-h-[26px]">
            <ShieldAlert className="w-3 h-3 text-[#FFFDF5]" />
            {t('testGuardrails')}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
          {DEMO_GUARDRAIL_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleChipClick(chip.query)}
              disabled={isBusy}
              className="px-3 py-1 rounded-xl bg-[#FF0B78] text-[#FFFDF5] border-2 border-[#003622] font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all shadow-[2px_3px_0px_#003622] hover:bg-[#FF0B78]/90 active:scale-95 cursor-pointer touch-manipulation min-h-[34px]"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

TypedInput.displayName = 'TypedInput';
