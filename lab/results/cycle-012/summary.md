# Cycle 12

Overall: **95** / 100 · Suite R 100.0% · cases 5724 · failures 3

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.9% | universalShare=0.802, lemmas=80, days=10, scenes=20, tenEncounterShare=0.275, minSceneCoverage=0.231, meanSceneCoverage=0.78 |
| G | 100.0% | crashes=0 |
| L | 94.3% | checkerItems=2576, checkerAccuracy=1, learners=120, auto:medianRetained=65, auto:slowFrustrationPerDay=0.18, auto:boredomDays=0, musafir:medianRetained=63, musafir:slowFrustrationPerDay=0.03, musafir:boredomDays=0, talib:medianRetained=65, talib:slowFrustrationPerDay=0.56, talib:boredomDays=0, muqim:medianRetained=65, muqim:slowFrustrationPerDay=1.02, muqim:boredomDays=0, auto:noMorningMedianRetained=55, retainedFraction=0.813 |
| S | not built |  |
| V | 100.0% | runs=100, expected=100, tapTargetsUnder44=2540 |
| P | 100.0% | android-chromium:fpsMedian=60, android-chromium:p95FrameMsMedian=18, budget-android-chromium:fpsMedian=60, budget-android-chromium:p95FrameMsMedian=18, ipad-webkit:fpsMedian=59, ipad-webkit:p95FrameMsMedian=18, iphone-se-webkit:fpsMedian=59, iphone-se-webkit:p95FrameMsMedian=18, iphone-webkit:fpsMedian=59, iphone-webkit:p95FrameMsMedian=18, drawCallsMax=84, trianglesMax=122694 |

## Failures
- [C] lemma-target-150 — 80 lemmas
- [L] learners:musafir:median-retained>=80%-of-lemmas — 63/80
- [L] learners:muqim:slow-frustration<=1/day — 1.02