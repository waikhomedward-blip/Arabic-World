// Real human bodies for the cast and the men in the street (CC0 Quaternius base body + animation library,
// built into /models/man.glb by tools/build-man.mjs; see docs/ASSET_LOG.md).
// At load time the body is dressed once, in its bind pose:
//   - the head is smoothed into a plain rounded shape (hard rule 1: no features of any kind),
//   - torso and legs become a loose, ankle-length thobe (modest dress: nothing skin-tight),
//   - arms get loose sleeves, hands and neck keep skin, feet become sandals.
// Every man then shares the same geometry and differs by colour, scale, headwear and animation.
import * as THREE from 'three';

export type Region = 'head' | 'skin' | 'cloth' | 'sandal';

export interface Dressed {
  geometry: THREE.BufferGeometry;   // positions/normals/skin data shared by all men
  region: Uint8Array;               // per vertex: 0 head, 1 skin, 2 cloth, 3 sandal
  clothHeight: Float32Array;        // per vertex: height above the ground (m), for bisht/jacket colouring
  headCentre: THREE.Vector3;        // mesh space
  headRadius: number;
  up: THREE.Vector3; side: THREE.Vector3; fwd: THREE.Vector3;
  shoulderH: number; headH: number; modelHeight: number;
}

const lerp = THREE.MathUtils.lerp;

/** Bone position in the mesh's bind space. */
function bindPos(mesh: THREE.SkinnedMesh, name: string): THREE.Vector3 {
  const i = mesh.skeleton.bones.findIndex((b) => b.name === name);
  if (i < 0) throw new Error(`bone ${name} missing`);
  return new THREE.Vector3().setFromMatrixPosition(mesh.skeleton.boneInverses[i].clone().invert());
}

