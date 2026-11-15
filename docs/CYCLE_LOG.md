# Cycle log

## Cycle 1 — 2026-11-16 (foundations)
**Goal:** a repo where nothing that breaks the hard rules can enter, plus a first playable slice.
**Effort:** medium for building; high for Suite R, checker and ladder verification.

- **Built:** CLAUDE.md, docs, content pipeline (tashkeel validator, coverage, Tanzil importer with verbatim checks), scene engine, ladder, director, checker, R3F world, reply UI, lab suites R/C/G/L, scoreboard.
- **Scores:** overall 76.2; R 100%; C 99.6%; G 100% (0 crashes over 192 bot/fuzz runs); checker 100% of 1,125 slip items, zero root-changing accepts; learners median 21/35 retained.
- **Honest review:** the score flatters the build. C passes because content is small; P/S/V are 0 and unbuilt. Only 20% of lemmas reach ~10 encounters.
- **Top problems:** (1) only 3 of 10 days; (2) retention 60% < 80% target; (3) slow learners frustrated in typing-only modes; (4) no audio or voices; (5) no performance data.
- **Fixed during cycle:** camera stood inside a building on phone screens; correct-answer confirmation was skipped; tashkeel rule for the lam of ٱللّٰه.
- **Research:** none needed this cycle.
