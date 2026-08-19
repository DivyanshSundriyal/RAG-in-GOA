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
