import React, { memo } from 'react';
import { Zap } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  demoMode: boolean;
  onToggleDemo: () => void;
  onNavigateSystem: () => void;
}

export const Header: React.FC<HeaderProps> = memo(({ demoMode, onToggleDemo, onNavigateSystem }) => {
  const { t } = useLanguage();

  return (
    <header className="w-full py-4 px-4 lg:px-8 flex items-center justify-between border-b border-[#006B3C]/40 bg-[#004E32]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Left Branding - Slightly Larger Fonts */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2.5">
            <span className="font-display text-2xl sm:text-3xl font-black text-[#FFD400] tracking-tight leading-none">
              HH GOA<span className="text-[#FF0B78]">&apos;26</span>
            </span>
            <span className="bg-[#FF0B78] text-[#FFFDF5] text-xs font-black px-2 py-0.5 rounded uppercase tracking-widest shadow-sm">
              {t('taskBadge')}
            </span>
          </div>
          <span className="font-mono text-xs tracking-widest text-[#79C968] font-bold uppercase mt-1">
            2:47<span className="text-[#FFD400]">PM</span> STUDIO
          </span>
        </div>
      </div>

      {/* Center Editorial Pill - Larger Text */}
      <div className="hidden md:flex items-center space-x-2.5 px-5 py-2 rounded-full bg-[#006B3C] border border-[#79C968]/30 shadow-inner">
        <span className="text-sm tracking-widest font-mono text-[#F7F0DB] font-bold flex items-center gap-2">
          <span className="text-[#FFD400]">VOICE</span>
          <span className="text-[#FF0B78]">✦</span>
          <span className="text-[#79C968]">RAG</span>
          <span className="text-[#FF0B78]">✦</span>
          <span className="text-[#F7F0DB]">GOA</span>
          <span className="text-[#FF0B78]">✦</span>
          <span className="text-[#FFD400]">INNOVATE</span>
        </span>
      </div>

      {/* Right Metrics & Controls - Larger Text */}
      <div className="flex items-center space-x-2.5 sm:space-x-3.5">
        {/* Language Selector Dropdown */}
        <LanguageSelector />

        {/* Latency Tag */}
        <div 
          onClick={onNavigateSystem}
          className="hidden sm:flex items-center space-x-2 bg-[#006B3C] border border-[#79C968]/50 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-[#F7F0DB] cursor-pointer hover:border-[#FFD400] transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#79C968] animate-pulse"></span>
          <span>{t('allSystemsNormal')}</span>
          <span className="text-[#FFD400] font-black bg-[#004E32] px-2 py-0.5 rounded border border-[#79C968]/30 text-xs">
            &lt;200ms
          </span>
        </div>

        {/* Demo Mode Toggle Button */}
        <button
          onClick={onToggleDemo}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 border ${
            demoMode 
              ? 'bg-[#FFD400] text-[#004E32] border-[#003622] shadow-[2px_2px_0px_#003622]' 
              : 'bg-[#006B3C] text-[#F7F0DB] border-[#79C968]/40 hover:bg-[#004E32]'
          }`}
          title="Toggle deterministic Demo Mode for hackathon judging"
        >
          <Zap className={`w-4 h-4 ${demoMode ? 'fill-[#004E32]' : 'text-[#FFD400]'}`} />
          <span>{demoMode ? t('demoFast') : t('demoMode')}</span>
        </button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
