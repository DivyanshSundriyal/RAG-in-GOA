import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { PipelineState } from '../../types/rag';

interface WaveformBarsProps {
  pipelineState: PipelineState;
  volume: number;
}

export const WaveformBars: React.FC<WaveformBarsProps> = memo(({ pipelineState, volume }) => {
  const barCount = 24;

  const getBarHeight = (index: number) => {
    if (pipelineState === 'LISTENING') {
      const centerFactor = 1 - Math.abs(index - barCount / 2) / (barCount / 2);
      const dynamicVol = Math.max(0.15, volume * 1.5);
      return Math.min(100, Math.max(15, centerFactor * dynamicVol * 90 + Math.random() * 20));
    }

    if (pipelineState === 'TRANSCRIBING' || pipelineState === 'RETRIEVING' || pipelineState === 'GENERATING') {
      return Math.sin(index * 0.4 + Date.now() * 0.005) * 35 + 45;
    }

    if (pipelineState === 'SUCCESS') {
      return 25 + Math.sin(index * 0.5) * 10;
    }

    return 12 + Math.sin(index * 0.3) * 6;
  };

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 h-12 my-2 max-w-md mx-auto gpu-layer">
      {Array.from({ length: barCount }).map((_, i) => {
        const height = getBarHeight(i);
        const isCenter = Math.abs(i - barCount / 2) < 4;
        
        return (
          <motion.div
            key={i}
            className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
              pipelineState === 'LISTENING'
                ? 'bg-[#FF0B78]'
                : pipelineState === 'RETRIEVING' || pipelineState === 'GENERATING'
                ? 'bg-[#FFD400]'
                : pipelineState === 'SUCCESS'
                ? 'bg-[#79C968]'
                : isCenter
                ? 'bg-[#79C968]/70'
                : 'bg-[#79C968]/30'
            }`}
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
});

WaveformBars.displayName = 'WaveformBars';
