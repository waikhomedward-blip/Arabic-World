# Bake the light, build the sentences

Arabic World can get much closer to "footage" on phones without a single new draw call. The studios that do this best (Sucker Punch on Ghost of Tsushima, Rockstar on RDR2) don't rely on one expensive effect. They stack cheap, correct cues: a sun at the right angle and colour, sky light that fills the shadows, ambient occlusion baked in where it costs nothing, warm bounce, cached sun shadows, distance haze tinted by the sun, and a soft tone curve. Every one of those cues has a three.js equivalent that runs once at load or costs a few shader instructions. The game currently pins **three r170**, which already has AgX tone mapping and `scene.environmentIntensity`. It has not yet hit the r182 shadow-type change. The same "build it correct, then check it" logic answers the second question. Millions of correct Fusha conversations come from hand-written scenario cards ("storylets") with typed slots. A build-time morphology generator realises them: **CAMeL Tools**, MIT licence, from NYU Abu Dhabi. Agreement rules live in the Arabic language pack. Correctness is proved per template and per feature combination, not per sentence, so no AI grader is needed. Two things are still open: the licences of the Arabic morphology data, and whether any of the numbers below hold on Edward's actual phones. Both are flagged throughout. Numbers marked **[unverified]** come from rules of thumb, a single weak source, or the researcher's own working, and must be measured in the lab before anyone relies on them.

## Seven cheap cues do most of the photographic work

