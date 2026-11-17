# Composition, camera, set dressing, background life, wind and believable faceless characters (phone WebGL2 street game)

Scope note: game = mostly conversations in a narrow sunlit Hijazi lane, 08:00–11:00 light only, all-male modestly dressed cast with smooth featureless heads, no music, three.js on phones, ≤150 draw calls, 60 fps, $0, CC0/permissive. Researcher had ~15 tool calls; many GDC talks are login-gated, so several points come from session abstracts or secondary summaries and are labelled. No Muslim-world source was found that covers these technical topics (cinematography maths, vertex wind, crowd instancing); the sources below are general industry/academic sources, affiliation unconfirmed. Numbers marked **(unverified)** are tutorial rules of thumb or my own derivations, not measured standards.

## (a) How should dialogue scenes be framed (shot sizes, eye level, depth layering, foreground occlusion, FOV on a portrait phone, parallax, subtle camera motion)?

### Takeaway
Film dialogue coverage uses alternating over-the-shoulder (OTS) shots on "normal to slightly long" lenses (50–85 mm full-frame equivalent), with the near character's shoulder as foreground occluder, and breaks to a clean single for emotional shifts. On a portrait phone this maps best to treating the screen as a vertical full-frame sensor: a vertical FOV of about 40–55° (≈50–35 mm) for conversation, wider only for establishing shots.

