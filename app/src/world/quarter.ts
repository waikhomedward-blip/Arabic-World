// The old quarter, generated from a seed and merged per material (docs/ART_BIBLE.md: architecture, budgets).
// Houses: coral-stone ground floor, lime-plaster upper storeys (3.2 m each), teak timber bands,
// projecting rawasheen bays with lattice, doors and shopfronts, parapets, rooftop water tanks, grime at the base.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const STOREY = 3.2;
export const BACK_FACE_Z = -1.6;   // facade line behind the characters
export const FRONT_FACE_Z = 6.2;   // facade line behind the camera side of the lane

type Bucket = 'plaster' | 'stone' | 'teak' | 'lattice' | 'dark' | 'metal';
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
  buckets: Record<Bucket, THREE.BufferGeometry[]> = { plaster: [], stone: [], teak: [], lattice: [], dark: [], metal: [] };
  m = new THREE.Matrix4();
  box(b: Bucket, w: number, h: number, d: number, x: number, y: number, z: number, colour: THREE.Color, tile = 3.2, grime = false) {
    const g = new THREE.BoxGeometry(w, h, d);
    worldUV(g, w, h, d, tile);
    g.translate(x, y, z);
    g.applyMatrix4(this.m);
    colourise(g, colour, grime ? 0.05 : -1);
    this.buckets[b].push(g);
  }
  /** tile = 0: the texture is fitted once across the plane (e.g. one lattice screen per bay). */
  plane(b: Bucket, w: number, h: number, x: number, y: number, z: number, colour: THREE.Color, tile = 0.6) {
    const g = new THREE.PlaneGeometry(w, h);
    const uv = g.attributes.uv as THREE.BufferAttribute;
    if (tile > 0) for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w / tile, uv.getY(i) * h / tile);
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
// Reference: Wikimedia photos of Al-Balad (Historic Jeddah): mostly white and cream limewash, greyed by weather.
const PLASTER = ['#f8f6f2', '#f2efe8', '#fbf9f6', '#eae6de', '#f3f0e8'].map((c) => new THREE.Color(c));
const STONE = ['#eae6dd', '#e2ddd4', '#edeae2'].map((c) => new THREE.Color(c)); // ground floors: mostly plastered, coral stone shows through
const TEAK = ['#7a5236', '#6b4730', '#3f7a4a', '#4a8088', '#8a5f3c'].map((c) => new THREE.Color(c));
const WHITE = new THREE.Color('#eeeae2');
const DARK = new THREE.Color('#ffffff');

const GOODS = ['#b5462f', '#d9b45a', '#3f6e8c', '#e8e2d0', '#6b8c4a', '#c97a3a', '#7a4a6a', '#2f4f6f', '#e0c9a0'].map((c) => new THREE.Color(c));
const AC = new THREE.Color('#dcd8cf'), CABLE = new THREE.Color('#1c1b1a'), SHUTTER = new THREE.Color('#9a9892');

/** Street clutter from its own RNG (D), so the seeded houses never change: window AC units, cables, shutter boxes. */
function clutter(b: Builder, D: () => number, w: number, storeys: number, shop: boolean, dx: number, bays: [number, number, number][]) {
  // shop: rolled-up shutter box above the opening
  if (shop) {
    b.box('metal', Math.min(2.7, w - 0.9), 0.28, 0.22, dx, 2.75, 0.11, SHUTTER);
    // goods on display in the open shopfront: three shelves of cloth bolts, tins and boxes
    const ow = Math.min(2.6, w - 1) - 0.2;
    for (let s = 0; s < 3; s++) {
      let x = dx - ow / 2;
      while (x < dx + ow / 2 - 0.12) {
        const gw = 0.12 + D() * 0.22, gh = 0.14 + D() * 0.26;
        if (D() < 0.8) b.box('metal', gw - 0.02, gh, 0.22, x + gw / 2, 0.35 + s * 0.62 + gh / 2, 0.14, GOODS[Math.floor(D() * GOODS.length)]);
        x += gw;
      }
      b.box('metal', ow, 0.03, 0.3, dx, 0.34 + s * 0.62, 0.15, SHUTTER.clone().multiplyScalar(0.6)); // shelf
    }
  }
  // window AC units on upper floors, never inside a bay
  for (let f = 1; f < storeys; f++) {
    if (D() > 0.8) continue;
    const ax = (D() - 0.5) * (w - 1.2), ay = f * STOREY + 0.9 + D() * 0.6;
    if (bays.some(([fl, bx, bw]) => fl === f && Math.abs(ax - bx) < bw / 2 + 0.5)) continue;
    b.box('metal', 0.66, 0.44, 0.42, ax, ay, 0.21, AC);
    b.box('dark', 0.5, 0.3, 0.02, ax, ay, 0.43, AC);          // grille
    b.box('metal', 0.02, ay - 0.3, 0.02, ax + 0.3, (ay - 0.3) / 2 + 0.3, 0.03, CABLE); // drain pipe / cable down the wall
  }
  // one or two sagging cables across the facade
  const n = 1 + Math.floor(D() * 3);
  for (let i = 0; i < n; i++) {
    const y = STOREY + 0.25 + D() * 1.4, segs = 4;
    for (let k = 0; k < segs; k++) {
      const x0 = -w / 2 + (w * k) / segs, sag = Math.sin(((k + 0.5) / segs) * Math.PI) * 0.12;
      b.box('metal', w / segs + 0.02, 0.025, 0.025, x0 + w / segs / 2, y - sag, 0.05, CABLE);
    }
  }
}

function house(b: Builder, R: () => number, w: number, storeys: number, depth: number, D?: () => number) {
  const bayList: [number, number, number][] = [];
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
        bayList.push([f, bx, bw]);
        b.box('teak', bw, bh, proj, bx, by, proj / 2, tint, 1);                                   // bay body
        b.plane('dark', bw * 0.84, bh * 0.72, bx, by + 0.05, proj + 0.004, DARK);                         // shaded room behind the grille
        b.plane('lattice', bw * 0.84, bh * 0.72, bx, by + 0.05, proj + 0.025, tint.clone().lerp(WHITE, 0.08), 0); // lattice screen, one per bay
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
  if (D) clutter(b, D, w, storeys, shop, dx, bayList);
}

/** Two facing rows of houses along the lane, with an opening onto the square, and the minaret as the landmark. */
export function buildQuarter(seed = 17): QuarterGeometry {
  const R = rng(seed); const D = rng(seed * 7919 + 13); const b = new Builder();
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
        house(b, R, w - 0.02, storeys, depth, D);
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
