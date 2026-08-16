import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Volume2, Square, ShieldCheck, Sparkles, CornerDownRight, ArrowLeft } from 'lucide-react';
import type { RagQueryResponse } from '../../types/rag';
import { sarvamService } from '../../services/rag/SarvamService';
import { useLanguage } from '../../context/LanguageContext';

interface AnswerCardProps {
  response: RagQueryResponse;
  onReset: () => void;
}

export const AnswerCard: React.FC<AnswerCardProps> = memo(({ response, onReset }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response.answer.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakToggle = async () => {
    if (isPlayingAudio) {
      sarvamService.stopSpeech();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    const ok = await sarvamService.speakText(response.answer.text);
    if (!ok) setIsPlayingAudio(false);
  };

  const groundedPercent = Math.round((response.answer.confidence || 0.93) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full bg-[#F7F0DB] border-4 border-[#003622] rounded-3xl p-6 sm:p-8 shadow-[8px_12px_0px_#003622] text-[#001D11] relative overflow-hidden my-4 gpu-layer"
    >
      {/* Editorial Decorative Background Quote */}
      <span className="absolute top-2 right-6 font-display text-8xl font-black text-[#FF0B78]/10 select-none pointer-events-none">
        “
      </span>

      {/* Header Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#003622]/20 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          {/* Prominent Back Button at Header Top */}
          <button
            onClick={onReset}
            className="px-3 py-1 rounded-xl bg-[#003622] text-[#FFD400] font-mono text-xs font-black border border-[#003622] shadow-[2px_2px_0px_#003622] hover:bg-[#004E32] transition-all flex items-center gap-1.5 cursor-pointer mr-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>

          <span className="bg-[#FF0B78] text-[#FFFDF5] font-mono text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {t('foundBadge')}
          </span>
          <span className="font-mono text-xs text-[#001D11] font-bold hidden sm:inline">
            {response.timestamp} • {response.performance.totalMs}ms
          </span>
        </div>

        {/* Grounded Confidence Badge */}
        <div className="flex items-center space-x-1.5 bg-[#79C968]/40 border-2 border-[#003622] px-3 py-1 rounded-full font-mono text-xs font-black text-[#003622] shadow-[2px_2px_0px_#003622]">
          <ShieldCheck className="w-4 h-4 text-[#003622]" />
          <span>{t('groundedBadge')}</span>
          <span className="bg-[#003622] text-[#FFD400] px-1.5 py-0.2 rounded text-[11px] font-mono font-black">
            {groundedPercent}%
          </span>
        </div>
      </div>

      {/* Question Headline */}
      <div className="mb-6">
        <span className="font-mono text-[10px] uppercase font-black tracking-widest text-[#003622] block mb-1">
          {t('userQuestion')}
        </span>
        <h2 className="font-display text-xl sm:text-2xl font-black text-[#00140B] leading-snug flex items-start gap-2">
          <CornerDownRight className="w-5 h-5 text-[#FF0B78] shrink-0 mt-1" />
          <span>“{response.query}”</span>
        </h2>
      </div>

      {/* Answer Main Body Text - High Contrast Dark Black Bold */}
      <div className="bg-[#FFFDF5] border-2 border-[#003622] rounded-2xl p-5 sm:p-6 mb-6 shadow-inner relative">
        <span className="font-mono text-[10px] uppercase font-black tracking-widest text-[#FF0B78] block mb-2">
          {t('groundedAnswerTitle')}
        </span>
        <p className="font-sans text-base sm:text-lg leading-relaxed font-bold text-[#00140B]">
          {response.answer.text}
        </p>

        {response.answer.summary && (
          <div className="mt-4 pt-3 border-t border-[#003622]/20 font-mono text-xs text-[#002818] font-bold italic">
            Summary: {response.answer.summary}
          </div>
        )}
      </div>

      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center space-x-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-[#FFD400] border-2 border-[#003622] text-[#003622] font-mono text-xs font-black tracking-wider shadow-[2px_3px_0px_#003622] hover:bg-[#FFD400]/90 active:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#003622]" />
                <span>{t('copiedBtn')}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t('copyBtn')}</span>
              </>
            )}
          </button>

          {/* Listen Audio Button (Sarvam AI TTS with Pause/Stop Support) */}
          <button
            onClick={handleSpeakToggle}
            className={`px-4 py-2 rounded-xl border-2 border-[#003622] font-mono text-xs font-black tracking-wider shadow-[2px_3px_0px_#003622] transition-all flex items-center gap-1.5 cursor-pointer ${
              isPlayingAudio 
                ? 'bg-[#FF0B78] text-[#FFFDF5] animate-pulse hover:bg-[#FF0B78]/90' 
                : 'bg-[#004E32] text-[#F7F0DB] hover:bg-[#003622]'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Square className="w-4 h-4 fill-current text-[#FFFDF5]" />
                <span>PAUSE AUDIO</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t('listenBtn')}</span>
              </>
            )}
          </button>
        </div>

        {/* Ask Another Question / Back Button */}
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-xl bg-[#003622] text-[#F7F0DB] hover:bg-[#004E32] border-2 border-[#003622] font-mono text-xs font-black tracking-wider shadow-[2px_3px_0px_#003622] transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#FFD400]" />
          <span>{t('askAnotherBtn')}</span>
        </button>
      </div>
    </motion.div>
  );
});

AnswerCard.displayName = 'AnswerCard';
