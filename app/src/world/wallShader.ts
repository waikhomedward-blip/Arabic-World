// Wear for walls, worked out in world space inside the existing materials (no new draw calls, no textures).
// The art bible rebuild rules sections this follows:
// - Materials: world-noise macro variation (period 4–12 m, ±8–15%) so tiles never repeat visibly.
// - Grime: a real band 0.3–1 m at the wall base (damp and dirt), slightly warm-brown.
// - Gandal: dark timber courses every ~1.1 m that show only where the plaster is worn.
// - Sun streaks: faint vertical weathering streaks.
// - Roughness: varies ±0.1 with the same noise.
import type * as THREE from 'three';

export interface WallWear { grime?: number; gandal?: boolean; streaks?: boolean; macro?: number; roughVar?: number }

const NOISE = /* glsl */ `
varying vec3 vAwWorld;
float awHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float awNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(awHash(i), awHash(i + vec2(1.0, 0.0)), u.x), mix(awHash(i + vec2(0.0, 1.0)), awHash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float awFbm(vec2 p) { return awNoise(p) * 0.6 + awNoise(p * 2.13 + 7.1) * 0.3 + awNoise(p * 4.7 + 3.3) * 0.1; }
`;

/** Patch a MeshStandardMaterial in place. Safe to call once per material. */
export function applyWallWear(mat: THREE.MeshStandardMaterial, w: WallWear): THREE.MeshStandardMaterial {
  const grime = w.grime ?? 0.3, macro = w.macro ?? 0.12, roughVar = w.roughVar ?? 0.1;
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vAwWorld;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvAwWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${NOISE}`)
      .replace('#include <color_fragment>', /* glsl */ `#include <color_fragment>
      {
        vec3 P = vAwWorld;
        // the plane's own axis: use x+z so both rows of houses and their side walls get variation
        float along = P.x + P.z * 0.7;
        float n = awFbm(vec2(along, P.y) / 6.5);
        diffuseColor.rgb *= 1.0 + (n - 0.5) * ${(macro * 2).toFixed(3)};
        // grime band at the base: dark, warm, uneven top edge
        float edge = 0.55 + 0.45 * awNoise(vec2(along * 1.3, 2.0));
        float g = 1.0 - smoothstep(0.1, edge + 0.45, P.y);
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.62, 0.55, 0.46), g * ${grime.toFixed(3)} * (0.75 + 0.5 * n));
        ${w.streaks ? `
        // faint vertical weathering streaks (rain is rare, dust and salt are not)
        float s = awNoise(vec2(along * 2.7, P.y * 0.12));
        diffuseColor.rgb *= 1.0 - 0.13 * smoothstep(0.5, 0.85, s);` : ''}
        ${w.gandal ? `
        // gandal timber courses every ~1.1 m, visible only where the plaster has worn
        float f = fract(P.y / 1.1);
        float d = min(f, 1.0 - f) * 1.1;
        float line = 1.0 - smoothstep(0.025, 0.055, d);
        float worn = smoothstep(0.38, 0.62, awFbm(vec2(along, P.y) / 3.1 + 11.0));
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.30, 0.22, 0.16), line * worn * 0.85);` : ''}
      }`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
      roughnessFactor = clamp(roughnessFactor + (awFbm(vAwWorld.xy / 3.0 + vAwWorld.z * 0.2) - 0.5) * ${(roughVar * 2).toFixed(3)}, 0.0, 1.0);`);
  };
  mat.customProgramCacheKey = () => `aw-wall-${grime}-${w.gandal ? 1 : 0}-${w.streaks ? 1 : 0}-${macro}-${roughVar}`;
  return mat;
}
