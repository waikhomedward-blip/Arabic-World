# Cycle 7

Overall: **94.7** / 100 · Suite R 100.0% · cases 5714 · failures 5

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.9% | universalShare=0.802, lemmas=80, days=10, scenes=20, tenEncounterShare=0.275, minSceneCoverage=0.231, meanSceneCoverage=0.78 |
| G | 100.0% | crashes=0 |
| L | 88.6% | checkerItems=2584, checkerAccuracy=1, learners=120, auto:medianRetained=63, auto:slowFrustrationPerDay=0.1, auto:boredomDays=0, musafir:medianRetained=62, musafir:slowFrustrationPerDay=0.03, musafir:boredomDays=0, talib:medianRetained=62, talib:slowFrustrationPerDay=0.65, talib:boredomDays=0, muqim:medianRetained=63, muqim:slowFrustrationPerDay=0.99, muqim:boredomDays=0, auto:noMorningMedianRetained=58, retainedFraction=0.787 |
| S | not built |  |
| V | 100.0% | runs=100, expected=100, tapTargetsUnder44=2540 |
| P | 100.0% | android-chromium:fpsMedian=60, android-chromium:p95FrameMsMedian=18, budget-android-chromium:fpsMedian=60, budget-android-chromium:p95FrameMsMedian=18, ipad-webkit:fpsMedian=59, ipad-webkit:p95FrameMsMedian=18, iphone-se-webkit:fpsMedian=59, iphone-se-webkit:p95FrameMsMedian=18, iphone-webkit:fpsMedian=59, iphone-webkit:p95FrameMsMedian=18, drawCallsMax=112, trianglesMax=50102 |

## Failures
- [C] lemma-target-150 — 80 lemmas
- [L] learners:auto:median-retained>=80%-of-lemmas — 63/80
- [L] learners:musafir:median-retained>=80%-of-lemmas — 62/80
- [L] learners:talib:median-retained>=80%-of-lemmas — 62/80
- [L] learners:muqim:median-retained>=80%-of-lemmas — 63/80