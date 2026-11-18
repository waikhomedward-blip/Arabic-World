// The old quarter, generated from a seed and merged per material (docs/ART_BIBLE.md: architecture, budgets).
// Houses: coral-stone ground floor, lime-plaster upper storeys (3.2 m each), teak timber bands,
// projecting rawasheen bays with lattice, doors and shopfronts, parapets, rooftop water tanks, grime at the base.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const STOREY = 3.2;
export const BACK_FACE_Z = -1.6;   // facade line behind the characters
export const FRONT_FACE_Z = 6.2;   // facade line behind the camera side of the lane

type Bucket = 'plaster' | 'stone' | 'teak' | 'lattice' | 'dark';
export type QuarterGeometry = Record<Bucket, THREE.BufferGeometry>;

function rng(seed: number) { return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32); }

/** Scale box UVs so textures keep a real-world size (metres per tile). */
function worldUV(g: THREE.BufferGeometry, w: number, h: number, d: number, tile: number) {
  const uv = g.attributes.uv as THREE.BufferAttribute;
  const dims: [number, number][] = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let k = 0; k < 4; k++) {
    const i = f * 4 + k; uv.setXY(i, uv.getX(i) * dims[f][0] / tile, uv.getY(i) * dims[f][1] / tile);
  }
}

function colourise(g: THREE.BufferGeometry, c: THREE.Color, grimeBelow = -1) {
  const pos = g.attributes.position; const arr = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const k = grimeBelow >= 0 && pos.getY(i) <= grimeBelow ? 0.72 : 1; // darker at the wall base: dirt and damp
    arr[i * 3] = c.r * k; arr[i * 3 + 1] = c.g * k; arr[i * 3 + 2] = c.b * k;
  }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
}

class Builder {
  buckets: Record<Bucket, THREE.BufferGeometry[]> = { plaster: [], stone: [], teak: [], lattice: [], dark: [] };
  m = new THREE.Matrix4();
  box(b: Bucket, w: number, h: number, d: number, x: number, y: number, z: number, colour: THREE.Color, tile = 3.2, grime = false) {
    const g = new THREE.BoxGeometry(w, h, d);
    worldUV(g, w, h, d, tile);
    g.translate(x, y, z);
    g.applyMatrix4(this.m);
    colourise(g, colour, grime ? 0.05 : -1);
    this.buckets[b].push(g);
  }
  plane(b: Bucket, w: number, h: number, x: number, y: number, z: number, colour: THREE.Color, tile = 0.6) {
    const g = new THREE.PlaneGeometry(w, h);
    const uv = g.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w / tile, uv.getY(i) * h / tile);
    g.translate(x, y, z); g.applyMatrix4(this.m);
    colourise(g, colour);
    this.buckets[b].push(g);
  }
  cylinder(b: Bucket, rTop: number, rBot: number, h: number, seg: number, x: number, y: number, z: number, colour: THREE.Color) {
    const g = new THREE.CylinderGeometry(rTop, rBot, h, seg);
    g.translate(x, y, z); g.applyMatrix4(this.m); colourise(g, colour); this.buckets[b].push(g);
  }
  cone(b: Bucket, r: number, h: number, seg: number, x: number, y: number, z: number, colour: THREE.Color) {
    const g = new THREE.ConeGeometry(r, h, seg);
    g.translate(x, y, z); g.applyMatrix4(this.m); colourise(g, colour); this.buckets[b].push(g);
  }
  merged(): QuarterGeometry {
    const out = {} as QuarterGeometry;
    for (const k of Object.keys(this.buckets) as Bucket[]) {
      const list = this.buckets[k];
      out[k] = list.length ? mergeGeometries(list, false)! : new THREE.BufferGeometry();
      list.forEach((g) => g.dispose());
    }
    return out;
  }
}

// Palette (art bible): warm sand / off-white / coral plaster; faded teak, green and blue-grey bays.
const PLASTER = ['#cfb58f', '#d8c6a8', '#c9a37c', '#c6a07a', '#d3bd99'].map((c) => new THREE.Color(c));
const STONE = ['#b89d78', '#ad9270', '#bfa684'].map((c) => new THREE.Color(c));
const TEAK = ['#7a5236', '#6b4730', '#5f7a62', '#6a7d86', '#8a5f3c'].map((c) => new THREE.Color(c));
const WHITE = new THREE.Color('#eeeae2');
const DARK = new THREE.Color('#ffffff');

