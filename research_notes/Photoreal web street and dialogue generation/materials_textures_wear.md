# Materials, textures and surface imperfection for a photoreal old Hijazi street (three.js, phones)

Researched 17 Nov 2026. Tool budget was about 17 calls, so some questions are only partly answered. Every gap is listed. sRGB values in brackets that I converted from linear with the standard sRGB transfer function (1.055·x^(1/2.4) − 0.055) are marked "(conv.)". "UNVERIFIED" means I found no source for it.

## Q1. Measured albedo / roughness / metalness ranges

### Takeaway
Keep every non-metal base colour between about 30–50 and 240 sRGB. Use F0 ≈ 0.04 for all stone, plaster, wood and cloth, and metalness exactly 0 or 1. Lime plaster or whitewash should sit near 0.40–0.45 linear (about 170–178 sRGB), not pure white. Weathered wood should be much darker than fresh wood: 0.12–0.16 linear against 0.35–0.42. I found no measured, sourced roughness numbers for these surfaces. The roughness values below are working values, not measurements.

### Cited Findings
- **Substance PBR guide (Adobe):** dielectric base colour should not go below 30 sRGB (tolerant) or 50 sRGB (strict), and not above 240 sRGB. Coal is the darkest reference (not 0.0 black) and fresh snow the brightest. — [Adobe PBR Guide pt 2](https://www.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-2)
- **Same guide:** common dielectric F0 is 0.02–0.05 linear (40–75 sRGB). Use 0.04 when the IOR is unknown. Raw metal reflectance is 70–100% (180–255 sRGB). Metallic map values for raw metal are 235–255 sRGB. Roughness is described only qualitatively ("tell a visual story about the surface"). — [Adobe PBR Guide pt 2](https://www.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-2)
- **Unity:** a non-metal painted albedo below 0.2 is too dark and above 0.8 too bright. Metallic should be 0 or 1, with in-between values only where materials blend (dust, dirt). An 18% grey card is sRGB 124,124,124. — [Unity: Making believable visuals](https://docs.unity3d.com/2020.2/Documentation/Manual/BestPracticeMakingBelievableVisuals5.html)
- **Charcoal ≈ (0.019, 0.019, 0.023) linear. Fresh snow ≈ (0.76, 0.76, 0.75) linear.** One guide puts non-metal albedo at 60–240 sRGB. — [shinsoj, ArtStation blog](https://shinsoj.artstation.com/blog/Q9j6/pbr-color-space-conversion-and-albedo-chart)
- **physicallybased.info base colours.** The site does not say whether these are linear. I treat them as linear because they are spectral averages, and that is not verified.

| Material | Value | sRGB (conv.) |
|---|---|---|
| Concrete | 0.510 | ≈189 grey |
| Sand | (0.440, 0.386, 0.231) | ≈(177, 167, 132) |
| Marble | (0.830, 0.791, 0.753), IOR 1.5 | ≈(235, 230, 225) |
| Brass (metal) | (0.910, 0.778, 0.423) | ≈(245, 228, 174) |
| Copper (metal) | (0.932, 0.623, 0.522) | ≈(247, 207, 191) |
| Iron (metal) | (0.530, 0.513, 0.494) | — |
| Brick | (0.262, 0.095, 0.061) | — |

  The site lists no limestone, plaster, wood, cotton or glass values. — [physicallybased.info](https://physicallybased.info/)
- **Reflectance list from the Corona/Chaos forum** (values "from various sources", averaged diffuse and specular):

| Material | Linear | sRGB |
|---|---|---|
| Plaster | 0.40–0.45 | 168–177 (another compilation gives this pair) |
| Aged concrete | 0.20–0.30 | ≈124–149 (conv.) |
| New concrete | 0.40–0.55 | — |
| White-cement concrete | 0.70–0.80 | — |
| Desert sand | 0.40 | — |
| White dry sand | 0.24–0.32 | — |
| White wet sand | 0.11–0.20 | — |
| Fresh wood | 0.35–0.42 | ≈160–173 (conv.) |
| Old, weathered wood | 0.12–0.16 | ≈97–111 (conv.) |
| Natural silk | 0.35–0.55 | — |
| Dry asphalt | 0.10–0.18 | — |
| Wet asphalt | 0.06–0.08 | — |

  The list has no limestone, whitewash, teak, cotton or linen values. — [Chaos forum reflectance list](https://forums.chaos.com/index.php/topic,2359.msg17366.html)
- **DONTNOD UE4 chart (Sébastien Lagarde, 2014):**
  - Dielectric diffuse must fall in 50–243 sRGB. Metal reflectance is 186–255 sRGB.
  - Roughness is Disney roughness (perceptual; GGX α = roughness²), 0 smooth to 1 rough, stored linear.
  - UE4's specular 0–1 maps to 0–0.08, so the default 0.5 gives 0.04 F0. That 0.04 is my derivation; the page does not state it.
  - The per-material values are only in the chart PNG, which I could not read. — [Lagarde, DONTNOD PBR chart](https://seblagarde.wordpress.com/2014/04/14/dontnod-physically-based-rendering-chart-for-unreal-engine-4/)
- **Roughness values reproduced from Lagarde's chart on Polycount:** plaster 0.70, rock 0.61, concrete 0.50, canvas 0.53, wood 0.42. These are linear Disney roughness. They are not cross-checked against the original PNG, so treat them as secondary.
  - A studio docs page gives different values: plaster 0.86, wood 0.68, steel 0.25. These are probably sRGB-encoded, which conflicts with the Polycount table.
  - A Polycount commenter says roughness must be authored in linear space. — [Polycount reproduction](https://polycount.com/discussion/comment/2774211); [Studio 397 docs](https://docs.studio-397.com/x/EgBDAg)
  - three.js `roughness` uses the same perceptual convention (squared internally), so the linear chart values apply directly. That three.js convention is UNVERIFIED in this pass.
- **Sandstone ≈ 0.18 linear (116 sRGB).** This is a secondary compilation and was not cross-checked. — [search snippet, BIM chapters blog](https://bimchapters.blogspot.com/2023/12/understanding-and-application-of-albedo.html)
- **Real-world material context (Jeddah al-Balad):**
  - Walls are coral stone (ḥajar manqabī) set in a mortar of dark-brown lagoon clay mixed with lime.
  - The stone is covered with a thick coat of white or ochre lime plaster, then painted with limewash, to shield it from humidity, heat and salt.
  - A sampling study of six historic houses found the plaster to be non-hydraulic lime.
  - Rawāshīn and doors are teak imported from India, Indonesia and Malaysia. Doors carry metal nails and knockers.

  Sources: [DergiPark paper](https://dergipark.org.tr/en/download/article-file/624547); [EGU2017 abstract](https://meetingorganizer.copernicus.org/EGU2017/EGU2017-4912.pdf?pdf); [Travel Tomorrow on rawashin](https://traveltomorrow.com/discovering-jeddahs-rawashin-a-heritage-that-defies-history/); [Archnet: Jeddah Old Town Conservation](https://archnet.org/sites/155). The Muslim-world authorship of these sources was not confirmed; DergiPark is a Turkish academic host.

### Inferences
- **Working values for this game.** Albedo comes from the citations above. Roughness and the teak, cloth and glass rows are UNVERIFIED engineering choices.

| Surface | Base colour, linear (≈sRGB) | Roughness | Metalness |
|---|---|---|---|
| Fresh limewash | 0.55–0.70 (≈195–218), warm off-white. Above the 0.40–0.45 plaster figure because limewash is whiter; UNVERIFIED | 0.85–0.95 | 0 |
| Weathered, dirty plaster near the ground | 0.30–0.40 (≈150–170) | 0.9 | 0 |
| Ochre plaster | 0.35–0.45, warm | 0.9 | 0 |
| Exposed coral stone | 0.35–0.55, grey-cream. Between sandstone 0.18 and marble 0.8; UNVERIFIED | 0.8–0.95 | 0 |
| Weathered, sun-greyed teak | 0.12–0.20 (≈97–124) | 0.6–0.8 | 0 |
| Oiled, darker teak | about 0.08–0.15 | 0.45–0.6 | 0 |
| Stone paving | 0.25–0.40 | 0.7–0.9 | 0 |
| Worn walking strip on paving | — | 0.55–0.7 | — |
| Packed sand / dust | 0.30–0.44 (physicallybased.info sand) | 0.95 | 0 |
| Cotton / linen awning | 0.4–0.7 by dye. Never 1.0 white | 0.8–1.0. Optional `sheen` 0.3–0.6 on MeshPhysicalMaterial | 0 |
| Brass | (0.91, 0.78, 0.42) | 0.25–0.45 rubbed, 0.5–0.7 tarnished | 1 |
| Copper | (0.93, 0.62, 0.52) | — | 1 |
| Tarnish / verdigris patches | — | — | 0, a dielectric green-brown |
| Window glass | ≈0.04 F0 (IOR 1.5) | 0.05–0.15. Add a dust layer that raises roughness toward the bottom of the pane | 0 |

- The midday sun in a 08:00–11:00 morning scene is bright. If walls are authored at 240 sRGB they will clip under the AgX tone mapping. Keeping limewash near 200–215 sRGB leaves headroom for the "white" to read as white.

### Gaps
- I found no sourced measured albedo for limestone, coral stone, whitewash or limewash, teak (fresh or weathered), cotton, linen, or stone paving.
- I found no sourced roughness ranges for any of these surfaces. The DONTNOD/Lagarde UE4 chart and Lagarde's "Feeding a physically based shading model" were not fetched.
- I could not confirm whether physicallybased.info values are linear.

## Q2. Best CC0 PBR texture sets, sizes, licence, web compression

### Takeaway
Poly Haven has CC0 sets that match this street almost exactly: coral fort walls, coral stone wall, white plaster and stucco, teak veneer, weathered planks, linen, cotton and stone paving. With only the colour, normal and ARM maps, each 1k set is about 0.3–3.2 MB as JPG. On the GPU a 1k RGBA8 texture with mips is about 5.6 MB uncompressed. KTX2 (ETC1S/UASTC → ASTC/ETC2 on phones) cuts that 4–8×.

### Cited Findings
- **Poly Haven licence:** all assets are CC0, "effectively Public Domain even in jurisdictions that do not support the Public Domain." — [polyhaven.com/license](https://polyhaven.com/license)
- **ambientCG licence:** assets are licensed under Creative Commons CC0 1.0. — [docs.ambientcg.com/license](https://docs.ambientcg.com/license/)
- **Poly Haven texture library:** 870 textures. Physical size (dimensions) and minimal 1k download (Diffuse + GL normal + ARM, JPG) were pulled from the Poly Haven API on 17 Nov 2026. The API's own fields name the authors. Every set also offers AO, Rough and Displacement maps up to 8k or 16k. — [api.polyhaven.com/assets](https://api.polyhaven.com/assets?t=textures), e.g. [api.polyhaven.com/files/coral_fort_wall_01](https://api.polyhaven.com/files/coral_fort_wall_01)

  **Coral stone**

  | Asset | Size | 1k / 2k | Author(s) |
  |---|---|---|---|
  | `coral_fort_wall_01` | 1.36 m | 3.15 MB / 12.5 MB | Dimitrios Savva, Rico Cilliers |
  | `coral_fort_wall_02` | 0.99 m | 3.04 / 12.1 MB | Dimitrios Savva |
  | `coral_fort_wall_03` | 1.10 m | 3.21 / 12.8 MB | Dimitrios Savva, Rico Cilliers |
  | `coral_stone_wall` | 2.0 m | 2.70 / 10.7 MB | Dimitrios Savva |
  | `coral_gravel` | 2.0 m | 2.31 MB | Rob Tuytel |

  **Lime plaster / whitewash**

  | Asset | Size | 1k / 2k | Notes |
  |---|---|---|---|
  | `white_plaster_rough_01` | 1 m | 1.32 / 5.56 MB | |
  | `white_rough_plaster` | 1 m | 1.70 MB | broken / chipped |
  | `white_stucco` | 2 m | 1.81 MB | |
  | `worn_plaster_wall` | 1.8 m | 1.84 MB | crumbling |
  | `clay_plaster` | 2 m | 1.52 MB | cracked |
  | `beige_wall_001` | 3 m | 0.27 / 1.49 MB | smooth painted |

  **Wood**

  | Asset | Size | 1k | Notes |
  |---|---|---|---|
  | `teak_veneer` | 1 m | 1.81 MB | fresh teak grain, not weathered |
  | `weathered_planks` | 2 m | 1.81 MB | |
  | `weathered_brown_planks` | 1.8 m | 0.65 MB | |

  **Cloth**

  | Asset | Size | 1k |
  |---|---|---|
  | `rough_linen` | 0.27 m | 2.94 MB |
  | `waffle_pique_cotton` | 0.28 m | 2.76 MB |

  **Paving / sand**

  | Asset | Size | 1k |
  |---|---|---|
  | `seaworn_stone_tiles` | 2 m | 2.32 MB |
  | `precast_stone_paving` | 2.24 m | 2.03 MB |
  | `stone_tiles` | 3.17 m | 2.47 MB |
  | `seaworn_sandstone_brick` | 1.69 m | 2.15 MB |
  | `white_sandstone_blocks_02` | 2 m | 2.42 MB |
  | `large_sandstone_blocks` (trim sheet) | 3 m | 2.16 MB |
  | `dense_sand` | 1.8 m | 2.36 MB |

  **Also present:** `rusty_metal*` series, `metal_plate`, `cobblestone_floor_*` series, `patterned_paving`, `rough_plaster_brick`.
- **ambientCG search results** (API, 17 Nov 2026; 1K-JPG zip / 2K-JPG zip):

  | Asset | 1K-JPG | 2K-JPG |
  |---|---|---|
  | Plaster001 | 7.4 MB | 26.1 MB |
  | Plaster002 | 7.5 MB | — |
  | Plaster007 | 8.1 MB | — |
  | PaintedPlaster017 | 4.7 MB | — |
  | Rock063 | 5.0 MB | — |
  | Rock064 | 8.2 MB | — |
  | Wood092 / 094 / 095 / 096 | 3.9–5.4 MB | — |
  | Fabric083 / 085 / 086 | 7.7–9.6 MB | — |
  | Metal049A / 055A / 063 | 2.7–5.6 MB | — |

  The zips include extra maps, so they are larger than the minimal sets. — [ambientCG API](https://ambientcg.com/api/v2/full_json?q=Plaster&include=downloadData)
- **GPU memory formula:** uncompressed = width × height × 4 × 1.333 (with mips). A 4096² texture is about 90 MB. GPU formats cut memory and upload time by 4–8×. UASTC pixel data is "still 4x smaller than JPEG or PNG". UASTC + Zstd KTX2 files are 1–2× larger than JPEG or ETC1S at the same resolution. ETC1S files are comparable to JPEG. ETC1S is the default for colour textures but works poorly for data such as normal maps. UASTC is comparable to BC7 and good for both. — [Don McCurdy, "Choosing texture formats for WebGL and WebGPU" (2024)](https://www.donmccurdy.com/2024/02/11/web-texture-formats/)
- **glTF-Transform README example commands.** UASTC is applied to the data textures (normal, occlusion, metal-roughness) and ETC1S to the rest. — [glTF-Transform CLI README](https://github.com/donmccurdy/glTF-Transform/blob/main/packages/cli/README.md)
  ```
  gltf-transform resize in.glb out.glb --width 1024 --height 1024
  gltf-transform uastc in.glb out1.glb --slots "{normalTexture,occlusionTexture,metallicRoughnessTexture}" --level 4 --rdo --rdo-lambda 4 --zstd 18
  gltf-transform etc1s out1.glb out2.glb --quality 255
  ```
- **glTF-Transform CLI** has `etc1s`, `uastc`, `resize`, `ktxfix` and `ktxdecompress` commands. Option details are in `gltf-transform help <cmd>`. — [gltf-transform.dev/cli](https://gltf-transform.dev/cli)
- **three.js KTX2Loader** detects GPU support via `detectSupport(renderer)` and transcodes to ASTC_4x4, ETC2 and similar formats. The Basis transcoder is a WASM blob that should be self-hosted (`examples/jsm/libs/basis/`). — [threejs.org KTX2Loader docs](https://threejs.org/docs/pages/KTX2Loader.html); summary via search
- **Real-world caveat:** a three.js forum user measured compressed textures using about as much memory as JPG/PNG. A reply estimated a JPEG at about 21 MB GPU against about 5 MB for UASTC. — [three.js forum](https://discourse.threejs.org/t/compressed-textures-using-more-memory-than-uncompressed-textures/30077)

### Inferences
- **GPU cost by McCurdy's formula:**
  - One 1024² RGBA8 texture with mips ≈ 5.6 MB.
  - A 3-map set (colour + normal + ARM) ≈ 16.8 MB uncompressed.
  - The same set as ASTC 4×4 or ETC2 RGBA (8 bpp) ≈ 4.2 MB.
  - A street with about 8 material sets at 1k ≈ 134 MB uncompressed against about 34 MB as KTX2. That difference is likely what keeps iPhone Safari from being killed for memory (Q6).
- **Pipeline:** download 2k JPG once → bake into game-specific sets → `resize` to 1024 (512 for cloth and small props) → `etc1s` for base colour and ARM → `uastc` for normal maps → self-host the Basis transcoder. Record every asset in `docs/SOURCES.md` as "Poly Haven / ambientCG, CC0, author(s)".
- **Watch the physical sizes.** The coral fort walls are about 1–1.4 m square, so world-scale UVs must tile them about every 1.2 m, and macro variation (Q3) is required to hide repeats on a 6–10 m façade. The cloth sets are only about 0.27 m, so they need a high UV repeat or a procedural replacement.
- **Teak:** `teak_veneer` is fresh, polished veneer. For rawāshīn, desaturate it, lift its value toward grey (sun-bleached teak) and raise roughness, or blend it toward `weathered_planks`.

### Gaps
- KTX2 file sizes were not measured on these specific assets.
- ETC1S/UASTC quality settings were not retrieved (the CLI page lists commands only).
- Polyhaven's `coral_*` sets were photographed in an unknown location; I did not check whether it is a Red Sea or Gulf coral wall.

## Q3. Procedural texture techniques that look real

### Takeaway
Use world-space or triplanar UVs with a low-frequency macro-variation multiply to break tiling. Layer the wear procedurally on top of a few CC0 base sets: vertex colour or height-gradient grime and AO, decals for streaks, and curvature-based edge wear. AAA studios do the same thing with vertex-blended layered shaders.

### Cited Findings
- **Naughty Dog (Uncharted 4):**
  - Much of the look came from vertex-shader processing, a broadly procedural approach. — [CGWorld GDC2017 report](https://cgworld.jp/feature/1704-gdc2017-vol4.html); [GDC Vault: Technical Art Techniques of Naughty Dog: Vertex Shaders and Beyond](https://www.gdcvault.com/play/1024103)
  - Artists used procedural (Substance) workflows for materials. — [GDC Vault: Texturing Uncharted 4: a matter of Substance](https://gdcvault.com/play/1023488/contactUs)
  - Blend materials were authored as variations "just disordered for blend variation", from real-world grime reference. — [Rogelio, ArtStation: Uncharted 4 City Chase Materials](https://rogelio.artstation.com/projects/OPwvw)
  - Brinck & Maximov's SIGGRAPH 2016 talk covers the layered shaders. — [Technical Art of Uncharted 4, advances.realtimerendering.com](https://advances.realtimerendering.com/other/2016/naughty_dog)
- **Assassin's Creed Mirage (Baghdad):** the environment kit artist explicitly authored brick alignment and weathering on roofs and foundations. Texture artists added paint layers and blended materials to the modular kits. — [Radi Avramov, AC Mirage Rich Kit – Arches](https://radiavramov.artstation.com/projects/KeQ4YW); [Rich Kit addon modules](https://radiavramov.artstation.com/projects/rJ4DL6); [ArtStation Magazine Mirage Art Blast](https://magazine.artstation.com/2023/10/ubisoft-assassins-creed-mirage-art-blast/)

### Inferences
These are standard practice. They are not individually sourced in this pass.
- **Tiling breakup:** multiply albedo by a world-space, low-frequency value-noise field (period 4–12 m, ±8–15% value, ±3% hue). Also randomise per-building tint (±5% value, slight warm/cool shift) through per-instance colour. In three.js, add it via `onBeforeCompile` or a TSL node at a cost of one extra noise texture fetch (256² tileable noise). An alternative is Inigo Quilez's "texture repetition" technique: random offset per tile and a second sample blended by noise (2 fetches). That article was not retrievable today (404), so it is not cited.
- **Triplanar mapping** costs 3× the fetches per map. On phones, use it only for terrain, rocks and irregular stone. Use box-projected world UVs, set on the CPU per face, for the boxy walls.
- **Grime at wall bases:** per-vertex or shader height gradient. Darken albedo by 15–30% and raise roughness over the bottom 0.3–1.0 m, with a noisy edge from world noise. Add a tan/sand-coloured dust tint from the street sand (linear ≈ 0.44, 0.39, 0.23) rather than black.
- **Streaks under windows and rawāshīn:** vertical alpha decals, or a shader mask built from the position relative to the opening's lower edge × vertical noise stretched 1:8. Darken 10–25% with a slight brown or green tint. Limewash streaks are also lighter where lime has washed down.
- **Edge wear:** bake curvature or convexity into vertex colour on the low-poly kit (three.js `BufferGeometry` per-vertex), or use a cheap "distance to box edge" in the shader. Wear chips the limewash to reveal plaster or coral stone (albedo darker, roughness higher). Teak edges get lighter, grey and rough.
- **Contact AO:** vertex-colour AO gradients where walls meet the ground and under bays. This is cheaper than SSAO on phones.
- **A wear "story" to keep consistent across the street:**
  - Sun bleaches the upper façades.
  - Salt and damp rise from the ground (the Jeddah water table is about 1.2 m below ground per the ICRI deck, which fits rising-damp grime at wall bases). — [ICRI 2025 deck](https://www.icri.org/wp-content/uploads/2025/05/ICRI-2025-04-Mon-Anberv2.pdf)
  - Hands polish door edges and brass knockers to lower roughness.
  - Feet polish a central strip of paving to lower roughness.
  - Rain streaks run under every sill.

### Gaps
- I did not fetch a specific three.js forum or tutorial for triplanar or stochastic sampling cost on mobile.
- I did not fetch the Unreal City Sample or TLOU Part II material-layer documentation.
- The Naughty Dog talk contents themselves were not retrieved; only the titles and abstracts were.

## Q4. Why materials look "plastic" / CG, and fixes

### Takeaway
The usual causes are out-of-range albedo (too white or too saturated), uniform roughness, intermediate metalness, missing micro-occlusion, and perfectly repeating textures. The sourced rules above cover the first three directly.

### Cited Findings
- **Albedo in range:** dielectrics 30/50–240 sRGB, never 0 black or 255 white. — [Adobe PBR Guide](https://www.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-2)
- **Roughness variation:** the guide asks artists to "tell a visual story" with roughness rather than leave it flat. — [Adobe PBR Guide](https://www.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-2)
- **Metalness:** 0 or 1, except where dust or dirt blends over metal. — [Unity docs](https://docs.unity3d.com/2020.2/Documentation/Manual/BestPracticeMakingBelievableVisuals5.html)

### Inferences
These are UNVERIFIED general practice.
- **Plastic look:** caused by a single, mid-low roughness value (0.3–0.5) on stone or plaster, and by a missing roughness map. Fix: roughness 0.8+ with ±0.1 noise variation.
- **CG-clean look:** caused by no AO in crevices and no grime gradient. Fix: the ARM map AO channel plus vertex AO.
- **Visible repeats:** fix with the macro variation in Q3.
- **Over-saturated sand and ochre:** keep saturation low.
- **Normal maps too strong for the viewing distance:** keep `normalScale` at 0.5–1.
- **Specular aliasing / shimmer on phones:** use mipmaps plus anisotropy.

### Gaps
- No article dedicated to "why CG looks plastic" was fetched.

## Q5. How AAA teams make architecture read as aged

### Takeaway
Use modular kits with a shared material hierarchy: a base material, then blend layers (paint, plaster, grime), then decals. Weathering is placed where the physical story demands it (roofs, foundations, joints). Sources show this for AC Mirage and Uncharted 4, without numbers.

### Cited Findings
- **AC Mirage:**
  - Kits were built around period construction methods and materials.
  - Weathering is concentrated on roof and foundation.
  - Paint and blended material layers are added by texture artists.

  — [Radi Avramov ArtStation](https://radiavramov.artstation.com/projects/KeQ4YW); [Den of Geek](https://www.denofgeek.com/?p=855105)
- **Uncharted 4:** vertex-shader-driven blending and Substance procedural materials. — [GDC Vault](https://www.gdcvault.com/play/1024103); [cgchannel](https://www.cgchannel.com/2017/01/see-how-naughty-dog-created-uncharted-4s-environments)

### Inferences
- **Material hierarchy for the street, at most 4 shader families:**
  1. **Wall shader:** coral stone + limewash with height-blend reveal, grime gradient, streak mask and per-building tint.
  2. **Teak shader:** rawāshīn, doors and beams.
  3. **Ground shader:** paving + sand blend driven by vertex colour.
  4. **Small props:** cloth, brass, glass.

### Gaps
- No Unreal City Sample or TLOU breakdown was fetched.
- No Muslim-world studio breakdown was found, apart from the Mirage team, which includes Ubisoft Bordeaux and others and was not confirmed as Muslim-world.

## Q6. Phone budgets

### Takeaway
iPhones expose 16 texture units in WebGL. The real limit is Safari's memory-pressure kill, which has no published number. Keep the total GPU texture memory small (KTX2, 1k maps, few sets) and avoid odd-sized textures.

### Cited Findings
- **Texture units:** 16 MAX_TEXTURE_IMAGE_UNITS on 99.12% of iOS devices. — [web3dsurvey](https://web3dsurvey.com/webgl/parameters/MAX_TEXTURE_IMAGE_UNITS)
- **Safari memory:**
  - iOS Safari limits memory itself; "it isn't a physical memory limit."
  - Huge or many textures can crash Safari or reload the page.
  - Jetsam kills the GPU process under memory pressure.

  — [WebKit bug 241478](https://lists.webkit.org/pipermail/webkit-unassigned/2022-June/1039433.html); [WebKit Bugzilla](https://bugs.webkit.org/show_bug.cgi?id=250862)
- **Unknown limit:** no exact limit can be stated. One developer traced a crash to a single non-power-of-two texture. A 500 MB VRAM figure for older iOS devices is unverified. — [three.js forum: issues with complex scene on iOS](https://discourse.threejs.org/t/issues-with-complex-scene-on-ios/46356.md); [Unity discussions](https://discussions.unity.com/t/webgl-game-crashing-on-ios-device/913493)

### Inferences
- **Proposed budget** (UNVERIFIED, derived from the formula in Q2):
  - Total texture GPU memory at or under 64 MB on phones.
  - At most 8–10 material sets.
  - 1k (1024²) power-of-two maps. ARM packed into one texture.
  - 512² for cloth and props. One 256² shared noise texture.
  - At most 6–8 samplers per material, well inside the 16 units, leaving room for shadow maps and the environment map.
- **Settings:** `texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())` for ground and wall textures seen at grazing angles; 4× is a common phone compromise. Always generate mipmaps. Use `LinearMipmapLinearFilter`.

### Gaps
- No measured Safari memory ceiling exists in the sources.
- I did not test on a real iPhone. The anisotropy cost on mobile GPUs was not sourced.
