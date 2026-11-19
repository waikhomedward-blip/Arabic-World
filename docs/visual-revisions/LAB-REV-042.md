# Full lab at REV-042 (cloud, 19 Nov 2026)

WebKit devices 60/60 passed (parallel); Android Chromium 40/40 passed (`--workers=1`, the setup that works on this 4-core GPU-less runner); then `npm run lab:fast`.

- Suite R 100%
- Suite V 100%: 100/100 runs, 0 visibility problems
- Draw calls max 87 (limit 150), triangles max 130,170
- Suite P: software rendering here (4–12 fps everywhere), not comparable with a phone
- Suite L 97.1%: learner simulation (muqim slow-frustration 1.06/day) varies between runs; not visual

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.9% | universalShare=0.802, lemmas=80, days=10, scenes=20, tenEncounterShare=0.275, minSceneCoverage=0.231, meanSceneCoverage=0.78 |
| G | 100.0% | crashes=0 |
| L | 97.1% | checkerItems=2590, checkerAccuracy=1, learners=120, auto:medianRetained=65, auto:slowFrustrationPerDay=0.07, auto:boredomDays=0, musafir:medianRetained=65, musafir:slowFrustrationPerDay=0.03, musafir:boredomDays=0, talib:medianRetained=64, talib:slowFrustrationPerDay=0.46, talib:boredomDays=0, muqim:medianRetained=66, muqim:slowFrustrationPerDay=1.06, muqim:boredomDays=0, auto:noMorningMedianRetained=57, retainedFraction=0.813 |
| S | not built |  |
| V | 100.0% | runs=100, expected=100, tapTargetsUnder44=2540 |
| P | 29.4% | android-chromium:fpsMedian=4, android-chromium:p95FrameMsMedian=267, budget-android-chromium:fpsMedian=5, budget-android-chromium:p95FrameMsMedian=217, ipad-webkit:fpsMedian=4, ipad-webkit:p95FrameMsMedian=380, iphone-se-webkit:fpsMedian=12, iphone-se-webkit:p95FrameMsMedian=111, iphone-webkit:fpsMedian=8, iphone-webkit:p95FrameMsMedian=166, drawCallsMax=87, trianglesMax=130170 |

