import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mic, Volume2 } from 'lucide-react';
import { VoiceOrb } from '../components/voice/VoiceOrb';
import { WaveformBars } from '../components/waveform/WaveformBars';
import { TypedInput } from '../components/input/TypedInput';
import { AnswerCard } from '../components/answer/AnswerCard';
import { RetrievedEvidence } from '../components/evidence/RetrievedEvidence';
import { PipelineMetricsCard } from '../components/latency/PipelineMetricsCard';
import { RecentQueryCard } from '../components/recent/RecentQueryCard';
import { GuardrailBanner } from '../components/guardrails/GuardrailBanner';
import type { PipelineState, RagQueryResponse } from '../types/rag';
import { getLocalizedMockResponses } from '../data/mockQueries';
import { useLanguage } from '../context/LanguageContext';

interface AskPageProps {
  pipelineState: PipelineState;
  currentResponse: RagQueryResponse | null;
  historyList: RagQueryResponse[];
  isListening: boolean;
  transcript: string;
  onTranscriptChange: (val: string) => void;
  volume: number;
  micDenied: boolean;
  demoMode: boolean;
  onStartListen: () => void;
  onStopListen: () => Promise<string>;
  onSubmitQuery: (text: string) => void;
  onResetPipeline: () => void;
  onRestoreFromHistory: (resp: RagQueryResponse) => void;
}

