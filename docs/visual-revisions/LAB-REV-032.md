# Full lab at REV-032 (cloud, 18 Nov 2026)

Run: `npm run lab` (webkit projects passed in parallel; the two Android Chromium projects timed out in parallel on this 4-core GPU-less runner and were rerun with `--workers=1`: 40/40 passed), then `npm run lab:fast`.

- Suite R 100% (one face-word hit, the shader variable `lip`, was renamed before this score)
- Suite V 100%: 100/100 runs, 0 visibility problems
- Draw calls max 85 (limit 150), triangles max 122,850
- Suite P fails on every device (4–14 fps): software rendering with no GPU; not comparable with the Mac

| Suite | pass rate | metrics |
|---|---|---|
| R | 100.0% |  |
| C | 99.9% | universalShare=0.802, lemmas=80, days=10, scenes=20, tenEncounterShare=0.275, minSceneCoverage=0.231, meanSceneCoverage=0.78 |
| G | 100.0% | crashes=0 |
| L | 100.0% | checkerItems=2585, checkerAccuracy=1, learners=120, auto:medianRetained=64, auto:slowFrustrationPerDay=0.13, auto:boredomDays=0, musafir:medianRetained=64, musafir:slowFrustrationPerDay=0.03, musafir:boredomDays=0, talib:medianRetained=64, talib:slowFrustrationPerDay=0.55, talib:boredomDays=0, muqim:medianRetained=65, muqim:slowFrustrationPerDay=0.95, muqim:boredomDays=0, auto:noMorningMedianRetained=55, retainedFraction=0.8 |
| S | not built |  |
| V | 100.0% | runs=100, expected=100, tapTargetsUnder44=2540 |
| P | 29.4% | android-chromium:fpsMedian=4, android-chromium:p95FrameMsMedian=267, budget-android-chromium:fpsMedian=5, budget-android-chromium:p95FrameMsMedian=200, ipad-webkit:fpsMedian=4, ipad-webkit:p95FrameMsMedian=386, iphone-se-webkit:fpsMedian=12, iphone-se-webkit:p95FrameMsMedian=111, iphone-webkit:fpsMedian=8, iphone-webkit:p95FrameMsMedian=164, drawCallsMax=85, trianglesMax=122850 |

