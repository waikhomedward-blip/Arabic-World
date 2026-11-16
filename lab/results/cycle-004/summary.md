# Cycle 4

Overall: **94.9** / 100 · Suite R 100.0% · cases 5015 · failures 6

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.9% | lemmas=79, days=10, scenes=20, tenEncounterShare=0.291, minSceneCoverage=0.231, meanSceneCoverage=0.78 |
| G | 100.0% | crashes=0 |
| L | 85.7% | checkerItems=2541, checkerAccuracy=1, learners=120, auto:medianRetained=63, auto:slowFrustrationPerDay=0.12, auto:boredomDays=0, musafir:medianRetained=60, musafir:slowFrustrationPerDay=0.02, musafir:boredomDays=0, talib:medianRetained=61, talib:slowFrustrationPerDay=0.52, talib:boredomDays=0, muqim:medianRetained=61, muqim:slowFrustrationPerDay=1.08, muqim:boredomDays=0.01, auto:noMorningMedianRetained=53, retainedFraction=0.797 |
| S | not built |  |
| V | 100.0% | runs=100, expected=100, tapTargetsUnder44=2540 |
| P | 100.0% | android-chromium:fpsMedian=60, android-chromium:p95FrameMsMedian=18, budget-android-chromium:fpsMedian=60, budget-android-chromium:p95FrameMsMedian=18, ipad-webkit:fpsMedian=59, ipad-webkit:p95FrameMsMedian=20, iphone-se-webkit:fpsMedian=59, iphone-se-webkit:p95FrameMsMedian=18, iphone-webkit:fpsMedian=59, iphone-webkit:p95FrameMsMedian=19, drawCallsMax=41, trianglesMax=11118 |

## Failures
- [C] lemma-target-150 — 79 lemmas
- [L] learners:auto:median-retained>=80%-of-lemmas — 63/79
- [L] learners:musafir:median-retained>=80%-of-lemmas — 60/79
- [L] learners:talib:median-retained>=80%-of-lemmas — 61/79
- [L] learners:muqim:slow-frustration<=1/day — 1.08
- [L] learners:muqim:median-retained>=80%-of-lemmas — 61/79