# Cycle 1

Overall: **76.2** / 100 · Suite R 100.0% · cases 1468 · failures 8

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.6% | lemmas=35, days=3, scenes=6, tenEncounterShare=0.2, minSceneCoverage=0.231, meanSceneCoverage=0.649 |
| G | 100.0% | crashes=0 |
| L | 82.9% | checkerItems=1125, checkerAccuracy=1, learners=120, auto:medianRetained=21, auto:slowFrustrationPerDay=0.17, auto:boredomDays=0.01, musafir:medianRetained=21, musafir:slowFrustrationPerDay=0.05, musafir:boredomDays=0, talib:medianRetained=21, talib:slowFrustrationPerDay=1.07, talib:boredomDays=0, muqim:medianRetained=21, muqim:slowFrustrationPerDay=1.62, muqim:boredomDays=0, retainedFraction=0.6 |
| S | not built |  |
| P | not built |  |
| V | not built |  |

## Failures
- [C] ten-days-authored — 3 days
- [C] lemma-target-150 — 35 lemmas
- [L] learners:auto:median-retained>=80%-of-lemmas — 21/35
- [L] learners:musafir:median-retained>=80%-of-lemmas — 21/35
- [L] learners:talib:slow-frustration<=1/day — 1.07
- [L] learners:talib:median-retained>=80%-of-lemmas — 21/35
- [L] learners:muqim:slow-frustration<=1/day — 1.62
- [L] learners:muqim:median-retained>=80%-of-lemmas — 21/35