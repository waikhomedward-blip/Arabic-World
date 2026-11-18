# Art bible (binding for every visual change)
Merged from: world and story bible, game visuals playbook, cinematic-3d-animation skill. Hard rules and the 08:00–11:00 rule override everything.

## Look in one line
A sunlit Hijazi morning in a small, dense, imaginary port-city quarter: coral-stone and plaster houses, dark teak rawasheen, cloth awnings, soft haze, people as clear silhouettes.

## Camera (skill: camera standard)
- Eye level (1.6 m) by default; frame lanes as leading lines toward the minaret; sky visible in the frame.
- Three depth layers in every shot: foreground element, subject, background fading into haze.
- One first point of attention: the speaking character. Never inside geometry. No dead camera: a slow ease-in drift.
- Portrait phones: the character sits in the upper half (the UI panel covers the lower ~40%).

## Light and colour (skill + playbook)
- Every light has a reason: the morning sun (one sharp shadow source, from the east, 25–40° up), sky fill (image-based light from the sky), bounce. No unexplained lamps; lanterns unlit.
- Design in value first (must read in greyscale). One dominant hue (warm sand) + accents (indigo, saffron, green awnings; teak).
- AgX tone mapping, applied **once**; exposure set so a mid-grey wall sits mid-grey.
- Haze: exponential density = 3.912 / visibility (three.js FogExp2: density = 2 / visibility). Distant planes take the sky tint.

## Materials (playbook + skill)
- Non-metal base colour about 0.04–0.8 linear (≈50–240 sRGB); metalness 0 or 1; vary roughness (uniform roughness reads as plastic).
- Plaster/stucco 0.3–0.6 albedo, roughness 0.8–0.95; coral stone in visible courses; teak dark (≈0.06–0.12), roughness 0.6–0.8.
- Cloth: no subsurface; roughness high; slight sheen.
- Bevel hard edges (architecture 5–10 mm); grime at wall bases; contact: darker ring where things meet the ground; nothing floats.

## Architecture (bible + UNESCO Historic Jeddah)
- Houses 3–6 storeys (storey ≈ 3.2 m), coral stone + lime plaster with horizontal timber bands, stone courses visible.
- Rawasheen: projecting carved teak bays with lattice on upper floors — the signature shape; vary size, colour (teak, faded green, blue-grey) and wear.
- Ground floors: shops, wooden doors (2.1–2.4 m) with frames; small windows; parapets on roofs; water tanks.
- Lanes open into small squares; the minaret is the big landmark (BotW triangle rule: large = landmark, medium = hides/reveals, small = pace).
- Never a recognisable real building.

## Characters (hard rules + skill)
- Smooth featureless heads; modest loose clothing; all male.
- Readable silhouettes: thobe with shoulders, sleeves, ghutra or kufi; per-character colour and height.
- Body language carries emotion; small life: breathing, slight sway; nobody fully still.

## Budgets (playbook, tightened)
- ≤150 draw calls (recent phone), ≤100 (budget Android); merge static geometry per material; instancing for repeats.
- Textures ≤1k on phones; procedural or CC0 only, every asset logged.

## Judging every visual change (skill: quality system)
- Before/after screenshots from fixed cameras (all places, iPhone + Android).
- Failure tags counted per version: MAT-plastic, SCL-wrong, STG-hidden, CON-float, CAM-dead, LGT-unmotivated, READ-lost.
- Rubric 1–7: READ, CMP, LGT, COL, DEP. Readability beats realism.

## From Edward's realism list and the 12-channel filmmaking study (16 Nov)
Edward's test for every frame: **"Would every object in this frame physically respond this way if I were standing inside this place?"**
Tier 1 (do first):
1. **Layers:** foreground element near camera (awning edge, doorframe, hanging lantern, stall pole), subject, background fading into haze; stagger people at different depths; some occlusion.
2. **Light falloff and luminance variation:** sunlit side vs shaded side of the lane; pools of sun; no evenly lit walls; **commit to contrast** (rich shade, bright sun; bright daylight may sit near clipping).
3. **Contact shadows** under people, props, stalls; shadow direction consistent with one sun.
4. **Motivated light:** the sun is the only key; bounce from warm walls and paving fills the shade (warm-tinted, never neutral grey); sky fill is cool.
5. **Motion parallax:** a slow lateral camera drift so the foreground slides faster than the background.
6. **Production design with hierarchy:** one hero prop per place, 3–5 supporting props, then clutter; signs of use (worn steps, stains at wall bases, a crate left open); slightly uneven spacing and crooked objects; nothing perfectly symmetric.
7. **Limited palette:** warm sand/coral as the dominant; 1–2 counterpointed accents per place (indigo, saffron, faded green); thobes mostly neutral so a single coloured one reads.
8. **Life in the background:** men working in the background (carrying, sweeping, selling, sitting), never a frozen frame.
Tier 2: subtle haze increasing with distance (never an "effect"); controlled reflections (brass, fountain water, glass); material variety (roughness, wear, dust).
Tier 3: very fine grain, gentle vignette, highlight roll-off (AgX); no sharpening, no heavy chromatic aberration.
Not applicable: eyes, catchlights and skin realism (characters are faceless by rule); f/1.8 depth of field is optional (phones), and must never blur away the setting.

