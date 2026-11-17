# Photoreal sunlit old-city street in three.js on phones: lighting, shadows, AO, atmosphere, tone/grade

Scope: a small, dense Hijazi-style street, morning only (08:00–11:00), WebGL2 on iPhone Safari and Android Chrome, ≤150 draw calls, 60 fps target, $0, CC0/MIT assets. Characters are faceless, so skin and eye techniques are out of scope.
Sourcing note: none of the technical sources found were from Muslim authors or studios. All are technical docs or studio talks, which per the brief need no affiliation label. Numbers marked **[unverified]** come from the researcher's background knowledge or from a single weak source and should be checked before relying on them.

---

## 1. Morning sky and sun (position, colour, intensity, sky model, IBL)

### Takeaway
At ~21.5°N the sun stays fairly high all morning: about 12–30° elevation at 08:00 and 41–70° at 11:00, depending on season, coming from the east and south-east. That gives short, crisp shadows rather than golden-hour light, so the "morning" look has to come from colour temperature, haze and raking light on the east/west walls of the lane. A procedural sky (drei `<Sky>`/Preetham) baked once into a PMREM environment, plus one directional sun, is the cheapest credible setup. Real AAA titles use LUT-based multiple-scattering skies (Bruneton/Hillaire family), which are too heavy to run per frame on phones but can be precomputed.

