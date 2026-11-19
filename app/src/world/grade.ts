// Final grade after AgX (one pass, in the tone-mapping shader): levels in display space, like a photo's
// black and white points. Visual revisions REV-019+ (docs/visual-revisions/README.md).
import * as THREE from 'three';

export const GRADE = { black: 0.12, white: 0.95, gamma: 1.0, sat: 1.0, grain: 0.02, wb: [1.0, 1.0, 1.0] as const };

let done = false;
export function installGrade() {
  if (done) return; done = true;
  const marker = 'color = LINEAR_REC2020_TO_LINEAR_SRGB * color;';
  const src = THREE.ShaderChunk.tonemapping_pars_fragment;
  if (!src.includes(marker)) { console.warn('aw grade: tone-mapping marker not found'); return; }
  const b = GRADE.black.toFixed(4), w = GRADE.white.toFixed(4);
  THREE.ShaderChunk.tonemapping_pars_fragment = src.replace(marker, `${marker}
\tcolor = clamp( color * vec3( ${GRADE.wb.map((v) => v.toFixed(4)).join(', ')} ), 0.0, 1.0 );
\tvec3 d = pow( color, vec3( 1.0 / 2.2 ) );
\td = pow( clamp( ( d - ${b} ) / ( ${w} - ${b} ), 0.0, 1.0 ), vec3( ${GRADE.gamma.toFixed(4)} ) );
\td = clamp( mix( vec3( dot( d, vec3( 0.2126, 0.7152, 0.0722 ) ) ), d, ${GRADE.sat.toFixed(4)} ), 0.0, 1.0 );
\td = clamp( d + ( fract( sin( dot( gl_FragCoord.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ) - 0.5 ) * ${GRADE.grain.toFixed(4)}, 0.0, 1.0 ); // faint photographic grain
\tcolor = pow( d, vec3( 2.2 ) );`);
}
