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
| 000c | 1.22 | cloud baseline | Same code as REV-009 rendered in the cloud (Linux WebKit). Lighter overall than the Mac (darkest 5% 0.26 vs 0.15), so the cloud judges against this. Screenshot mode now reports an iPhone 13's 6 cores; before that the 4-core runner used the low tier with no shadows (1.31) |
| 019 | 0.89 | ✅ | Final grade after AgX: levels in display space, black 0.12, white 0.93 |
| 020 | 0.74 | ✅ | White point 0.93 → 0.97 (less clipping on walls) |
| 021 | 0.80 | ❌ | Black point 0.12 → 0.15 (shadows too heavy) |
| 022 | 0.69 | ❌ | Cooler white balance in the grade: score fell, but walls turned blue-grey and the judge counted them as sky. Real plaster is warm cream |
| 023 | 0.73 | ✅ | Rawasheen: dark room behind the lattice, lighter sun-greyed lattice (the grille reads instead of a solid box) |
| 024 | 0.72 | ❌ | Louvre slats in the lower panel, but the texture tiled every 0.6 m and broke into fragments (replaced by 025) |
| 025 | 0.72 | ✅ | One lattice screen per bay: fine grille above, mid rail, louvres below, stiles and frame |
| 026 | 0.68 | ✅ | Paving at real stone size (0.55 × 0.37 m, was 1.7 × 1.1 m) |
| 027 | 0.68 | ❌ | Spalled limewash patches: came out as pale outlined blobs, no stone joints (a maths slip) |
| 028 | 0.68 | ✅ | Spalling retry: darker coral blocks with mortar joints, shadow under the upper plaster edge only (marginal gain, 0.680) |
| 029 | 0.69 | ❌ | Neutral grey-beige paving tint (shade turned blue-grey) |
| 030 | 0.75 | ❌ | Camera turned slightly down the lane (no sky gained, frame lighter) |
| 031 | 0.69 | ❌ | Less sky fill, 0.45 → 0.36 (the darkest tones did not move) |
| 032 | 0.63 | ✅ | Door, window and shop openings as dark as real interiors |
| 033 | 0.63 | ✅ | Street clutter from its own RNG (houses unchanged): window AC units, drain pipes, sagging cables, shutter boxes over shops |
| 034 | 0.64 | ❌ | Open painted shutter leaves beside the upper windows (rendered near-black through the teak texture) |
| 033b/c | 0.62 | noise check | REV-033 rerun twice: 0.619 and 0.621 (first run 0.629). Random animation phases and the clock-driven camera sway give about ±0.01 of noise, so from here a gain under 0.02 must hold on a repeat run (mean counts) |
| 035 | 0.63 | ❌ | Morning sun less orange (no change beyond noise) |
| 036 | 0.63 | ❌ | Paving stones half as orange (warmth better, saturation worse; no net gain) |
| 037 | 0.62 | ❌ | Less blue sky fill (no change beyond noise; shade colour comes from the sky map) |
| 038 | 0.61 | ✅ | Denser clutter: more window AC units with drain lines, 1–3 cables per house (0.606 and 0.611 on repeat) |
| 039 | 0.55 | ✅ | Goods on display in the open shopfronts: three shelves of cloth bolts, tins and boxes in muted real colours |
| 040 | 0.54 | ✅ | Grade white point 0.97 → 0.95 (0.541 and 0.543; REV-039 repeated at 0.550) |
| 041 | 0.52 | ✅ | Exposure 1.25 → 1.18 (midtones were too bright after the grade) |
| 042 | 0.53 | ❌ | Exposure 1.18 → 1.12 (too far) |
| 043 | 0.51 | ✅ | Paving wear from its own RNG: mottling, hairline cracks, chipped corners (0.510 and 0.508) |
| 044 | 0.57 | ❌ | Pale grey-sand paving joints (the ground lost its detail) |
| 045 | 0.49 | ✅ | Darker grey-brown, dirt-filled paving joints |
| 046 | 0.60 | ❌ | Grade midtone gamma 1.08 (too much deep shadow) |
| 047 | 0.47 | ✅ | Limewash palette halfway to neutral (0.476 and 0.472) |
| 048 | 0.49 | ❌ | Hazier sky light for the environment (turbidity 7 → 10) |
| 049 | 0.48 | ❌ | Panelled two-leaf doors (no gain) |
| 050 | 0.49 | ❌ | Crates, sacks, potted plants and benches at the wall base (worse; plants looked like toys) |
| 051 | 0.47 | ❌ | Tall windows between the bays, about 3–5 openings per floor like the photos (single run; it had an overlap bug) |
| 052 | 0.49 | ❌ | 051 with the overlap fixed, but the fix also removed AC units |
| 053 | 0.48 | ❌ | 051 with the overlap fixed cleanly: 0.475 and 0.478, no gain. **By eye the facades looked closer to the photos**; the judge did not agree, so it is out. Worth a second look by Edward |
| 054 | 0.48 | ❌ | 053 with every window shuttered in sun-greyed wood (no gain) |
| 055 | 0.50 | ❌ | Grade saturation 1.12 (warmer and worse) |
| 056 | 0.47 | ✅ | Paving stones 0.42 × 0.28 m (0.466 and 0.467) |
| 057 | 0.47 | ❌ | Crates in sun-greyed wood (no gain) |
| 058 | 0.47 | ❌ | Paving tint a little less orange (warmth traded for saturation again) |
| 059 | 0.45 | ✅ | Painted woodwork green and turquoise more saturated, like the photos (0.447 and 0.452). Measured first: the warmth sits in the bottom half (ground, wood), and saturation only fell when warmth fell, so the frame needed cool saturated colour |
| 060 | 0.46 | ❌ | Blue painted woodwork replacing a light brown (no gain) |
| 061 | 0.47 | ❌ | Black point 0.12 → 0.10 (shadows too light) |
| 062 | 0.45 | ❌ | Sun 7 → 8 (no change beyond noise) |
| 063 | 0.45 | ❌ | Rawasheen frames: corner posts and rails (no gain) |
| 064 | 0.45 | ✅ bug fix | The square's paving used the lane's texture repeat over a 9.2 m disc, so its stones were 6× too small. Now the same size as the lane. Median unchanged (squares are 3 of 20 frames), but the square frames' detail rose 0.15 → 0.20, in line with every other scene |
| 065 | 0.44 | ✅ | Lantern with dark iron posts, glass panes and a cap (was a solid brass block): 0.441 and 0.430 |
| 066 | 0.43 | ❌ | Deeper thobe skirt folds (not visible at this size; within noise) |
| 067 | 0.44 | ❌ | Skirt follows the legs half as much (no visible change: the lines were the legs themselves) |
| 068 | 0.44 | ✅ bug fix | Legs pulled further inside the thobe skirt: they poked through when they swung, showing leg shapes (clipping, and less modest). Score neutral |
| 069 | 0.44 | ❌ | Slimmer chest and shoulders (no visible difference at this size) |
| 070 | 0.44 | ❌ | More, clearer hairline cracks in the limewash (no gain) |
| 071 | 0.43 | ✅ | Portrait lens 54° → 60°: more of the street in frame (0.431 and 0.428), speakers still clear |
| 072 | 0.42 | ✅ | Portrait lens 60° → 66° (0.414 and 0.416). Stopping here: wider would make the people too small to tap comfortably |
| 073 | 0.42 | ❌ | Window rhythm retested at the 66° lens (0.418; still no gain) |
| 074 | 0.41 | ✅ bug fix | Each man his own build: every character had a build value (0.85–1.2) that was ignored, so all bodies were one width (the "one body for every man" problem in the euphoria video). The garment now widens or narrows around the body's axis; head and headwear untouched. Judge-neutral (0.410 and 0.418, mean 0.414); by eye the older shopkeeper now reads broader than the young men |
| 075 | 0.42 | ✅ motion | Attention (euphoria lesson): chest, neck and head turn toward whoever is speaking, or toward the traveller, driven like a muscle (spring + damper), shared 30/30/40, at most 60°, no snap. Still-frame score within noise; judged by eye on a frame sequence of the first lines of d1-home: Faisal now turns to listen to Abu Faisal instead of staring ahead |
| 076 | 0.41 | ✅ motion | Breathing in the chest (quicker while talking) and an unhurried weight shift, hips and spine counter-leaning, on the real bodies. Until now this "small life" code only reached the loading placeholders. Score 0.410; judged by eye on a sequence |
| 077 | 0.42 | ✅ fix | Carriers hold their load: arms forward, forearms bent under it (the crate used to float in front of a man with hanging arms). Score within noise |
| 078 | 0.41 | ✅ motion | Cloth sway: thobe skirts move with one shared breeze (animated noise in the vertex shader, as in the Blender short; most at the hem, nothing above the hips; one shader for all men). Score 0.408; judged by eye on a sequence, no tearing |
| 079 | 0.40 | ✅ | Density of life (GTA VI review): six more men doing ordinary things down the lane, behind the speakers: two neighbours chatting, a customer at the fruit stall, a man kneeling to fix a door, a shopkeeper arranging pots, a man waiting with a sack (0.400 and 0.398). Uses animation clips the model had but nobody used |
| 080 | 0.40 | ❌ | Windblown sand drifts at the wall foot (barely visible; no gain) |
| 081 | 0.44 | ❌ | Sun azimuth 10° → 20° (walls too bright) |
| 082 | 0.45 | ❌ | Sun azimuth 10° → 4° (warmer, brighter midtones); 10° stays |
| 083 | 0.40 | ✅ budget | Each man's headwear merged into one rigid mesh in the head bone's space (was up to 4 draw calls; art bible: 2 per character). The agal can never deform. Looks identical |
| 084 | 0.40 | ✅ fix | Off-screen bodies are culled (every man in the quarter used to be drawn in every scene); the fruit-stall customer from REV-079 removed because the d3-souq play-through on the cloud runner had no time left. Triangles in a souq scene fell from ~190k to ~80k |
| 085 | 0.40 | ✅ motion | The ghutra's cape lifts a little in the same breeze as the thobes; cap and agal stay rigid. Score 0.395; judged by eye on a sequence |
| 086 | 0.40 | ❌ | More rawasheen in the free wall between the seeded ones (0.402; the judge again does not reward more facade openings) |
| 087 | 0.39 | ✅ | Faint photographic grain in the final grade (0.389 and 0.391) |
| 088 | 0.39 | ❌ | Black point 0.12 → 0.135 (no gain) |
| 089 | 0.40 | ❌ | Stronger grain, 0.035 (worse) |
| 090 | 0.38 | ✅ | Limewash palette 75% of the way to neutral (0.383 and 0.376): sunlit walls read as clean white limewash |
| 091 | 0.38 | ❌ | Foreground pole and crates in sun-greyed wood (no gain) |

Best so far: **REV-090, 0.380** (mean of 2 runs) (cloud; Mac best was REV-009, 0.874). Next ideas to try:
- the camera frame versus the photos' framing
- rawasheen slat detail
- a cooler grade on the shadows

## Ideas from two videos Edward shared (19 Nov)
Only the titles, descriptions and chapter lists could be read in the cloud (the transcripts were blocked), so these are general lessons of the topics, not quotes:
- *Inside the Physics Engine Behind GTA VI* (euphoria, procedural animation): people look alive when the body reacts to the world on top of the canned clips: weight shifts, balance, feet that stay planted, the head and chest turning toward whoever speaks. Calm versions fit this game: listeners turn toward the speaker, idle weight shifts, cloth that sways with the walk.
- *GTA VI review* (Game Informer): the believable city comes from density of life: many people each doing something.
Still frames can only test part of this (more people in the street); motion changes need Edward's eye in the running game, since the judge only scores the opening frame.