### Cited Findings
- **Computed sun positions** for Jeddah (21.5°N, 39.2°E, UTC+3) using the NOAA fractional-year approximation (script run locally; cross-check against the NOAA Solar Calculator before use) — [NOAA Solar Calculator](https://gml.noaa.gov/grad/solcalc/):

  | Date | 08:00 elev/az | 09:00 | 10:00 | 11:00 |
  |---|---|---|---|---|
  | 20 Mar | 20.3° / 99° | 34.0° / 106° | 47.0° / 116° | 58.7° / 132° |
  | 21 Jun | 29.4° / 74° | 43.0° / 77° | 56.6° / 80° | 70.4° / 80° |
  | 22 Sep | 24.4° / 99° | 37.9° / 107° | 50.9° / 118° | 62.1° / 136° |
  | 21 Dec | 12.2° / 122° | 23.6° / 130° | 33.5° / 141° | 40.9° / 155° |

  (Azimuth is clockwise from north: 90° = east, 180° = south. In June the morning sun is slightly north of east.)
- **Ghost of Tsushima sky:** physically based Rayleigh+Mie inscattering stored in 3D LUTs indexed by altitude, sun angle and view angle, with multiple scattering (Bruneton08, Elek09, Yusov13). Each frame it is resampled to 2D for the current sun angle. Custom Rayleigh β = [0.0076224, 0.012935, 0.024845] km⁻¹ in an LMS-like space — [Patry, SIGGRAPH 2021 Advances](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)
- **Tsushima tone curve:** per-channel Reinhard `c/(1+c)`. Exposure is mainly illuminance-based (not luminance), to avoid the exposure/albedo feedback loop. White balance is a Von Kries adaptation in Bradford LMS — [Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)
- **Physical light units (Unreal reference):** a 100,000 lux directional light corresponds to about EV100 14; a bright clear noon is about 80,000–120,000 lux; 1 EV is a doubling — [Magnopus](https://www.magnopus.com/blog/lighting-in-unreal-with-photography-principles); [gamesartist.co.uk](https://gamesartist.co.uk/?p=319); [Epic docs](https://dev.epicgames.com/documentation/unreal-engine/using-physical-lighting-units-in-unreal-engine)
- **Sun vs sky luminous efficacy:** direct sun about 70–105 lm/W, clear sky about 130 lm/W. The diffuse-to-extraterrestrial ratio in the Kittler standard-sky tables was hard to read (one figure in the 0.35–0.45 range, unverified) — [search summary of daylighting literature; original tables not checked](https://core.ac.uk/download/357192384.pdf)
- **Unreal skylight units are disputed** (lux vs cd/m²) even among practitioners — [Unreal forum](https://forums.unrealengine.com/t/4-19-physical-lights/105121?page=4)
- **Poly Haven:** all assets are CC0 — [Poly Haven FAQ](https://docs.polyhaven.com/en/faq). The clear-sky "Kloofendal 43d Clear" comes in 1K to 24K but is a midday capture — [Poly Haven](https://polyhaven.com/a/kloofendal_43d_clear). No dedicated clear "morning, sun at 20–40°" HDRI was confirmed in this search. A third-party guide says 1K is enough when the HDRI is used only for light and reflections, not as a visible background — [cinevva](https://app.cinevva.com/game-assets/free-hdri-skies)
- **three.js light probes:** `LightProbeGenerator.fromCubeRenderTarget(renderer, cubeRT)` returns (async in current docs) a diffuse SH `LightProbe`, which the docs call functionally equivalent to an irradiance map. The cube target must be RGBAFormat. For an equirect HDR, first use `WebGLCubeRenderTarget.fromEquirectangularTexture()` — [three.js docs](https://threejs.org/docs/pages/LightProbeGenerator.html); [forum](https://discourse.threejs.org/t/getting-spherical-harmonics-straight-from-equirectangular-image/35147)

### Inferences
- **Recommended sun model.** Drive `DirectionalLight` from the table above, choosing one canonical date (spring equinox is a good middle). Use elevation 20–58° across 08:00–11:00. The sun comes from the east (az 99–132°), so orient the lane roughly north–south. Then one wall is lit and the other in shade at 08:00–09:00, and by 11:00 the sun reaches the ground. That gives the strongest "photographed" contrast. Or orient the lane east–west to get backlit long-lens shots.
- **Colour [unverified].** Direct sun at 20–60° elevation is roughly 4800–5600 K once atmospheric reddening is included (low elevation is warmer). A practical sRGB-linear sun tint is about `#FFF1E0` at 08:00 moving to `#FFF8F0` by 11:00. Sky fill is blue: about `#9EC3FF` zenith and paler at the horizon. Hijazi coastal haze makes the horizon close to white-beige.
- **Ratio [unverified].** In real clear-sky photos the sun-to-sky illuminance on a sun-facing surface is about 4:1 to 8:1, so shadows are clearly blue-ish but readable. In three.js with physically based units off (default `intensity` scalars), a common working set is: sun `intensity` ≈ 3–4 (r155+ physical intensities), `scene.environmentIntensity` (r163+) or hemisphere ≈ 0.4–0.8. Tune until the shadowed-wall to lit-wall luminance ratio is about 1:4–1:6 in the final tonemapped image. "CG" usually means shadows are too dark (no sky fill) or too flat (too much ambient).
- **Sky choice.** drei `<Sky sunPosition={...} turbidity={6–10} rayleigh={1–2} mieCoefficient={0.005} mieDirectionalG={0.8}/>` (Preetham) is analytic and cheap. Render it once into a PMREM with `PMREMGenerator.fromScene(skyScene)` and set `scene.environment`. Re-bake only when the clock moves (for example every 10 game-minutes), never every frame. Higher turbidity reads as dusty coastal air. These parameter values are typical starting points [unverified].
- **Real HDRI vs procedural.** A real HDRI brings real-world sky colour and soft horizon detail into reflections, which reads as more "photographed". But its baked sun position won't match the game clock. Safest: use a 1K CC0 HDRI (≈1–3 MB as .hdr, [unverified]; prefer converting to KTX2/UltraHDR/RGBE-PNG) only for `scene.environment` with its sun clipped or painted out, and keep the real sun as the directional light. Or stay fully procedural for consistency with the clock.
- **Hillaire 2020 / Bruneton.** These need per-frame LUT compute (transmittance, multi-scatter, sky-view, aerial-perspective froxels). There are WebGL ports, but on phones precompute is the realistic path. For a fixed morning window, bake the sky-view at a few sun angles offline or at load time.

### Gaps
- No primary measured source found for sun:sky lux ratio or sun CCT at 20–60° elevation in a Hijazi coastal climate. Values above are flagged unverified.
- No published lighting values for Unreal's Matrix City Sample.
- No Poly Haven CC0 HDRI confirmed as "clear morning, sun 20–40°, Middle East"; exact 1K/2K file sizes not checked.

---

## 2. Shadows on mobile WebGL

### Takeaway
Use one directional light with a single shadow map tightly fitted to the small street (not cascades). 1024² is safe on mid-range phones and 2048² on recent iPhones. Use PCF (`PCFShadowMap`, or `PCFSoftShadowMap` only if profiled) with small `normalBias`. Freeze the shadow map (`autoUpdate=false`, `needsUpdate` when the sun moves). Static architecture can bake AO and sky occlusion into vertex colours while keeping the real-time sun shadow. Use blob decals or a one-frame contact-shadow texture under characters instead of per-frame `ContactShadows`.

### Cited Findings
- `PCFSoftShadowMap` uses multiple texture lookups per pixel and is costly on mobile. One user saw a frame drop on Android in portrait only with PCFSoft enabled — [three.js forum](https://discourse.threejs.org/t/performance-drop-in-mobile-portrait-mode-android-chrome-firefox/2080)
- VSM supports `radius`/`blurSamples` but light-bleeds on thin geometry. Switching VSM to PCFSoft is a common fix for light leaks — [three.js forum on VSM](https://discourse.threejs.org/t/dynamic-shadows-with-vsmshadowmap/71094); [salivity guide (third-party)](https://salivity.github.io/three.js/article/vsmshadowmap-vs-pcfsoftshadowmap-in-three-js)
- Filament docs: VSM ignores constant/normal bias and polygon offset; 1024 is suggested for low quality/mobile — [Filament docs (mirror)](https://www.mintlify.com/google/filament/rendering/shadows)
- Shadow memory scales with area (2048² is 16× the memory of 512²). Guidance for mobile is inconsistent: "≤2048" versus "≤512" — [third-party skill page](https://skillselion.com/skills/openaec-foundation/three.js-claude-skill-package/threejs-impl-shadows); [salivity](https://salivity.github.io/three.js/article/optimizing-three-js-shadow-map-properties) (weak sources, contradict each other)
- Tsushima used per-tile 128² far shadow maps for relighting probes and 4×4 PCF for cube-map shadow tracing. Main-view cascade counts and sizes are not given in the talk — [Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)
- **three.js r182:** `PCFSoftShadowMap` with WebGLRenderer is deprecated, and `PCFShadowMap` "is now soft as well". One user reported pixelated shadows after upgrading from 0.181 to 0.182, and another traced an r182 difference to `shadow.bias` — [three.js forum r182 pixelation](https://discourse.threejs.org/t/shadow-pixelation-issue-in-three-js-0-182-0/88746); [r182 upgrade thread](https://discourse.threejs.org/t/upgrading-to-r182-incorrect-point-light-shadows/88891). Whether `PCFShadowMap` honours `shadow.radius` in r182+ is not confirmed; check the [Migration Guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide).
- **RDR2 (desktop/console reference):** the sun uses 4 cascades in a 1024×4096 R16 atlas on medium (1024² per cascade). Most static point lights use baked shadow cubemaps, with dynamic shadows only near the player — [imgeself RDR2 graphics study (frame capture analysis, not Rockstar)](https://imgeself.github.io/posts/2020-06-19-graphics-study-rdr2)
- drei `ContactShadows` is "a rather expensive effect". For static objects, use `frames={1}` (render once). Examples use `resolution={256}` — [drei docs](https://drei.docs.pmnd.rs/staging/contact-shadows)
- drei `AccumulativeShadows` defaults to a 1024 buffer and has "zero performance impact after all frames have accumulated". It is planar (Y-up) only — [drei docs](https://drei.docs.pmnd.rs/staging/accumulative-shadows)

### Inferences
- **Fitted frustum, code-level.** For a street about 40 m long, set `light.shadow.camera` as an orthographic box just covering the playable lane and its walls, for example `left/right/top/bottom = ±22`, `near=1`, `far=120`. With 1024² that gives about 4 cm per texel, which is fine for doors, mashrabiya and people. Move `light.target` with the camera only if the street is longer, snapping to texel increments to avoid shimmer. Cascades (three's `CSM` addon) multiply shadow draw calls per cascade, which works against the 150-draw-call budget. Avoid them for a small street.
- **Bias [unverified starting values].** `shadow.bias = -0.0005`, `shadow.normalBias = 0.02–0.05` (world units of the light camera). Raise `normalBias` first for acne on grazing walls, which matters at 08:00 low sun.
- **Softness.** Real sun penumbra widens about 1 cm per metre of occluder distance (sun angular diameter about 0.53°, [unverified but standard]). Thin contact lines at the base of walls and soft far edges of balcony shadows read as "real". `PCFSoftShadowMap` fakes uniform softness, so cheaper options are plain `PCFShadowMap` at 2048 on high-tier devices. In r16x+, `PCFSoftShadowMap` was deprecated in favour of `PCFShadowMap` with `shadow.radius` [unverified, check the current three.js release notes].
- **Static scene, static shadows.** The sun moves only 15° per game-hour. Set `renderer.shadowMap.autoUpdate = false` and `needsUpdate = true` every N seconds or on clock change. Shadow-pass draw calls then drop to near 0 on most frames. Moving characters need their own shadow: draw them into the map each frame (few draws), or use blob decals.
- **Characters.** A soft radial-gradient decal (one instanced plane per person, offset along the sun direction and stretched by 1/tan(elevation)) is nearly free and reads as contact. Combine it with the real sun shadow for the cast part.
- **Baked lightmaps.** For merged procedural geometry, a full GI lightmap bake (for example via three-gpu-pathtracer or Blender) needs UV2 unwraps. It is often unnecessary when vertex AO + sky occlusion (section 3) + real-time sun shadow are used.

### Gaps
- No measured millisecond costs found for three.js shadow maps (512/1024/2048, PCF vs PCFSoft) on specific phones (e.g. iPhone 12, Snapdragon 7-series, Mali G-series). Needs in-project profiling.
- `PCFSoftShadowMap` deprecation is confirmed via forum quotes of the r182 notes (see above). The behaviour of `shadow.radius` with the new soft `PCFShadowMap` is still unverified. Check which three.js version the project pins before choosing a shadow type.

---

## 3. Ambient occlusion on phones

### Takeaway
Bake AO into vertex colours (or a lightmap/aoMap) for the static, merged street. It's free at runtime and is the single biggest "grounding" cue. Screen-space AO (N8AO) is affordable only at half resolution with the Performance preset on high-end phones, so make it a quality-tier option.

### Cited Findings
- **N8AO presets:** Performance = 8 AO samples / 4 denoise samples, recommended for "Mobile, low-end iGPUs". Low = 16/4, for "high-end mobile". Medium (default) = 16/8 — [N8AO README](https://github.com/N8python/n8ao)
- **N8AO half-res:** `configuration.halfRes = true` gives "generally 2x–4x speedup", with depth-aware upsampling (≈0.1 ms at 1080p on Apple M5 Max). There is some loss of fine detail and temporal stability — [N8AO README](https://github.com/N8python/n8ao)
- **N8AO timings (1080p, Apple M5 Max desktop-class chip, not a phone):** Medium about 0.70–0.78 ms; Ultra 2.0–2.5 ms — [N8AO README](https://github.com/N8python/n8ao)
- **N8AO settings:** `aoRadius` one to two orders of magnitude below scene scale. `distanceFalloff` 1.0 is safe. `intensity` ≈2 gives soft AO (default 5 is strong). Changing quality or sample counts recompiles the shader. It requires WebGL2. With pmndrs, place `N8AOPostPass` after `RenderPass` and follow with SMAA, because hardware MSAA doesn't apply to AO — [N8AO README](https://github.com/N8python/n8ao)
- Tsushima bakes sky visibility as degree-2 SH and multiplies it by sky SH at runtime. Mie irradiance gets shadows and Rayleigh gets AO — [Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)
- RDR2 layers AO: baked large-scale AO (R8 cubemap, plus baked AO in the albedo alpha for buildings) for patios and interiors, and SSAO only for small-scale occlusion — [imgeself RDR2 study](https://imgeself.github.io/posts/2020-06-19-graphics-study-rdr2). This is the same "bake big, screen-space small" split recommended here.
- Uncharted 4 (SIGGRAPH 2016): cube-map specular occlusion based on the solid angle of intersecting cones (El Garawany), and an indirect-diffuse alternative to lightmaps (Jiang). The technical-art talk describes AO as approximating the visible cone angle — [Advances 2016 course](https://advances.realtimerendering.com/s2016/index.html); [Technical Art of Uncharted 4](https://advances.realtimerendering.com/other/2016/naughty_dog/index.html)

### Inferences
- **Vertex AO in code for merged procedural geometry (recommended).** At load, or better at build time and cached:
  1. Build a `three-mesh-bvh` over the merged static street (MIT).
  2. For each vertex, cast N=32–64 cosine-weighted hemisphere rays along the normal, with max distance 1.5–3 m (local AO) and a second set to 50 m for sky visibility.
  3. Store `ao` and `skyVis` in a vertex attribute (or `color`). In the material, multiply indirect/diffuse by `ao` via `onBeforeCompile` or a custom `aoMap`-like chunk. Never darken direct sun by AO.
  4. Procedural walls need enough vertices near corners (subdivide wall bases and openings, or AO gradients will be too coarse). Shrinking the ray origin offset to about 1 cm avoids self-hit.

  Cost: zero at runtime. Bake time for about 100k vertices × 64 rays with a BVH is likely seconds in JS [unverified], so precompute into a binary file.
- **Cheap analytic AO for known shapes.** Wall-ground crease darkening (`ao = smoothstep(0, 0.6, heightAboveGround)`) and in-door/window recess darkening can be added in the shader at no texture cost.
- **SSAO tier.** Only high-tier devices (A15+/recent Snapdragon 8-series) get `N8AOPostPass` with `halfRes=true` and `"Performance"`, `aoRadius≈0.5–1 m`, `intensity≈1.5–2`. Phone cost is likely 1–3 ms at 1080p-class resolution [unverified; extrapolated from M5 Max timings]. That is a big share of a 16.6 ms budget once thermal throttling arrives.
- **When it's worth it.** SSAO helps moving characters and props touching ground and walls. Baked AO can't do that, but the blob decals from section 2 cover most of it.

### Gaps
- No measured N8AO / GTAO / SSAO timings on actual phones were found.
- No published benchmark of BVH-based vertex AO bake speed in three.js.

---

## 4. Bounce and indirect light

### Takeaway
Sun-baked stone streets are lit as much by bounce as by sky. Fake it with (a) the sky PMREM as `scene.environment`, (b) a warm "ground bounce" term (hemisphere ground colour, or a second weak, shadowless upward directional light), and (c) per-vertex sky visibility from section 3. The goal is that shadowed walls facing a sunlit wall or floor pick up warm ochre, not grey.

### Cited Findings
- Tsushima approximates bounced sky with uniform white sky visibility scaled by average sky colour. Sun bounce is "reflected off imaginary ground and wall", modulated by cloud shadow. Diffuse SH probes are boosted 25% toward the dominant direction — [Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)
- Tsushima uses grids of degree-2 SH probes, plus tetrahedral probe meshes for towns, with an interior mask against light leaking — [Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)
- Ghost of Yōtei (GDC 2026) has a session on baking and placing ambient diffuse probes — [GDC schedule](https://schedule.gdconf.com/session/ambient-diffuse-lighting-in-ghost-of-ytei/915340)
- three.js `LightProbe` (SH) can be generated from a cube render target and is equivalent to an irradiance map — [three.js docs](https://threejs.org/docs/pages/LightProbeGenerator.html)

### Inferences
- **"Imaginary ground and wall" bounce, Tsushima-style, in three.js.** Add a `HemisphereLight(skyColor≈#BFD8FF, groundColor≈#C89A6A, intensity≈0.3–0.6)`. Optionally add a shadowless `DirectionalLight` pointing up from the sunlit floor (colour = floor albedo × sun colour, intensity ≈ 0.1–0.25 × sun) [values unverified]. Both are per-pixel cheap and add no draw calls.
- **Street-scale probes.** For a short street, 3–6 SH `LightProbe`s baked at load (render a cube camera at 64–128 px per face at points along the lane, then `fromCubeRenderTarget`) can capture real coloured bounce. three.js applies only scene-level probes, though, not per-object blending. Simplest: one probe for the whole lane, plus the vertex sky-visibility attribute to modulate it.
- **Baked GI.** Bake a lightmap (Blender Cycles or three-gpu-pathtracer, MIT) only if the geometry is fixed and authored rather than procedural each run. Given morning-only and slow sun motion, a 2–4 key-time bake blended by clock is possible but adds texture memory.

### Gaps
- No source found giving measured bounce ratios for limestone or coral-stone streets.
- No benchmark of irradiance-volume addons for three.js on phones.

---

## 5. Atmospheric perspective and haze

### Takeaway
A tiny amount of distance haze with a warm-white colour sells the depth of a coastal Hijazi street. Use `THREE.FogExp2`, or better a custom exponential-height fog in the shader, with density chosen from a target visibility via Koschmieder. Sun-direction-dependent inscatter colour (brighter and warmer toward the sun) is what AAA aerial perspective adds over plain fog.

### Cited Findings
- **Koschmieder:** visibility V = 3.912/β, where 3.912 = ln(1/0.02), assuming a 2% contrast threshold. With a 5% threshold the constant is ≈2.996. The law was validated in field measurements (Horvath & Noll 1969) — [visibility summary](https://reference.org/facts/visibility/reqevMCQ); [BME paper](https://pp.bme.hu/ci/article/download/4169/3274)
- **Tsushima haze:** a froxel grid of 128×64×64 from 10 cm to 100 km (slice factor 1.2). Height falloff is exponential `d(z)=d_e·e^(−z/k_e)` plus a sigmoid. Cost is about 0.5 ms async compute on PS4 — [Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)

### Inferences
- **Numbers for the street.** Choose meteorological visibility V. Clear coastal morning ≈ 20–40 km gives β ≈ 0.0001–0.0002 m⁻¹. That is invisible at street scale (30–80 m), so a realistic street needs either a long view (sea or minaret skyline) or an "art" visibility of about 1–3 km. In three.js, `FogExp2(density)` computes `fogFactor = 1 − exp(−density²·depth²)` (default density 0.00025; docs example 0.002) — [three.js FogExp2 docs + shader source](https://threejs.org/docs/pages/FogExp2.html). Note that "depth" is view-space depth, not true distance, so fog shifts as the camera turns. Koschmieder, by contrast, Koschmieder uses linear exp. For physically consistent haze, use linear exponential: `fogFactor = 1 − exp(−β·d)`, with β = 3.912/V. For V = 2 km, β ≈ 0.00196 m⁻¹, giving about 15% haze at 80 m and 2% at 10 m.
- **Height fog.** Density = β₀·exp(−h/H), with H ≈ 50–200 m [unverified art value]. Integrate analytically along the view ray: `β₀·H·(e^(−h₀/H) − e^(−h₁/H))/(h₁−h₀)·d`. This costs a few ALU ops in a shader patch via `onBeforeCompile` on the shared material.
- **Sun-aware colour.** `fogColor = mix(skyHorizonColor, sunColor*1.2, pow(max(dot(viewDir, sunDir),0), 8))`. This gives warm glow toward the sun and cooler blue-grey away, which is the key "aerial perspective" cue. Cost is negligible.
- **Skyline cutouts.** Distant buildings or minaret as unlit billboards pre-tinted by haze save draw calls and match fog.

### Gaps
- No primary meteorological data found for typical morning visibility in Jeddah (dust/humidity). WMO/PME (Saudi National Center for Meteorology) data would be the ideal (Muslim-world) source.
- No source on how AC Mirage specifically renders aerial perspective; no Mirage rendering talk found.

---

## 6. Tone mapping, grade and finishing

### Takeaway
Use AgX (three.js r160+) or Khronos Neutral as the base, then a small contrast and saturation grade, subtle grain, light vignette and restrained bloom. All effects go in one merged pmndrs `EffectPass` on HalfFloat buffers. Leave the renderer's tone mapping off when using the pmndrs ToneMappingEffect. "Photographed" mostly means: highlights roll off softly (no clipped white walls), shadows keep coloured detail, slight lens imperfections, and no oversaturation.

### Cited Findings
- **AgX** is less saturated and lower-contrast than ACES "by design". It is "a better foundation for color grading" (donmccurdy). ACES "boosts contrast and tends to darken" and shifts hues (bands toward primaries at high intensity). **Neutral** (Khronos PBR Neutral) reproduces base colours faithfully. Contrast, saturation and tint should be a separate grading step — [three.js forum Tone Mapping Overview](https://discourse.threejs.org/t/tone-mapping-overview/75204); [AgX implementation thread](https://discourse.threejs.org/t/is-agx-tonemapping-implemented-correctly/60609)
- three.js AgX lacks Blender's "look" contrast options — [three.js forum](https://discourse.threejs.org/t/is-agx-tonemapping-implemented-correctly/60609)
- **pmndrs postprocessing:** `EffectPass` automatically merges effects into fewer shader passes. Use a single fullscreen triangle. Recommended renderer settings: `powerPreference:"high-performance", antialias:false, stencil:false, depth:false`. Use `frameBufferType: HalfFloatType` to avoid banding. Keep `renderer.toneMapping = NoToneMapping` and put `ToneMappingEffect` at the end — [pmndrs/postprocessing README](https://github.com/pmndrs/postprocessing)
- **Tsushima:** local tonemapping via a bilateral grid (≈250 µs PS4). White balance is folded into the colour matrix. A desaturate/resaturate tonemap was tried and cut as "not perceptually pleasing". Grading used 32³ LUTs (banding issues) — [Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)
- **AC Mirage:** the developers wanted "the real lighting and the real colors", hence a vivid default. The optional "AC1 filter" desaturates and tints — [Game Informer](https://gameinformer.com/exclusive/2023/09/26/ubisoft-bordeaux-on-its-nostalgic-ac1-filter-in-assassins-creed-mirage)

### Inferences
- **Concrete stack (one EffectPass after RenderPass):** `[SMAA (or none), Bloom(mipmapBlur, luminanceThreshold≈1.0–1.2, intensity≈0.15–0.3), HueSaturation(saturation≈+0.05–0.15), BrightnessContrast(contrast≈+0.05–0.12), ToneMapping(AGX), Vignette(offset≈0.3, darkness≈0.25–0.4), Noise(opacity≈0.02–0.04, premultiply)]`. All values are starting points [unverified]. Order matters: grade either in linear before tone mapping (exposure/white balance) or after AgX (contrast/sat). Grain after tone mapping.
- **Exposure.** `toneMappingExposure` ≈ 0.8–1.2 with AgX. Aim for lit whitewashed walls to land about 85–92% in final sRGB (not 100%), which avoids the clipped "CG white". Check with a debug histogram.
- **Bloom.** Keep the threshold above 1.0 (HDR) so only sun glints and sky edges bloom. A wide, weak bloom reads as lens veiling glare; strong bloom reads as CG.
- **Antialiasing on phones.** At devicePixelRatio 2–3, render at `setPixelRatio(Math.min(dpr, 1.5–2))`. With postprocessing, MSAA via `EffectComposer({multisampling: 4})` works on WebGL2 but costs bandwidth on tile GPUs. Edge AA is mostly invisible at 1.5–2× DPR, so SMAA (one extra pass) or no AA is often the better trade [unverified on target devices]. FXAA blurs the texture detail that reads as "real".
- **Sharpening.** A light CAS-style sharpen after upscaling (if rendering below native) restores the crisp texture of "footage". There is no built-in pmndrs effect, so it needs a custom Effect (one extra texture fetch ×5) [unverified cost].
- **Mobile postprocessing cost.** Each fullscreen pass at 1170×2532 (iPhone) reads/writes about 12 MB at HalfFloat, which matters on tile-based GPUs. Merging into one EffectPass (plus bloom's own mip chain) is the main saving. Mipmap bloom adds about 5–6 small passes [unverified].

- **Versions:** AgX requires three r160+ and Neutral requires r162+, per the pmndrs `ToneMappingMode` docs. r161 added required gamut mapping for AgX — [pmndrs ToneMappingMode](https://pmndrs.github.io/postprocessing/public/docs/file/src/enums/ToneMappingMode.js.html); [r161 release notes](https://newreleases.io/project/github/mrdoob/three.js/release/r161). Khronos announced PBR Neutral in May 2024 — [gamedev.net](https://gamedev.net/news/khronos-pbr-neutral-tone-mapper-released-for-true-to-life-color-rendering-of-3d-objects-r2733)
- **RDR2 bloom:** non-thresholded input, R11G11B10 7-mip chain, 13-tap downsample and 3×3 tent upsample (Call of Duty: AW method). A per-pixel bloom-intensity mask boosts glow in distant fog — [imgeself RDR2 study](https://imgeself.github.io/posts/2020-06-19-graphics-study-rdr2). This is the same design as pmndrs `mipmapBlur` bloom. A low, non-thresholded bloom (threshold ≈0, intensity very low) is the "lens veiling glare" look that reads as photographic [inference].

### Gaps
- AgX/Neutral versions confirmed via pmndrs docs (secondary to the three.js changelog itself).
- No measured phone timings for pmndrs EffectComposer chains.

---

## 7. What famous real-time works do (summary of available primary material)

### Takeaway
The best primary source found is Sucker Punch's SIGGRAPH 2021 talk (Ghost of Tsushima). Its key lessons, transferable to phones in baked or simplified form, are: an illuminance-based exposure, white balance as a colour matrix, baked sky visibility × runtime sky SH, fake sun bounce off "imaginary ground and wall", and exponential height haze. No technical talks were found for AC Mirage's Baghdad lighting, Uncharted 4 street lighting or RDR2 lighting within this pass.

### Cited Findings
- Tsushima: "stylized realism", with artists able to push away from physical correctness — [Patry 2021](https://advances.realtimerendering.com/s2021/jpatry_advances2021/index.html)
- Mirage: no rendering talk found. The engine is the Valhalla engine (Anvil, DX12) — [TechPowerUp](https://www.techpowerup.com/review/assassin-s-creed-mirage-benchmark-test-performance-analysis/). A GDC 2025 talk exists for AC Shadows rendering (GPU-driven, lighting advances), not Mirage — [80.lv](https://80.lv/articles/gdc-2025-talk-rendering-assassin-s-creed-shadows)
- Ghost of Yōtei ambient diffuse probes — [GDC 2026 session](https://schedule.gdconf.com/session/ambient-diffuse-lighting-in-ghost-of-ytei/915340)
- **Hillaire 2020 (Epic, EGSR 2020)** uses a few small LUTs (transmittance, multi-scattering, sky-view, aerial-perspective volume) to render sky and aerial perspective. It runs "from a low-end Apple iPhone 6s to consoles and high-end gaming PCs", is decoupled from screen resolution, and scales by LUT resolution and ray-march sample count. LUT updates can be time-sliced at the cost of a lag between sun and sky. Limitations are horizon LUT artefacts and no soft volumetric shadows. It ships in Unreal (SkyAtmosphere) — [paper, Eurographics DL](https://diglib.eg.org/handle/10.1111/cgf14050); [SIGGRAPH 2020 slides](https://blog.selfshadow.com/publications/s2020-shading-course/hillaire/s2020_pbs_hillaire_slides.pdf). Because the sun only moves through 08:00–11:00 slowly, the LUTs could be updated once every few seconds on phones.
- **RDR2 (Rockstar, Fabian Bauer):** "Creating the Atmospheric World of Red Dead Redemption 2: A Complete and Integrated Solution", Advances 2019 — [course page](https://advances.realtimerendering.com/s2019/index.htm). The slides were not read. A frame study shows the sky env cubemap generated from a sky paraboloid plus clouds via compute, and interior env maps re-baked only when time of day changes — [imgeself](https://imgeself.github.io/posts/2020-06-19-graphics-study-rdr2)
- **Uncharted 4:** SIGGRAPH 2016 deferred-lighting and indirect-diffuse talks — [Advances 2016](https://advances.realtimerendering.com/s2016/index.html)

### Inferences
- **Transferable ideas ranked by realism per phone-millisecond:**
  1. Correct sun angle and colour plus sky IBL.
  2. Baked AO/sky visibility.
  3. Warm bounce fill.
  4. Fitted sun shadow, cached.
  5. Distance haze with sun-aware colour.
  6. AgX plus light grade, grain and vignette.
  7. Optional half-res SSAO on high tier.
- Hillaire 2020 is the realistic "real sky on a phone" route if drei/Preetham looks too synthetic. Its proven iPhone 6s scalability makes a WebGL2 port plausible, with LUTs refreshed only when the game clock advances. Bruneton 2008 is the precomputed alternative (heavier precompute, cheap lookup).

### Gaps
- The talk slides themselves (Bauer 2019 RDR2, El Garawany/Jiang 2016 Uncharted 4) were located but not read. Their specific numbers are not in these notes. No public Matrix City Sample lighting values were found. No AC Mirage rendering talk exists that this search could find.
- Bruno Simon / Lusion three.js lighting breakdowns were not retrieved.
