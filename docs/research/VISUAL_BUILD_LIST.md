# Visual build list (18 Nov 2026)

Merged from the 7 film/cinematography readers (R1–R7, private), the deep-research report (REP) and the current code. Ranked by realism per phone-millisecond. Feeds docs/ART_BIBLE.md.


Inputs: readers R1-R7, report REP, ART_BIBLE (AB), current code, lab cycle-006. Tags: [unverified] = source number not measured on a phone; [derived] = my arithmetic from the code or a formula; [lab] = measured by the lab, headless emulation, not a real GPU. Cost words: 0 = no per-frame cost; S <0.5 ms; M 0.5-2 ms; L >2 ms [all unverified].

Baseline cycle-006 [lab]: drawCallsMax 72 (budget 150), p95 18 ms on 5 emulated devices; real-phone time unmeasured.

## Already in code (do not redo)
AgX once (0.82); Preetham Sky + 64 px Environment at 0.42; hemisphere 0.22 warm ground; one sun 4.6, ~26 deg [derived], PCFSoft 1536 following the place; FogExp2 0.011; 5 merged quarter meshes; contact blobs; 5 background men with phase/breathing; foreground pole+crates per place; level 1.55 m camera with 0.35 m sine drift; rawasheen, setbacks, tints.
## Lacking
No post chain; no AO/sky-visibility bake; 128-256 px canvas textures, no macro noise or roughness map (0.9/0.93 flat); gandal bands only every 3.2 m; lattice does not cast; static cloth; fog and camera not clock-driven; ~10 meshes per man; no lab metric for contrast, palette, tiling.

## Ranked build list

