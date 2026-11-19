// Procedural character parts. Heads are a single smooth sphere: no features of any kind (hard rule 1).
// Silhouettes follow docs/ART_BIBLE.md: thobe with shoulders and a flared hem, sleeves with hands, ghutra or kufi.
import type { Character } from '../core/content';

export interface Part {
  name: string; slot: 'body' | 'head' | 'headwear' | 'arm' | 'outer';
  shape: 'sphere' | 'capsule' | 'cone' | 'cylinder' | 'torus' | 'lathe';
  size: [number, number, number]; pos: [number, number, number]; colour: string;
  /** lathe profile [radius, height] from bottom to top (metres) */
  profile?: [number, number][];
  rot?: [number, number, number];
  rough?: number;
}

const SKIN = '#b98a66';
const GHUTRA = '#f3f0ea';

export function characterParts(c: Character): Part[] {
  const h = c.height, k = c.build;
  const sh = h * 0.815;               // shoulder height
  const headR = h * 0.064;
  const headY = sh + h * 0.035 + headR;
  // thobe: ankle-length, loose, gently flared; shoulders slope into the neck
  const thobe: [number, number][] = [
    [0.0, 0.02], [0.25 * k, 0.03], [0.24 * k, 0.25], [0.21 * k, h * 0.45], [0.2 * k, h * 0.6],
    [0.21 * k, h * 0.72], [0.205 * k, sh - 0.04], [0.15 * k, sh + 0.01], [0.07, sh + 0.04], [0.0, sh + 0.045],
  ];
  const parts: Part[] = [
    { name: 'thobe', slot: 'body', shape: 'lathe', size: [1, 1, 1], pos: [0, 0, 0], colour: c.colour, profile: thobe, rough: 0.92 },
    { name: 'neck', slot: 'body', shape: 'cylinder', size: [h * 0.028, h * 0.05, h * 0.028], pos: [0, sh + 0.04, 0], colour: SKIN },
    { name: 'head', slot: 'head', shape: 'sphere', size: [headR, headR, headR], pos: [0, headY, 0], colour: SKIN },
  ];
  // sleeves hang from the shoulders, slightly away from the body; hands at the end
  for (const side of [-1, 1]) {
    const ax = side * 0.235 * k, len = h * 0.33;
    parts.push({ name: side < 0 ? 'sleeve-left' : 'sleeve-right', slot: 'arm', shape: 'capsule', size: [0.052 * k, len, 0.052], pos: [ax, sh - len / 2 - 0.03, 0.01], colour: c.colour, rot: [0, 0, side * 0.08], rough: 0.92 });
    parts.push({ name: side < 0 ? 'hand-left' : 'hand-right', slot: 'arm', shape: 'sphere', size: [0.045, 0.055, 0.04], pos: [ax + side * 0.02, sh - len - 0.08, 0.02], colour: SKIN });
  }
  if (c.garments.includes('ghutra')) {
    // the ghutra fully encloses the smooth head (same centre, larger radius) so no partial opening ever shows
    parts.push({ name: 'ghutra', slot: 'headwear', shape: 'sphere', size: [headR * 1.12, headR * 1.12, headR * 1.12], pos: [0, headY, 0], colour: GHUTRA, rough: 0.9 });
    parts.push({ name: 'ghutra-drape', slot: 'headwear', shape: 'lathe', size: [1, 1, 1], pos: [0, 0, -0.015], colour: GHUTRA, rough: 0.9,
      profile: [[0.2 * k, sh - 0.12], [0.19 * k, sh], [0.13, sh + 0.05], [headR * 1.1, headY - headR * 0.2], [headR * 1.05, headY + headR * 0.2], [0.0, headY + headR * 0.35]] });
    parts.push({ name: 'agal', slot: 'headwear', shape: 'torus', size: [headR * 0.92, 0.012, headR * 0.92], pos: [0, headY + headR * 0.62, 0], colour: '#1d1a18', rough: 0.6 });
  } else if (c.garments.includes('kufi')) {
    parts.push({ name: 'kufi', slot: 'headwear', shape: 'cylinder', size: [headR * 0.95, headR * 0.55, headR * 0.95], pos: [0, headY + headR * 0.6, 0], colour: '#fbfaf6', rough: 0.85 });
  }
  if (c.garments.includes('bisht')) {
    parts.push({ name: 'bisht', slot: 'outer', shape: 'lathe', size: [1, 1, 1], pos: [0, 0, -0.012], colour: '#4a3829', rough: 0.85,
      profile: [[0.0, 0.08], [0.29 * k, 0.09], [0.26 * k, h * 0.5], [0.235 * k, sh - 0.05], [0.17 * k, sh + 0.02], [0.08, sh + 0.04], [0.0, sh + 0.045]] });
  }
  if (c.garments.includes('jacket')) {
    parts.push({ name: 'jacket', slot: 'outer', shape: 'lathe', size: [1, 1, 1], pos: [0, 0, 0], colour: '#2f3d4f', rough: 0.85,
      profile: [[0.0, h * 0.5], [0.225 * k, h * 0.5], [0.22 * k, sh - 0.04], [0.16 * k, sh + 0.015], [0.0, sh + 0.03]] });
  }
  return parts;
}

