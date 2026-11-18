# Cycle 11

Overall: **94.7** / 100 · Suite R 100.0% · cases 5724 · failures 9

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.9% | universalShare=0.802, lemmas=80, days=10, scenes=20, tenEncounterShare=0.275, minSceneCoverage=0.231, meanSceneCoverage=0.78 |
| G | 100.0% | crashes=0 |
| L | 91.4% | checkerItems=2611, checkerAccuracy=1, learners=120, auto:medianRetained=63, auto:slowFrustrationPerDay=0.11, auto:boredomDays=0, musafir:medianRetained=65, musafir:slowFrustrationPerDay=0.01, musafir:boredomDays=0, talib:medianRetained=63, talib:slowFrustrationPerDay=0.54, talib:boredomDays=0, muqim:medianRetained=63, muqim:slowFrustrationPerDay=0.9, muqim:boredomDays=0, auto:noMorningMedianRetained=56, retainedFraction=0.787 |
| S | not built |  |
| V | 98.8% | runs=100, expected=100, tapTargetsUnder44=2540 |
| P | 100.0% | android-chromium:fpsMedian=60, android-chromium:p95FrameMsMedian=18, budget-android-chromium:fpsMedian=60, budget-android-chromium:p95FrameMsMedian=18, ipad-webkit:fpsMedian=59, ipad-webkit:p95FrameMsMedian=18, iphone-se-webkit:fpsMedian=59, iphone-se-webkit:p95FrameMsMedian=18, iphone-webkit:fpsMedian=59, iphone-webkit:p95FrameMsMedian=18, drawCallsMax=84, trianglesMax=122694 |

## Failures
- [C] lemma-target-150 — 80 lemmas
- [L] learners:auto:median-retained>=80%-of-lemmas — 63/80
- [L] learners:talib:median-retained>=80%-of-lemmas — 63/80
- [L] learners:muqim:median-retained>=80%-of-lemmas — 63/80
- [V] played-and-visible:iphone-se-webkit:d2-cafe — off screen: prompt:أَهْلًا وَسَهْلًا يَ
- [V] played-and-visible:iphone-se-webkit:d3-home — off screen: prompt:بِخَيْرٍ، الْحَمْدُ 
- [V] played-and-visible:iphone-se-webkit:d6-cafe — off screen: prompt:أُرِيدُ قَهْوَةً.
- [V] played-and-visible:iphone-se-webkit:d10-home — off screen: prompt:بِخَيْرٍ، الْحَمْدُ 
- [V] played-and-visible:iphone-se-webkit:d10-cafe — off screen: prompt:بِخَيْرٍ، شُكْرًا