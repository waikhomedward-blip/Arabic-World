# Cycle 18

Overall: **79.2** / 100 · Suite R 100.0% · cases 5656 · failures 6

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 100.0% | universalShare=0.809, lemmas=87, days=11, scenes=22, tenEncounterShare=0.264, minSceneCoverage=0.231, meanSceneCoverage=0.786 |
| G | 100.0% | crashes=0 |
| L | 85.7% | checkerItems=2796, checkerAccuracy=1, learners=120, auto:medianRetained=66, auto:slowFrustrationPerDay=0.09, auto:boredomDays=0, musafir:medianRetained=65, musafir:slowFrustrationPerDay=0, musafir:boredomDays=0, talib:medianRetained=65, talib:slowFrustrationPerDay=0.5, talib:boredomDays=0, muqim:medianRetained=65, muqim:slowFrustrationPerDay=1.03, muqim:boredomDays=0, auto:noMorningMedianRetained=57, retainedFraction=0.759 |
| S | not built |  |
| V | not built |  |
| P | not built |  |

## Failures
- [C] lemma-target-150 — 87 lemmas
- [L] learners:auto:median-retained>=80%-of-lemmas — 66/87
- [L] learners:musafir:median-retained>=80%-of-lemmas — 65/87
- [L] learners:talib:median-retained>=80%-of-lemmas — 65/87
- [L] learners:muqim:slow-frustration<=1/day — 1.03
- [L] learners:muqim:median-retained>=80%-of-lemmas — 65/87