export const AskPage: React.FC<AskPageProps> = memo(({
  pipelineState,
  currentResponse,
  historyList,
  isListening,
  transcript,
  onTranscriptChange,
  volume,
  micDenied,
  onStartListen,
  onStopListen,
  onSubmitQuery,
  onResetPipeline,
  onRestoreFromHistory,
}) => {
  const { t } = useLanguage();
  const isBusy = pipelineState === 'TRANSCRIBING' || pipelineState === 'RETRIEVING' || pipelineState === 'GENERATING';
  const showResult = pipelineState === 'SUCCESS' && currentResponse;
  const showGuardrail = pipelineState === 'REJECTED' && currentResponse;

  const localizedMocks = getLocalizedMockResponses(t);
  const displayRecent = historyList[0] || localizedMocks.main_findings;

  const handleSendVoiceQuery = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const sttResult = await onStopListen();
    const queryToSend = (sttResult || transcript).trim();
    
    // STRICT CHECK: Never submit random fallback queries automatically if nothing was spoken/typed
    if (!queryToSend) {
      return;
    }
    
    onSubmitQuery(queryToSend);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 h-[calc(100vh-75px)] flex flex-col justify-between overflow-hidden relative z-10 select-none">
      {/* Top Center Studio Sub-label & Headline */}
      <div className="text-center flex flex-col items-center justify-center relative shrink-0">
        <div className="mb-0.5">
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#79C968] uppercase bg-[#006B3C]/80 px-2.5 py-0.5 rounded-full border border-[#79C968]/30">
            2:47<span className="text-[#FFD400]">PM</span> STUDIO
          </span>
        </div>

        <div className="relative inline-block">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#FFD400] tracking-tight leading-[1.0] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {t('askHeroTitle1')} <span className="text-[#F7F0DB]">{t('askHeroTitle2')}</span>
          </h1>

          {/* Hot Pink "JUST SPEAK!" Tape Sticker Badge */}
          <div className="absolute -top-2 -right-6 sm:-right-10 bg-[#FF0B78] text-[#FFFDF5] font-mono text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-lg border-2 border-[#003622] shadow-[2px_2px_0px_#003622] rotate-6 transform hover:rotate-0 transition-transform select-none hidden sm:block">
            {t('justSpeakSticker')}
          </div>
        </div>

        {/* Subtitle - High-Visibility Dark White / Cream (#FFFDF5) */}
        <p className="font-sans text-xs sm:text-sm font-bold text-[#FFFDF5] mt-1 max-w-lg mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] tracking-wide">
          {t('askHeroSub')}
        </p>
      </div>

      {/* Main Grid: Centered Microphone Hero Interaction (Col 8) + Side Telemetry (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center flex-1 my-auto overflow-hidden">
        {/* Central Voice & Input Column (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            {!showResult && !showGuardrail ? (
              <motion.div
                key="hero-interaction"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center justify-center my-auto"
              >
                {/* PROMINENT CENTERED MICROPHONE HERO ORB */}
                <div className="flex items-center justify-center w-full my-1">
                  <VoiceOrb
                    pipelineState={pipelineState}
                    isListening={isListening}
                    onToggleListen={isListening ? handleSendVoiceQuery : onStartListen}
                    micDenied={micDenied}
                  />
                </div>

                {/* Microphone Permission Denied Alert Banner */}
                {micDenied && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="my-2 p-3 rounded-2xl bg-[#FF0B78] text-[#FFFDF5] border-2 border-[#003622] shadow-[4px_5px_0px_#003622] font-mono text-xs font-black flex flex-col sm:flex-row items-center justify-between gap-2 max-w-lg w-full text-center z-20"
                  >
                    <span>⚠️ MIC ACCESS BLOCKED IN BROWSER</span>
                    <button
                      onClick={onStartListen}
                      className="px-3 py-1 bg-[#FFD400] text-[#003622] rounded-xl border border-[#003622] font-black hover:bg-[#FFD400]/90 transition-all uppercase cursor-pointer"
                    >
                      RETRY MIC ACCESS
                    </button>
                  </motion.div>
                )}

                {/* Dynamic Waveform Bars */}
                <WaveformBars pipelineState={pipelineState} volume={volume} />

                {/* LIVE EDITABLE SPOKEN VOICE INPUT & HARDWARE MIC LEVEL MONITOR */}
                {isListening ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="w-full max-w-lg mx-auto flex flex-col items-center space-y-2 my-2 z-20"
                  >
                    {/* Live Hardware Mic Volume Meter */}
                    <div className="flex items-center justify-between w-full px-3 py-1 bg-[#003622] rounded-xl border border-[#79C968]/40 font-mono text-[10px] text-[#79C968] font-bold shadow-sm">
                      <span className="flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-[#FFD400] animate-pulse" />
                        MIC VOLUME LEVEL:
                      </span>
                      <div className="w-32 h-2 bg-[#004E32] rounded-full overflow-hidden border border-[#79C968]/30">
                        <div 
                          className="h-full bg-[#79C968] transition-all duration-75"
                          style={{ width: `${Math.min(100, Math.round(volume * 100))}%` }}
                        />
                      </div>
                      <span className="text-[#FFD400] font-black">{Math.round(volume * 100)}%</span>
                    </div>

                    <form 
                      onSubmit={handleSendVoiceQuery}
                      className="w-full p-2.5 rounded-2xl bg-[#F7F0DB] border-3 border-[#003622] shadow-[5px_6px_0px_#003622] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center space-x-2 bg-[#FFFDF5] border-2 border-[#003622] rounded-xl px-3 py-1.5 flex-1 shadow-inner overflow-hidden">
                        <Mic className="w-4 h-4 text-[#FF0B78] animate-bounce shrink-0" />
                        <input
                          type="text"
                          value={transcript}
                          onChange={(e) => onTranscriptChange(e.target.value)}
                          placeholder="Listening... Speak now or type your query..."
                          className="bg-transparent font-mono text-xs sm:text-sm font-black text-[#00140B] focus:outline-none w-full placeholder-[#003622]/50"
                          autoFocus
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!transcript.trim()}
                        className={`px-4 py-2 rounded-xl border-2 border-[#003622] font-mono text-xs font-black tracking-wider transition-all flex items-center gap-1.5 uppercase shrink-0 ${
                          transcript.trim()
                            ? 'bg-[#FF0B78] text-[#FFFDF5] shadow-[2px_3px_0px_#003622] hover:bg-[#FF0B78]/90 cursor-pointer'
                            : 'bg-[#F7F0DB] text-[#003622]/40 border-[#003622]/30 cursor-not-allowed'
                        }`}
                      >
                        <span>SEND</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>

                    {/* Quick Voice Prompt Tap Chips */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 w-full pt-1">
                      <button
                        type="button"
                        onClick={() => onTranscriptChange("What are the main findings discussed in this dataset?")}
                        className="px-2.5 py-0.5 rounded-lg bg-[#006B3C] border border-[#79C968] text-[#FFD400] font-mono text-[10px] font-black uppercase hover:bg-[#004E32] transition-colors cursor-pointer"
                      >
                        + Main Findings
                      </button>
                      <button
                        type="button"
                        onClick={() => onTranscriptChange("Can you summarize the relevant information?")}
                        className="px-2.5 py-0.5 rounded-lg bg-[#006B3C] border border-[#79C968] text-[#FFD400] font-mono text-[10px] font-black uppercase hover:bg-[#004E32] transition-colors cursor-pointer"
                      >
                        + Summarize
                      </button>
                      <button
                        type="button"
                        onClick={() => onTranscriptChange("What are the key insights from this dataset?")}
                        className="px-2.5 py-0.5 rounded-lg bg-[#006B3C] border border-[#79C968] text-[#FFD400] font-mono text-[10px] font-black uppercase hover:bg-[#004E32] transition-colors cursor-pointer"
                      >
                        + Key Insights
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Typed Input Fallback & Quick Suggestion Chips */
                  <TypedInput onSubmitQuery={onSubmitQuery} isBusy={isBusy} />
                )}
              </motion.div>
            ) : showGuardrail && currentResponse ? (
              <motion.div
                key="guardrail-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-h-[calc(100vh-210px)] overflow-y-auto pr-1"
              >
                {/* Top Back Navigation Bar */}
                <button
                  onClick={onResetPipeline}
                  className="mb-3 px-4 py-2 rounded-xl bg-[#FFD400] text-[#003622] font-mono text-xs font-black border-2 border-[#003622] shadow-[3px_4px_0px_#003622] hover:bg-[#FFD400]/90 transition-all cursor-pointer flex items-center gap-2 uppercase"
                >
                  <ArrowLeft className="w-4 h-4 text-[#003622]" />
                  <span>{t('askAnotherBtn')}</span>
                </button>

                <GuardrailBanner
                  guardrail={currentResponse.guardrail}
                  query={currentResponse.query}
                  onRetry={onResetPipeline}
                />
              </motion.div>
            ) : showResult && currentResponse ? (
              <motion.div
                key="answer-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-h-[calc(100vh-210px)] overflow-y-auto pr-1"
              >
                {/* Top Back Navigation Bar */}
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={onResetPipeline}
                    className="px-4 py-2 rounded-xl bg-[#FFD400] text-[#003622] font-mono text-xs font-black border-2 border-[#003622] shadow-[3px_4px_0px_#003622] hover:bg-[#FFD400]/90 transition-all cursor-pointer flex items-center gap-2 uppercase"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#003622]" />
                    <span>{t('askAnotherBtn')}</span>
                  </button>

                  <span className="font-mono text-xs text-[#FFFDF5] font-extrabold drop-shadow">
                    RAG Grounded Response
                  </span>
                </div>

                {/* Grounded Answer Display Card */}
                <AnswerCard response={currentResponse} onReset={onResetPipeline} />

                {/* Retrieved Evidence Sources */}
                <RetrievedEvidence retrieval={currentResponse.retrieval} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Right Side Cards Column (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-3 w-full my-auto overflow-hidden">
          {/* Floating Recent Query Sticker Card */}
          <RecentQueryCard response={displayRecent} onRestore={onRestoreFromHistory} />

          {/* Pipeline Latency Performance Panel */}
          <PipelineMetricsCard 
            metrics={
              currentResponse?.performance || localizedMocks.main_findings.performance
            } 
          />
        </div>
      </div>
    </div>
  );
});

AskPage.displayName = 'AskPage';
