// Procedural textures (no downloads, no licence risk). Values follow docs/ART_BIBLE.md:
// non-metal albedo ~50–240 sRGB, varied roughness, grime at wall bases.
import * as THREE from 'three';

function rng(seed: number) { return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32); }
function canvas(w: number, h: number) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')!] as const; }
function tex(c: HTMLCanvasElement, repeat: [number, number], color = true) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat);
  t.anisotropy = 4;
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Lime plaster: soft mottling, faint cracks, darker grime toward the bottom of each tile (wall base). Greyscale; tinted by vertex colour. */
export function plasterTexture(): THREE.Texture {
  const [c, g] = canvas(256, 256); const R = rng(7);
  g.fillStyle = '#f2f2f2'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) {
    const v = 215 + Math.floor(R() * 40); g.fillStyle = `rgba(${v},${v},${v},0.35)`;
    g.beginPath(); g.arc(R() * 256, R() * 256, 2 + R() * 10, 0, Math.PI * 2); g.fill();
  }
  g.strokeStyle = 'rgba(120,110,100,0.18)'; g.lineWidth = 1;
  for (let i = 0; i < 14; i++) { g.beginPath(); let x = R() * 256, y = R() * 256; g.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (R() - 0.5) * 24; y += R() * 14; g.lineTo(x, y); } g.stroke(); }
  return tex(c, [1, 1]);
}

/** Coral-stone courses: irregular blocks in rows with lime joints. */
export function stoneTexture(): THREE.Texture {
  const [c, g] = canvas(256, 256); const R = rng(11);
  g.fillStyle = '#b9ab95'; g.fillRect(0, 0, 256, 256);
  const rowH = 32;
  for (let y = 0; y < 256; y += rowH) {
    let x = -R() * 40;
    while (x < 256) {
      const w = 34 + R() * 40; const v = 175 + Math.floor(R() * 45);
      g.fillStyle = `rgb(${v},${v - 8},${v - 22})`; g.fillRect(x + 2, y + 2, w - 3, rowH - 3);
      for (let k = 0; k < 18; k++) { g.fillStyle = `rgba(90,80,70,${0.08 + R() * 0.12})`; g.fillRect(x + 2 + R() * (w - 4), y + 2 + R() * (rowH - 4), 1 + R() * 2, 1 + R() * 2); }
      x += w;
    }
  }
  return tex(c, [1, 1]);
}

/** Teak lattice for rawasheen: dark wood frame with a fine geometric grille. Used as colour + alpha. */
export function latticeTexture(): { map: THREE.Texture; alpha: THREE.Texture } {
  const [c, g] = canvas(128, 128); const [a, ga] = canvas(128, 128);
  g.fillStyle = '#4a2e1c'; g.fillRect(0, 0, 128, 128);
  ga.fillStyle = '#fff'; ga.fillRect(0, 0, 128, 128);
  ga.fillStyle = '#000';
  for (let y = 10; y < 118; y += 12) for (let x = 10; x < 118; x += 12) {
    ga.beginPath(); ga.moveTo(x + 5, y); ga.lineTo(x + 10, y + 5); ga.lineTo(x + 5, y + 10); ga.lineTo(x, y + 5); ga.closePath(); ga.fill();
  }
  for (let i = 0; i < 300; i++) { g.fillStyle = `rgba(30,18,10,${Math.random() * 0.25})`; g.fillRect(Math.random() * 128, Math.random() * 128, 1, 6); }
  return { map: tex(c, [1, 1]), alpha: tex(a, [1, 1], false) };
}

/** Teak planks with grain (doors, bays, beams). */
export function teakTexture(): THREE.Texture {
  const [c, g] = canvas(128, 256); const R = rng(23);
  g.fillStyle = '#5a3a24'; g.fillRect(0, 0, 128, 256);
  for (let x = 0; x < 128; x += 16) { g.fillStyle = `rgba(20,10,5,0.5)`; g.fillRect(x, 0, 1, 256); }
  for (let i = 0; i < 260; i++) { g.strokeStyle = `rgba(${40 + R() * 40},${24 + R() * 20},${12 + R() * 10},0.35)`; g.beginPath(); const x = R() * 128; g.moveTo(x, 0); g.bezierCurveTo(x + R() * 6 - 3, 80, x + R() * 6 - 3, 170, x + R() * 4 - 2, 256); g.stroke(); }
  return tex(c, [1, 1]);
}

/** Stone paving for lanes and the square. */
export function pavingTexture(): THREE.Texture {
  const [c, g] = canvas(256, 256); const R = rng(31);
  g.fillStyle = '#7d6347'; g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 32) for (let x = (y / 32) % 2 ? -24 : 0; x < 256; x += 48) {
    const v = 150 + Math.floor(R() * 45); g.fillStyle = `rgb(${v + 12},${v - 6},${v - 34})`; g.fillRect(x + 2, y + 2, 44, 28);
    g.fillStyle = 'rgba(60,50,40,0.15)'; g.fillRect(x + 2, y + 26, 44, 4);
  }
  return tex(c, [12, 4]);
}

/** Striped cloth for awnings. */
export function clothTexture(a: string, b: string): THREE.Texture {
  const [c, g] = canvas(64, 64);
  for (let x = 0; x < 64; x += 16) { g.fillStyle = a; g.fillRect(x, 0, 8, 64); g.fillStyle = b; g.fillRect(x + 8, 0, 8, 64); }
  return tex(c, [3, 1]);
}

/** Soft round contact shadow (grounds characters and props; nothing floats). */
export function contactTexture(): THREE.Texture {
  const [c, g] = canvas(64, 64);
  const grd = g.createRadialGradient(32, 32, 2, 32, 32, 31);
  grd.addColorStop(0, 'rgba(0,0,0,0.55)'); grd.addColorStop(0.6, 'rgba(0,0,0,0.25)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c); return t;
}
