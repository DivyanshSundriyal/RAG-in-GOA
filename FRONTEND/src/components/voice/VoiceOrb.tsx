import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Search, Sparkles, Check, AlertCircle, RefreshCw } from 'lucide-react';
import type { PipelineState } from '../../types/rag';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceOrbProps {
  pipelineState: PipelineState;
  isListening: boolean;
  onToggleListen: () => void;
  micDenied?: boolean;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = memo(({
  pipelineState,
  isListening,
  onToggleListen,
  micDenied
}) => {
  const { t } = useLanguage();

  const getOrbStateDetails = () => {
    if (micDenied) {
      return { label: t('orbMicDenied'), color: 'bg-[#FF0B78]', icon: MicOff };
    }

    switch (pipelineState) {
      case 'LISTENING':
        return { label: t('orbListening'), color: 'bg-[#FF0B78]', icon: Mic };
      case 'TRANSCRIBING':
        return { label: t('orbTranscribing'), color: 'bg-[#FFD400]', icon: RefreshCw, spin: true };
      case 'RETRIEVING':
        return { label: t('orbFinding'), color: 'bg-[#FFD400]', icon: Search, pulse: true };
      case 'GENERATING':
        return { label: t('orbAnswering'), color: 'bg-[#79C968]', icon: Sparkles, pulse: true };
      case 'SUCCESS':
        return { label: t('orbFound'), color: 'bg-[#79C968]', icon: Check };
      case 'REJECTED':
        return { label: t('orbBlocked'), color: 'bg-[#FF0B78]', icon: AlertCircle };
      case 'ERROR':
        return { label: t('orbError'), color: 'bg-[#FF0B78]', icon: RefreshCw };
      case 'IDLE':
      default:
        return { label: t('orbIdle'), color: 'bg-[#FFD400]', icon: Mic };
    }
  };

  const stateDetails = getOrbStateDetails();
  const IconComponent = stateDetails.icon;

  const isBusy = pipelineState === 'TRANSCRIBING' || pipelineState === 'RETRIEVING' || pipelineState === 'GENERATING';

  return (
    <div className="flex flex-col items-center justify-center my-1 sm:my-2 relative select-none transform-gpu">
      {/* Outer Rotating Dotted Pink Ring */}
      <div className="relative flex items-center justify-center p-2 sm:p-4">
        <div 
          className={`absolute inset-0 rounded-full border-4 border-dashed border-[#FF0B78] ${
            isListening ? 'animate-spin-slow scale-110 border-[#FF0B78]' : 'scale-100 opacity-60 border-[#FF0B78]/40'
          } transition-all duration-700 pointer-events-none transform-gpu`}
        />

        {/* Outer Cream Sticker Ring Container - ENLARGED MIC CIRCLE */}
        <motion.button
          whileHover={{ scale: isBusy ? 1 : 1.04 }}
          whileTap={{ scale: isBusy ? 1 : 0.95 }}
          onClick={onToggleListen}
          disabled={isBusy}
          aria-label={stateDetails.label}
          className={`w-38 h-38 sm:w-56 sm:h-56 rounded-full bg-[#F7F0DB] border-4 border-[#003622] p-3 sm:p-3.5 flex items-center justify-center relative shadow-[5px_7px_0px_#003622] sm:shadow-[6px_8px_0px_#003622] transition-all touch-manipulation cursor-pointer ${
            isListening ? 'shadow-[8px_12px_28px_rgba(255,11,120,0.4)]' : ''
          }`}
        >
          {/* Inner Deep Green Circle */}
          <div className="w-full h-full rounded-full bg-[#006B3C] border-2 border-[#004E32] flex items-center justify-center relative overflow-hidden group">
            {/* Ambient Pulse Glow */}
            {isListening && (
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-[#FF0B78]/30 rounded-full"
              />
            )}

            {/* Central Icon - Enlarged */}
            <motion.div
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className="z-10 flex flex-col items-center justify-center text-[#F7F0DB]"
            >
              <IconComponent 
                className={`w-12 h-12 sm:w-20 sm:h-20 ${stateDetails.spin ? 'animate-spin text-[#FFD400]' : 'text-[#F7F0DB]'}`} 
              />
            </motion.div>

            {/* Orbiting Yellow Star Detail */}
            <div className="absolute top-3 right-4 text-[#FFD400] text-sm animate-pulse">
              ✦
            </div>
            <div className="absolute bottom-4 left-4 text-[#FF0B78] text-xs">
              ★
            </div>
          </div>
        </motion.button>
      </div>

      {/* Button Label Sticker Pill */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleListen}
        disabled={isBusy}
        className={`-mt-4 z-20 px-4 sm:px-5 py-1.5 rounded-full border-2 border-[#003622] font-mono text-[11px] sm:text-xs font-black tracking-widest text-[#003622] shadow-[2px_3px_0px_#003622] flex items-center gap-2 uppercase ${stateDetails.color} transition-colors cursor-pointer touch-manipulation min-h-[36px]`}
      >
        <span className="w-2 h-2 rounded-full bg-[#003622] animate-ping" />
        <span>{stateDetails.label}</span>
      </motion.button>
    </div>
  );
});

VoiceOrb.displayName = 'VoiceOrb';
