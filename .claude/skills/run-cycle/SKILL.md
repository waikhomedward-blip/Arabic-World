---
name: run-cycle
description: Run one Arabic World improvement cycle (test → review → improve → research → commit). Use when asked to "continue the cycle", "run cycle N" or "keep improving".
---

1. Read `CLAUDE.md`, `LESSONS.md`, `STATE.md` and the last `docs/CYCLE_LOG.md` entry. Note the cycle number N.
2. **Test:** `npm run lab` (≈5 min). Read `lab/results/cycle-NNN/summary.md`. Suite R must be 100%.
3. **Review:** compare with the previous and best row in `lab/scoreboard.json`. Look at 5+ screenshots in `lab/results/e2e/` (different devices and places). Pick the top 3–5 problems by player impact.
4. **Improve:** one small slice per problem. Content goes through `tools/author.ts`. After any UI or world change, use the `verify` skill.
5. Keep a change only if the score improves or a bug is fixed, and Suite R stays 100%; otherwise revert.
6. **Research** only when stuck; Muslim sources first; log in `docs/SOURCES.md` and `docs/DECISIONS.md`.
7. **Commit + push**, then update `STATE.md` and append the honest cycle entry (effort used, what got better/worse, what is unverified).
8. Every 10th cycle: deep review + `docs/reports/milestone-NN.html`.