### Cited Findings
- OTS shot definition: camera placed just behind an off-screen actor so their shoulder is in frame; it suggests "an equal emotional playing field", and a scene shift can be marked by moving OUT of the OTS into an isolated single shot; for coverage, alternate OTS angles — [StudioBinder](https://studiobinder.com/blog/over-the-shoulder-shot)
- Most OTS coverage lands between 50 mm and 85 mm on full frame (≈35–55 mm on Super 35); focal length is an emotional decision — [Soundstripe](https://www.soundstripe.com/blogs/over-the-shoulder-shot)
- OTS reverse shots use standard to slightly telephoto lenses; longer focal lengths (e.g. 85 mm) compress space so objects look closer together — [Adobe, camera shots and angles](https://www.adobe.com/creativecloud/video/production/cinematography/camera-shots-and-angles.html)
- Shot-size vocabulary (wide / full / medium / close) reference — [Adobe, types of shots](https://www.adobe.com/creativecloud/video/discover/types-of-shots-in-films.html); [In Depth Cine, shot sizes](https://www.indepthcine.com/videos/shot-sizes-explained)

### Inferences
- **FOV maths (derived, standard lens formula FOV = 2·atan(sensor/2 / f); full-frame 36×24 mm).** three.js `PerspectiveCamera.fov` is *vertical*. In portrait, treat the phone as a full-frame sensor turned on its side (36 mm tall):
  - 28 mm-equiv → vFOV ≈ 65.5° (establishing/wide lane shot)
  - 35 mm-equiv → vFOV ≈ 54.4° (two-shot, walk-and-talk)
  - 50 mm-equiv → vFOV ≈ 39.6° (OTS dialogue — default)
  - 85 mm-equiv → vFOV ≈ 23.9° (single / emphasis; strong compression of the lane behind)
  - On a 390×844 phone (aspect ≈ 0.46) a 54.4° vFOV gives only ≈ 27° horizontal, so OTS framing must stack vertically: near shoulder low-left/right third, speaker's head in the upper third, lane depth in the middle.
- **Eye level:** put the camera at the standing eye height of an adult man, ≈ 1.55–1.65 m **(unverified; anthropometric rule of thumb, no source fetched)**, or ~5–10 cm below the speaker's head height for a subtly respectful slight low angle; never a high top-down angle in dialogue. Keep the horizon/vanishing point of the lane on or near the camera height so verticals stay vertical (no camera roll, ≤2–3° tilt) **(unverified rule of thumb)**.
- **Depth layering for a narrow lane (three planes):** foreground occluder (near character's shoulder/ghutra, a doorframe, hanging cloth) out of focus or darkened; midground speaker in raking morning sun; background lane receding with haze and 1–3 background men. Longer lens (50–85 mm) compresses the lane so balconies/rawashin stack up — matches the "compression" point above.
- **180° rule / eyelines** apply even without faces: the head and chest orientation is the "eyeline"; keep both cameras on one side of the line between the two speakers.
- **Subtle camera motion (my proposal, unverified numbers):** handheld-like drift as sum of 2–3 low-frequency sines/noise, 0.05–0.3 Hz, translation amplitude 0.5–2 cm, rotation ≤0.3°; slow push-in of ~2–5 cm over a line of dialogue for emphasis; parallax comes from the foreground occluder being within ~0.5–1 m of camera. Must never cause nausea — offer a "still camera" setting.

### Gaps
- No primary ASC/cinematographer source was fetched with explicit eye-level numbers for dialogue; eye height and drift amplitudes above are rules of thumb.
- No published study found on "natural" FOV specifically for portrait phone 3D games.

## (b) Set-dressing density and hierarchy, signs of use, asymmetry

### Takeaway
I found no fetched primary source giving set-dressing density numbers; the evidence available is indirect (AC Mirage designers say density was "key", Crysis/Tsushima keep motion subtle). Rules below are inference and should be validated by looking at phone screenshots.

### Cited Findings
- AC Mirage creative director: "the density of the city is really key"; Mirage borrowed ingredients and tools from AC Unity — [GamingBolt](https://gamingbolt.com/assassins-creed-mirage-takes-inspiration-from-assassins-creed-unity-developer-confirms)
- Mirage's ninth-century Baghdad build is roughly the size of AC Unity's Paris — [Sports Illustrated Videogames, Sarah Beaulieu interview](https://videogames.si.com/features/ac-mirage-story-interview-sarah-beaulieu)
- Mirage audio team: at street level the player should feel inside the crowd; on rooftops, less crowd and more birds (layered ambience by height) — [A Sound Effect](https://www.asoundeffect.com/assassins-creed-mirage-game-audio/)

### Inferences
- **Hierarchy per shot (proposal):** 1 hero prop near the speaker (e.g. water jar, bread basket, door with brass knocker) that the line of dialogue is about; 3–6 supporting props in midground (crates, potted plants, benches, a bicycle, hanging lamp); clutter (stones, scraps, cord, dust patches) as instanced decals/meshes. Keep hero props in the 1/3–2/3 vertical band of the portrait frame.
- **Signs of use:** wear on door thresholds and step edges (lighter, smoother), water stains under AC units and drain spouts, dust gradient at wall bases, repaired plaster patches, cloth tied with string, chairs left at angles — all doable as texture/vertex-colour variation without extra draw calls.
- **Asymmetry:** no two neighbouring facades identical; vary heights, open/closed shutters, one door ajar, objects grouped in odd numbers (3, 5) and not centred.
- **Draw-call budget:** merge static dressing per material (the project already merges houses per material) and use one InstancedMesh per small-prop type; clutter must not add more than ~10–20 draw calls **(unverified budget split)**.
- Content rules: posters/signs must have no faces; only male figures in any illustration.

### Gaps
- No GDC/blog source fetched giving numeric prop densities (e.g. props per metre of street) for AC Mirage, Ghost of Tsushima or RDR2.

## (c) Background life: crowds, NPC routines, idle motion, "no frame frozen"; instancing cost in three.js

### Takeaway
AAA "living street" relies on AI/animation level-of-detail and recycling (AC Unity) and scripted routines (RDR2). For a phone conversation scene, 2–8 visible background men doing looping work routines, each desynchronised, plus ambient motion (cloth, birds, dust) is enough; one draw call per crowd mesh type is achievable in three.js via instancing with shader-side animation.

### Cited Findings
- AC Unity (GDC 2015, Cournoyer, "Massive Crowd on AC Unity: AI Recycling"): AI level-of-detail allowed "thousands of replicated, persistent, interactive NPCs" — [GDC Vault abstract](https://www.gdcvault.com/play/1022141/Massive-Crowd-on-Assassin-s)
- Unity used a pooling system to swap low-res and high-res NPCs without the player noticing — [Game Developer preview](https://www.gamedeveloper.com/programming/get-coding-advice-from-insomniac-riot-and-ubisoft-at-gdc-2015)
- The LOD covered AI behaviour and animation, not only graphics; distance-based switching cut logic and animation cost (Japanese) — [Game Watch](https://game.watch.impress.co.jp/docs/news/20150307_691715.html)
- Crowd figures reported for Unity: earlier games ~200 NPCs on screen, Unity up to 5,000 — [GameStar](https://www.gamestar.de/artikel/assassins-creed-unity-szene-mit-10000-npcs-gleichzeitig,3080201.html); figures vary by source (5,000 / 12,000 / 30,000) — [Game Informer](https://gameinformer.com/b/features/archive/2014/08/25/watch-the-largest-crowd-assembled-in-assassins-creed-unity.aspx), [GameSpot](https://www.gamespot.com/articles/assassins-creed-unity-can-support-crowds-of-30-000/1100-6421542/)
- RDR2 has ~300,000 animations (vs GTA V 55,000, GTA VI 600,000+), "art-directed each individual one" — [TechRadar](https://techradar.com/gaming/rockstar-reveals-it-built-a-gta-6-team-that-focused-solely-on-creating-more-realistic-npcs-with-over-600-000-animations-twice-as-many-as-red-dead-redemption-2-had)
- RDR2 NPC routines are scripted (wake, work, sleep) per fan analyses — [Medium, "The Reality of RDR2's AI"](https://medium.com/the-sound-of-ai/the-reality-of-red-dead-redemption-2s-ai-part-1-c276e9da2763) (secondary, not Rockstar)
- Sky: Children of the Light put 10,000 players into one level for the Aurora concert (GDC 2024, Sam McGrath; rendering + networking) — [GDC session page](https://schedule.gdconf.com/session/how-we-got-10000-players-into-a-level-the-tech-behind-the-aurora-concert-in-sky-children-of-the-light/900029); details of the method not accessible.
- three.js "One Draw Call, Massive Crowd": all characters in one merged geometry drawn by one InstancedMesh; per-vertex ID lets the shader animate body parts; shader-side LOD; characters facing away drop LOD sooner; transform updates amortised across frames and less often when far; caching trig gained ~25 fps; author reports up to 100,000 people, 240 fps, <2 ms GPU on an unnamed desktop rig (no phone data) — [three.js forum](https://discourse.threejs.org/t/one-draw-call-massive-crowd-performance-engineering-in-three-js/89928)
- Animation instancing = bake bone matrices into a texture (RGBAHalf), shader reads per-instance frame — [Unity blog](https://blog.unity.com/engine-platform/animation-instancing-for-skinnedmeshrenderer)
- Built-in three.js InstancedMesh does not handle skinned animation natively — [three.js forum](https://discourse.threejs.org/t/instancedmesh-animations-like-with-skinnedmesh/12388); morph targets / raw vertex frames interpolated in shader suggested as faster for simple units — [three.js forum, 100–1000 skinned meshes](https://discourse.threejs.org/t/optimization-of-large-amounts-100-1000-of-skinned-meshes-cpu-bottlenecks/58196)
- InstancedMesh2 skinned demo: 20k instances on desktop, ~3k reported on mobile; partial bone-texture updates were slow on mobile and Firefox and were disabled; far instances skip bone updates — [r/threejs thread (mirror)](https://redlib.hbubli.cc/r/threejs/comments/1hw39vs/20k_skinned_instances_using_instancedmesh2_library) (anecdotal)

### Inferences
- For this game: background men are few and close, so cost is dominated by quality not count. Suggested tiers **(proposal)**: Tier A (1–3 speakers): individual SkinnedMesh or procedural rig, full detail. Tier B (2–8 background men in lane): one InstancedMesh per body mesh with a vertex shader driving rigid body parts by per-vertex part ID (torso, head, arms, thobe hem) — the "one draw call" approach, no skinning, fits low-poly thobes well. Tier C (distant figures at lane end): same instanced mesh, LOD'd, updated every 2–4 frames.
- Routines rather than wandering: each background man has one readable job loop matching morning life (sweeping a doorstep, carrying a crate, watering plants, arranging bread, sitting with tea, walking past at 1.2–1.4 m/s **(unverified typical walking speed)**). Loops 8–20 s, randomised phase so no two sync.
- "No frame frozen" checklist: at any moment at least one of: a background man moving, cloth/plant sway, a bird/pigeon, dust motes in sun shafts, light flicker from moving shade. All non-melodic, peaceful.

### Gaps
- No primary numbers for AC Mirage, Ghost of Tsushima or Sky crowd counts per screen or idle-loop lengths.
- No measured phone cost for instanced vertex-shader crowds in three.js; must be profiled in the project's own Playwright device runs.

## (d) Wind for cloth awnings, laundry and plants on phones

### Takeaway
The proven cheap method is vertex-shader wind: a low-frequency "main bending" scaled by height plus higher-frequency "detail" flutter with per-vertex phase and stiffness weights (Crysis), all driven by one shared wind vector + scrolling noise (Ghost of Tsushima). Trees really sway at ~0.25–0.6 Hz; cloth flutter scales as f = St·U/L.

### Cited Findings
- Crysis (GPU Gems 3 ch.16, Tiago Sousa): main bending `fBF = vPos.z * fBendScale; vNewPos.xy += vWind.xy * fBF;` then renormalise length so vertices stay on a sphere (no stretching); too much bending "will ruin the illusion" — [NVIDIA GPU Gems 3 ch.16](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch16.html)
- Detail bending: phase from object world position + per-vertex phase; four vectorised smoothed triangle waves (cheaper than sin): `SmoothCurve(x)=x*x*(3-2x)`, `TriangleWave(x)=abs(frac(x+0.5)*2-1)`; "good frequencies" 1.975, 0.793, 0.375, 0.193; edges move along normal xy, leaves along z — [GPU Gems 3 ch.16](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch16.html)
- Vertex colours carry weights: R = edge stiffness, G = per-leaf phase, B = overall stiffness, A = AO; cost is constant per vertex plus small per-instance CPU — [GPU Gems 3 ch.16](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch16.html)
- Ghost of Tsushima: one main wind vector with constant direction, magnitude varied with time-varying Perlin noise; many separate systems "not always perfectly accurate, but quite fast"; cloth, rope, foliage and particles all use the same wind input — [Game Developer on GDC 2021 talk](https://gamedeveloper.com/design/using-vorticles-to-simulate-wind-in-i-ghost-of-tsushima-i-); [PlayStation Blog](https://blog.playstation.com/?p=345372); grass wind via scrolled 2D Perlin noise (developer summary) — [GDC Vault, Procedural Grass](https://gdcvault.com/play/1027214/contactUs)
- Measured tree fundamental sway: sycamore 0.26 Hz; 0.26–0.34 Hz range; dormant maples ~0.39–0.56 Hz; forest FFT range 0.3–1.5 Hz; leaves add damping — [PMC, architectural understanding of sway](https://pmc.ncbi.nlm.nih.gov/articles/PMC6597771); [Arboriculture & Urban Forestry](https://auf.isa-arbor.com/content/40/3/125.full.pdf); [Frontiers](https://www.frontiersin.org/journals/earth-science/articles/10.3389/feart.2018.00221/pdf)
- Flag flutter: f = St·U/L; St typically 0.1–1 and nearly constant for a given flag as wind speed changes; lower aspect ratio and turbulence lower it — [arXiv 2602.06237](https://arxiv.org/pdf/2602.06237); [arXiv 2103.08246](https://arxiv.org/pdf/2103.08246)

### Inferences
- **Recommended frequency bands (derived):** palm/tree trunk 0.2–0.5 Hz, amplitude a few cm at crown; fronds/branches 0.5–2 Hz; leaf/edge flutter 2–6 Hz with small amplitude. Awning (L≈1 m) in a gentle morning breeze U≈1.5–3 m/s with St≈0.2–0.3 → ≈0.3–0.9 Hz billow; laundry (L≈0.5 m) → ≈0.6–1.8 Hz plus edge flutter ×3–5. Morning should read calm: favour low amplitudes.
- **Shader recipe for three.js** (`onBeforeCompile` on MeshStandardMaterial): `uWindDir`, `uWindStrength(t)` = base + slow noise (period 5–15 s gusts); pin weight from vertex colour or UV.y (0 at fixed edge/rope, 1 at free edge); displacement = pin² · (main(SmoothTriangleWave(t·f1 + phase)) + detail(...)). Recompute normal approximately (or tilt normal by the displacement gradient) so sun shading ripples — a large part of what makes cloth read as cloth in raking light.
- All wind consumers (cloth, plants, dust particles, thobe hems) read the same uniforms, as in Tsushima, so the whole frame agrees.
- Cost: a few ALU ops per vertex; no extra draw calls. Keep awnings/laundry at ~8×8–16×16 segments **(unverified)**.

### Gaps
- No measured cloth (fabric) flutter Hz at given wind speeds found; St values are for flags in lab flows.
- Date palm sway frequencies specifically were not found.

## (e) What makes faceless characters in loose thobes read as believable people (silhouette, proportions, cloth, walk, gesture, contact, secondary motion, emotion without faces); animation sources

### Takeaway
Research on body-only emotion shows a few joints carry most of the signal (head inclination for sadness; elbow/hip flexion for anger/fear; arm and upper-body amplitude), so faceless characters can be expressive through posture, head tilt, arm range and tempo. Journey shows cloth "brought to life" and movement itself can carry story without a culture-specific face. Procedural idle (breathing ~4 s, weight shift 6–10 s, desynchronised) plus CC0 Quaternius animations cover most needs at $0.

### Cited Findings
- Roether, Omlor, Christensen & Giese (2009), "Critical features for the perception of emotion from gait", J. Vision 9(6):15: 25 actors' emotional gaits; emotion-specific features depend on a small number of joints; walkers with only those features produced perception and after-effects like natural gait; not explained by speed alone — [Roether thesis/Tübingen](https://www.compsens.uni-tuebingen.de/compsens//files/publications/thesisroether2011.pdf)
- Secondary summaries: elbow and hip flexion important for anger and fear; head inclination for sadness; main findings in amplitude of arm and upper-body joint angles — [Rutgers 2013 emotion perception paper](https://people.cs.rutgers.edu/~mk1353/pdfs/2013-sap-emotion-perception.pdf); [PMC3838416](https://pmc.ncbi.nlm.nih.gov/articles/PMC3838416) (verify against original)
- Journey: characters mostly covered by cloth, designed to be "cloth brought to life"; expressive without requiring a specific cultural background; movement communicates story; walking speed conveys scale — [CGW "Mysterious Journey"](https://www.cgw.com/Publications/CGW/2012/Volume-35-Issue-4-June-July-2012/Mysterious-Journey.aspx); [Game Informer, silent stories](https://gameinformer.com/b/features/archive/2017/01/15/how-developers-are-creatively-building-silent-interactive-stories.aspx) (note: Journey's characters do have a minimal face, so not fully faceless)
- Procedural idle: breathing as a sine on the chest, ~4 s cycle (15/min), 1.5 s inhale / 2.5 s exhale; hip weight-shift sway period 6–10 s, 1–2° — [abratabia, audio-driven animation](https://abratabia.com/ai-talking-characters/audio-driven-animation.php) (tutorial); chest travel ~1–2 cm; idle loops of 8–12 s for weight shift; rate should vary with state — [MoCap Online idle guide](https://mocaponline.com/blogs/mocap-news/idle-animation-design-guide); give each character its own breathing rhythm so crowds do not move in unison — [Unreal forum, Idle Weaver](https://forums.unrealengine.com/t/araz-creates-idle-weaver-procedural-npc-motion-and-behaviour-system/2839748)
- Quaternius Universal Animation Library: CC0, 120+ animations on a universal humanoid rig, glTF/FBX, ready to retarget (locomotion 8 dirs, sitting, pushing, etc.) — [quaternius.com](https://quaternius.com/packs/universalanimationlibrary.html); UAL 2: 130+ clips, free Standard version (~70%), source .blend paid; compatible with Mixamo rigs — [quaternius.itch.io UAL2](https://quaternius.itch.io/universal-animation-library-2); Universal Base Characters CC0 — [quaternius.com](https://quaternius.com/packs/universalbasecharacters.html)
- Mixamo: royalty-free in games incl. commercial; cannot redistribute raw character/animation files as asset packs; credit not required; terms tied to Adobe FAQ (seen only via forum reposts) — [Adobe Community Mixamo FAQ](https://community.adobe.com/t5/mixamo-discussions/mixamo-faq-licensing-royalties-ownership-eula-and-tos/td-p/13234775); stores may ask for a written licence — [Unity discussions](https://discussions.unity.com/t/asset-rejected-due-to-licenses-required-for-third-party-assets/871153)

### Inferences
- **Prefer Quaternius (CC0) over Mixamo.** Mixamo needs an Adobe account (Edward's account → ask him) and a web game ships .glb files that anyone can download, which sits close to "redistributing raw files" — an unclear-licence risk under the project's rules. Quaternius has no such issue. Check any clip for female-coded or dance-like motions and drop them.
- **Silhouette and proportions:** adult male ~7–7.5 heads tall **(unverified figure-drawing convention)**; broad readable shoulder line; ghutra/shemagh adds a distinct head silhouette that substitutes for a face; thobe widens slightly to the hem; visible sandals/feet so ground contact reads. Smooth head must still turn and tilt clearly — the head direction *is* the eyeline.
- **Cloth on thobes:** cheap secondary motion = vertex-shader hem sway driven by leg phase + wind (hem weight from UV.y), lag of ~0.1–0.2 s behind the legs (follow-through/overlap) **(unverified)**; ghutra tails swing with head turns. Folds can be baked in normal maps; in raking morning sun normals matter more than geometry.
- **Contact:** feet planted (no sliding) — IK or foot-locking on walk; hands touch objects (cup, door, crate); weight transfer when sitting/standing; contact shadows under feet (project already has these).
- **Faceless gesture vocabulary for dialogue (proposal, derived from Roether findings):** speaking = small head nods on stressed syllables, one hand opening palm-up; listening = head slightly tilted toward speaker, still body; warmth/greeting = hand on chest + slight bow; thinking = head down, hand to chin-height (no face touched); sadness = head inclined, shoulders dropped, slower tempo; gladness = upright posture, larger arm amplitude, quicker tempo. Avoid aggressive anger poses (peaceful game).
- **Desync rule:** every procedural cycle (breath, sway, hem) gets a random phase and ±10–20% rate per character.

### Gaps
- No Richard Williams / Disney 12-principles primary text was fetched; principles (overlap, follow-through, slow-in/slow-out, arcs) are cited from general knowledge only.
- No source found on faceless-character games research beyond Journey; no puppetry/mime primary source fetched.
- Official Adobe Mixamo FAQ page not fetched directly; web-shipping .glb status unclear.
