# Cycle 4

Overall: **94.9** / 100 · Suite R 100.0% · cases 4997 · failures 6

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.9% | lemmas=78, days=10, scenes=20, tenEncounterShare=0.282, minSceneCoverage=0.231, meanSceneCoverage=0.782 |
| G | 100.0% | crashes=0 |
| L | 91.4% | checkerItems=2529, checkerAccuracy=1, learners=120, auto:medianRetained=62, auto:slowFrustrationPerDay=0.12, auto:boredomDays=0, musafir:medianRetained=63, musafir:slowFrustrationPerDay=0.02, musafir:boredomDays=0.01, talib:medianRetained=62, talib:slowFrustrationPerDay=0.54, talib:boredomDays=0, muqim:medianRetained=63, muqim:slowFrustrationPerDay=1.09, muqim:boredomDays=0, auto:noMorningMedianRetained=52, retainedFraction=0.795 |
| S | not built |  |
| V | 99.8% | runs=100, expected=100, tapTargetsUnder44=2540 |
| P | 99.7% | android-chromium:fpsMedian=60, android-chromium:p95FrameMsMedian=18, budget-android-chromium:fpsMedian=60, budget-android-chromium:p95FrameMsMedian=18, ipad-webkit:fpsMedian=59, ipad-webkit:p95FrameMsMedian=20, iphone-se-webkit:fpsMedian=59, iphone-se-webkit:p95FrameMsMedian=18, iphone-webkit:fpsMedian=59, iphone-webkit:p95FrameMsMedian=19, drawCallsMax=41, trianglesMax=11118 |

## Failures
- [C] lemma-target-150 — 78 lemmas
- [L] learners:auto:median-retained>=80%-of-lemmas — 62/78
- [L] learners:talib:median-retained>=80%-of-lemmas — 62/78
- [L] learners:muqim:slow-frustration<=1/day — 1.09
- [V] played-and-visible:iphone-se-webkit:d2-masjid — WebGL: context lost.; TypeError: null is not an object (evaluating 'gl.getShaderInfoLog(glVertexShader).trim')
- [P] p95-frame<=50ms:iphone-se-webkit:d2-masjid — 64 ms