The deepest primary source is Jasmin Patry's SIGGRAPH 2021 talk on Ghost of Tsushima. Its sky is physically based Rayleigh and Mie scattering stored in 3D lookup tables (LUTs). Exposure is driven by illuminance rather than luminance, so a white wall doesn't darken the whole frame. White balance is a colour matrix. Sky visibility is baked per surface and multiplied by the live sky colour. And there is a fake "sun bounce off imaginary ground and wall" ([Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)). A frame study of RDR2 shows the same idea in different form. Large-scale ambient occlusion (AO) is baked into cubemaps and building albedo. Screen-space AO handles only small-scale detail. Environment maps are re-baked only when the time of day changes ([imgeself RDR2 study](https://imgeself.github.io/posts/2020-06-19-graphics-study-rdr2)). The lesson for a phone: **bake anything that depends only on the sun, and the sun barely moves between 08:00 and 11:00.** Ranked by realism per phone-millisecond, the research puts these first: correct sun angle and colour with sky image-based lighting (IBL), then baked AO and sky visibility, warm bounce fill, a fitted and cached sun shadow, sun-aware haze, and AgX with a light grade. Half-resolution screen-space AO comes last, as a high-end extra.

### Sun and sky: crisp morning light, not golden hour

Jeddah sits at 21.5°N, so the sun is already high in the game's window. Computed with the NOAA approximation, the sun on 20 March is at **20° elevation and 99° azimuth at 08:00, rising to 59° and 132° by 11:00**. On 21 June it is 29–70°, slightly north of east. On 21 December it is 12–41° ([NOAA Solar Calculator](https://gml.noaa.gov/grad/solcalc/); computed locally, cross-check before use). That means short, crisp shadows. The "morning" feeling has to come from colour, haze and raking light across lane walls, not long golden shadows. Pick one date, the equinox, and run a lane roughly north–south. At 08:00–09:00 one wall is lit and the other is in shade, and the floor gets sun near 11:00, which gives the strongest photographic contrast. The cheapest believable sky is drei's Preetham `<Sky>`, rendered once into a PMREM environment map and re-baked every ten game-minutes, never every frame. Suggested starting values are turbidity 6–10 for dusty coastal air, a sun tint near `#FFF1E0` at 08:00 moving to `#FFF8F0` by 11:00, and a sun-to-sky ratio where lit walls are about 4–6× brighter than shaded walls after tone mapping **[all unverified]**. If Preetham looks synthetic, the upgrade path is Sébastien Hillaire's 2020 sky. It uses a few small LUTs, scales "from a low-end Apple iPhone 6s to consoles", and lets LUT updates be time-sliced ([Hillaire, EGSR 2020](https://diglib.eg.org/handle/10.1111/cgf14050); [slides](https://blog.selfshadow.com/publications/s2020-shading-course/hillaire/s2020_pbs_hillaire_slides.pdf)). A real HDRI from Poly Haven is CC0 ([Poly Haven FAQ](https://docs.polyhaven.com/en/faq)), but no clear-morning, 20–40° sun capture was found, and a baked-in sun would fight the game clock. Use one, if at all, only for reflections with its sun painted out. three.js can also turn the sky cube into a cheap diffuse spherical-harmonics `LightProbe` via `LightProbeGenerator.fromCubeRenderTarget` ([three.js docs](https://threejs.org/docs/pages/LightProbeGenerator.html)).

### Shadows: one fitted map, frozen between sun moves

Cascaded shadow maps multiply shadow draw calls, which the 150-call budget can't afford in a 40 m street. Use one directional shadow map with an orthographic box fitted to the lane, roughly ±22 m. At 1024² that gives about 4 cm per texel **[derived]**. Set `renderer.shadowMap.autoUpdate = false` and flag `needsUpdate` only when the sun moves, so static shadow cost drops to near zero on most frames. `PCFSoftShadowMap` takes several lookups per pixel, and one user saw an Android portrait-mode frame drop from it alone ([three.js forum](https://discourse.threejs.org/t/performance-drop-in-mobile-portrait-mode-android-chrome-firefox/2080)). VSM leaks light on thin geometry ([three.js forum](https://discourse.threejs.org/t/dynamic-shadows-with-vsmshadowmap/71094)), which matters for rawāshīn lattice. A version trap is coming. **In r182 `PCFSoftShadowMap` is deprecated and `PCFShadowMap` "is now soft"**, and users report pixelation and bias changes after upgrading ([forum, r182 pixelation](https://discourse.threejs.org/t/shadow-pixelation-issue-in-three-js-0-182-0/88746)). The project is on r170, so either pin it or re-tune bias when upgrading. For characters, a soft blob decal stretched along the sun direction is nearly free. drei's `ContactShadows` is "a rather expensive effect" unless rendered once with `frames={1}` ([drei docs](https://drei.docs.pmnd.rs/staging/contact-shadows)). Starting bias values are `bias −0.0005` and `normalBias 0.02–0.05` **[unverified]**. Raise `normalBias` first for acne on walls at a grazing 08:00 sun.

### Ambient occlusion: bake big, screen-space small

The single biggest "grounding" cue, AO, is free if baked. The street is merged per material, so build a `three-mesh-bvh` over it. For each vertex, cast 32–64 hemisphere rays out to 1.5–3 m for local AO and to 50 m for sky visibility, and store the results as vertex attributes. Then multiply only indirect light by them, never the direct sun. Wall bases and openings need extra vertices or the gradients will be coarse. Bake time is likely seconds **[unverified]**, so cache it to a binary file at build time. This is the RDR2 split: bake the large scale, leave small scale to screen space. Screen-space AO on phones should be a quality tier only. N8AO's "Performance" preset (8 samples, 4 denoise) is the one its author recommends for mobile and low-end GPUs. Half-resolution mode gives a "2x–4x speedup", and Medium costs about 0.7–0.8 ms at 1080p, but on an Apple M5 Max desktop chip, not a phone ([N8AO README](https://github.com/N8python/n8ao)). Extrapolated phone cost is **1–3 ms [unverified]**, a large share of the 16.6 ms frame once a phone heats up.

### Bounce, haze and grade make the shadows coloured and the depth real

"CG" lighting usually means grey shadows. A sunlit coral-and-lime street lights its own shade with warm bounce. Copy Tsushima's imaginary-ground trick. Add a `HemisphereLight` with a blue-white sky colour and an ochre ground colour (`#BFD8FF` / `#C89A6A`, intensity 0.3–0.6), and optionally a weak, shadowless directional light pointing up from the floor at 10–25% of the sun **[values unverified]**. Neither costs a draw call.

For haze, Koschmieder's law gives visibility V = 3.912/β ([visibility summary](https://reference.org/facts/visibility/reqevMCQ)). Real 20–40 km coastal visibility is invisible across 30–80 m of lane. So pick an "art" visibility of about 2 km (β ≈ 0.002 m⁻¹, about 15% haze at 80 m) and use linear-exponential fog. three.js `FogExp2` squares the density and uses view-space depth, so it shifts as the camera turns ([three.js FogExp2](https://threejs.org/docs/pages/FogExp2.html)). The cue AAA aerial perspective adds over plain fog is colour that depends on the sun: a warm glow looking toward the sun, cool blue-grey looking away. That is one `dot(viewDir, sunDir)` in a shader patch.

For tone mapping, AgX is less saturated and lower-contrast than ACES "by design" and is "a better foundation for color grading". ACES darkens and shifts hues ([three.js forum, Tone Mapping Overview](https://discourse.threejs.org/t/tone-mapping-overview/75204)). pmndrs `postprocessing` merges effects into one fullscreen pass. Its README recommends half-float buffers against banding and `NoToneMapping` on the renderer when its own `ToneMappingEffect` is used ([pmndrs/postprocessing](https://github.com/pmndrs/postprocessing)). A photographic finish needs four things. Lit limewash should land at **85–92% in final sRGB, never clipped white**. Bloom should be wide, weak and thresholded above 1.0. Grain should be faint (opacity 0.02–0.04). The vignette should be light **[all starting points, unverified]**. Every full-screen pass on a 1170×2532 iPhone touches about 12 MB at half-float **[unverified]**, so the merged pass matters more than any single effect.

## Correct materials, honest wear and 1k KTX2 textures

The "plastic" look has known, sourced causes. Base colours fall outside the 30/50–240 sRGB range ([Adobe PBR Guide](https://www.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-2)). Roughness is flat. Metalness sits between 0 and 1 where it should be exactly 0 or 1 ([Unity docs](https://docs.unity3d.com/2020.2/Documentation/Manual/BestPracticeMakingBelievableVisuals5.html)). Compiled reflectance tables put **plaster at 0.40–0.45 linear (about 170–177 sRGB)**, **fresh wood at 0.35–0.42**, and **old, weathered wood at only 0.12–0.16** ([Chaos forum reflectance list](https://forums.chaos.com/index.php/topic,2359.msg17366.html)). Sand is about (0.44, 0.39, 0.23) linear ([physicallybased.info](https://physicallybased.info/), linear-ness unconfirmed). Roughness values reproduced from Lagarde's DONTNOD chart give plaster 0.70, rock 0.61 and wood 0.42 ([Polycount](https://polycount.com/discussion/comment/2774211); secondary). No measured values exist in the notes for coral stone, limewash or teak.

The practical rule is this. Author limewash near 195–215 sRGB so AgX has headroom. Make sun-greyed teak dark (about 100–125 sRGB) at roughness 0.6–0.8. Keep stone and plaster at roughness 0.8–0.95 with ±0.1 noise. Brass is metalness 1 at (0.91, 0.78, 0.42), rubbed to 0.25–0.45 roughness where hands touch it **[working values, unverified]**.

Poly Haven (all CC0, [licence](https://polyhaven.com/license)) has sets that match the street almost exactly ([Poly Haven API](https://api.polyhaven.com/assets?t=textures)):

| Need | Poly Haven asset | Real-world tile | 1k JPG (colour+normal+ARM) |
|---|---|---|---|
| Coral stone | `coral_fort_wall_01/02/03`, `coral_stone_wall` | 1.0–2.0 m | 2.7–3.2 MB |
| Lime plaster | `white_plaster_rough_01`, `white_stucco`, `worn_plaster_wall`, `clay_plaster` | 1–2 m | 1.3–1.8 MB |
| Teak | `teak_veneer` (fresh; bleach and roughen), `weathered_planks` | 1–2 m | 1.8 MB |
| Paving | `seaworn_stone_tiles`, `precast_stone_paving` | about 2 m | 2.0–2.3 MB |
| Cloth | `rough_linen`, `waffle_pique_cotton` | about 0.27 m | 2.8–2.9 MB |

ambientCG is also CC0 ([licence](https://docs.ambientcg.com/license/)), but its zips are larger. GPU memory, not download size, is the real constraint. A 1024² RGBA texture with mipmaps is about 5.6 MB uncompressed, and GPU formats cut that 4–8×. ETC1S suits colour, and UASTC suits normal maps ([Don McCurdy, 2024](https://www.donmccurdy.com/2024/02/11/web-texture-formats/)). The glTF-Transform CLI does both ([README](https://github.com/donmccurdy/glTF-Transform/blob/main/packages/cli/README.md)). iOS Safari kills pages under memory pressure with no published limit ([WebKit bug 241478](https://lists.webkit.org/pipermail/webkit-unassigned/2022-June/1039433.html)), so a budget of **≤64 MB of texture memory and 8–10 material sets [unverified]** is the safe target. Eight 1k sets would take about 134 MB raw and about 34 MB as KTX2 **[derived]**.

Realism comes from wear that tells one consistent story, applied procedurally across all four or fewer shader families (wall, teak, ground, small props). Naughty Dog built Uncharted 4's look largely in the vertex shader with layered blends ([GDC Vault](https://www.gdcvault.com/play/1024103)). AC Mirage's kit artists placed weathering on roofs and foundations deliberately ([Radi Avramov, ArtStation](https://radiavramov.artstation.com/projects/KeQ4YW)). For this street, the story is:

- Sun bleaches the upper façades.
- Salt and damp rise from the ground. Jeddah's water table is about 1.2 m down ([ICRI 2025](https://www.icri.org/wp-content/uploads/2025/05/ICRI-2025-04-Mon-Anberv2.pdf)), which justifies a sand-tinted grime band over the bottom 0.3–1 m.
- Streaks run under every sill and roshan.
- Hands polish door edges.
- Feet polish a central strip of paving.
- A world-space noise multiply (period 4–12 m, ±8–15% value) hides tiling. Coral sets are only 1–1.4 m square, so it is required on 6–10 m façades.

## Lens, layers and a few working men sell the street

On a portrait phone, three.js's vertical `fov` behaves like a full-frame sensor turned on its side. A 50 mm equivalent is about **40° vertical**, the default for over-the-shoulder (OTS) dialogue. 35 mm (about 54°) suits walk-and-talk, and 28 mm (about 66°) suits establishing shots **[derived from the lens formula]**. That matches film practice: most OTS coverage sits at 50–85 mm ([Soundstripe](https://www.soundstripe.com/blogs/over-the-shoulder-shot)), and longer lenses compress space ([Adobe](https://www.adobe.com/creativecloud/video/production/cinematography/camera-shots-and-angles.html)). A 50–85 mm lens down a narrow lane stacks the rawāshīn on top of one another, which is exactly the look of real Al-Balad footage.

Build three depth layers. In front, a near shoulder, ghutra, doorframe or hanging cloth within 0.5–1 m of the lens, which gives parallax. In the middle, the speaker in raking sun. Behind, the hazed lane with one to three background men. Keep the camera at a standing man's eye height (about 1.6 m **[unverified]**) with no roll. Without faces, head and chest direction is the eyeline, so the 180° rule still applies. A handheld drift of 0.5–2 cm at 0.05–0.3 Hz **[unverified]** reads as a real camera, but players need a "still camera" option.

Density was "really key" to AC Mirage's Baghdad, according to its creative director ([GamingBolt](https://gamingbolt.com/assassins-creed-mirage-takes-inspiration-from-assassins-creed-unity-developer-confirms)). No source gives props per metre, so the per-shot hierarchy is a proposal. Use one hero prop the line is about, 3–6 supporting props, and instanced clutter. Group things in odd numbers, off-centre, with no two neighbouring façades alike. Clutter should take no more than 10–20 draw calls **[unverified split]**.

For background life, the three.js "One Draw Call, Massive Crowd" approach puts every figure in one `InstancedMesh`. A per-vertex part ID lets the shader animate rigid body parts, with level of detail (LOD) and transform updates amortised across frames ([three.js forum](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928)). Low-poly thobes suit it, because there is no skinning. Give each man a readable 8–20 s job loop with a random phase: sweeping, carrying a crate, watering plants, arranging bread, sitting with tea. Then no frame is ever frozen.

Wind is a solved, cheap problem. Crysis's vertex-shader recipe combines a low-frequency main bend scaled by height with detail flutter from smoothed triangle waves at frequencies 1.975, 0.793, 0.375 and 0.193, weighted by vertex colours ([GPU Gems 3 ch.16](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch16.html)). Ghost of Tsushima drives cloth, foliage and particles from one shared wind vector modulated by noise ([Game Developer](https://gamedeveloper.com/design/using-vorticles-to-simulate-wind-in-i-ghost-of-tsushima-i-)). Real trees sway at **0.26–0.56 Hz** ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6597771)). Flag flutter follows f = St·U/L ([arXiv 2602.06237](https://arxiv.org/pdf/2602.06237)), which puts a 1 m awning in a 1.5–3 m/s breeze at about 0.3–0.9 Hz **[derived]**. Tilting the normals with the displacement is what makes cloth ripple under raking sun.

Faceless characters can still carry emotion through the body. Roether and colleagues found that emotion in gait depends on a small number of joints, with head inclination signalling sadness and arm and upper-body amplitude carrying the main differences ([Roether, Tübingen](https://www.compsens.uni-tuebingen.de/compsens//files/publications/thesisroether2011.pdf)). Journey's cloth-covered figures were designed to be expressive without a culture-specific look ([CGW](https://www.cgw.com/Publications/CGW/2012/Volume-35-Issue-4-June-July-2012/Mysterious-Journey.aspx)). That supports a gesture vocabulary:

- Speaking: nods on stressed syllables and an open palm.
- Listening: head tilted toward the speaker.
- Greeting: hand on chest and a slight bow.
- Sadness: head down and a slower tempo.

Add procedural breathing (about a 4 s cycle) and a weight shift every 6–10 s, desynchronised per man ([MoCap Online](https://mocaponline.com/blogs/mocap-news/idle-animation-design-guide)). Make the ghutra the head silhouette that replaces a face. For animation clips, prefer **Quaternius's Universal Animation Library (CC0, 120+ clips)** ([quaternius.com](https://quaternius.com/packs/universalanimationlibrary.html)) over Mixamo. Mixamo forbids redistributing raw files ([Adobe Community FAQ](https://community.adobe.com/t5/mixamo-discussions/mixamo-faq-licensing-royalties-ownership-eula-and-tos/td-p/13234775)), and a web game ships its `.glb` files openly. Screen every clip against the hard rules: no dance-like motion, all-male cast.

## Al-Balad gives a sourced kit: towers, timber bands and rawāshīn

Historic Jeddah's houses were **5–6-storey towers, up to seven for the richest merchants**, built of mangabi coquina limestone and coral ([Nyazi 2018](https://dergipark.org.tr/en/download/article-file/624547); [UNESCO WHC 1361](https://whc.unesco.org/document/152474)). Ground-floor walls are **50–60 cm thick**, thinning upward, per Nyazi. Baeshen House has 70–80 cm walls ([Basunbul & Braham 2023](https://www.frontiersin.org/journals/built-environment/articles/10.3389/fbuil.2023.1127615/full)). Model deep window reveals on the ground floor.

The most useful cheap texture cue is the **gandal timber courses roughly every 1–1.2 m of height, visible on both faces of the wall**. On worn or unplastered walls they show as about three dark horizontal bands per storey ([Nyazi 2018](https://dergipark.org.tr/en/download/article-file/624547)). Walls are finished in a thick coat of white or ochre lime plaster and limewash. Whitewash "reflects 80% or more" of solar radiation. Houses were also washed in pastel yellow, cream, blue and pink. Doors, windows and rawāshīn are Javan teak ("Jawi"), mahogany and sisam (same source). Rawāshīn come in natural brown and green ([Saudipedia](https://saudipedia.com/en/al-rawashin)).

Rawāshīn come in three sourced types ([Saudipedia](https://saudipedia.com/en/al-rawashin)):

| Type | Description |
|---|---|
| Masmat | Flat, slight projection, little carving, no crown |
| Bariz | Projecting, rich geometric lattice, often crowned, stacked or continuous across a floor |
| Balcony | A projecting balcony with a canopy |

All are carried on wooden brackets, and a dakka stone bench no higher than 60 cm runs beneath them. A provisional figure gives the typical width as **2.4 m** ([UPV study, snippet only](https://riunet.upv.es/bitstream/10251/76207/1/2316-9659-1-PB.pdf)). Projection depth (an art estimate of 0.5–0.9 m), floor-to-floor heights and lane widths (an estimate of 2–4 m) are **unverified**. The UNESCO dossier and Al-Lyaly's 1990 thesis hold them but couldn't be read. Big rawāshīn face north and west to catch breezes, with the south side closed ([Basunbul & Braham 2023](https://www.frontiersin.org/journals/built-environment/articles/10.3389/fbuil.2023.1127615/full)). Roofs are flat lime-plastered terraces with parapets and a louvred timber top room, the mabit ([Nyazi 2018](https://dergipark.org.tr/en/download/article-file/624547)).

For lighting, the geometry matters most. With 4–6 storeys over a narrow lane, the 08:00 sun lights only upper façades and rawāshīn, while the floor stays in shade. Small squares become pools of light. To stay original, compose every house from the kit and never copy a named landmark's massing. That includes Bayt Nasif ([ArchNet](https://archnet.org/sites/3794)) and Bayt Hazazi ([Google Arts & Culture](https://artsandculture.google.com/story/IgVhUr6c8o8tHQ)).

## Correct by construction: storylets, typed slots and a morphology engine

Three layers do the work. Large-scale game dialogue that stays coherent comes from small, hand-written units with conditions, picked against the current world state. Valve's response system for Left 4 Dead 2 matches each line's criteria against world facts and lets the most specific rule win ([Ruskin, GDC 2012](https://cdn.fastly.steamstatic.com/apps/valve/2012/GDC2012_Ruskin_Elan_DynamicDialog.pdf)). Emily Short calls the general pattern salience-based narrative, and its units "storylets": "simple, atomic, robust, and recombinable" ([Beyond Branching](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/); [Storylets](https://emshort.blog/tag/quality-based-narrative/)). Caves of Qud generates convincing histories from authored templates plus a state machine ([Grinblat & Bucklew 2017](https://pcgworkshop.com/archive/grinblat2017subverting.pdf)).

The warning from the same field is Kate Compton's "10,000 bowls of oatmeal". Millions of technically unique outputs mean nothing if players can't tell them apart ([Rabii & Cook, FDG 2023](https://pyrofoux.github.io/why-oatmeal-is-cheap/why_oatmeal_is_cheap_fdg2023.pdf)). For a language game, shuffling synonyms is worse than oatmeal, because each synonym is a new unknown word. **Variety should change meaning**: a different need (water, bread, directions), a complication (out of stock, wrong change), or a callback to a known neighbour.

The architecture that follows has four layers:

1. **Storylets.** Each one has conditions on place, clock (08:00–11:00), the player's known words, and the relationship with a character.
2. **A typed slot grammar.** Slots carry features (ITEM, QTY, PLACE, ROLE with gender, number, definiteness and case), not raw strings.
3. **A realisation engine.** It inflects the slots.
4. **Validators.**

Tracery, the best-known text grammar (Apache 2.0 per its ports, [PyPI](https://pypi.org/project/tracery)), can't do Arabic agreement. A small feature grammar is needed.

For realisation, **CAMeL Tools** from NYU Abu Dhabi (MIT) has a real `Generator`: `generate(lemma, feats)` returns fully diacritised forms ([docs](https://camel-tools.readthedocs.io/en/latest/api/morphology/generator.html); [GitHub](https://www.github.com/CAMeL-Lab/camel_tools)). **Camel Morph MSA** is the "largest open-source MSA morphological analyzer and generator", with over 100K lemmas and about 36% fewer out-of-vocabulary words than SAMA ([LREC-COLING 2024](https://aclanthology.org/2024.lrec-main.240/)).

The licence catch matters. **CAMeL's built-in MSA database (morphology-db-msa-r13) is GPL v2** ([CAMeL packages](https://camel-tools.readthedocs.io/en/latest/reference/packages.html)). Camel Morph data is reportedly CC BY 4.0 but needs a fork ([PyPI](https://pypi.org/project/camel-morph); LICENSE file **unverified**). Anything else in the field is worse for a $0 game:

- SAMA costs an LDC fee ([LDC](https://catalog.ldc.upenn.edu/LDC2010L01)).
- MADAMIRA is non-commercial only ([Columbia](https://inventions.techventures.columbia.edu/licenses/madamira-non-commercial--108)).
- Mishkal is GPL ([GitHub](https://github.com/linuxscout/mishkal)).
- Farasa's terms are unclear ([HBKU](https://expertise.hbku.edu.qa/sites/default/files/2025-01/Farasa_0.pdf)).

The safe design runs CAMeL at build time in Python only and ships a **project-owned, hand-checked lexicon and paradigm table** for the 1–3K lemmas the game uses. GPL databases serve only as a build-time cross-check (a licence inference, not legal advice).

Syntax-level agreement belongs in the Arabic language pack as a small TypeScript rule engine:

- Numbers 3–10 take the opposite gender to the counted noun's singular. A beginner-safe subset is 1–10.
- Non-human plurals take feminine-singular adjectives.
- Sun letters take a shadda after al-.
- Diptotes lose tanwīn.
- Pausal forms are stored alongside full-case forms for audio.
- Each template uses one canonical word order.

The all-male cast simplifies human agreement to masculine forms. It also makes the hard rule enforceable as a **feature-level ban (no feminine gender on any human slot)**, which is stronger than any word list. The notes cite no grammar source for these rules, so a Muslim-world grammar reference should be added to `docs/SOURCES.md`.

Difficulty control uses Hu & Nation's **95% minimal / 98% adequate known-word coverage** ([Frontiers 2022](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.800983/full)). Treat it as a design target, not a law, because a 2023 replication couldn't fully reproduce it ([Kremmel et al., Lancaster](https://eprints.lancs.ac.uk/id/eprint/210922)), and no Arabic-specific threshold study was found. Count lemmas, not surface forms. Arabic clitics would otherwise make every inflection look like a new word. Allow at most 1–2 new lemmas per scene, each supported by an image or gesture. Duolingo's split between choosing the right exercise (Birdbrain) and creating it ([Duolingo blog](https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain)) maps onto a salience bonus for storylets that reuse words due for review. That replaces streaks and XP, which the hard rules ban.

No AI grader is needed, because the generator built every sentence from features and knows the correct answer. Checking is an exact match after normalisation.

Validation should never trust a diacritiser as the judge. The best systems still show error rates of about **3–5% on MSA news** ([EMNLP 2025](https://aclanthology.org/anthology-files/pdf/emnlp/2025.emnlp-main.846.pdf), DER-vs-WER unclear; [arXiv 2109.14150](https://arxiv.org/pdf/2109.14150.pdf), WER 4.79%). The proposed suite has eight checks:

1. Round-trip every word through the CAMeL analyser. The intended lemma and features must appear among the analyses.
2. Lint diacritic completeness.
3. Lint agreement against template roles.
4. Raise a second-diacritiser disagreement alarm that goes to a human queue, not to auto-reject.
5. Run the coverage gate.
6. Enforce a lexicon whitelist pre-labelled universal, cultural or sacred to match `app/src/core/review.ts`.
7. Apply hard-rule filters at feature level, including the clock window, and never generate Quran text.
8. Test combinatorial coverage: enumerate every template × slot-type combination (pairwise or all-pairs), plus about 20 human-reviewed samples per new template.

Correctness is compositional, so verifying combinations verifies the millions of instances.

Open-weight Muslim-world LLMs exist under Apache 2.0, **Fanar-1-9B from QCRI** ([HF](https://huggingface.co/QCRI/Fanar-1-9B)) and the **Jais family** ([HF](https://huggingface.co/inceptionai/jais-family-13b)). They are too large for a free phone game and guarantee neither tashkeel nor the hard rules. At most, they can draft storylet frames offline, which are then stripped and rebuilt through the template pipeline and validators.

## Conclusion

The way to look real and the way to generate correct Arabic turn out to be the same. Both put the expensive, error-prone work at build time: AO rays, sky bakes, KTX2 compression, morphology generation, combinatorial validation. Then they ship small, verified tables that a phone only looks up. That fits a $0 budget, a 150-draw-call cap and an owner who can't debug a GPU or a grammar, because each guarantee becomes a lab check rather than a judgement call.

The main risks are measurement and licensing, not technique. None of the phone timings here were measured on a phone, and the cleanest Arabic data licence (Camel Morph, CC BY 4.0) is still unconfirmed. Settle both in the lab and in `SOURCES.md` before building on them.

## Prioritised action list

| # | What | Why | Expected effect | Phone cost | Effort |
|---|---|---|---|---|---|
| 1 | Drive the sun from the equinox table (20°→59° elevation, az 99°→132°) and orient the hero lane north–south | Wrong sun angle is the first "CG" tell. The lane geometry gives a lit wall against a shaded wall | Correct short morning shadows and raking light | 0 | Small |
| 2 | Bake per-vertex AO and sky visibility with three-mesh-bvh at build time, applied to indirect light only | The biggest grounding cue, and it is free at runtime (RDR2 split) | Removes the "floating, clean" look at wall bases, openings and under bays | 0 ms at runtime. A small attribute download | Medium |
| 3 | Preetham sky → PMREM `scene.environment`, re-baked every 10 game-minutes, plus a warm hemisphere bounce (`#BFD8FF`/`#C89A6A`) **[values unverified]** | Coloured, readable shadows instead of grey or black | Shaded-to-lit wall ratio near 1:4–1:6 | Re-bake about 1 frame per 10 min. Bounce is per-pixel cheap | Small |
| 4 | One fitted 1024² shadow map (2048² on high tier), `autoUpdate=false`, blob decals under people. Pin three r170 or re-tune bias at r182 | Crisp sun shadows inside the draw-call budget | Near-zero shadow cost on static frames | Shadow pass only on sun moves | Small |
| 5 | Switch the material set to Poly Haven coral/plaster/teak/paving at 1k, convert to KTX2 (ETC1S colour, UASTC normals), and log authors in SOURCES.md | Real surface detail, and memory safety on iOS Safari | Texture memory about 34 MB against about 134 MB raw **[derived]** | Lower memory, faster upload | Medium |
| 6 | Wall, teak and ground shaders: albedo in range, roughness 0.8–0.95 ±0.1, world-noise macro variation, grime band, sill streaks, gandal timber bands every ~1.1 m | Fixes "plastic" and visible tiling. Adds sourced Hijazi identity | Walls read as aged, specific and Jeddah-like | 1–2 texture fetches per pixel | Medium |
| 7 | Add pmndrs `postprocessing`: one EffectPass with AgX, light contrast/saturation, weak bloom above 1.0, vignette and grain. HalfFloat buffers. Lit limewash at 85–92% sRGB | Photographic highlight roll-off and finish | Removes clipped "CG white" | One merged full-screen pass plus a bloom mip chain **[cost unverified]** | Small |
| 8 | Sun-aware linear-exponential haze (art visibility about 2 km) patched into the shared materials | Aerial depth down the lane | Distance reads as air, not as a backdrop | A few ALU ops | Small |
| 9 | Camera kit: 50 mm (40° vertical) OTS default, 35/28 mm for walks and establishing, foreground occluder within 1 m, 0.5–2 cm drift with a "still camera" setting | Film framing on a portrait screen | Conversations look shot, not rendered | 0 | Small |
| 10 | Instanced background men (one draw call, part-ID vertex animation) with 8–20 s job loops, plus shared-uniform wind on awnings, laundry and hems | "No frame frozen", and a calm, lived-in morning | The street feels inhabited | 1–3 draw calls. Vertex ALU | Medium |
| 11 | Arabic pack: storylet + typed-slot templates, CAMeL Tools build script → project-owned paradigm JSON, and a TypeScript agreement engine (numbers 1–10, adjectives, sun letters, pausal forms) | Millions of correct, vowelled lines with no AI grader | Variety that changes meaning, correct by construction | Runtime JSON lookup only, about a few hundred KB **[estimate]** | Large |
| 12 | Lab suite for generated text: analyser round-trip, diacritic and agreement linters, lemma coverage ≥95–98%, feature-level hard-rule bans, all-pairs template × feature enumeration, 20-sample human review per new template | Proves correctness at scale and keeps Suite R at 100% | Errors caught per template, not per player | 0 (build time) | Medium |
| 13 | Confirm the Camel Morph data LICENSE, and the GPL status of the CAMeL MSA database, before shipping any derived table | Avoid an unclear-licence commit (hard rule) | A licence-clean shipped lexicon | 0 | Small |
| 14 | Optional high tier: N8AO Performance preset, half-res, for A15+/recent Snapdragon 8 only, after profiling | Contact AO for moving people and props | Small extra realism | 1–3 ms **[unverified]** | Small |
| 15 | Profile items 2–8 on the lab's five devices (ms per pass, memory) and replace every [unverified] number here with a measured one | None of the phone timings in this report were measured | Turns guidance into tested budgets | — | Medium |
