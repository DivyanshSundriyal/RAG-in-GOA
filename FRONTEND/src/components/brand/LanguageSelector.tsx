import React, { useState, useRef, useEffect, memo } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../data/translations';

export const LanguageSelector: React.FC = memo(() => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Navbar Language Selector Badge Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-1 rounded-full bg-[#F7F0DB] text-[#004E32] border-2 border-[#003622] font-mono text-xs font-bold tracking-wider shadow-[2px_2px_0px_#003622] hover:bg-[#FFD400] transition-all flex items-center gap-1.5 cursor-pointer select-none"
        aria-label="Select UI Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#006B3C]" />
        <span>{activeLang.flag}</span>
        <span className="uppercase">{activeLang.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#F7F0DB] border-3 border-[#003622] shadow-[4px_6px_0px_#003622] py-2 z-50 text-[#004E32] font-sans">
          <div className="px-3 py-1 font-mono text-[10px] font-extrabold text-[#006B3C] uppercase border-b border-[#003622]/15 mb-1">
            SELECT UI LANGUAGE
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected 
                    ? 'bg-[#FFD400] text-[#004E32]' 
                    : 'hover:bg-[#006B3C]/10 text-[#004E32]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                  <span className="font-mono text-[10px] text-[#004E32]/60 uppercase">({lang.code})</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#006B3C]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';
