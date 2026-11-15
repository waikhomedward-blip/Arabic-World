# What the lab cannot prove
- **Synthetic learners are a toy model** (memory strength + forgetting). They estimate; they do not replace real players.
- **No real voices yet**: lines are caption-only until male TTS is rendered (needs a free Azure/Google key in a local `.env`).
- **Face check is structural** (part names, single smooth sphere head, source scan). The render + face-detector check (MediaPipe) is not built yet.
- **Music check is structural** (no oscillators, audio manifest kinds). The pitch/periodicity analyser is not built yet (no audio files exist).
- **Performance** is not measured yet; Playwright browsers are not downloaded. Simulators are not real phones.
- **Arabic naturalness** is checked by the author only; a native speaker must read every line (see `docs/HUMAN_CHECKS.md`).
- **Quran meter** cannot be computed until the Tanzil text is imported.