/** Background men at work (art bible: life in the background). Same faceless, modest parts as the cast. */
export type Task = 'sweep' | 'carry' | 'sit' | 'stand' | 'chat' | 'kneel' | 'tend';
export const EXTRAS: (Character & { at: [number, number, number]; task: Task; facing?: number })[] = [
  { id: 'extra-1', nameAr: '', nameEn: '', role: 'shopkeeper sweeping', gender: 'male', age: 'adult', face: 'none', voice: '', register: 'white', garments: ['thobe', 'kufi'], colour: '#e9e4da', height: 1.72, build: 1.0, at: [-8.2, 0, -0.6], task: 'sweep' },
  { id: 'extra-2', nameAr: '', nameEn: '', role: 'porter carrying a crate', gender: 'male', age: 'adult', face: 'none', voice: '', register: 'white', garments: ['thobe', 'ghutra'], colour: '#d8d2c4', height: 1.76, build: 1.05, at: [1.6, 0, 3.6], task: 'carry' },
  { id: 'extra-3', nameAr: '', nameEn: '', role: 'old man sitting by a door', gender: 'male', age: 'older adult', face: 'none', voice: '', register: 'white', garments: ['thobe', 'ghutra'], colour: '#cfc6b4', height: 1.66, build: 1.1, at: [12.4, 0, -0.9], task: 'sit' },
  { id: 'extra-4', nameAr: '', nameEn: '', role: 'customer at the café', gender: 'male', age: 'young adult', face: 'none', voice: '', register: 'white', garments: ['loose_shirt_long_sleeve', 'loose_trousers', 'kufi'], colour: '#7d8a74', height: 1.74, build: 0.95, at: [19.8, 0, -0.4], task: 'stand' },
  { id: 'extra-5', nameAr: '', nameEn: '', role: 'boy carrying bread', gender: 'male', age: 'boy', face: 'none', voice: '', register: 'white', garments: ['thobe'], colour: '#e6e1d6', height: 1.32, build: 0.85, at: [-15.5, 0, 2.6], task: 'carry' },
  // density of life (GTA VI review, 19 Nov): ordinary moments further down the lane, never between the camera and the cast
  { id: 'extra-6', nameAr: '', nameEn: '', role: 'neighbour chatting', gender: 'male', age: 'older adult', face: 'none', voice: '', register: 'white', garments: ['thobe', 'ghutra'], colour: '#ece7dc', height: 1.7, build: 1.05, at: [-19.2, 0, -0.6], task: 'chat', facing: Math.PI / 2 },
  { id: 'extra-7', nameAr: '', nameEn: '', role: 'neighbour listening', gender: 'male', age: 'adult', face: 'none', voice: '', register: 'white', garments: ['thobe', 'kufi'], colour: '#dcd6c8', height: 1.75, build: 0.95, at: [-18.3, 0, -0.5], task: 'stand', facing: -Math.PI / 2 },
  { id: 'extra-8', nameAr: '', nameEn: '', role: 'customer at the fruit stall', gender: 'male', age: 'adult', face: 'none', voice: '', register: 'white', garments: ['loose_shirt_long_sleeve', 'loose_trousers'], colour: '#8a7f6e', height: 1.73, build: 1.0, at: [-7.4, 0, 0.1], task: 'tend', facing: Math.PI * 0.85 },
  { id: 'extra-9', nameAr: '', nameEn: '', role: 'man fixing a door', gender: 'male', age: 'adult', face: 'none', voice: '', register: 'white', garments: ['thobe', 'kufi'], colour: '#e2ddd2', height: 1.74, build: 1.0, at: [2.6, 0, -0.9], task: 'kneel', facing: Math.PI },
  { id: 'extra-10', nameAr: '', nameEn: '', role: 'shopkeeper arranging pots', gender: 'male', age: 'older adult', face: 'none', voice: '', register: 'white', garments: ['thobe', 'kufi'], colour: '#d5cdbd', height: 1.68, build: 1.1, at: [21.4, 0, -0.5], task: 'tend', facing: Math.PI * 0.9 },
  { id: 'extra-11', nameAr: '', nameEn: '', role: 'man waiting with a sack', gender: 'male', age: 'young adult', face: 'none', voice: '', register: 'white', garments: ['loose_shirt_long_sleeve', 'loose_trousers', 'kufi'], colour: '#6f7f8c', height: 1.78, build: 0.95, at: [13.2, 0, 0.2], task: 'stand', facing: Math.PI / 3 },
];