### 1. Sun angle, sun-to-camera angle, light ratio (cost 0)
- Change: World.tsx `SUN`, `SunLight`, `hemisphereLight`, `EnvIntensity`, exposure. Drive sun from the game clock (08:00 -> 11:00): elevation 20 -> 45 deg, colour #FFF1E0 -> #FFF8F0 [REP unverified]. Cap at 45 (not REP's astronomical 59) to keep raking shadows: conflict, see below. Target sun:fill 4:1-6:1 (R4#1), sky IBL on facades 0.4-0.6 (R4#2; currently 0.42, keep), hemisphere <=25% of sun (R1#1). Sun azimuth: currently the sun is only ~16-28 deg off directly behind the camera [derived from CameraRig vectors], i.e. flat front light on the white back facade; R3#1 and R2#6 say keep it 30-90 deg off the camera axis, side or back lit, for rim light on thobes and glowing awnings. Rotate the sun so lit facade and shaded facade both show and awnings glow (A/B two azimuths, keep the one that scores higher in 4).
- Phone cost: 0 (re-point existing light; shadow cam already follows).
- Check: fixed-camera screenshots of all 6 places at 08:00 and 11:00, phone + Android; greyscale review (`?grey` dev flag, R4#7); lab metric: mean luma spread between lit and shaded facade pixels (R4#3) with a floor [threshold unverified; set from the first good frame]; AgX white test: lit plaster 85-92% sRGB, never clipped (REP; R4#15).
- Sources: R1#1,#2; R3#1,#2,#3; R4#1,#2; R2#1,#6; R6#1,#2; REP rows 1,3 (sun table, hemisphere #BFD8FF/#C89A6A 0.3-0.6, optional weak up-light 10-25% of sun / R1 10-15%).
- Agree: hard sun, deep shade, warm bounce, cool sky, no fill-everything (all 7 readers + REP). Conflict: REP wants equinox elevation up to 59 deg at 11:00 (short shadows, "morning from colour not length"); R2#1, R5, R4 want 15-45 deg long raking shadows. Take readers' cap 45 deg; flag for Edward only if shadows look too long.

### 2. Lens and camera (cost 0)
- Change: World.tsx `CameraRig`. Current vertical FOV is 68 deg portrait / 50 landscape (set via `visibleFov`); R1/R6/R7 say never above 60-65 and prefer 35-50; REP says 40 deg vertical for over-the-shoulder dialogue, 54 walking, 66 only establishing [derived: lens maths with the long phone side vertical]. Set portrait dialogue 44-50, establishing <=60; pull the camera back rather than widen (R7#14). Keep level horizon and the 1.55-1.6 m eye height. Add micro-motion on top of the existing drift: 2-3 octaves noise, 0.1-0.25 deg rotation, 0.1-1.5 Hz, +-1 cm breathing, <=3 mm position jitter (R2: 0.1-0.3 deg at 0.1-0.5 Hz; R7#20: 0.3-1.5 Hz; REP: 0.5-2 cm at 0.05-0.3 Hz; all [unverified], conflict only in frequency; pick 0.1-0.5 Hz, the lowest common range). Add a "still camera" setting (REP, comfort). Foreground occluder within 0.5-1 m (existing pole; add a man crossing, item 7). Spring lag, camera never anticipates (R6#6).
- Check: lab screenshots at FOV 68 vs 48, people-visibility probe `__awProbe.visibility()` must stay true for speakers (STG-hidden); still-frame test: compose the frozen frame first (R2#8).
- Sources: R7#13,14,19,20; R4 Top-6 (fov 28-40 deg landscape); R6#29; R3#10; REP row 9.
- Conflict: R7 says compute FOV from a ~55-60 deg HORIZONTAL target in portrait; on a 9:19.5 screen that is ~100 deg vertical, which contradicts its own "no wide-angle". Ignore that clause. R4 wants pans/tilts; AB says level camera: keep level.

### 3. Wear, tiling, roughness, gandal bands (cost S, 0 draw calls)
- Change: textures.ts and quarter.ts. (a) World-space noise macro multiply (period 4-12 m, +-8-15% value) via one `onBeforeCompile` chunk shared by plaster/stone/paving; per-block random UV offset/rotation in `worldUV()` (REP, R1#4). (b) Gandal timber courses every ~1.1 m of height, ~3 dark bands per storey, as a stripe in the plaster/stone texture or thin `teak` boxes (REP/Nyazi 2018; code today: one 12 cm band per 3.2 m storey). (c) Grime: `colourise(..., grimeBelow=0.05)` currently darkens only vertices at y<=0.05, so on a box it becomes a smooth 0.72->1 gradient over the whole 3.2 m storey [derived, confirm in a screenshot]; replace with a real band 0.3-1.0 m (REP: water table ~1.2 m, sand-tinted) plus sill/rawasheen streak decals (R5, R2#4), sun-bleached tops. (d) Roughness variation: roughnessMap from the canvas (plaster 0.8-0.95 +-0.1, stone same, weathered teak 0.6-0.8, brass 0.25-0.45 where handled); metalness only 0 or 1 (water tin pots 0.6 -> 0 or 1; planter tins `metalness 0.6` in World.tsx). (e) Texture size: 256 px canvas at 3.2 m tile is ~80 px/m; raise hero walls to 512-1024 (see 10). (f) Jitter: house tint +-5% (R5), uneven windows/storeys (R2#4).
- Check: lab tiling metric (autocorrelation of a wall crop; fail on a visible repeat period) [new]; failure tags MAT-plastic, add TILE and SYM; before/after screenshots; `gl.info.memory.textures` <=10 sets.
- Sources: R1#4 (The Substance checklist), R2#4, R5 "imperfect beats perfect", R4#27-28, R6#9; REP "Correct materials" + Al-Balad kit (gandal, 50-60 cm walls, ground-floor reveals).
- Agree: all. Conflict: AB teak albedo 0.06-0.12 vs REP weathered wood 0.12-0.16 linear, a small difference; use 0.10-0.16 and let the AgX test decide.

### 4. Dappled and patterned sun (cost S-M)
- Change: World.tsx `Quarter`: `castShadow` on the lattice mesh (alphaTest depth works in three); optional scrolling leaf/awning noise multiplied into direct light on hero walls only (R1#3, R5); 2-3 trees/palms at square and cafe. Shadows: keep 1536 at +-16 m on high tier, 1024 on `lowTier()`. Do NOT freeze the map (REP row 4 `autoUpdate=false`): extras sweep and breathe, so casters move; keep blobs.
- Check: screenshot of lattice pattern on the opposite wall at 08:30; `__awProbe.stats()` draw delta. Stay on PCF, small radius (R4#1; REP: VSM leaks through lattice).
- Sources: R1#3, R3#4, R5, R6#7, R7#7.

### 5. Baked AO and sky visibility (runtime 0)
- Change: quarter.ts `colourise()` + material patch. Stage A now: analytic AO (wall base, under corbels/caps, door reveals, lane corners; sky visibility rises with height). Stage B (REP row 2): three-mesh-bvh bake, 32-64 rays, 1.5-3 m AO and 50 m sky visibility, cached at build time. Apply to INDIRECT light only (`indirectDiffuse` in `onBeforeCompile`); today's vertex-colour multiply also dims the sun and flattens contrast. Needs an `ao` attribute.
- Check: wall-base and under-bay screenshots; 0 extra draws. Sources: REP (RDR2/Tsushima split), R1#4, R5, AB contact rule.

### 6. One merged final pass (cost M [unverified]; off on low tier)
- Change: World.tsx `Canvas`/`onCreated`: pmndrs `postprocessing`, renderer `NoToneMapping`, `ToneMappingEffect` AgX inside the pass (still "once"), half-float buffers. Order (R6#34): vignette -> bloom -> tone map -> grade -> grain. Numbers: saturation 0.88-0.92 (R4 0.9; R3 10-15% desat), warm highlights/cool shadows, black point 2-3% lifted (R5), one grade for all of 08-11 (R4#12), grain 0.025 luma-weighted, 1-2 px, new seed per frame (readers 0.01-0.05), vignette 0.2-0.25, weak bloom threshold >1.0. No DOF (R3#9), no sharpen, CA off by default. Low tier: static overlay instead [idea].
- Cost note: ~12 MB buffer traffic per pass on a 1170x2532 iPhone [REP unverified].
- Check: P-suite p95 with/without (keep <=18 ms) plus one real-phone reading; greyscale toggle.
- Sources: R1#10, R2#10, R3#5,#8, R4#3,#12, R5, R6#25,26,31-34; REP row 7.

### 7. Background life: merge meshes first (net draw saving)
- Change: (a) World.tsx `Shape`/`Person` + characterSpec.ts: merge static parts per man into one vertex-coloured body + one head group: ~10 calls -> 2 (and 2 in the shadow pass); without it more men multiply cost. (b) EXTRAS 5 -> 10-14 with 8-20 s job loops (sweep, carry, water plants, bread, tea, pairs talking; all male), +-10-15% speed and phase (code: random phase only), near/mid/far staggering, men crossing frame and sometimes occluding the lens, never looking at camera (R7#9, R3#10), eased starts/stops and hem lag (R2#3), distinct gait/stoop (R1#6, R7#2), people-implying props (broom, jug, sandals, crates). Later: `InstancedMesh` for the far layer.
- Check: draw calls before/after; any all-static frame fails; Suite R stays 100%.
- Sources: R7 Top 1-2, R1 Top 4, R2 Top 2-3, R4#25/30, R5#8, R6#9; REP.

### 8. Haze retune (cost S)
- Change: World.tsx `fogExp2` 0.011. [derived] exp(-(d*density)^2): ~7% at 25 m, ~36% at 60 m, ~54% at 80 m, i.e. 180 m effective visibility, ~10x denser than REP's 2 km. REP's beta 0.002 is plain exponential, NOT FogExp2: for ~15% at 80 m use ~0.005. R2 wants the minaret to lose 30-40% but it is only ~25-30 m away here: add a haze card behind it instead. Thin 08 -> 11 (R5), pale blue-grey never yellow (R5), warm toward the sun via one `dot(viewDir,sunDir)` patch (REP). ~200 dust motes in one `Points` call (R2#9, R5).
- Check: far-vs-near facade contrast sample; one extra draw. AB formula (2/visibility) is right.

### 9. Wind on cloth (cost 0-S)
`Stall` awnings, later rugs/hems: one shared wind uniform in a vertex chunk, low bend by height + flutter 0.3-0.9 Hz [REP derived]; tilt normals so raking sun ripples. Check: 3 s awning sequence, no new draws. Sources: R2#7, R7#7, R6; REP (GPU Gems 3 ch.16).

### 10. Real CC0 hero textures (memory M)
textures.ts: Poly Haven 1k coral/plaster/teak/paving as KTX2 (ETC1S colour, UASTC normal), foreground only (R3#7); budget <=64 MB, 8-10 sets [unverified] (8 sets ~134 MB raw vs ~34 MB KTX2 [derived]); log in SOURCES.md. Check `gl.info.memory.textures`, context-loss rate. Defer until 3 is judged. Source: REP table.

### 11. Palette, hero prop, clutter (cost 0-S)
60-30-10 palette, 2-3 hues per view, coral HSL sat <=35%, off-white thobes with hem dust (R4#8,9,14; R3#6; R5); one hero prop + 3-5 supporting per place; merge/instance the 14 separate fruit meshes in `Stall`. Check: lab hue-bucket metric (accent <=15%, dominant >=50%).

### 12. Speculars, water, optional N8AO (cost S; N8AO 1-3 ms [unverified])
Brass/door knockers roughness 0.2-0.35, wet fountain rim, backlit water glints (R6#10, R4#5). N8AO half-res only on high tier after profiling 6 (REP).

## Where readers and REP agree
Hard sun + warm bounce + cool sky; deep shade; limited palette; imperfection/wear; AgX + one light grade; grain faint; no DOF blur that hides the setting; eye-height level camera; narrower lens than a "game" FOV; background men always mid-action; layered foreground/mid/background; haze tinted blue-grey; wind on cloth.
## Conflicts (decide per the notes above)
1. Sun elevation: REP up to 59 deg vs readers 15-45 deg. 2. Fog numbers: REP's beta is not FogExp2 density; code's 0.011 is ~10x too dense vs REP's goal. 3. Shadow freezing (REP) vs moving men (code). 4. Chromatic aberration: R4/R6 yes (<=1 px), R3/REP no. 5. Grade: R2 "no global tint, warmth in light only" vs R4/R5/R6/R3 LUT with warm highlights/cool shadows. 6. Camera: REP/R4/R6 handheld micro-motion vs R1/R3 "no floaty drift"; resolve with a tiny, optional shake. 7. R7's portrait FOV formula (see 2). 8. Weathered teak albedo 0.06-0.12 (AB) vs 0.12-0.16 (REP).
Also: every phone timing above, and REP's "bake in seconds", are unmeasured; lab numbers are headless emulation. First action after each item: lab P-suite plus one real-phone reading.

## ART_BIBLE.md edits needed
1. Light: sun elevation follows the clock 20 -> 45 deg, azimuth 30-90 deg off the camera axis (never straight behind it), sun:fill 4:1-6:1, IBL on facades 0.4-0.6, sun colour #FFF1E0 -> #FFF8F0.
2. Haze: keep FogExp2 = 2/visibility; add ~15% at 80 m (~0.005), never yellow, thins 08 -> 11.
3. Camera: FOV table (dialogue 44-50 vertical portrait, walk ~54, establishing <=60, never >65), micro-motion numbers, "still camera" setting, foreground occluder 0.5-1 m, no DOF.
4. Tone mapping: "AgX once, inside the single final pass when post is on"; pass order and numbers (sat ~0.9, black point 2-3%, grain ~0.025, vignette 0.2-0.25, bloom >1.0, CA off); lit limewash 85-92% sRGB.
5. Materials: roughness-map rule, metalness only 0 or 1, brass 0.25-0.45, macro noise 4-12 m, wear story (grime band 0.3-1 m, sill streaks, polished edges).
6. Architecture: gandal courses every ~1.1-1.2 m, mostly 4-6 storeys (some 7), 50-60 cm walls with deep reveals, rawasheen types on brackets, dakka bench <=60 cm; STOREY 3.2 m unverified.
7. AO/sky visibility baked on indirect light only.
8. Budgets: static quarter <=10 calls, characters 2 each, clutter 10-20, post 1 pass, textures <=64 MB [unverified].
9. Failure tags: add TILE, FLAT, SYM, FOV-wide, STATIC.
10. Judging: `?grey` review, luma-spread and hue-bucket metrics, 6-8 off-white test on a phone.
11. Promote dust motes, wind on cloth, lattice-patterned sun to Tier 1; keep "no sharpening, no heavy CA".
12. Characters: 8-20 s job loops, +-10-15% speed/phase, distinct gait, 10-14 background men.
