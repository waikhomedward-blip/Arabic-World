// Procedural character parts. Heads are a single smooth sphere: no features of any kind (hard rule 1).
import type { Character } from '../core/content';

export interface Part {
  name: string; slot: 'body' | 'head' | 'headwear' | 'arm' | 'outer';
  shape: 'sphere' | 'capsule' | 'cone' | 'cylinder' | 'torus';
  size: [number, number, number]; pos: [number, number, number]; colour: string;
}

const SKIN = '#c89f7a';

export function characterParts(c: Character): Part[] {
  const h = c.height, w = 0.24 * c.build;
  const bodyH = h * 0.78;
  const parts: Part[] = [
    // loose garment: a gently flared cone from shoulders to ankles
    { name: 'garment', slot: 'body', shape: 'cone', size: [w * 1.15, bodyH, w * 0.8], pos: [0, bodyH / 2, 0], colour: c.colour },
    { name: 'neck', slot: 'body', shape: 'cylinder', size: [h * 0.03, h * 0.06, h * 0.03], pos: [0, bodyH + h * 0.015, 0], colour: SKIN },
    { name: 'head', slot: 'head', shape: 'sphere', size: [h * 0.066, h * 0.066, h * 0.066], pos: [0, bodyH + h * 0.075, 0], colour: SKIN },
    { name: 'arm-left', slot: 'arm', shape: 'capsule', size: [0.045 * c.build, h * 0.3, 0.045], pos: [-w * 0.95, bodyH * 0.72, 0], colour: c.colour },
    { name: 'arm-right', slot: 'arm', shape: 'capsule', size: [0.045 * c.build, h * 0.3, 0.045], pos: [w * 0.95, bodyH * 0.72, 0], colour: c.colour },
  ];
  if (c.garments.includes('ghutra')) {
    parts.push({ name: 'ghutra', slot: 'headwear', shape: 'sphere', size: [h * 0.074, h * 0.074, h * 0.074], pos: [0, bodyH + h * 0.082, -0.012], colour: '#f2efe8' });
    parts.push({ name: 'ghutra-drape', slot: 'headwear', shape: 'cone', size: [h * 0.085, h * 0.13, h * 0.06], pos: [0, bodyH + h * 0.02, -0.03], colour: '#f2efe8' });
    parts.push({ name: 'agal', slot: 'headwear', shape: 'torus', size: [h * 0.058, h * 0.008, h * 0.058], pos: [0, bodyH + h * 0.125, -0.01], colour: '#1d1a18' });
  } else if (c.garments.includes('kufi')) parts.push({ name: 'kufi', slot: 'headwear', shape: 'cylinder', size: [h * 0.062, h * 0.035, h * 0.062], pos: [0, bodyH + h * 0.118, 0], colour: '#fbfaf6' });
  if (c.garments.includes('bisht')) parts.push({ name: 'bisht', slot: 'outer', shape: 'cone', size: [w * 1.4, bodyH * 0.92, w * 0.95], pos: [0, bodyH * 0.5, -0.01], colour: '#5b4636' });
  return parts;
}