## Rebuild rules from the merged study (18 Nov; full list: docs/research/VISUAL_BUILD_LIST.md)
These override older numbers above where they conflict. Every number marked [unverified] must be replaced by a lab or real-phone measurement.
1. **Sun:** follows the clock. Elevation 20° at 08:00 rising to 45° by 11:00. That cap keeps raking shadows; the true value at 11:00 is 59°.
   - Azimuth: 30–90° off the camera axis, never straight behind the camera.
   - Sun to fill ratio: 4:1–6:1.
   - Sky light on facades: 0.4–0.6.
   - Sun colour: #FFF1E0 at 08:00, moving to #FFF8F0 by 11:00 [unverified].
2. **Haze:** FogExp2 density is 2/visibility.
   - Aim for about 15% haze at 80 m, a density of about 0.005. The current 0.011 is about 10× too dense.
   - Pale blue-grey, never yellow. Warmer toward the sun. Thinner from 08:00 to 11:00.
   - About 200 dust motes in one draw call.
3. **Camera:**
   - Vertical field of view in portrait: dialogue 44–50°, walking about 54°, establishing shots ≤60°, never above 65°.
   - Level horizon, eye height 1.55–1.6 m.
   - Micro-motion: 0.1–0.25° at 0.1–0.5 Hz, with a "still camera" setting for players who want none.
   - A foreground occluder 0.5–1 m from the lens.
   - No depth-of-field blur.
4. **Final pass:** one merged pass, which holds the single AgX tone mapping when post is on.
   - Order: vignette, bloom, tone mapping, grade, grain.
   - Saturation about 0.9. Black point lifted 2–3%. Grain about 0.025. Vignette 0.2–0.25. Bloom only above 1.0.
   - Chromatic aberration off. No sharpening.
   - Lit limewash sits at 85–92% sRGB.
   - Low-tier phones get no post pass.
5. **Materials:** every material gets a roughness map, and metalness is only 0 or 1.
   - Plaster and stone: roughness 0.8–0.95 ±0.1. Weathered teak: 0.6–0.8. Handled brass: 0.25–0.45.
   - World-space noise breaks up tiling, with a period of 4–12 m and ±8–15% value.
   - Grime: a real band 0.3–1 m high, plus streaks below sills.
6. **Architecture:** gandal timber courses every 1.1–1.2 m, about 3 bands per storey.
   - Houses mostly 4–6 storeys. Walls 50–60 cm thick with deep reveals.
   - Rawasheen bays on brackets. A dakka bench no higher than 60 cm.
7. **Ambient occlusion and sky visibility:** baked, and applied to indirect light only, never to the sun.
8. **Budgets:** static quarter ≤10 draw calls, 2 per character, clutter 10–20, one post pass, textures ≤64 MB [unverified].
9. **Failure tags (new):** TILE, FLAT, SYM, FOV-wide, STATIC.
10. **Judging:** add a `?grey` greyscale review, a luma-spread metric (lit vs shaded facade) and a hue-bucket metric.
11. **Promoted to Tier 1:** dust motes, wind on cloth, and sun patterned through lattice.
12. **Background men:** 10–14 of them, each with an 8–20 s job loop.
    - Speed and phase vary ±10–15%. Each has a distinct gait.
    - Each man's meshes merged into 2 draw calls.
    - They never look at the camera.

## Animals (Edward, 18 Nov: non-negotiable)
Animals have no faces either: no eyes, nose, mouth, beak, snout or nostrils.
- Heads are smooth, simple shapes, like the people's.
- Animals are read by silhouette and motion. A cat is a curled tail and a pounce; a camel is its neck and gait; a bird is wings and a hop.
- Suite R bans face-part words, including snout, muzzle, beak and nostril, in world code. It also bans animal emoji in content and source.

## From real reference photos (18 Nov, Edward: "look at actual pictures and emulate")
Sources, observed only and not shipped: Wikimedia Commons "Dishdasha.jpg" (men in thobes, Salalah) and the Commons "Al-Balad Jeddah" search results. Faces in the photos are ignored, since our people have none.

**Thobe**
- Hangs straight from natural, not broad, shoulders. Slightly A-line, ending at the ankle.
- Soft vertical folds, a collar band and a front placket.
- Sleeves are long and loose down to the wrist. Nothing is fitted.

**Ghutra**
- Covers the whole head and falls like a cape: longest down the back, over the shoulders.
- Its two front edges hang down the chest.
- The agal is a black double ring on top, sitting toward the back and tilted.

**Feet:** dark open sandals, with the feet visible below the hem.

**Posture:** relaxed. Weight on one leg, hands loose in front or clasped. Small groups stand at angles to each other.

**Al-Balad walls**
- White and cream limewash, greyed and stained by weather.
- Coral stone shows only where plaster has fallen.
- Rawasheen are dark teak, stacked in vertical columns over several storeys.
- Arched doorways and windows are common.

**What was applied in the game:**
- real skinned male bodies (CC0), with a loose thobe skirt hanging from the hips
- smooth sleeves and a smooth chest, so no muscles show
- a ghutra cape with front edges and a double agal
- sandals
- white and cream wall palette

**Still to do:** slimmer shoulders, collar and placket detail, arched openings.
