import React, { memo } from 'react';
import { Mic, History, BarChart3, Cpu, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type NavTab = 'ask' | 'history' | 'analytics' | 'system';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = memo(({ activeTab, onSelectTab }) => {
  const { t } = useLanguage();

  const navItems: { id: NavTab; labelKey: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'ask', labelKey: 'navAsk', icon: Mic },
    { id: 'history', labelKey: 'navHistory', icon: History },
    { id: 'analytics', labelKey: 'navAnalytics', icon: BarChart3 },
    { id: 'system', labelKey: 'navSystem', icon: Cpu },
  ];

  return (
    <>
      {/* Desktop Editorial Side Rail */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#006B3C]/50 bg-[#004E32]/95 h-[calc(100vh-65px)] p-6 justify-between relative z-30 shrink-0">
        <div className="flex flex-col space-y-6">
          {/* Navigation Title */}
          <div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#79C968]/80 block mb-3">
              {t('exploreWorkspace')}
            </span>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const label = t(item.labelKey);
                const isSystemTab = item.id === 'system';

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`flex items-center space-x-2.5 px-3.5 py-3 rounded-xl font-mono text-sm font-bold tracking-wider transition-all text-left ${
                      isActive
                        ? 'bg-[#FFD400] text-[#004E32] shadow-[3px_4px_0px_#003622] border-2 border-[#003622] translate-x-1'
                        : 'text-[#F7F0DB] hover:bg-[#006B3C]/60 hover:text-[#FFD400]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#004E32]' : 'text-[#79C968]'}`} />
                    <span>{label}</span>
                    
                    {/* Blood Red Bold "FOR JUDGES" Tag ONLY on System Section */}
                    {isSystemTab ? (
                      <div className="ml-auto flex items-center space-x-1 shrink-0">
                        <span className="font-mono text-[9px] font-black text-[#8B0000] bg-[#FFFDF5] px-1.5 py-0.5 rounded border border-[#8B0000]/60 tracking-tighter uppercase shadow-sm">
                          FOR JUDGES
                        </span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-[#FF0B78] shrink-0"></span>}
                      </div>
                    ) : isActive ? (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#FF0B78] shrink-0"></span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tropical Badge Banner - Bold White Subtitle */}
          <div className="p-4 rounded-2xl bg-[#006B3C] border-2 border-[#79C968]/40 shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-[#FFD400]/20 group-hover:text-[#FFD400]/40 transition-colors">
              <Sparkles className="w-8 h-8" />
            </div>
            <span className="font-display text-lg text-[#FFD400] font-bold block mb-1">
              {t('goaVibesTitle')}
            </span>
            <p className="font-sans text-xs text-[#FFFDF5] font-extrabold leading-relaxed drop-shadow-sm">
              {t('goaVibesDesc')}
            </p>
          </div>
        </div>

        {/* Embedded Editorial Footer Panel inside Sidebar */}
        <div className="border-t-2 border-[#006B3C] pt-4 font-mono text-xs flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#FFD400] text-[11px] tracking-wider uppercase">
              GOA, INDIA
            </span>
            <span className="text-[#79C968] text-[10px] font-semibold">
              28 – 31 OCT 2026
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#006B3C]/40">
            <div className="flex items-center space-x-1">
              <span className="text-[#FF0B78] font-bold text-[10px]">#RAGInGoa</span>
              <span className="text-[#F7F0DB]/40">|</span>
              <span className="text-[#F7F0DB] font-bold text-[10px]">HH GOA &apos;26</span>
            </div>

            {/* Inline SVG Social Icons for GitHub & X */}
            <div className="flex items-center space-x-2 text-[#F7F0DB]/70">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[#FFD400] transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-[#FFD400] transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#004E32] border-t-2 border-[#006B3C] py-2 px-4 flex justify-around items-center z-50 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const label = t(item.labelKey);
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-all ${
                isActive
                  ? 'text-[#FFD400] font-bold scale-105'
                  : 'text-[#F7F0DB]/70 hover:text-[#F7F0DB]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#FFD400]' : 'text-[#79C968]'}`} />
              <span className="font-mono text-[10px] tracking-wider uppercase mt-1">
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
});

Sidebar.displayName = 'Sidebar';