function house(b: Builder, R: () => number, w: number, storeys: number, depth: number) {
  const plaster = PLASTER[Math.floor(R() * PLASTER.length)];
  const stone = STONE[Math.floor(R() * STONE.length)];
  const teak = TEAK[Math.floor(R() * TEAK.length)];
  const H = storeys * STOREY;
  // ground floor in coral stone courses, upper floors in lime plaster (grime at the base)
  b.box('stone', w, STOREY, depth, 0, STOREY / 2, -depth / 2, stone, 3.2); // grime is in the wall shader now
  b.box('plaster', w, H - STOREY, depth, 0, STOREY + (H - STOREY) / 2, -depth / 2, plaster, 4);
  // horizontal teak timber bands at every floor line (UNESCO: timber-reinforced coral walls)
  for (let f = 1; f <= storeys; f++) b.box('teak', w + 0.04, 0.12, 0.08, 0, f * STOREY - 0.06, 0.02, teak.clone().multiplyScalar(0.8), 1);
  // ground floor: a door or a shopfront
  const shop = R() < 0.45;
  const dx = (R() - 0.5) * (w - 2.2);
  if (shop) {
    b.box('dark', Math.min(2.6, w - 1), 2.4, 0.06, dx, 1.2, 0.01, DARK);
    b.box('teak', Math.min(2.8, w - 0.8), 0.18, 0.12, dx, 2.5, 0.05, teak, 1);
  } else {
    b.box('stone', 1.6, 2.7, 0.08, dx, 1.35, 0.03, stone.clone().multiplyScalar(1.08)); // carved surround
    b.box('teak', 1.15, 2.3, 0.1, dx, 1.15, 0.06, teak, 1);                            // teak door
    b.box('teak', 1.3, 0.12, 0.14, dx, 2.36, 0.07, teak.clone().multiplyScalar(0.7), 1);
  }
  // small high windows on the ground floor
  if (w > 4) b.box('dark', 0.5, 0.7, 0.05, dx > 0 ? -w / 2 + 0.9 : w / 2 - 0.9, 2.3, 0.01, DARK);
  // upper floors: rawasheen bays (the signature shape) or small windows
  for (let f = 1; f < storeys; f++) {
    const y0 = f * STOREY;
    const bays = w > 5.2 && R() < 0.5 ? 2 : 1;
    for (let k = 0; k < bays; k++) {
      const bw = Math.min(w / bays - 0.6, 1.6 + R() * 1.0);
      const bx = bays === 2 ? (k === 0 ? -w / 4 : w / 4) : (R() - 0.5) * (w - bw - 0.8);
      if (R() < 0.82) {
        const bh = 2.2 + R() * 0.4, proj = 0.55 + R() * 0.2, by = y0 + 0.5 + bh / 2;
        const tint = R() < 0.25 ? TEAK[Math.floor(R() * TEAK.length)] : teak;
        b.box('teak', bw, bh, proj, bx, by, proj / 2, tint, 1);                                   // bay body
        b.plane('lattice', bw * 0.84, bh * 0.72, bx, by + 0.05, proj + 0.006, tint.clone().lerp(WHITE, 0.08)); // lattice screen
        b.box('teak', bw + 0.18, 0.14, proj + 0.18, bx, by + bh / 2 + 0.07, proj / 2, tint.clone().multiplyScalar(0.8), 1); // cap
        b.box('teak', bw * 0.9, 0.22, proj * 0.8, bx, y0 + 0.45, proj * 0.4, tint.clone().multiplyScalar(0.75), 1);      // corbel
      } else {
        b.box('dark', 0.7, 1.1, 0.05, bx, y0 + 1.6, 0.01, DARK);
        b.box('teak', 0.85, 0.08, 0.12, bx, y0 + 1.0, 0.05, teak, 1);
      }
    }
  }
  // roof parapet with crenellations, and a water tank on some roofs
  b.box('plaster', w, 0.45, 0.3, 0, H + 0.22, -0.15, plaster, 2);
  for (let x = -w / 2 + 0.3; x < w / 2 - 0.2; x += 0.62) b.box('plaster', 0.32, 0.4, 0.3, x, H + 0.65, -0.15, plaster, 1);
  if (R() < 0.55) b.cylinder('plaster', 0.55, 0.55, 1.1, 14, (R() - 0.5) * (w - 1.5), H + 0.55, -depth * 0.6, WHITE);
}

/** Two facing rows of houses along the lane, with an opening onto the square, and the minaret as the landmark. */
export function buildQuarter(seed = 17): QuarterGeometry {
  const R = rng(seed); const b = new Builder();
  const rows: { face: number; flip: boolean; gaps: [number, number][] }[] = [
    { face: BACK_FACE_Z, flip: false, gaps: [] },
    { face: FRONT_FACE_Z, flip: true, gaps: [[2.5, 11.5]] }, // the square opens to the south
  ];
  for (const row of rows) {
    let x = -30;
    while (x < 34) {
      const w = 4 + R() * 2.6;
      const cx = x + w / 2;
      if (!row.gaps.some(([a, z]) => cx > a && cx < z)) {
        const storeys = 3 + Math.floor(R() * 3) + (R() < 0.15 ? 1 : 0); // 3–6 storeys
        const depth = 7 + R() * 2;
        const setback = (R() - 0.5) * 0.35; // uneven building line: nothing perfectly aligned
        b.m.makeTranslation(cx, 0, row.face + (row.flip ? -setback : setback));
        if (row.flip) b.m.multiply(new THREE.Matrix4().makeRotationY(Math.PI));
        house(b, R, w - 0.02, storeys, depth);
      }
      x += w;
    }
  }
  // minaret (fictional, modest): octagonal shaft, stone rings, balcony, upper shaft, cap
  b.m.makeTranslation(9.5, 0, -14);
  b.cylinder('plaster', 1.25, 1.45, 20, 8, 0, 10, 0, new THREE.Color('#efe6d6'));
  for (const y of [6, 12, 17]) b.cylinder('stone', 1.42, 1.42, 0.35, 8, 0, y, 0, STONE[0]);
  b.cylinder('teak', 2.0, 1.7, 0.45, 8, 0, 20.2, 0, TEAK[0]);
  b.cylinder('plaster', 0.85, 0.9, 4.5, 8, 0, 22.6, 0, new THREE.Color('#efe6d6'));
  b.cone('plaster', 1.0, 2.6, 8, 0, 26.1, 0, new THREE.Color('#e9dcc4'));
  b.m.identity();
  return b.merged();
}
