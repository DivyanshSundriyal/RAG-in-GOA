# HH GOA 2026 — VOICE-ENABLED RAG SYSTEM (TASK #2)

A voice-enabled Retrieval-Augmented Generation (RAG) system built for **HH GOA 2026 (Task #2)**, designed with Goan tropical retro editorial graphic design aesthetics inspired by 2:47 PM Studio.

---

## 🌟 Key Features

1. **Voice-First RAG Flow**: Speak naturally to query your knowledge base or use typed input fallback.
2. **Sub-200ms Target Latency**: Displays P50 (128ms), P70 (151ms), P100 (188ms), and full 4-stage pipeline latency breakdown (STT 82ms, Retrieval 18ms, LLM Generation 74ms, Guardrails 9ms).
3. **Grounded RAG Evidence**: Displays transparent retrieved document chunks with vector similarity scores, document titles, and vector IDs.
4. **Sarvam AI STT & TTS Integration**: Pre-configured with Sarvam AI API for Indian accent speech recognition (`saarika:v2`) and voice synthesis (`bulbul:v1`).
5. **Guardrail & Safety Protocols**: Built-in visual handling for `OFF_TOPIC`, `UNSAFE`, `NO_CONTEXT`, `LOW_CONFIDENCE`, and `BACKEND_FAILURE` states.
6. **Deterministic Demo Mode**: Toggle `DEMO MODE` or append `?demo=true` to the URL for fast, deterministic hackathon judging demonstrations.
7. **Clean Service Layer**: Decoupled architecture using `RagService` interface allowing seamless swapping between `MockRagService` and `ApiRagService`.

---

## 🎨 Design Language

- **Colors**:
  - Deep Goa Green `#006B3C`
  - Dark Tropical Green `#004E32`
  - Cream / Paper `#F7F0DB`
  - Sun Yellow `#FFD400`
  - Hot Pink `#FF0B78`
  - Light Tropical Green `#79C968`
  - White `#FFFDF5`
- **Typography**: High-contrast editorial display serif (`DM Serif Display`), clean body (`Plus Jakarta Sans`), technical mono (`JetBrains Mono`).
- **Texture**: Tactile printed paper cards, retro stickers, screen-print dots, and Goan beach poster artwork background (`/pic/goa_bg.png`).

---

## 📁 Folder Structure

```
voice-rag-goa/
├── .env                       # Single environment config (VITE_SARVAM_API_KEY & VITE_API_BASE_URL)
├── public/
│   └── pic/
│       └── goa_bg.png        # Goan retro poster artwork background image
├── src/
│   ├── components/
│   │   ├── brand/             # Header, HH GOA '26 & 2:47 PM Studio branding
│   │   ├── navigation/        # Desktop side rail & mobile bottom navigation
│   │   ├── illustrations/     # Goa illustrated background layer & palm accents
│   │   ├── voice/             # Hero Microphone Orb & animated rings
│   │   ├── waveform/          # 24-bar dynamic audio waveform
│   │   ├── input/             # Typed fallback pill & quick suggestion chips
│   │   ├── answer/            # Editorial answer display, grounded badge, TTS & copy
│   │   ├── evidence/          # Accordion of 5 retrieved evidence chunks with vector scores
│   │   ├── latency/           # Pipeline latency breakdown & quantile cards
│   │   ├── recent/            # Floating recent query card
│   │   ├── guardrails/        # Dedicated safety/error policy state banners
│   │   └── footer/            # Minimal Goan footer
│   ├── pages/
│   │   ├── Ask.tsx            # Hero main RAG experience
│   │   ├── History.tsx        # Audit log of past voice/typed queries
│   │   ├── Analytics.tsx      # Hackathon latency & factuality metrics
│   │   └── System.tsx         # Service components health status & API tester
│   ├── services/
│   │   └── rag/               # RagService interface, MockRagService, ApiRagService, SarvamService
│   ├── hooks/                 # useRagQuery, useVoice, usePipeline
│   ├── data/                  # Predefined mock queries & response contracts
│   ├── types/                 # RAG TypeScript definitions
│   └── styles/                # tokens.css & Tailwind index.css
```

---

## 🚀 Environment Setup

The root directory contains a single `.env` file:

```env
VITE_SARVAM_API_KEY=sk_gzti0uvc_pITxt1Z0LruBUlkvx5eQlFLy
VITE_API_BASE_URL=/api
```

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build Production Distribution**:
   ```bash
   npm run build
   ```

---

## ⚡ Future Backend API Contract

To integrate with the teammate's ML backend, configure `VITE_API_BASE_URL` and instantiate `ApiRagService`.

### POST `/api/rag/query`

**Request Body**:
```json
{
  "query": "What are the main findings discussed in this dataset?",
  "sessionId": "session_1786789",
  "isVoice": true,
  "demoMode": false
}
```

**Response Body**:
```json
{
  "id": "query_001",
  "query": "What are the main findings discussed in this dataset?",
  "transcription": {
    "text": "What are the main findings discussed in this dataset?",
    "confidence": 0.98
  },
  "answer": {
    "text": "The retrieved documents indicate a 42% reduction in end-to-end latency...",
    "confidence": 0.94,
    "grounded": true
  },
  "retrieval": {
    "strategy": "hybrid-semantic",
    "chunksRetrieved": 5,
    "results": [
      {
        "id": "doc_001",
        "title-[#HH GOA RAG Architecture]",
        "score": 0.96,
        "snippet": "Dense embedding models..."
      }
    ]
  },
  "performance": {
    "transcriptionMs": 82,
    "retrievalMs": 18,
    "generationMs": 74,
    "guardrailMs": 9,
    "totalMs": 143,
    "p50": 128,
    "p70": 151,
    "p100": 188
  },
  "guardrail": {
    "status": "allowed"
  }
}
```