export function dressBody(mesh: THREE.SkinnedMesh): Dressed {
  const g = mesh.geometry.clone();
  // the file may store positions as quantized integers; edit them as plain floats (the thobe grows past the old range)
  const q = g.attributes.position as THREE.BufferAttribute;
  const f = new Float32Array(q.count * 3);
  for (let i = 0; i < q.count; i++) { f[i * 3] = q.getX(i); f[i * 3 + 1] = q.getY(i); f[i * 3 + 2] = q.getZ(i); }
  // work in the skeleton's bind space (bindMatrix × geometry), where bone positions live; write back afterwards
  const B = mesh.bindMatrix.clone(), Binv = mesh.bindMatrixInverse.clone();
  const tmp = new THREE.Vector3();
  for (let i = 0; i < q.count; i++) { tmp.set(f[i * 3], f[i * 3 + 1], f[i * 3 + 2]).applyMatrix4(B); f[i * 3] = tmp.x; f[i * 3 + 1] = tmp.y; f[i * 3 + 2] = tmp.z; }
  g.setAttribute('position', new THREE.BufferAttribute(f, 3));
  g.deleteAttribute('normal'); g.deleteAttribute('uv');
  const pos = g.attributes.position as THREE.BufferAttribute;
  const si = g.attributes.skinIndex as THREE.BufferAttribute;
  const sw = g.attributes.skinWeight as THREE.BufferAttribute;
  const names = mesh.skeleton.bones.map((b) => b.name);

  const root = bindPos(mesh, 'root'), pelvis = bindPos(mesh, 'pelvis'), head = bindPos(mesh, 'Head');
  const neck = bindPos(mesh, 'neck_01');
  const thighL = bindPos(mesh, 'thigh_l'), thighR = bindPos(mesh, 'thigh_r');
  const clavL = bindPos(mesh, 'clavicle_l'), clavR = bindPos(mesh, 'clavicle_r');
  const arms = (['l', 'r'] as const).map((s) => ({ a: bindPos(mesh, `upperarm_${s}`), b: bindPos(mesh, `hand_${s}`) }));

  const up = head.clone().sub(root).normalize();
  const side = thighL.clone().sub(thighR); side.sub(up.clone().multiplyScalar(side.dot(up))).normalize();
  const fwd = new THREE.Vector3().crossVectors(side, up).normalize();
  const hOf = (v: THREE.Vector3) => v.clone().sub(root).dot(up);

  // dominant bone per vertex
  const n = pos.count; const dom: string[] = new Array(n);
  for (let i = 0; i < n; i++) {
    let best = 0, bi = 0;
    for (let k = 0; k < 4; k++) { const w = sw.getComponent(i, k); if (w > best) { best = w; bi = si.getComponent(i, k); } }
    dom[i] = names[bi] ?? '';
  }
  let modelHeight = 0; const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) modelHeight = Math.max(modelHeight, hOf(v.fromBufferAttribute(pos, i)));
  // the head: centre of the head-weighted vertices, a plain rounded shape around it
  const hc = new THREE.Vector3(); let hn = 0;
  for (let i = 0; i < n; i++) if (dom[i] === 'Head') { hc.add(v.fromBufferAttribute(pos, i)); hn++; }
  hc.divideScalar(Math.max(1, hn));
  const headRadius = modelHeight * 0.062;
  const shoulderH = (hOf(clavL) + hOf(clavR)) / 2;
  const neckH = hOf(neck);
  const H = modelHeight;

  // the thobe: radius across (side) by height, deeper front-to-back ratio 0.78; flares to the hem
  const thobeR = (h: number) => {
    const t = h / H;
    if (t > 0.74) return lerp(0.215, 0.225, (t - 0.74) / 0.06) * H / 1.8;   // chest up to the shoulder line
    if (t > 0.55) return lerp(0.205, 0.215, (t - 0.55) / 0.19) * H / 1.8;    // waist (loose, no belt line)
    if (t > 0.30) return lerp(0.205, 0.19, (t - 0.30) / 0.25) * H / 1.8;    // hips and thighs
    return lerp(0.25, 0.205, t / 0.30) * H / 1.8;                            // flares to the hem
  };
  const hemH = H * 0.045;
  const region = new Uint8Array(n); const clothHeight = new Float32Array(n);
  const axisPt = new THREE.Vector3(), d = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    v.fromBufferAttribute(pos, i); const b = dom[i]; const h = hOf(v);
    clothHeight[i] = h / H;
    if (b === 'Head' || (b === 'neck_01' && h > neckH + (hc.clone().sub(root).dot(up) - neckH) * 0.45)) {
      // smooth rounded head, slightly taller than wide; nothing on it
      d.copy(v).sub(hc);
      const along = d.dot(up); const flat = d.clone().sub(up.clone().multiplyScalar(along));
      const dir = flat.add(up.clone().multiplyScalar(along / 1.12)).normalize();
      const out = dir.clone().multiplyScalar(headRadius); const a2 = out.dot(up);
      v.copy(hc).add(out).add(up.clone().multiplyScalar(a2 * 0.12));
      region[i] = 0;
    } else if (/^(hand_|index_|middle_|pinky_|ring_|thumb_)/.test(b)) {
      region[i] = 1;
    } else if (/^(foot_|ball_)/.test(b)) {
      region[i] = 3;
    } else if (/^(upperarm_|lowerarm_)/.test(b)) {
      // loose sleeve around the bone line from shoulder to wrist; narrower cuff at the wrist
      const arm = arms[b.endsWith('_l') ? 0 : 1];
      const ab = arm.b.clone().sub(arm.a); const L = ab.length(); ab.normalize();
      const t = THREE.MathUtils.clamp(v.clone().sub(arm.a).dot(ab) / L, 0, 1);
      axisPt.copy(arm.a).addScaledVector(ab, t * L);
      d.copy(v).sub(axisPt); const r = d.length();
      const want = (t > 0.93 ? lerp(0.058, 0.046, (t - 0.93) / 0.07) : lerp(0.088, 0.066, t)) * H / 1.8;
      // a loose sleeve is a smooth tube: the arm's shape never shows through
      if (r > 1e-5) v.copy(axisPt).addScaledVector(d.normalize(), want);
      region[i] = 2;
    } else if (b === 'neck_01' && h > shoulderH) {
      region[i] = 1;
    } else if (/^calf_/.test(b) && h < hemH) {
      region[i] = 1; // the ankle shows under the hem
    } else {
      // torso and legs: a loose ankle-length thobe around the body's vertical axis
      axisPt.copy(pelvis).addScaledVector(up, (h - hOf(pelvis)));
      d.copy(v).sub(axisPt); d.sub(up.clone().multiplyScalar(d.dot(up)));
      const r = d.length();
      const isLeg = /^(thigh_|calf_)/.test(b);
      const skirtTop = H * 0.6;
      if (r > 1e-5 && (isLeg || h < skirtTop)) {
        // hips and legs move inside the skirt: pull them in so nothing shows through the cloth
        const R = thobeR(h) * 0.82;
        if (r > R * 0.73) v.copy(axisPt).addScaledVector(d.normalize(), R * 0.73); // well inside: legs never poke through when they swing
      } else if (h < shoulderH - 0.02 * H && r > 1e-5) {
        // chest and waist: a smooth, loose shape; the body underneath never shows
        const R = thobeR(h);
        const cs = d.dot(side) / r, cf = d.dot(fwd) / r;
        const ell = 1 / Math.sqrt((cs * cs) / (R * R) + (cf * cf) / ((R * 0.8) * (R * 0.8)));
        v.copy(axisPt).addScaledVector(d.normalize(), ell);
      }
      region[i] = 2;
    }
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  for (let i = 0; i < n; i++) { v.fromBufferAttribute(pos, i).applyMatrix4(Binv); pos.setXYZ(i, v.x, v.y, v.z); }
  // The thobe below the waist is one closed, flared garment hanging from the hips (the legs move inside it).
  const skirt = buildSkirt({ pelvis, up, side, fwd, H, hPelvis: hOf(pelvis), thobeR, hemH, B: Binv, pelvisI: names.indexOf('pelvis'), thighL: names.indexOf('thigh_l'), thighR: names.indexOf('thigh_r') });
  const nB = n, nS = skirt.position.length / 3;
  const P = new Float32Array((nB + nS) * 3); P.set(pos.array as Float32Array); P.set(skirt.position, nB * 3);
  const SI = new Uint16Array((nB + nS) * 4), SW = new Float32Array((nB + nS) * 4);
  for (let i = 0; i < nB; i++) for (let k = 0; k < 4; k++) { SI[i * 4 + k] = si.getComponent(i, k); SW[i * 4 + k] = sw.getComponent(i, k); }
  SI.set(skirt.skinIndex, nB * 4); SW.set(skirt.skinWeight, nB * 4);
  const bodyIndex = g.index ? Array.from(g.index.array) : [...Array(nB).keys()];
  const I = new Uint32Array(bodyIndex.length + skirt.index.length); I.set(bodyIndex); I.set(skirt.index.map((x) => x + nB), bodyIndex.length);
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(P, 3));
  out.setAttribute('skinIndex', new THREE.BufferAttribute(SI, 4));
  out.setAttribute('skinWeight', new THREE.BufferAttribute(SW, 4));
  out.setIndex(new THREE.BufferAttribute(I, 1));
  const region2 = new Uint8Array(nB + nS); region2.set(region); region2.fill(2, nB);
  const ch2 = new Float32Array(nB + nS); ch2.set(clothHeight); ch2.set(skirt.height, nB);
  out.computeVertexNormals(); out.computeBoundingBox(); out.computeBoundingSphere();
  return { geometry: out, region: region2, clothHeight: ch2, headCentre: hc, headRadius, up, side, fwd, shoulderH, headH: hOf(hc), modelHeight };
}

