# Visual revisions: wrong until proven right (Edward, 18 Nov 2026)

Every visual change is assumed wrong. It is kept only if two things hold:
1. The judge score goes down. `tools/visual-judge.py` compares every scene's opening frame on iPhone with 19 real photos of Historic Jeddah (Wikimedia Commons, CC/PD, kept private).
2. The side-by-side sheet looks closer to the photos by eye.

Rejected revisions are undone and logged too. Run one with `sh tools/visual-rev.sh REV-NNN "what changed"`.

| Rev | Score | Kept? | Change |
|---|---|---|---|
| 000 | 1.19 | baseline | Real characters and white walls |
| 001 | 1.07 | ✅ | Exposure 0.82 → 1.1 |
| 002 | 0.95 | ✅ | Sun 4.6 → 7, exposure 1.25 |
| 003 | 1.03 | ❌ | Grey paving and whiter sun (lost detail, flat shadows) |
| 004 | 1.04 | ❌ | Grey paving with joints and grit (too dark) |
| 005 | 0.97 | ❌ | Whiter sun only |
| 006 | 0.95 | ❌ | Weathered plaster texture (blobs looked cartoonish by eye) |
| 007 | 0.92 | ✅ | Ground floors plastered, no fake stone-block grid |
| 008 | 0.92 | ❌ | Lower horizon (no gain; people pushed low) |
| 009 | 0.87 | ✅ | Near-white warm limewash albedo |
| 010 | 1.53 | ❌ | Neutral tone mapping at exposure 0.95 (dark, oversaturated) |
| 011 | 1.04 | ❌ | Neutral at exposure 1.7 (clipped, too contrasty) |
| 012 | 0.96 | ❌ | Neutral at exposure 1.35 |
| 013 | 1.01 | ❌ | AgX at exposure 1.5 (milky shadows) |
| 014 | 0.96 | ❌ | Stronger sun, less fill (shade too dark) |
| 015 | 1.01 | ❌ | Sun turned onto the facades |
| 016 | 0.96 | ❌ | Extra windows (reshuffled the seeded houses; build windows without changing the seed sequence) |
| 017 | 0.88 | ❌ | Framed slatted windows at facade edges, using a separate seed (no gain over 0.874) |
| 018 | 0.92 | ❌ | Real CC0 photo-scan plaster grain, Poly Haven, neutralised to white (no gain) |

Best so far: **REV-009, 0.874**. Next ideas to try:
- the camera frame versus the photos' framing
- rawasheen slat detail
- a cooler grade on the shadows
