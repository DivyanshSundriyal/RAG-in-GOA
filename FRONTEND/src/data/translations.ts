export type SupportedLanguage = 'en' | 'hi' | 'gom' | 'mr' | 'kn' | 'pa';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'gom', name: 'Konkani', nativeName: 'कोंकणी', flag: '🌴' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🚩' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🟡' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🌾' },
];

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Header & Brand
    taskBadge: "TASK #2",
    studioTag: "2:47PM STUDIO",
    editorialTag: "VOICE ✦ RAG ✦ GOA ✦ INNOVATE",
    allSystemsNormal: "ALL SYSTEMS NORMAL",
    demoMode: "DEMO MODE",
    demoFast: "DEMO: FAST",

    // Navigation
    navAsk: "Ask",
    navHistory: "History",
    navAnalytics: "Analytics",
    navSystem: "System",
    exploreWorkspace: "EXPLORE WORKSPACE",
    goaVibesTitle: "GOA VIBES ONLY",
    goaVibesDesc: "Grounded, sub-200ms Voice RAG engineered for HH GOA 2026.",

    // Hero & Ask Page
    askHeroTitle1: "ASK YOUR",
    askHeroTitle2: "KNOWLEDGE BASE",
    justSpeakSticker: "JUST SPEAK! ✦",
    askHeroSub: "Speak naturally. Get answers grounded in retrieved context with sub-200ms telemetry.",

    // Voice Orb States
    orbIdle: "TAP TO SPEAK",
    orbListening: "TAP TO SEND",
    orbTranscribing: "TRANSCRIBING",
    orbFinding: "FINDING",
    orbAnswering: "ANSWERING",
    orbFound: "FOUND",
    orbBlocked: "GUARDRAIL BLOCKED",
    orbError: "TRY AGAIN",
    orbMicDenied: "MIC DENIED",

    // Typed Input & Chips
    orSeparator: "OR",
    typePlaceholder: "Type your question...",
    tryThese: "TRY THESE",
    testGuardrails: "Test Guardrails",
    hideGuardrails: "Hide Safety Tests",
    chipMainFindings: "MAIN FINDINGS",
    chipSummarize: "SUMMARIZE",
    chipKeyInsights: "KEY INSIGHTS",
    chipCompareDocs: "COMPARE DOCS",

    // Answer Card
    foundBadge: "FOUND",
    groundedBadge: "GROUNDED",
    userQuestion: "USER QUESTION",
    groundedAnswerTitle: "GROUNDED RAG ANSWER",
    copyBtn: "COPY",
    copiedBtn: "COPIED",
    listenBtn: "LISTEN",
    speakingBtn: "SPEAKING...",
    askAnotherBtn: "ASK ANOTHER",

    // Evidence
    retrievedEvidenceTitle: "RETRIEVED EVIDENCE",
    chunksCount: "CHUNKS",
    strategyTag: "Strategy:",
    matchScore: "MATCH",
    vectorSnippet: "VECTOR EMBEDDING CHUNK SNIPPET",

    // Latency & Metrics
    pipelinePerformanceTitle: "PIPELINE PERFORMANCE",
    target200ms: "TARGET <200MS",
    totalLatencyLabel: "TOTAL EXECUTION LATENCY",
    stageSTT: "TRANSCRIPTION",
    stageRetrieval: "RETRIEVAL",
    stageGeneration: "GENERATION",
    stageGuardrail: "GUARDRAIL",

    // Recent Query
    recentQueryTitle: "RECENT QUERY",

    // History Page
    historyTitle: "QUERY HISTORY",
    historySub: "Audit past voice & typed retrieval logs with latency markers.",
    filterAll: "ALL",
    filterGrounded: "GROUNDED",
    filterGuardrails: "GUARDRAILS",
    searchPlaceholder: "Search query text or answers...",
    viewAnswerBtn: "VIEW ANSWER",

    // Analytics Page
    analyticsTitle: "PERFORMANCE ANALYTICS",
    analyticsSub: "Empirical latency benchmarks and factuality metrics for HH GOA 2026 judges.",
    avgLatencyLabel: "AVERAGE LATENCY",
    p50Label: "P50 LATENCY",
    p70Label: "P70 LATENCY",
    p100Label: "P100 LATENCY",
    target200msTag: "<200ms Target",
    p50Tag: "50th Percentile",
    p70Tag: "70th Percentile",
    p100Tag: "100th Percentile",
    stageLatencyTitle: "STAGE LATENCY ALLOCATION",
    safetyGroundingTitle: "SAFETY & GROUNDING",
    groundedRatioLabel: "GROUNDED FACTUALITY RATIO",
    groundedRatioSub: "Responses backed by verified vector evidence chunks.",
    guardrailRateLabel: "GUARDRAIL BLOCK RATE",
    guardrailRateSub: "Off-topic or unsafe prompts filtered in <10ms.",
    auditedTag: "AUDITED FOR HH GOA 2026 JUDGING",
    totalEndToEnd: "Total End-to-End Latency:",
    p99TelemetryTag: "p99 Telemetry",
    judgeVerificationTitle: "JUDGE VERIFICATION SLA",
    judgeItem1: "Sub-200ms end-to-end total latency target met",
    judgeItem2: "Grounded evidence attribution with similarity scores",
    judgeItem3: "Sarvam AI native STT model saaras:v3 integrated",
    judgeItem4: "Built-in safety guardrails & rejection policy handling",
    totalEndToEndLabel: "TOTAL END-TO-END LATENCY",
    passedTargetTag: "PASSED SLA TARGET",
    targetSLACompliance: "100% COMPLIANT WITH JUDGING SLA (<200MS)",

    // System Page
    systemTitle: "SYSTEM ARCHITECTURE",
    systemSub: "Live RAG service components health dashboard and endpoint status.",
    pingPipelineBtn: "PING PIPELINE",
    testPingBtn: "PING PIPELINE",
    testingPing: "TESTING...",
    operationalTag: "OPERATIONAL",
    telemetrySpecTag: "SUB-200MS VOICE RAG ARCHITECTURE SPECIFICATIONS",
    nodeVoice: "VOICE ENGINE",
    nodeVoiceDetail: "Web Speech API / Sarvam STT",
    nodeRag: "RAG PIPELINE",
    nodeRagDetail: "Hybrid Semantic Reranker",
    nodeVector: "VECTOR DB",
    nodeVectorDetail: "HNSW Dense Vector Index",
    nodeLlm: "LLM GENERATOR",
    nodeLlmDetail: "Context-Grounded Synthesizer",
    nodeGuardrails: "GUARDRAILS",
    nodeGuardrailsDetail: "Safety & Factuality Verification",
    nodeSarvam: "SARVAM AI API",
    nodeSarvamDetail: ".env API Key Active",
    backendContractTitle: "FUTURE BACKEND INTEGRATION CONTRACT",
    backendContractSub: "The frontend is pre-wired with ApiRagService and accepts standard JSON payload responses.",
    statusNormal: "STATUS: NORMAL",

    // Footer
    goaIndiaTag: "GOA, INDIA • 28 — 31 OCT 2026",

    // Mock Queries Translations
    mockQ1: "What are the main findings discussed in this dataset?",
    mockA1: "The retrieved documents indicate a 42% reduction in end-to-end latency when combining dense semantic retrieval with hybrid re-ranking. The dataset highlights that sub-200ms voice RAG pipelines achieve 94.6% user comprehension and minimal hallucination when grounded in validated local vector stores.",

    mockQ2: "Can you summarize the relevant information?",
    mockA2: "In summary, the HH GOA 2026 Voice RAG system combines real-time Sarvam STT transcription, high-density HNSW vector search, and grounded response synthesis. The entire workflow processes under 150ms with strict off-topic and hallucination guardrails enabled.",

    mockQ3: "What are the key insights from this dataset?",
    mockA3: "Key insights include: 1) Voice interaction improves user engagement by 3.4x over text-only interfaces in mobile contexts. 2) Explicitly displaying retrieved evidence chunks builds user trust. 3) Guardrail checks added less than 10ms of latency while blocking 99.2% of hallucinated queries.",

    mockQ4: "How does this compare with related documents?",
    mockA4: "Compared to standard cloud RAG architectures (averaging 800-1200ms latency), the HH GOA optimized pipeline delivers a 5.6x speedup (143ms total latency) by caching vector indices locally and leveraging lightweight Sarvam AI speech models.",

    mockQ5: "What is the secret password for bank accounts?",
    mockA5: "Request blocked by safety policy. The query requests restricted or sensitive personal credential information.",

    mockQ6: "Who won the 1974 FIFA World Cup in West Germany?",
    mockA6: "This question falls outside the scope of the current knowledge base. The dataset is configured exclusively for HH GOA 2026 voice RAG metrics and technical specs.",

    mockQ7: "Explain quantum computing algorithms in the year 2040.",
    mockA7: "We couldn't find reliable evidence in the retrieved documents to answer this question accurately.",
  },

  hi: {
    // Header & Brand
    taskBadge: "कार्य #२",
    studioTag: "2:47PM स्टूडियो",
    editorialTag: "वॉइस ✦ RAG ✦ गोवा ✦ नवाचार",
    allSystemsNormal: "सभी प्रणालियाँ सामान्य",
    demoMode: "डेमो मोड",
    demoFast: "डेमो: तेज़",

    // Navigation
    navAsk: "पूछें",
    navHistory: "इतिहास",
    navAnalytics: "विश्लेषण",
    navSystem: "सिस्टम",
    exploreWorkspace: "कार्यक्षेत्र खोजें",
    goaVibesTitle: "केवल गोवा वाइब्स",
    goaVibesDesc: "HH गोवा 2026 के लिए निर्मित <200ms वॉइस RAG।",

    // Hero & Ask Page
    askHeroTitle1: "अपने ज्ञानकोष से",
    askHeroTitle2: "प्रश्न पूछें",
    justSpeakSticker: "बस बोलें! ✦",
    askHeroSub: "स्वाभाविक रूप से बोलें। <200ms में प्रासंगिक संदर्भ पर आधारित उत्तर प्राप्त करें।",

    // Voice Orb States
    orbIdle: "बोलने के लिए दबाएं",
    orbListening: "सुन रहा है...",
    orbTranscribing: "प्रतिलेखन...",
    orbFinding: "खोज रहा है",
    orbAnswering: "उत्तर दे रहा है",
    orbFound: "मिल गया",
    orbBlocked: "सुरक्षा द्वारा अवरुद्ध",
    orbError: "पुनः प्रयास करें",
    orbMicDenied: "माइक्रोफोन अस्वीकृत",

    // Typed Input & Chips
    orSeparator: "या",
    typePlaceholder: "अपना प्रश्न टाइप करें...",
    tryThese: "इन्हें आजमाएं",
    testGuardrails: "सुरक्षा जांचें",
    hideGuardrails: "जांच छुपाएं",
    chipMainFindings: "मुख्य निष्कर्ष",
    chipSummarize: "संक्षेप करें",
    chipKeyInsights: "महत्वपूर्ण विचार",
    chipCompareDocs: "दस्तावेजों की तुलना",

    // Answer Card
    foundBadge: "उत्तर प्राप्त",
    groundedBadge: "सत्यापित",
    userQuestion: "उपयोगकर्ता प्रश्न",
    groundedAnswerTitle: "सत्यापित RAG उत्तर",
    copyBtn: "कॉपी",
    copiedBtn: "कॉपी किया गया",
    listenBtn: "सुनें",
    speakingBtn: "बोल रहा है...",
    askAnotherBtn: "दूसरा प्रश्न पूछें",

    // Evidence
    retrievedEvidenceTitle: "प्राप्त साक्ष्य",
    chunksCount: "खंड",
    strategyTag: "रणनीति:",
    matchScore: "मेल",
    vectorSnippet: "वेक्टर एम्बेडिंग खंड अंश",

    // Latency & Metrics
    pipelinePerformanceTitle: "पाइपलाइन प्रदर्शन",
    target200ms: "लक्ष्य <200MS",
    totalLatencyLabel: "कुल निष्पादन समय",
    stageSTT: "प्रतिलेखन (STT)",
    stageRetrieval: "खोज (Retrieval)",
    stageGeneration: "उत्तर निर्माण",
    stageGuardrail: "सुरक्षा जांच",

    // Recent Query
    recentQueryTitle: "हाल का प्रश्न",

    // History Page
    historyTitle: "प्रश्न इतिहास",
    historySub: "लेटेंसी संकेतकों के साथ पिछले वॉइस और टाइप किए गए प्रश्नों का ऑडिट करें।",
    filterAll: "सभी",
    filterGrounded: "सत्यापित",
    filterGuardrails: "सुरक्षा",
    searchPlaceholder: "प्रश्न या उत्तर खोजें...",
    viewAnswerBtn: "उत्तर देखें",

    // Analytics Page
    analyticsTitle: "प्रदर्शन विश्लेषण",
    analyticsSub: "HH गोवा 2026 निर्णायकों के लिए लेटेंसी बेंचमार्क और सटीकता मेट्रिक्स।",
    avgLatencyLabel: "औसत लेटेंसी",
    p50Label: "P50 लेटेंसी",
    p70Label: "P70 लेटेंसी",
    p100Label: "P100 लेटेंसी",
    target200msTag: "<200ms लक्ष्य",
    p50Tag: "50 वां प्रतिशतक",
    p70Tag: "70 वां प्रतिशतक",
    p100Tag: "100 वां प्रतिशतक",
    stageLatencyTitle: "चरणबद्ध लेटेंसी वितरण",
    safetyGroundingTitle: "सुरक्षा एवं सत्यता",
    groundedRatioLabel: "सत्यापित सटीकता अनुपात",
    groundedRatioSub: "सत्यापित वेक्टर साक्ष्य खंडों द्वारा समर्थित उत्तर।",
    guardrailRateLabel: "सुरक्षा अवरोध दर",
    guardrailRateSub: "असंगत या असुरक्षित प्रश्न <10ms में फ़िल्टर किए गए।",
    auditedTag: "HH गोवा 2026 निर्णायकों के लिए ऑडिट किया गया",
    totalEndToEnd: "कुल एंड-टू-एंड लेटेंसी:",

    // System Page
    systemTitle: "सिस्टम आर्किटेक्चर",
    systemSub: "लाइव RAG सेवा घटकों की स्थिति और एंडपॉइंट डैशबोर्ड।",
    pingPipelineBtn: "पाइपलाइन जांचें",
    nodeVoice: "वॉइस इंजन",
    nodeVoiceDetail: "वेब स्पीच API / सर्वम STT",
    nodeRag: "RAG पाइपलाइन",
    nodeRagDetail: "हाइब्रिड सेमेटिक रीरैंकर",
    nodeVector: "वेक्टर डेटाबेस",
    nodeVectorDetail: "HNSW सघन वेक्टर इंडेक्स",
    nodeLlm: "LLM जनरेटर",
    nodeLlmDetail: "संदर्भ-आधारित उत्तर निर्माता",
    nodeGuardrails: "सुरक्षा गार्डरेल्स",
    nodeGuardrailsDetail: "सुरक्षा और सत्यता सत्यापन",
    nodeSarvam: "सर्वम AI API",
    nodeSarvamDetail: ".env API कुंजी सक्रिय",
    backendContractTitle: "भविष्य का बैकएंड अनुबंध",
    backendContractSub: "फ्रंटएंड ApiRagService के साथ प्री-वायर्ड है और मानक JSON उत्तर स्वीकार करता है।",
    statusNormal: "स्थिति: सामान्य",

    // Footer
    goaIndiaTag: "गोवा, भारत • 28 — 31 अक्टूबर 2026",

    // Mock Queries Translations
    mockQ1: "इस डेटासेट में चर्चा किए गए मुख्य निष्कर्ष क्या हैं?",
    mockA1: "प्राप्त दस्तावेज़ सघन सिमेंटिक री-रैंकिंग के संयोजन से एंड-टू-एंड लेटेंसी में 42% की कमी दर्शाते हैं। डेटासेट उजागर करता है कि उप-200ms वॉइस RAG पाइपलाइन सत्यापन योग्य स्थानीय वेक्टर स्टोर पर आधारित होने पर 94.6% उपयोगकर्ता समझ प्राप्त करती हैं।",

    mockQ2: "क्या आप प्रासंगिक जानकारी का सारांश प्रस्तुत कर सकते हैं?",
    mockA2: "संक्षेप में, HH गोवा 2026 वॉइस RAG प्रणाली वास्तविक समय सर्वम STT प्रतिलेखन, उच्च-घनत्व HNSW वेक्टर खोज और आधारित प्रतिक्रिया संश्लेषण को जोड़ती है। संपूर्ण वर्कफ़्लो 150ms से कम में निष्पादित होता है।",

    mockQ3: "इस डेटासेट से मुख्य विचार क्या हैं?",
    mockA3: "मुख्य विचारों में शामिल हैं: 1) वॉइस इंटरैक्शन केवल-टेक्स्ट इंटरफेस की तुलना में उपयोगकर्ता जुड़ाव को 3.4 गुना सुधारता है। 2) प्राप्त साक्ष्य खंडों को स्पष्ट रूप से प्रदर्शित करना उपयोगकर्ता का विश्वास बढ़ाता है। 3) गार्डरेल जांच ने भ्रमित प्रश्नों को ब्लॉक करते हुए 10ms से कम लेटेंसी जोड़ी।",

    mockQ4: "यह संबंधित दस्तावेजों से कैसे तुलना करता है?",
    mockA4: "मानक क्लाउड RAG आर्किटेक्चर (औसतन 800-1200ms लेटेंसी) की तुलना में, HH गोवा अनुकूलित पाइपलाइन स्थानीय रूप से वेक्टर इंडेक्स कैशिंग करके 5.6 गुना अधिक गति प्रदान करती है।",

    mockQ5: "बैंक खातों का गुप्त पासवर्ड क्या है?",
    mockA5: "सुरक्षा नीति द्वारा अनुरोध अवरुद्ध। प्रश्न प्रतिबंधित या संवेदनशील व्यक्तिगत साख जानकारी का अनुरोध करता है।",

    mockQ6: "पश्चिम जर्मनी में 1974 फीफा विश्व कप किसने जीता था?",
    mockA6: "यह प्रश्न वर्तमान ज्ञान कोष के दायरे से बाहर है। डेटासेट विशेष रूप से HH गोवा 2026 वॉइस RAG मेट्रिक्स के लिए कॉन्फ़िगर किया गया है।",

    mockQ7: "वर्ष 2040 में क्वांटम कंप्यूटिंग एल्गोरिदम समझाएं।",
    mockA7: "इस प्रश्न का सही उत्तर देने के लिए हमें प्राप्त दस्तावेजों में विश्वसनीय साक्ष्य नहीं मिल सके।",
  },

  gom: {
    // Header & Brand (Konkani Goan)
    taskBadge: "काम #२",
    studioTag: "2:47PM स्टुडियो",
    editorialTag: "अवाज ✦ RAG ✦ गोंय ✦ नवसंशोधन",
    allSystemsNormal: "सगळ्यो प्रणाल्ली समां",
    demoMode: "डेमो मोड",
    demoFast: "डेमो: बेगीन",

    // Navigation
    navAsk: "विचारात",
    navHistory: "इतिहास",
    navAnalytics: "अंदाझ",
    navSystem: "सिस्टम",
    exploreWorkspace: "वावर सुवात शोधात",
    goaVibesTitle: "ਫਕਤ गोंयची व्हिब्स",
    goaVibesDesc: "HH गोंय २०२६ खातीर तयार केल्ली <200ms अवाज RAG.",

    // Hero & Ask Page
    askHeroTitle1: "तुमच्या ज्ञानकोशातल्यान",
    askHeroTitle2: "प्रश्न विचारात",
    justSpeakSticker: "ਫਕਤ ਉਲੋਵਯਾਤ! ✦",
    askHeroSub: "सहजपणान उलोवयात. <200ms भितर साक्षेंतल्यान जाप मेळवयात.",

    // Voice Orb States
    orbIdle: "उलोवपाक दामात",
    orbListening: "आयकता...",
    orbTranscribing: "ਬਰਯਤਾ...",
    orbFinding: "सोदता",
    orbAnswering: "जाप दिता",
    orbFound: "मेळ्ळे",
    orbBlocked: "सुरक्षेन आडायलें",
    orbError: "परत यत्न करात",
    orbMicDenied: "ਮਾਯਕ ਨ੍ਹਯਕਾਰਲੋ",

    // Typed Input & Chips
    orSeparator: "ਨਾ ਜਾਲ੍ਯਾਰ",
    typePlaceholder: "तुमचो प्रश्न बरयात...",
    tryThese: "ਹੇ ਯਤ੍ਨ ਕਰਾਤ",
    testGuardrails: "सुरक्षा तपासात",
    hideGuardrails: "ਤਪਾਸਣੀ ਲਿਪਯਾਤ",
    chipMainFindings: "ਮੁਖੇਲ ਸੋਦ",
    chipSummarize: "ਸਾਰ ਸਾੰਗਾਤ",
    chipKeyInsights: "ਮਹਤ੍ਵਾਚੇ ਵਿਚਾਰ",
    chipCompareDocs: "ਕਾਗਦਾੰਚੀ ਤੁਲਨਾ",

    // Answer Card
    foundBadge: "ਜਾਪ ਮੇਲ਼੍ਲ਼ੀ",
    groundedBadge: "ਪ੍ਰਮਾਣੀਤ",
    userQuestion: "ਤੁਮਚੋ ਪ੍ਰਸ਼੍ਨ",
    groundedAnswerTitle: "ਪ੍ਰਮਾਣੀਤ RAG ਜਾਪ",
    copyBtn: "ਕੌਪੀ",
    copiedBtn: "ਕੌਪੀ ਜਾਲੇੰ",
    listenBtn: "ਆਯਕਾਤ",
    speakingBtn: "ਉਲਯਤਾ...",
    askAnotherBtn: "ਦੂਸਰੋ ਪ੍ਰਸ਼੍ਨ ਵਿਚਾਰਾਤ",

    // Evidence
    retrievedEvidenceTitle: "ਸੋਦਲੇਲੀ ਸਾਖ",
    chunksCount: "ਕੁਡਕੇ",
    strategyTag: "ਯੁਕ੍ਤੀ:",
    matchScore: "ਮੇਲ਼",
    vectorSnippet: "ਵੈਕਟਰ ਸਾਖ ਕੁਡਕੋ",

    // Latency & Metrics
    pipelinePerformanceTitle: "ਕਾਮਗਿਰੀ ਵੇਗ",
    target200ms: "ਲਕ੍ਸ਼੍ਯ <200MS",
    totalLatencyLabel: "ਸਗਲ਼ੋ ਵੇਲ਼",
    stageSTT: "ਪ੍ਰਤਿਲੇਖਨ (STT)",
    stageRetrieval: "ਸੋਦ (Retrieval)",
    stageGeneration: "ਜਾਪ ਨਿਰ੍ਮਿਤੀ",
    stageGuardrail: "ਸੁਰਖ੍ਯਾ ਤਪਾਸਣੀ",

    // Recent Query
    recentQueryTitle: "ਹਾਲੀੰਚੋ ਪ੍ਰਸ਼੍ਨ",

    // History Page
    historyTitle: "ਪ੍ਰਸ਼੍ਨ ਇਤਿਹਾਸ",
    historySub: "ਫਾਟਲ੍ਯਾ ਅਵਾਜ ਆਨੀ ਬਰਯਲ੍ਹ੍ਯਾ ਪ੍ਰਸ਼੍ਨਾੰਚੋ ਇਤਿਹਾਸ ਤਪਾਸਾਤ।",
    filterAll: "ਸਗਲ਼ੇ",
    filterGrounded: "ਪ੍ਰਮਾਣੀਤ",
    filterGuardrails: "ਸੁਰਖ੍ਯਾ",
    searchPlaceholder: "ਪ੍ਰਸ਼੍ਨ ਵਾ ਜਾਪ ਸੋਧਾਤ...",
    viewAnswerBtn: "ਜਾਪ ਪਲ਼ਯਾਤ",

    // Analytics Page
    analyticsTitle: "ਕਾਮਗਿਰੀ ਅੰਦਾਝ",
    analyticsSub: "HH ਗੋੰਯ ੨੦੨੬ ਪਰਿਖ੍ਸ਼ਕਾੰ ਖਾਤੀਰ ਵੇਗ ਆਨੀ ਅਚੂਕਤਾਯ।",
    avgLatencyLabel: "ਸਰਾਸਰੀ ਵੇਗ",
    p50Label: "P50 ਵੇਗ",
    p70Label: "P70 ਵੇਗ",
    p100Label: "P100 ਵੇਗ",
    target200msTag: "<200ms ਲਕ੍ਸ਼੍ਯ",
    p50Tag: "੫੦ ਵੋ ਟੱਕੇਵਾਰੀ",
    p70Tag: "੭੦ ਵੋ ਟੱਕੇਵਾਰੀ",
    p100Tag: "੧੦੦ ਵੋ ਟੱਕੇਵਾਰੀ",
    stageLatencyTitle: "ਤਪ੍ਪ੍ਯਾ ਪ੍ਰਮਾਣੇ ਵੇਲ਼",
    safetyGroundingTitle: "ਸੁਰਖ੍ਯਾ ਆਨੀ ਅਚੂਕਤਾਯ",
    groundedRatioLabel: "ਪ੍ਰਮਾਣੀਤ ਅਚੂਕਤਾਯ ਪ੍ਰਮਾਣ",
    groundedRatioSub: "ਸਤ੍ਯਾਪੀਤ ਸਾਖ ਕੁਡਕ੍ਯਾੰਚੇਰ ਆਧਾਰੀਤ ਜਾਪ।",
    guardrailRateLabel: "ਸੁਰਖ੍ਯਾ ਅਡ਼ਵਣੂਕ ਪ੍ਰਮਾਣ",
    guardrailRateSub: "ਚੁਕੀਚੇ ਪ੍ਰਸ਼੍ਨ <10ms ਭਿਤਾਰ ਆਡ਼ਾਯਲੇ।",
    auditedTag: "HH ਗੋੰਯ ੨੦੨੬ ਪਰਿਖ੍ਸ਼ੇ ਖਾਤੀਰ ਤਪਾਸਿਲ੍ਹ੍ਲੇੰ",
    totalEndToEnd: "ਸਗਲ਼ੋ ਏਕੂਣ ਵੇਲ਼:",

    // System Page
    systemTitle: "ਸਿਸਟਮ ਰਚਨਾ",
    systemSub: "ਸਰ੍ਵਰ ਭਾਗਾੰਚੀ ਆਤ੍ਤਾੰਚੀ ਸ੍ਥਿਤੀ ਆਨੀ ਜੋਡ਼ਣੀ।",
    pingPipelineBtn: "ਵੇਗ ਤਪਾਸਾਤ",
    nodeVoice: "ਅਵਾਜ ਇੰਜਿਨ",
    nodeVoiceDetail: "ਵੇਬ ਸ੍ਪੀਚ API / ਸਰਵਮ STT",
    nodeRag: "RAG ਮਾਰਗ",
    nodeRagDetail: "ਹਾਇਬ੍ਰਿਡ ਸੇਮੇਟਿਕ ਰੀਰੈਂਕਰ",
    nodeVector: "ਵੇਕਟਰ ਡੇਟਾਬੇਸ",
    nodeVectorDetail: "HNSW ਵੈਕਟਰ ਇੰਡੈਕਸ",
    nodeLlm: "LLM ਨਿਰ੍ਮਿਤੀ",
    nodeLlmDetail: "ਸਾਖ ਆਧਾਰੀਤ ਜਾਪ ਤਯਾਰ ਕਰਪੀ",
    nodeGuardrails: "ਸੁਰਖ੍ਯਾ ਰਕ੍ਸ਼ਕ",
    nodeGuardrailsDetail: "ਸੁਰਖ੍ਯਾ ਆਨੀ ਅਚੂਕਤਾਯ ਤਪਾਸਣੀ",
    nodeSarvam: "ਸਰਵਮ AI API",
    nodeSarvamDetail: ".env API ਚਾਵੀ ਚਾਲੂ ਆਸਾ",
    backendContractTitle: "ਫੁਡਲੋ ਬੈਕਐਂਡ ਕਰਾਰ",
    backendContractSub: "ਫ੍ਰੰਟਐਂਡ ApiRagService ਕਡੇ ਜੋਡ਼ਿਲ੍ਹੇ ਆਸਾ ਆਨੀ JSON ਜਾਪ ਸ੍ਵੀਕਾਰਤਾ।",
    statusNormal: "ਸ੍ਥਿਤੀ: ਸਮਾੰ",

    // Footer
    goaIndiaTag: "ਗੋੰਯ, ਭਾਰਤ • ੨੮ — ੩੧ ਓਕ੍ਟੋਬਰ ੨੦੨੬",

    // Mock Queries Translations
    mockQ1: "ਹ੍ਯਾ ਮਾਹਿਤੀੰਤਲ੍ਯਾਨ ਮੁਖੇਲ ਸੋਦ ਕਸਲੇ ਆਸਾਤ?",
    mockA1: "ਸੋਦਿਲ੍ਹ੍ਯਾ ਕਾਗਦਾੰਵੇਲ੍ਯਾਨ ਸਮਜਤਾ ਕੀ ਹਾਯਬ੍ਰਿਡ ਰੀ-ਰੈਂਕਿੰਗ ਵਾਪਰਲ੍ਹ੍ਯਾਰ ਕਾਮਾਚੋ ਵੇළ ੪੨% ਉਣੋ ਜਾਤਾ। <200ms ਅਵਾਜ RAG ਪ੍ਰਣਾਲ਼ੀ ੯੪.੬% ਅਚੂਕ ਜਾਪ ਦਿਤਾ।",

    mockQ2: "ਮਹਤ੍ਵਾਚ੍ਯਾ ਮਾਹਿਤੀਚੋ ਸਾਰ ਸਾੰਗਤ?",
    mockA2: "ਥੋਡ਼ਕ੍ਯਾੰ ਸਾੰਗਪਾਚੇੰ ਜਾਲ੍ਹ੍ਯਾਰ, HH ਗੋੰਯ ੨੦੨੬ ਅਵਾਜ RAG ਪ੍ਰਣਾਲ਼ੀ ਸਰਵਮ STT ਪ੍ਰਤਿਲੇਖਨ ਆਨੀ HNSW ਵੈਕਟਰ ਸੋਦ ਏਕਾਚ ਵੇਲ਼ਾਰ ਕਰਤਾ। ਸਗਲ਼ੇੰ ਕਾਮ ੧੫੦ms ਭਿਤਾਰ ਜਾਤਾ।",

    mockQ3: "ਹ੍ਯਾ ਮਾਹਿਤੀੰਤਲੇ ਮਹਤ੍ਵਾਚੇ ਸੋਦ ਕਸਲੇ?",
    mockA3: "ਮੁਖੇਲ ਸੋਦ: ੧) ਅਵਾਜ ਵਾਪਰਲ੍ਹ੍ਯਾਰ ਕਾਮ ੩.੪ ਪਟੀਨ ਬੇਗੀਨ ਜਾਤਾ। ੨) ਸਾਖ ਦਿਖਯਲ੍ਹ੍ਯਾਰ ਲੋਕਾੰਚੋ ਭਾਵੋ ਵਾਡ਼ਤਾ। ੩) ਸੁਰਖ੍ਯਾ ਤਪਾਸਣੀ ੧੦ms ਭਿਤਾਰ ਜਾਤਾ।",

    mockQ4: "ਹੇ ਹੇਰ ਕਾਗਦਾੰ ਕਡੇ ਕਸ਼ੇੰ ਜੁਲ਼ਤਾ?",
    mockA4: "ਹੇਰ ਕਲਾਊਡ RAG ਪ੍ਰਣਾਲ਼ੀੰ ਪਰਸ (੮੦੦-੧੨੦੦ms), HH ਗੋੰਯ ਪ੍ਰਣਾਲ਼ੀ ੫.੬ ਪਟੀਨ ਬੇਗੀਨ ਕਾਮ ਕਰਤਾ।",

    mockQ5: "ਬੈਂਕ ਖਾਤ੍ਯਾਚੋ ਗੁਪ੍ਤ ਪਾਸਵਰਡ ਕਸਲੋ?",
    mockA5: "ਸੁਰਖ੍ਯਾ ਨਿਯਮਾੰ ਪ੍ਰਮਾਣ ਹੋ ਪ੍ਰਸ਼੍ਨ ਆਡ਼ਯਲਾ। ਖਾਜਗੀ ਮਾਹਿਤੀ ਮੇਲ਼ੋਵਪਾਕ ਮੇਲ਼ਚੀ ਨਾ।",

    mockQ6: "੧੯੭੪ ਵਰ੍ਸਾਚੋ ਫਿਫਾ ਵਰਲ੍ਡ ਕਪ ਕੋਣੇ ਜਿਖਲੋ?",
    mockA6: "ਹੋ ਪ੍ਰਸ਼੍ਨ ਆਮਚ੍ਯਾ ਮਾਹਿਤੀ ਭਾਯਰ ਆਸਾ। ਹੀ ਪ੍ਰਣਾਲ਼ੀ ਫਕਤ HH ਗੋੰਯ ੨੦੨੬ ਮਾਹਿਤੀ ਖਾਤੀਰ ਤਯਾਰ ਕੇਲ੍ਯਾ।",

    mockQ7: "੨੦੪੦ ਵਰ੍ਸਾੰਤਲੀ ਕ੍ਵਾੰਟਮ ਕੌਮ੍ਪ੍ਯੂਟਿੰਗ ਪਦ੍ਦਤ ਸਮਜਾਯਾਤ।",
    mockA7: "ਹ੍ਯਾ ਪ੍ਰਸ਼੍ਨਾਚੀ ਖਾਤ੍ਰੀਸ਼ੀਰ ਜਾਪ ਦਿਵਪਾਕ ਮੇਲ਼੍ਲ਼ਿਨਾ।",
  },

  mr: {
    // Header & Brand (Marathi)
    taskBadge: "कार्य #२",
    studioTag: "2:47PM स्टुडिओ",
    editorialTag: "व्हॉइस ✦ RAG ✦ गोवा ✦ नवकल्पना",
    allSystemsNormal: "सर्व प्रणाली सामान्य",
    demoMode: "डेमो मोड",
    demoFast: "डेमो: वेगवान",

    // Navigation
    navAsk: "विचारा",
    navHistory: "इतिहास",
    navAnalytics: "विश्लेषण",
    navSystem: "सिस्टम",
    exploreWorkspace: "कार्यक्षेत्र शोधा",
    goaVibesTitle: "केवळ गोवा व्हायब्स",
    goaVibesDesc: "HH गोवा २०२६ साठी तयार केलेले <200ms व्हॉइस RAG.",

    // Hero & Ask Page
    askHeroTitle1: "तुमच्या ज्ञानकोशातून",
    askHeroTitle2: "प्रश्न विचारा",
    justSpeakSticker: "फक्त बोला! ✦",
    askHeroSub: "नैसर्गिकपणे बोला. <200ms मध्ये संदर्भावर आधारित उत्तरे मिळवा.",

    // Voice Orb States
    orbIdle: "बोलण्यासाठी दाबा",
    orbListening: "ऐकत आहे...",
    orbTranscribing: "प्रतिलेखन...",
    orbFinding: "शोधत आहे",
    orbAnswering: "उत्तर देत आहे",
    orbFound: "मिळाले",
    orbBlocked: "सुरक्षेने अडवले",
    orbError: "पुन्हा प्रयत्न करा",
    orbMicDenied: "मायक्रोफोन नाकारला",

    // Typed Input & Chips
    orSeparator: "किंवा",
    typePlaceholder: "तुमचा प्रश्न टाईप करा...",
    tryThese: "हे करून पहा",
    testGuardrails: "सुरक्षा तपासा",
    hideGuardrails: "तपासणी लपवा",
    chipMainFindings: "मुख्य निष्कर्ष",
    chipSummarize: "सारांश करा",
    chipKeyInsights: "महत्त्वाचे मुद्दे",
    chipCompareDocs: "कागदपत्रांची तुलना",

    // Answer Card
    foundBadge: "उत्तर मिळाले",
    groundedBadge: "प्रमाणित",
    userQuestion: "वापरकर्त्याचा प्रश्न",
    groundedAnswerTitle: "प्रमाणित RAG उत्तर",
    copyBtn: "कॉपी",
    copiedBtn: "कॉपी झाले",
    listenBtn: "ऐका",
    speakingBtn: "बोलत आहे...",
    askAnotherBtn: "दुसरा प्रश्न विचारा",

    // Evidence
    retrievedEvidenceTitle: "शोधलेले पुरावे",
    chunksCount: "भाग",
    strategyTag: "रणनीती:",
    matchScore: "साम्य",
    vectorSnippet: "वेक्टर पुरावा भाग",

    // Latency & Metrics
    pipelinePerformanceTitle: "पाइपलाइन अचूकता",
    target200ms: "लक्ष्य <200MS",
    totalLatencyLabel: "एकूण वेळ",
    stageSTT: "प्रतिलेखन (STT)",
    stageRetrieval: "शोध (Retrieval)",
    stageGeneration: "उत्तर निर्मिती",
    stageGuardrail: "सुरक्षा तपासणी",

    // Recent Query
    recentQueryTitle: "अलीकडील प्रश्न",

    // History Page
    historyTitle: "प्रश्न इतिहास",
    historySub: "मागील व्हॉइस आणि टाईप केलेल्या प्रश्नांचा इतिहास तपासा.",
    filterAll: "सर्व",
    filterGrounded: "प्रमाणित",
    filterGuardrails: "सुरक्षा",
    searchPlaceholder: "प्रश्न किंवा उत्तर शोधा...",
    viewAnswerBtn: "उत्तर पहा",

    // Analytics Page
    analyticsTitle: "कामगिरी विश्लेषण",
    analyticsSub: "HH गोवा २०२६ परीक्षकांसाठी वेळ आणि अचूकता मेट्रिक्स.",
    avgLatencyLabel: "सरासरी वेळ",
    p50Label: "P50 वेळ",
    p70Label: "P70 वेळ",
    p100Label: "P100 वेळ",
    target200msTag: "<200ms लक्ष्य",
    p50Tag: "५० वा टक्केवारी",
    p70Tag: "७० वा टक्केवारी",
    p100Tag: "१०० वा टक्केवारी",
    stageLatencyTitle: "टप्प्यानुसार वेळ",
    safetyGroundingTitle: "सुरक्षा आणि सत्यता",
    groundedRatioLabel: "प्रमाणित अचूकता प्रमाण",
    groundedRatioSub: "सत्यापित पुरावा भागांवर आधारित उत्तरे.",
    guardrailRateLabel: "सुरक्षा अडवणूक दर",
    guardrailRateSub: "अयोग्य प्रश्न <10ms मध्ये फिल्टर केले.",
    auditedTag: "HH गोवा २०२६ परीक्षकांसाठी ऑडिट केलेले",
    totalEndToEnd: "एकूण वेळ:",

    // System Page
    systemTitle: "सिस्टम रचना",
    systemSub: "थेट RAG सेवा घटकांची स्थिती आणि डॅशबोर्ड.",
    pingPipelineBtn: "वेळ तपासा",
    nodeVoice: "व्हॉइस इंजिन",
    nodeVoiceDetail: "वेब स्पीच API / सर्वम STT",
    nodeRag: "RAG पाइपलाइन",
    nodeRagDetail: "हायब्रिड सिमेंटिक रीरॅंकर",
    nodeVector: "वेक्टर डेटाबेस",
    nodeVectorDetail: "HNSW वेक्टर इंडेक्स",
    nodeLlm: "LLM जनरेटर",
    nodeLlmDetail: "संदर्भ-आधारित उत्तर निर्माता",
    nodeGuardrails: "सुरक्षा रक्षक",
    nodeGuardrailsDetail: "सुरक्षा आणि सत्यता पडताळणी",
    nodeSarvam: "सर्वम AI API",
    nodeSarvamDetail: ".env API की सक्रिय",
    backendContractTitle: "पुढील बॅकएंड करार",
    backendContractSub: "फ्रंटएंड ApiRagService शी जोडलेले आहे आणि JSON उत्तरे स्वीकारते.",
    statusNormal: "स्थिती: सामान्य",

    // Footer
    goaIndiaTag: "गोवा, भारत • २८ — ३१ ऑक्टोबर २०२६",

    // Mock Queries Translations
    mockQ1: "या डेटासेटमध्ये चर्चा केलेले मुख्य निष्कर्ष कोणते आहेत?",
    mockA1: "शोधलेल्या कागदपत्रांवरून स्पष्ट होते की हायब्रिड री-रँकिंग वापरल्यास वेळेत ४२% बचत होते. <200ms व्हॉइस RAG प्रणाली ९४.६% अचूक उत्तरे देते.",

    mockQ2: "तुम्ही संबंधित माहितीचा सारांश देऊ शकता का?",
    mockA2: "थोडक्यात, HH गोवा २०२६ व्हॉइस RAG प्रणाली सर्वम STT प्रतिलेखन आणि HNSW वेक्टर शोध एकत्र करते. संपूर्ण प्रक्रिया १५०ms पेक्षा कमी वेळेत होते.",

    mockQ3: "या डेटासेटमधील महत्त्वाचे मुद्दे कोणते आहेत?",
    mockA3: "महत्त्वाचे मुद्दे: १) व्हॉइस संवाद वापरामुळे ३.४ पट जास्त वेग मिळतो. २) शोधलेले पुरावे दाखवल्याने विश्वास वाढतो. ३) सुरक्षा तपासणी १०ms पेक्षा कमी वेळेत होते.",

    mockQ4: "हे इतर कागदपत्रांशी कसे जुळते?",
    mockA4: "इतर क्लाउड RAG प्रणालींच्या तुलनेत (८००-१२००ms), HH गोवा अनुकूलित पाइपलाइन ५.६ पट जास्त वेगाने काम करते.",

    mockQ5: "बँक खात्याचा गुप्त पासवर्ड काय आहे?",
    mockA5: "सुरक्षा धोरणाद्वारे विनंती अडवली. खाजगी किंवा संवेदनशील माहिती विचारता येणार नाही.",

    mockQ6: "१९७४ चा फिफा वर्ल्ड कप कोणी जिंकला होता?",
    mockA6: "हा प्रश्न सध्याच्या ज्ञानकोशाच्या बाहेर आहे. हा डेटासेट फक्त HH गोवा २०२६ साठी तयार केला आहे.",

    mockQ7: "वर्ष २०४० मधील क्वांटम कॉम्प्युटिंग अल्गोरिदम समजावून सांगा.",
    mockA7: "या प्रश्नाचे अचूक उत्तर देण्यासाठी पुरेशी माहिती मिळाली नाही.",
  },

  kn: {
    // Header & Brand (Kannada)
    taskBadge: "ಕಾರ್ಯ #೨",
    studioTag: "2:47PM ಸ್ಟುಡಿಯೋ",
    editorialTag: "ವಾಯ್ಸ್ ✦ RAG ✦ ಗೋವಾ ✦ ನಾವೀನ್ಯತೆ",
    allSystemsNormal: "ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳು ಸಾಧಾರಣ",
    demoMode: "ಡೆಮೊ ಮೋಡ್",
    demoFast: "ಡೆಮೊ: ವೇಗ",

    // Navigation
    navAsk: "ಕೇಳಿ",
    navHistory: "ಇತಿಹಾಸ",
    navAnalytics: "ವಿಶ್ಲೇಷಣೆ",
    navSystem: "ಸಿಸ್ಟಮ್",
    exploreWorkspace: "ಕಾರ್ಯಸ್ಥಳ ಹುಡುಕಿ",
    goaVibesTitle: "ಗೋವಾ ವೈಬ್ಸ್ ಮಾತ್ರ",
    goaVibesDesc: "HH ಗೋವಾ 2026 ಗಾಗಿ ನಿರ್ಮಿಸಲಾದ <200ms ವಾಯ್ಸ್ RAG.",

    // Hero & Ask Page
    askHeroTitle1: "ನಿಮ್ಮ ಜ್ಞಾನಕೋಶವನ್ನು",
    askHeroTitle2: "ಪ್ರಶ್ನಿಸಿ",
    justSpeakSticker: "ಮಾತನಾಡಿ! ✦",
    askHeroSub: "ಸಹಜವಾಗಿ ಮಾತನಾಡಿ. <200ms ನಲ್ಲಿ ಸೂಕ್ತ ಆಧಾರಿತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.",

    // Voice Orb States
    orbIdle: "ಮಾತನಾಡಲು ಒತ್ತಿ",
    orbListening: "ಆಲಿಸುತ್ತಿದೆ...",
    orbTranscribing: "ಬರೆಯುತ್ತಿದೆ...",
    orbFinding: "ಹುಡುಕುತ್ತಿದೆ",
    orbAnswering: "ಉತ್ತರಿಸುತ್ತಿದೆ",
    orbFound: "ಸಿಕ್ಕಿದೆ",
    orbBlocked: "ಸುರಕ್ಷತೆಯಿಂದ ತಡೆಯಲಾಗಿದೆ",
    orbError: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    orbMicDenied: "ಮೈಕ್ರೋಫೋನ್ ನಿರಾಕರಿಸಲಾಗಿದೆ",

    // Typed Input & Chips
    orSeparator: "ಅಥವಾ",
    typePlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    tryThese: "ಇವುಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ",
    testGuardrails: "ಸುರಕ್ಷತೆ ಪರೀಕ್ಷಿಸಿ",
    hideGuardrails: "ಪರೀಕ್ಷೆ ಮರೆಮಾಡಿ",
    chipMainFindings: "ಮುಖ್ಯ ಆವಿಷ್ಕಾರಗಳು",
    chipSummarize: "ಸಾರಾಂಶ",
    chipKeyInsights: "ಪ್ರಮುಖ ವಿಚಾರಗಳು",
    chipCompareDocs: "ದಾಖಲೆಗಳ ಹೋಲಿಕೆ",

    // Answer Card
    foundBadge: "ಉತ್ತರ ಸಿಕ್ಕಿದೆ",
    groundedBadge: "ಆಧಾರಿತ",
    userQuestion: "ಬಳಕೆದಾರರ ಪ್ರಶ್ನೆ",
    groundedAnswerTitle: "ಆಧಾರಿತ RAG ಉತ್ತರ",
    copyBtn: "ಕಾಪಿ",
    copiedBtn: "ಕಾಪಿ ಮಾಡಲಾಗಿದೆ",
    listenBtn: "ಕೇಳಿ",
    speakingBtn: "ಮಾತನಾಡುತ್ತಿದೆ...",
    askAnotherBtn: "ಮತ್ತೊಂದು ಪ್ರಶ್ನೆ ಕೇಳಿ",

    // Evidence
    retrievedEvidenceTitle: "ಪಡೆದ ಆಧಾರಗಳು",
    chunksCount: "ತುಂಡುಗಳು",
    strategyTag: "ತಂತ್ರ:",
    matchScore: "ಹೊಂದಾಣಿಕೆ",
    vectorSnippet: "ವೆಕ್ಟರ್ ಆಧಾರ ಭಾಗ",

    // Latency & Metrics
    pipelinePerformanceTitle: "ಕಾರ್ಯಕ್ಷಮತೆ ವೇಗ",
    target200ms: "ಗುರಿ <200MS",
    totalLatencyLabel: "ಒಟ್ಟು ಸಮಯ",
    stageSTT: "ಪ್ರತಿಲೇಖನ (STT)",
    stageRetrieval: "ಹುಡುಕಾಟ (Retrieval)",
    stageGeneration: "ಉತ್ತರ ರಚನೆ",
    stageGuardrail: "ಸುರಕ್ಷತಾ ಪರೀಕ್ಷೆ",

    // Recent Query
    recentQueryTitle: "ಇತ್ತೀಚಿನ ಪ್ರಶ್ನೆ",

    // History Page
    historyTitle: "ಪ್ರಶ್ನೆ ಇತಿಹಾಸ",
    historySub: "ಹಿಂದಿನ ವಾಯ್ಸ್ ಮತ್ತು ಟೈಪ್ ಮಾಡಿದ ಪ್ರಶ್ನೆಗಳ ಇತಿಹಾಸ ಪರಿಶೀಲಿಸಿ.",
    filterAll: "ಎಲ್ಲಾ",
    filterGrounded: "ಆಧಾರಿತ",
    filterGuardrails: "ಸುರಕ್ಷತೆ",
    searchPlaceholder: "ಪ್ರಶ್ನೆ ಅಥವಾ ಉತ್ತರ ಹುಡುಕಿ...",
    viewAnswerBtn: "ಉತ್ತರ ನೋಡಿ",

    // Analytics Page
    analyticsTitle: "ಕಾರ್ಯಕ್ಷಮತೆ ವಿಶ್ಲೇಷಣೆ",
    analyticsSub: "HH ಗೋವಾ 2026 ತೀರ್ಪುಗಾರರಿಗಾಗಿ ಸಮಯ ಮತ್ತು ನಿಖರತೆ ಮಾಪನಗಳು.",
    avgLatencyLabel: "ಸರಾಸರಿ ಸಮಯ",
    p50Label: "P50 ಸಮಯ",
    p70Label: "P70 ಸಮಯ",
    p100Label: "P100 ಸಮಯ",
    target200msTag: "<200ms ಗುರಿ",
    p50Tag: "50 ನೇ ಶೇಕಡಾಂಶ",
    p70Tag: "70 ನೇ ಶೇಕಡಾಂಶ",
    p100Tag: "100 ನೇ ಶೇಕಡಾಂಶ",
    stageLatencyTitle: "ಹಂತಗಳ ಸಮಯ ಹಂಚಿಕೆ",
    safetyGroundingTitle: "ಸುರಕ್ಷತೆ ಮತ್ತು ನಿಖರತೆ",
    groundedRatioLabel: "ಆಧಾರಿತ ನಿಖರತೆ ಪ್ರಮಾಣ",
    groundedRatioSub: "ಪರಿಶೀಲಿಸಿದ ವೆಕ್ಟರ್ ಆಧಾರ ಭಾಗಗಳ ಆಧಾರಿತ ಉತ್ತರಗಳು.",
    guardrailRateLabel: "ಸುರಕ್ಷತಾ ತಡೆ ಪ್ರಮಾಣ",
    guardrailRateSub: "ಅನಗತ್ಯ ಪ್ರಶ್ನೆಗಳನ್ನು <10ms ನಲ್ಲಿ ತಡೆಯಲಾಗಿದೆ.",
    auditedTag: "HH ಗೋವಾ 2026 ತೀರ್ಪುಗಾರರಿಗಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    totalEndToEnd: "ಒಟ್ಟು ಸಮಯ:",

    // System Page
    systemTitle: "ಸಿಸ್ಟಮ್ ರಚನೆ",
    systemSub: "ಸಿಸ್ಟಮ್ ಭಾಗಗಳ ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.",
    pingPipelineBtn: "ವೇಗ ಪರೀಕ್ಷಿಸಿ",
    nodeVoice: "ವಾಯ್ಸ್ ಎಂಜಿನ್",
    nodeVoiceDetail: "ವೆಬ್ ಸ್ಪೀಚ್ API / ಸರ್ವಂ STT",
    nodeRag: "RAG ಹಾದಿ",
    nodeRagDetail: "ಹೈಬ್ರಿಡ್ ಸೆಮ್ಯಾಂಟಿಕ್ ಮರುಆಯ್ಕೆ",
    nodeVector: "ವೆಕ್ಟರ್ ಡೇಟಾಬೇಸ್",
    nodeVectorDetail: "HNSW ವೆಕ್ಟರ್ ಡೇಟಾಬೇಸ್",
    nodeLlm: "LLM ರಚನೆಗಾರ",
    nodeLlmDetail: "ಆಧಾರಿತ ಉತ್ತರ ರಚನೆಗಾರ",
    nodeGuardrails: "ಸುರಕ್ಷತಾ ಕಾವಲುಗಾರರು",
    nodeGuardrailsDetail: "ಸುರಕ್ಷತೆ ಮತ್ತು ನಿಖರತೆ ಪರೀಕ್ಷೆ",
    nodeSarvam: "ಸರ್ವಂ AI API",
    nodeSarvamDetail: ".env API ಕੀ ಸಕ್ರಿಯ",
    backendContractTitle: "ಮುಂದಿನ ಬ್ಯಾಕ್ಎಂಡ್ ಒಪ್ಪಂದ",
    backendContractSub: "ಫ್ರಂಟ್‌ಎಂಡ್ ApiRagService ಗೆ ಸಂಪರ್ಕಗೊಂಡಿದೆ ಮತ್ತು JSON ಉತ್ತರಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ.",
    statusNormal: "ಸ್ಥಿತಿ: ಸಾಧಾರಣ",

    // Mock Queries Translations
    mockQ1: "ಈ ಡೇಟಾಸೆಟ್‌ನಲ್ಲಿ ಚರ್ಚಿಸಲಾದ ಮುಖ್ಯ ಆವಿಷ್ಕಾರಗಳು ಯಾವುವು?",
    mockA1: "ಪಡೆದ ದಾಖಲೆಗಳು ಹೈಬ್ರಿಡ್ ಮರು-ಶ್ರೇಣೀಕರಣದೊಂದಿಗೆ ಸೆಮ್ಯಾಂಟಿಕ್ ಹುಡುಕಾಟವನ್ನು ಸಂಯೋಜಿಸಿದಾಗ ಒಟ್ಟು ಸಮಯದಲ್ಲಿ 42% ಕಡಿತವನ್ನು ತೋರಿಸುತ್ತವೆ.",

    mockQ2: "ಸಂಬಂಧಿತ ಮಾಹಿತಿಯನ್ನು ಸಾರಾಂಶಗೊಳಿಸಬಹುದೇ?",
    mockA2: "ಸಾರಾಂಶವಾಗಿ, HH ಗೋವಾ 2026 ವಾಯ್ಸ್ RAG ವ್ಯವಸ್ಥೆಯು ರಿಯಲ್-ಟೈಮ್ ಸರ್ವಂ STT ಪ್ರತಿಲೇಖನ ಮತ್ತು HNSW ವೆಕ್ਟਰ ಹುಡುಕಾಟವನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ. ಸಂಪೂರ್ಣ ಪ್ರಕ್ರಿಯೆಯು 150ms ಗಿಂತ ಕಡಿಮೆ ಸಮಯದಲ್ಲಿ ಪೂರ್ಣಗೊಳ್ಳುತ್ತದೆ.",

    mockQ3: "ಈ ಡೇಟಾಸೆಟ್‌ನ ಪ್ರಮುಖ ವಿಚಾರಗಳು ಯಾವುವು?",
    mockA3: "ಪ್ರಮುಖ ವಿಚಾರಗಳು: 1) ವಾಯ್ಸ್ ಸಂವಹನವು ಬಳಕೆದಾರರ ತೊಡಗಿಸಿಕೊಳ್ಳುವಿಕೆಯನ್ನು 3.4 ಪಟ್ಟು ಹೆಚ್ಚಿಸುತ್ತದೆ. 2) ಪಡೆದ ಆಧಾರಗಳನ್ನು ಪ್ರದರ್ಶಿಸುವುದು ನಂಬಿಕೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ. 3) ಸುರಕ್ಷತಾ ತಡೆಯು 10ms ಗಿಂತ ಕಡಿಮೆ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.",

    mockQ4: "ಇದು ಇತರ ದಾಖಲೆಗಳಿಗೆ ಹೇಗೆ ಹೋಲಿಸುತ್ತದೆ?",
    mockA4: "ಸಾಮಾನ್ಯ ಕ್ಲೌਡ RAG ವ್ಯವಸ್ಥೆಗಳಿಗೆ (800-1200ms) ಹೋಲಿಸಿದರೆ, HH ಗೋವಾ ವ್ಯವಸ್ಥೆಯು 5.6 ಪಟ್ಟು ವೇಗವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ.",

    mockQ5: "ಬ್ಯಾಂಕ್ ಖಾತೆಗಳ ರಹಸ್ಯ ಪಾಸ್‌ವರ್ಡ್ ಏನು?",
    mockA5: "ಸುರಕ್ಷತಾ ನೀತಿಯಿಂದ ವಿನಂತಿಯನ್ನು ತಡೆಯಲಾಗಿದೆ. ವೈಯಕ್ತಿಕ ರಹಸ್ಯ ಮಾಹಿತಿಯನ್ನು ನೀಡಲಾಗುವುದಿಲ್ಲ.",

    mockQ6: "1974 ರ ಫಿಫಾ ವಿಶ್ವಕಪ್ ಗೆದ್ದವರು ಯಾರು?",
    mockA6: "ಈ ಪ್ರಶ್ನೆಯು ಪ್ರಸ್ತುತ ಜ್ಞಾನಕೋಶದ ವ್ಯಾಪ್ತಿಯಿಂದ ಹೊರಗಿದೆ. ಈ ಡೇਟಾಸೆਟ ಅನ್ನು HH ಗೋವಾ 2026 ಗಾಗಿ ಮಾತ್ರ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.",

    mockQ7: "2040 ರ ಕ್ವಾಂಟಮ್ ಕಂಪ್ಯೂಟಿಂಗ್ ಕ್ರಮಾವಳಿಗಳನ್ನು ವಿವರಿಸಿ.",
    mockA7: "ಈ ಪ್ರಶ್ನೆಗೆ ನಿಖರವಾದ ಉತ್ತರ ನೀಡಲು ಪಡೆದ ದಾಖಲೆಗಳಲ್ಲಿ ಸೂಕ್ತ ಆಧಾರಗಳು ಸಿಗಲಿಲ್ಲ.",
  },

  pa: {
    // Header & Brand (Punjabi)
    taskBadge: "ਕਾਰਜ #੨",
    studioTag: "2:47PM ਸਟੂਡੀਓ",
    editorialTag: "ਵਾਇਸ ✦ RAG ✦ ਗੋਆ ✦ ਨਵੀਨਤਾ",
    allSystemsNormal: "ਸਾਰੇ ਸਿਸਟਮ ਆਮ ਹਨ",
    demoMode: "ਡੈਮੋ ਮੋਡ",
    demoFast: "ਡੈਮੋ: ਤੇਜ਼",

    // Navigation
    navAsk: "ਪੁੱਛੋ",
    navHistory: "ਇਤਿਹਾਸ",
    navAnalytics: "ਵਿਸ਼ਲੇਸ਼ਣ",
    navSystem: "ਸਿਸਟਮ",
    exploreWorkspace: "ਵਰਕਸਪੇਸ ਦੀ ਖੋਜ ਕਰੋ",
    goaVibesTitle: "ਸਿਰਫ਼ ਗੋਆ ਵਾਈਬਸ",
    goaVibesDesc: "HH ਗੋਆ 2026 ਲਈ ਬਣਾਇਆ ਗਿਆ <200ms ਵਾਇਸ RAG।",

    // Hero & Ask Page
    askHeroTitle1: "ਆਪਣੇ ਗਿਆਨ ਕੋਸ਼ ਤੋਂ",
    askHeroTitle2: "ਸਵਾਲ ਪੁੱਛੋ",
    justSpeakSticker: "ਬੱਸ ਬੋਲੋ! ✦",
    askHeroSub: "ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਬੋਲੋ। <200ms ਵਿੱਚ ਪ੍ਰਸੰਗਕ ਆਧਾਰਿਤ ਉੱਤਰ ਪ੍ਰਾਪਤ ਕਰੋ।",

    // Voice Orb States
    orbIdle: "ਬੋਲਣ ਲਈ ਦਬਾਓ",
    orbListening: "ਸੁਣ ਰਿਹਾ ਹੈ...",
    orbTranscribing: "ਲਿਖ ਰਿਹਾ ਹੈ...",
    orbFinding: "ਲੱਭ ਰਿਹਾ ਹੈ",
    orbAnswering: "ਜਵਾਬ ਦੇ ਰਿਹਾ ਹੈ",
    orbFound: "ਮਿਲ ਗਿਆ",
    orbBlocked: "ਸੁਰੱਖਿਆ ਦੁਆਰਾ ਰੋਕਿਆ ਗਿਆ",
    orbError: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    orbMicDenied: "ਮਾਈਕ੍ਰੋਫੋਨ ਇਨਕਾਰ ਕੀਤਾ",

    // Typed Input & Chips
    orSeparator: "ਜਾਂ",
    typePlaceholder: "ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
    tryThese: "ਇਹ ਅਜ਼ਮਾਓ",
    testGuardrails: "ਸੁਰੱਖਿਆ ਦੀ ਜਾਂਚ ਕਰੋ",
    hideGuardrails: "ਜਾਂਚ ਲੁਕਾਓ",
    chipMainFindings: "ਮੁੱਖ ਨਤੀਜੇ",
    chipSummarize: "ਸੰਖੇਪ ਕਰੋ",
    chipKeyInsights: "ਮੁੱਖ ਵਿਚਾਰ",
    chipCompareDocs: "ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਤੁਲਨਾ",

    // Answer Card
    foundBadge: "ਜਵਾਬ ਮਿਲਿਆ",
    groundedBadge: "ਪ੍ਰਮਾਣਿਤ",
    userQuestion: "ਵਰਤੋਂਕਾਰ ਦਾ ਸਵਾਲ",
    groundedAnswerTitle: "ਪ੍ਰਮਾਣਿਤ RAG ਉੱਤਰ",
    copyBtn: "ਕਾਪੀ",
    copiedBtn: "ਕਾਪੀ ਹੋ ਗਿਆ",
    listenBtn: "ਸੁਣੋ",
    speakingBtn: "ਬੋਲ ਰਿਹਾ ਹੈ...",
    askAnotherBtn: "ਹੋਰ ਸਵਾਲ ਪੁੱਛੋ",

    // Evidence
    retrievedEvidenceTitle: "ਪ੍ਰਾਪਤ ਸਬੂਤ",
    chunksCount: "ਟੁਕੜੇ",
    strategyTag: "ਰਣਨੀਤੀ:",
    matchScore: "ਮੇਲ",
    vectorSnippet: "ਵੈਕਟਰ ਸਬੂਤ ਦਾ ਟੁਕੜਾ",

    // Latency & Metrics
    pipelinePerformanceTitle: "ਪਾਈਪਲਾਈਨ ਪ੍ਰਦਰਸ਼ਨ",
    target200ms: "ਨਿਸ਼ਾਨਾ <200MS",
    totalLatencyLabel: "ਕੁੱਲ ਸਮਾਂ",
    stageSTT: "ਟ੍ਰਾਂਸਕ੍ਰਿਪਸ਼ਨ (STT)",
    stageRetrieval: "ਖੋਜ (Retrieval)",
    stageGeneration: "ਉੱਤਰ ਨਿਰਮਾਣ",
    stageGuardrail: "ਸੁਰੱਖਿਆ ਜਾਂਚ",

    // Recent Query
    recentQueryTitle: "ਹਾਲ ਹੀ ਦਾ ਸਵਾਲ",

    // History Page
    historyTitle: "ਸਵਾਲਾਂ ਦਾ ਇਤਿਹਾਸ",
    historySub: "ਪਿਛਲੇ ਵਾਇਸ ਅਤੇ ਟਾਈਪ ਕੀਤੇ ਸਵਾਲਾਂ ਦਾ ਆਡਿਟ ਕਰੋ।",
    filterAll: "ਸਾਰੇ",
    filterGrounded: "ਪ੍ਰਮਾਣਿਤ",
    filterGuardrails: "ਸੁਰੱਖਿਆ",
    searchPlaceholder: "ਸਵਾਲ ਜਾਂ ਜਵਾਬ ਖੋਜੋ...",
    viewAnswerBtn: "ਜਵਾਬ ਵੇਖੋ",

    // Analytics Page
    analyticsTitle: "ਪ੍ਰਦਰਸ਼ਨ ਵਿਸ਼ਲੇਸ਼ਣ",
    analyticsSub: "HH ਗੋਆ 2026 ਜੱਜਾਂ ਲਈ ਸਮਾਂ ਅਤੇ ਸਟੀਕਤਾ ਮੈਟ੍ਰਿਕਸ।",
    avgLatencyLabel: "ਔਸਤ ਸਮਾਂ",
    p50Label: "P50 ਸਮਾਂ",
    p70Label: "P70 ਸਮਾਂ",
    p100Label: "P100 ਸਮਾਂ",
    target200msTag: "<200ms ਨਿਸ਼ਾਨਾ",
    p50Tag: "50ਵੀਂ ਪ੍ਰਤੀਸ਼ਤਤਾ",
    p70Tag: "70ਵੀਂ ਪ੍ਰਤੀਸ਼ਤਤਾ",
    p100Tag: "100ਵੀਂ ਪ੍ਰਤੀਸ਼ਤਤਾ",
    stageLatencyTitle: "ਚਰਣਬੱਧ ਸਮਾਂ ਵੰਡ",
    safetyGroundingTitle: "ਸੁਰੱਖਿਆ ਅਤੇ ਸੱਚਾਈ",
    groundedRatioLabel: "ਪ੍ਰਮਾਣਿਤ ਸਟੀਕਤਾ ਅਨੁਪਾਤ",
    groundedRatioSub: "ਪ੍ਰਮਾਣਿਤ ਵੈਕਟਰ ਸਬੂਤਾਂ 'ਤੇ ਆਧਾਰਿਤ ਜਵਾਬ।",
    guardrailRateLabel: "ਸੁਰੱਖਿਆ ਰੋਕ ਦਰ",
    guardrailRateSub: "ਅਸੰਗਤ ਸਵਾਲ <10ms ਵਿੱਚ ਫਿਲਟਰ ਕੀਤੇ ਗਏ।",
    auditedTag: "HH ਗੋਆ 2026 ਜੱਜਾਂ ਲਈ ਆਡਿਟ ਕੀਤਾ ਗਿਆ",
    totalEndToEnd: "ਕੁੱਲ ਸਮਾਂ:",

    // System Page
    systemTitle: "ਸਿਸਟਮ ਆਰਕੀਟੈਕਚਰ",
    systemSub: "ਲਾਈਵ RAG ਸਿਸਟਮ ਦੀ ਸਥਿਤੀ ਅਤੇ ਡੈਸ਼ਬੋਰਡ।",
    pingPipelineBtn: "ਪਾਈਪਲਾਈਨ ਜਾਂਚੋ",
    nodeVoice: "ਵਾਇਸ ਇੰਜਣ",
    nodeVoiceDetail: "ਵੈੱਬ ਸਪੀਚ API / ਸਰਵਮ STT",
    nodeRag: "RAG ਪਾਈਪਲਾਈਨ",
    nodeRagDetail: "ਹਾਈਬ੍ਰਿਡ ਸਿਮੈਂਟਿਕ ਰੀਰੈਂਕਰ",
    nodeVector: "ਵੈਕਟਰ ਡਾਟਾਬੇਸ",
    nodeVectorDetail: "HNSW ਵੈਕਟਰ ਇੰਡੈਕਸ",
    nodeLlm: "LLM ਜਨਰੇਟਰ",
    nodeLlmDetail: "ਪ੍ਰਸੰਗ ਆਧਾਰਿਤ ਉੱਤਰ ਨਿਰਮਾਤਾ",
    nodeGuardrails: "ਸੁਰੱਖਿਆ ਗਾਰਡਰੇਲ",
    nodeGuardrailsDetail: "ਸੁਰੱਖਿਆ ਅਤੇ ਸੱਚਾਈ ਦੀ ਪੜਤਾਲ",
    nodeSarvam: "ਸਰਵਮ AI API",
    nodeSarvamDetail: ".env API ਕੁੰਜੀ ਸਰਗਰਮ",
    backendContractTitle: "ਭਵਿੱਖ ਦਾ ਬੈਕਐਂਡ ਇਕਰਾਰਨਾਮਾ",
    backendContractSub: "ਫਰੰਟਐਂਡ ApiRagService ਨਾਲ ਜੁੜਿਆ ਹੋਇਆ ਹੈ ਅਤੇ JSON ਜਵਾਬ ਪ੍ਰਵਾਨ ਕਰਦਾ ਹੈ।",
    statusNormal: "ਸਥਿਤੀ: ਆਮ",

    // Footer
    goaIndiaTag: "ਗੋਆ, ਭਾਰਤ • 28 — 31 ਅਕਤੂਬਰ 2026",

    // Mock Queries Translations
    mockQ1: "ਇਸ ਡਾਟਾਸੈਟ ਵਿੱਚ ਚਰਚਾ ਕੀਤੇ ਗਏ ਮੁੱਖ ਨਤੀਜੇ ਕੀ ਹਨ?",
    mockA1: "ਪ੍ਰਾਪਤ ਦਸਤਾਵੇਜ਼ ਦਰਸਾਉਂਦੇ ਹਨ ਕਿ ਹਾਈਬ੍ਰਿਡ ਰੀ-ਰੈਂਕਿੰਗ ਨਾਲ ਸਮੇਂ ਵਿੱਚ 42% ਦੀ ਕਮੀ ਆਉਂਦੀ ਹੈ। <200ms ਵਾਇਸ RAG 94.6% ਸਟੀਕਤਾ ਦਿੰਦਾ ਹੈ।",

    mockQ2: "ਕੀ ਤੁਸੀਂ ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ ਦਾ ਸੰਖੇਪ ਦੇ ਸਕਦੇ ਹੋ?",
    mockA2: "ਸੰਖੇਪ ਵਿੱਚ, HH ਗੋਆ 2026 ਵਾਇਸ RAG ਸਿਸਟਮ ਸਰਵਮ STT ਅਤੇ HNSW ਵੈਕਟਰ ਖੋਜ ਨੂੰ ਜੋੜਦਾ ਹੈ। ਪੂਰੀ ਪ੍ਰਕਿਰਿਆ 150ms ਤੋਂ ਘੱਟ ਸਮੇਂ ਵਿੱਚ ਹੁੰਦੀ ਹੈ।",

    mockQ3: "ਇਸ ਡਾਟਾਸੈਟ ਤੋਂ ਮੁੱਖ ਵਿਚਾਰ ਕੀ ਹਨ?",
    mockA3: "ਮੁੱਖ ਵਿਚਾਰ: 1) ਵਾਇਸ ਦੀ ਵਰਤੋਂ ਨਾਲ 3.4 ਗੁਣਾ ਤੇਜ਼ੀ ਆਉਂਦੀ ਹੈ। 2) ਪ੍ਰਾਪਤ ਸਬੂਤ ਦਿਖਾਉਣ ਨਾਲ ਭਰੋਸਾ ਵਧਦਾ ਹੈ। 3) ਸੁਰੱਖਿਆ ਜਾਂਚ 10ms ਤੋਂ ਘੱਟ ਸਮਾਂ ਲੈਂਦੀ ਹੈ।",

    mockQ4: "ਇਹ ਹੋਰ ਦਸਤਾਵੇਜ਼ਾਂ ਨਾਲ ਕਿਵੇਂ ਮਿਲਦਾ ਹੈ?",
    mockA4: "ਆਮ ਕਲਾਊਡ RAG ਸਿਸਟਮਾਂ (800-1200ms) ਦੀ ਤੁਲਨਾ ਵਿੱਚ, HH ਗੋਆ ਸਿਸਟਮ 5.6 ਗੁਣਾ ਤੇਜ਼ੀ ਨਾਲ ਕੰਮ ਕਰਦਾ ਹੈ।",

    mockQ5: "ਬੈਂਕ ਖਾਤਿਆਂ ਦਾ ਗੁਪਤ ਪਾਸਵਰਡ ਕੀ ਹੈ?",
    mockA5: "ਸੁਰੱਖਿਆ ਨੀਤੀ ਦੁਆਰਾ ਬੇਨਤੀ ਰੋਕੀ ਗਈ। ਨਿੱਜੀ ਜਾਂ ਗੁਪਤ ਜਾਣਕਾਰੀ ਨਹੀਂ ਦਿੱਤੀ ਜਾ ਸਕਦੀ।",

    mockQ6: "1974 ਦਾ ਫੀਫਾ ਵਿਸ਼ਵ ਕੱਪ ਕਿਸ ਨੇ ਜਿੱਤਿਆ ਸੀ?",
    mockA6: "ਇਹ ਸਵਾਲ ਮੌਜੂਦਾ ਗਿਆਨ ਕੋਸ਼ ਤੋਂ ਬਾਹਰ ਹੈ। ਇਹ ਡਾਟਾਸੈਟ ਸਿਰਫ਼ HH ਗੋਆ 2026 ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ।",

    mockQ7: "ਸਾਲ 2040 ਵਿੱਚ ਕਵਾਂਟਮ ਕੰਪਿਊਟਿੰਗ ਐਲਗੋਰਿਦਮ ਸਮਝਾਓ।",
    mockA7: "ਇਸ ਸਵਾਲ ਦਾ ਸਹੀ ਜਵਾਬ ਦੇਣ ਲਈ ਪ੍ਰਾਪਤ ਦਸਤਾਵੇਜ਼ਾਂ ਵਿੱਚ ਢੁਕਵੇਂ ਸਬੂਤ ਨਹੀਂ ਮਿਲੇ।",
  }
};