function buildSkirt(o: { pelvis: THREE.Vector3; up: THREE.Vector3; side: THREE.Vector3; fwd: THREE.Vector3; H: number; hPelvis: number; thobeR: (h: number) => number; hemH: number; B: THREE.Matrix4; pelvisI: number; thighL: number; thighR: number }) {
  const SEG = 36, RINGS = 14;
  const top = o.H * 0.64, bottom = o.hemH;
  const position: number[] = [], skinIndex: number[] = [], skinWeight: number[] = [], height: number[] = [], index: number[] = [];
  const p = new THREE.Vector3();
  for (let j = 0; j <= RINGS; j++) {
    const h = lerp(top, bottom, j / RINGS);
    const R = o.thobeR(h) * 1.03, Rf = R * 0.8;
    const legW = 0.04 + 0.2 * (j / RINGS); // lower = sways a little more with the nearer leg
    for (let k = 0; k < SEG; k++) {
      const a = (k / SEG) * Math.PI * 2;
      const cs = Math.cos(a), cf = Math.sin(a);
      // gentle vertical folds so the cloth catches the raking sun
      const fold = 1 + 0.025 * Math.sin(a * 9) * (j / RINGS);
      p.copy(o.pelvis).addScaledVector(o.up, h - o.hPelvis).addScaledVector(o.side, cs * R * fold).addScaledVector(o.fwd, cf * Rf * fold).applyMatrix4(o.B);
      position.push(p.x, p.y, p.z);
      const near = cs >= 0 ? o.thighL : o.thighR, w = legW * Math.abs(cs);
      skinIndex.push(o.pelvisI, near, 0, 0); skinWeight.push(1 - w, w, 0, 0);
      height.push(h / o.H);
    }
  }
  for (let j = 0; j < RINGS; j++) for (let k = 0; k < SEG; k++) {
    const a = j * SEG + k, b = j * SEG + ((k + 1) % SEG), c = a + SEG, d = b + SEG;
    index.push(a, c, b, b, c, d);
  }
  return { position: new Float32Array(position), skinIndex: new Uint16Array(skinIndex), skinWeight: new Float32Array(skinWeight), height: new Float32Array(height), index: new Uint32Array(index) };
}


