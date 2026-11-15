# Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-11-16 | Node 18 is installed, so pin Vite 5, Vitest 2, R3F 8 / React 18 | Vite 7 needs Node 20.19+; avoid asking Edward to upgrade |
| 2026-11-16 | Characters are procedural primitives (body + smooth sphere head) until MPFB2 GLBs exist | Guarantees "no faces" by construction; zero licence risk |
| 2026-11-16 | Baseline renderer is WebGL2 (Tier 2); splats deferred | Tier 2 must run on every phone; no captured scenes yet |
| 2026-11-16 | Typed-answer checker is rule-based, no AI grader | Build rule 8 |
| 2026-11-16 | Quran import deferred until Edward OKs downloading the Tanzil text | Downloads need his OK; importer and verbatim check are ready |
| 2026-11-16 | No audio files yet; audio manager enforces adhan mute in code and manifest | No licensed adhan; no TTS keys |
