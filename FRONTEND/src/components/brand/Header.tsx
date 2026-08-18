import React, { memo } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  demoMode: boolean;
  onToggleDemo: () => void;
  onNavigateSystem: () => void;
}

export const Header: React.FC<HeaderProps> = memo(({ onNavigateSystem }) => {
  const { t } = useLanguage();

  return (
    <header className="w-full py-2.5 px-3 sm:px-6 lg:px-8 flex items-center justify-between border-b-2 border-[#006B3C] bg-[#004E32] relative z-50 shrink-0 gap-2 select-none shadow-md">
      {/* Left Branding - Clean Non-Overlapping Alignment */}
      <div className="flex flex-col shrink-0">
        <div className="flex items-center space-x-2 shrink-0">
          <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-[#FFD400] tracking-tight leading-none shrink-0">
            HH GOA<span className="text-[#FF0B78]">&apos;26</span>
          </span>
          <span className="hidden sm:inline-block bg-[#FF0B78] text-[#FFFDF5] text-[10px] sm:text-xs font-black px-2 py-0.5 rounded border border-[#003622] uppercase tracking-widest shadow-sm shrink-0 whitespace-nowrap">
            {t('taskBadge')}
          </span>
        </div>
        <span className="hidden sm:block font-mono text-[10px] sm:text-xs tracking-widest text-[#79C968] font-bold uppercase mt-0.5 shrink-0">
          2:47<span className="text-[#FFD400]">PM</span> STUDIO
        </span>
      </div>

      {/* Center Editorial Pill - Desktop / Tablet view */}
      <div className="hidden lg:flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#006B3C] border border-[#79C968]/30 shadow-inner shrink-0">
        <span className="text-xs lg:text-sm tracking-widest font-mono text-[#F7F0DB] font-bold flex items-center gap-2">
          <span className="text-[#FFD400]">VOICE</span>
          <span className="text-[#FF0B78]">✦</span>
          <span className="text-[#79C968]">RAG</span>
          <span className="text-[#FF0B78]">✦</span>
          <span className="text-[#F7F0DB]">GOA</span>
          <span className="text-[#FF0B78]">✦</span>
          <span className="text-[#FFD400]">INNOVATE</span>
        </span>
      </div>

      {/* Right Metrics & Controls - Clean Spacing */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        {/* Language Selector Dropdown */}
        <LanguageSelector />

        {/* Latency Tag */}
        <div 
          onClick={onNavigateSystem}
          className="hidden md:flex items-center space-x-2 bg-[#006B3C] border border-[#79C968]/50 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-[#F7F0DB] cursor-pointer hover:border-[#FFD400] transition-colors shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#79C968] animate-pulse shrink-0"></span>
          <span className="hidden xl:inline">{t('allSystemsNormal')}</span>
          <span className="text-[#FFD400] font-black bg-[#004E32] px-2 py-0.5 rounded border border-[#79C968]/30 text-xs shrink-0">
            &lt;200ms
          </span>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