const SKIN = new THREE.Color('#b98a66');
const SANDAL = new THREE.Color('#5a3c28');

/** Per-man colours on the shared dressed geometry (positions, normals and skin data are shared, not copied). */
export function colouredGeometry(d: Dressed, opts: { thobe: string; over?: string; overFrom?: number }): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  for (const k of Object.keys(d.geometry.attributes)) g.setAttribute(k, d.geometry.attributes[k]);
  g.setIndex(d.geometry.index);
  const thobe = new THREE.Color(opts.thobe), over = opts.over ? new THREE.Color(opts.over) : null;
  const n = d.region.length; const c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = d.region[i];
    const col = r === 2 ? (over && d.clothHeight[i] > (opts.overFrom ?? 0.08) ? over : thobe) : r === 3 ? SANDAL : SKIN;
    c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  g.boundingSphere = d.geometry.boundingSphere; g.boundingBox = d.geometry.boundingBox;
  return g;
}

/** Headwear in the head bone's own space, so it moves with every turn and nod. Built from the dressed head. */
export function headwearFor(d: Dressed, sk: THREE.SkinnedMesh, garments: string[]): THREE.Mesh[] {
  const hi = sk.skeleton.bones.findIndex((b) => b.name === 'Head');
  const toBone = sk.skeleton.boneInverses[hi].clone(); // headwear is built in bind space, like the bones
  const R = d.headRadius, H = d.modelHeight;
  const yToUp = new THREE.Matrix4().makeBasis(d.side, d.up, d.fwd); // local x→side, y→up, z→forward
  const at = (g: THREE.BufferGeometry, centre: THREE.Vector3) => { g.applyMatrix4(yToUp); g.translate(centre.x, centre.y, centre.z); g.applyMatrix4(toBone); return g; };
  const mat = (c: string, rough = 0.9) => new THREE.MeshStandardMaterial({ color: c, roughness: rough });
  const out: THREE.Mesh[] = [];
  const c0 = d.headCentre.clone();
  if (garments.includes('ghutra')) {
    // Reference: real photos of men in ghutra and agal. The cloth covers the whole head (no opening anywhere),
    // then falls like a cape: longest down the back, over the shoulders, and its two front edges hang down the chest.
    out.push(new THREE.Mesh(at(new THREE.SphereGeometry(R * 1.15, 28, 20), c0.clone().addScaledVector(d.up, R * 0.05)), mat('#f4f1ea')));
    const capeMat = mat('#efebe3'); capeMat.side = THREE.DoubleSide;
    out.push(new THREE.Mesh(capeGeometry(d, toBone), capeMat));
    // agal: a black double ring on top, sitting toward the back and tilted
    for (const k of [0, 1]) {
      const ring = new THREE.TorusGeometry(R * (1.0 - k * 0.04), 0.011 * H / 1.8, 8, 36); ring.rotateX(Math.PI / 2 - 0.22);
      out.push(new THREE.Mesh(at(ring, c0.clone().addScaledVector(d.up, R * (0.62 + k * 0.1)).addScaledVector(d.fwd, -R * 0.12)), mat('#151311', 0.55)));
    }
  } else if (garments.includes('kufi')) {
    out.push(new THREE.Mesh(at(new THREE.CylinderGeometry(R * 0.98, R * 1.02, R * 0.6, 24), c0.clone().addScaledVector(d.up, R * 0.62)), mat('#fbfaf6', 0.85)));
  }
  for (const m of out) { m.castShadow = true; m.receiveShadow = true; }
  return out;
}

