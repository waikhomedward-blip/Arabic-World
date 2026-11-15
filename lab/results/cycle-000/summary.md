# Cycle 0

Overall: **76.7** / 100 · Suite R 100.0% · cases 1448 · failures 9

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.5% | lemmas=35, days=3, scenes=6, tenEncounterShare=0.2, minSceneCoverage=0.231, meanSceneCoverage=0.649 |
| G | 100.0% | crashes=0 |
| L | 82.9% | checkerItems=1141, checkerAccuracy=1, learners=120, auto:medianRetained=22, auto:slowFrustrationPerDay=0.2, auto:boredomDays=0, musafir:medianRetained=25, musafir:slowFrustrationPerDay=0, musafir:boredomDays=0, talib:medianRetained=23, talib:slowFrustrationPerDay=1.12, talib:boredomDays=0, muqim:medianRetained=24, muqim:slowFrustrationPerDay=1.67, muqim:boredomDays=0, retainedFraction=0.629 |
| S | not built |  |
| P | not built |  |
| V | not built |  |

## Failures
- [C] tashkeel:lemma:allah — ٱللّٰه[1:ل]
- [C] ten-days-authored — 3 days
- [C] lemma-target-150 — 35 lemmas
- [L] learners:auto:median-retained>=80%-of-lemmas — 22/35
- [L] learners:musafir:median-retained>=80%-of-lemmas — 25/35
- [L] learners:talib:slow-frustration<=1/day — 1.12
- [L] learners:talib:median-retained>=80%-of-lemmas — 23/35
- [L] learners:muqim:slow-frustration<=1/day — 1.67
- [L] learners:muqim:median-retained>=80%-of-lemmas — 24/35