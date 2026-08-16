import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/brand/Header';
import { Sidebar, type NavTab } from './components/navigation/Sidebar';
import { GoaBackground } from './components/illustrations/GoaBackground';
import { AskPage } from './pages/Ask';
import { HistoryPage } from './pages/History';
import { AnalyticsPage } from './pages/Analytics';
import { SystemPage } from './pages/System';
import { usePipeline } from './hooks/usePipeline';
import { useVoice } from './hooks/useVoice';
import type { RagQueryResponse } from './types/rag';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('ask');
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === 'true') {
      setDemoMode(true);
    }
  }, []);

  const {
    pipelineState,
    currentResponse,
    historyList,
    runPipeline,
    resetPipeline,
    restoreFromHistory,
  } = usePipeline(demoMode);

  const handleSpeechComplete = useCallback((finalText: string) => {
    if (finalText.trim()) {
      runPipeline(finalText, { isVoice: true, demoMode });
    }
  }, [runPipeline, demoMode]);

  const {
    isListening,
    transcript,
    setTranscript,
    volume,
    micPermissionDenied,
    startListening,
    stopListening,
  } = useVoice(handleSpeechComplete);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' && activeTab === 'ask') {
        e.preventDefault();
        if (isListening) {
          stopListening();
        } else {
          startListening();
        }
      }

      if (e.code === 'Escape') {
        if (isListening) {
          stopListening();
        }
        resetPipeline();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isListening, startListening, stopListening, resetPipeline]);

  const handleTypedSubmit = (text: string) => {
    runPipeline(text, { isVoice: false, demoMode });
  };

  const handleSelectHistoryItem = (resp: RagQueryResponse) => {
    restoreFromHistory(resp);
    setActiveTab('ask');
  };

  return (
    <div className="h-screen bg-[#004E32] text-[#FFFDF5] flex flex-col relative font-sans selection:bg-[#FFD400] selection:text-[#004E32] overflow-hidden">
      {/* Background Illustrated Layer */}
      <GoaBackground />

      {/* Main Top Header */}
      <Header
        demoMode={demoMode}
        onToggleDemo={() => setDemoMode((prev) => !prev)}
        onNavigateSystem={() => setActiveTab('system')}
      />

      {/* Application Body Layout */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Navigation Sidebar with Embedded Footer Panel */}
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Dynamic Page Views Container */}
        <main className="flex-1 h-[calc(100vh-65px)] overflow-y-auto relative">
          {activeTab === 'ask' && (
            <AskPage
              pipelineState={pipelineState}
              currentResponse={currentResponse}
              historyList={historyList}
              isListening={isListening}
              transcript={transcript}
              onTranscriptChange={setTranscript}
              volume={volume}
              micDenied={micPermissionDenied}
              demoMode={demoMode}
              onStartListen={startListening}
              onStopListen={stopListening}
              onSubmitQuery={handleTypedSubmit}
              onResetPipeline={resetPipeline}
              onRestoreFromHistory={handleSelectHistoryItem}
            />
          )}

          {activeTab === 'history' && (
            <HistoryPage
              historyList={historyList}
              onSelectQuery={handleSelectHistoryItem}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsPage />}

          {activeTab === 'system' && <SystemPage />}
        </main>
      </div>
    </div>
  );
}

export default App;