/** The ghutra's cape: an open sheet around the head (front 70° left open below the head), longer at the back. */
function capeGeometry(d: Dressed, toBone: THREE.Matrix4): THREE.BufferGeometry {
  const R = d.headRadius, H = d.modelHeight, k = H / 1.8;
  const SEG = 40, RINGS = 12, gap = THREE.MathUtils.degToRad(36);
  const pos: number[] = [], idx: number[] = [];
  const topH = d.headH + R * 0.25;
  const p = new THREE.Vector3();
  for (let j = 0; j <= RINGS; j++) {
    const t = j / RINGS;
    for (let i = 0; i <= SEG; i++) {
      const a = gap + (i / SEG) * (Math.PI * 2 - gap * 2); // 0 = straight ahead
      const back = (1 - Math.cos(a)) / 2;                  // 0 at the front edges, 1 at the back
      const len = R * 1.4 + (0.2 + 0.2 * back) * k;        // front edges to the chest, back to the shoulder blades
      const h = topH - t * len;
      // hugs the head, widens over the shoulders, then hangs straight
      const r = h > d.shoulderH ? THREE.MathUtils.lerp(R * 1.18, 0.205 * k, THREE.MathUtils.smoothstep(topH - h, 0, topH - d.shoulderH)) : 0.215 * k;
      const fold = 1 + 0.03 * Math.sin(a * 7 + t * 2) * t;
      p.copy(d.headCentre).addScaledVector(d.up, h - d.headH)
        .addScaledVector(d.fwd, Math.cos(a) * r * fold).addScaledVector(d.side, Math.sin(a) * r * fold);
      pos.push(p.x, p.y, p.z);
    }
  }
  for (let j = 0; j < RINGS; j++) for (let i = 0; i < SEG; i++) {
    const a = j * (SEG + 1) + i, b = a + 1, c = a + SEG + 1, e = c + 1;
    idx.push(a, c, b, b, c, e);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx);
  g.computeVertexNormals(); g.applyMatrix4(toBone);
  (g as THREE.BufferGeometry & { userData: object }).userData = { doubleSided: true };
  return g;
}
