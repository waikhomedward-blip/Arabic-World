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
