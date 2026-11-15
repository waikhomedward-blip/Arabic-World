# Scoring (overall quality score, 0–100)

If **Suite R** is below 100%, the overall score is **0**.

| Part | Weight | Measure |
|---|---|---|
| Suite C (content & pedagogy) | 25 | pass rate |
| Suite G (gameplay bots, fuzz, save/load) | 15 | pass rate |
| Typed-answer checker | 15 | pass rate of checker cases (target ≥ 99%, zero root-changing accepts) |
| Ladder + director rules | 10 | pass rate |
| Synthetic learners | 15 | min(1, median retained fraction after 7-day break ÷ 0.8) |
| Suite P (performance) | 10 | 0 until built |
| Suite S (speech, Job 1) | 5 | 0 until built (voice stays off; does not block "very good") |
| Suite V (visual rubric) | 5 | 0 until built |

Weights may be retuned only at a 10-cycle deep review, with the reason in `docs/DECISIONS.md`.
