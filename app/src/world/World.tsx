// The world, built to docs/ART_BIBLE.md: one motivated key (the morning sun), sky light, warm bounce,
// AgX once, soft shadows + contact shadows, haze that grows with distance, layered composition with
// foreground dressing, an eye-level camera with slow parallax drift, and men at work in the background.
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, Sky, useGLTF } from '@react-three/drei';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { colouredGeometry, dressBody, headwearFor, type Dressed } from './humanModel';
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import type { Character as Char } from '../core/content';
import { characterParts, EXTRAS, type Part } from './characterSpec';
import { buildQuarter, BACK_FACE_Z } from './quarter';
import { applyWallWear } from './wallShader';
import { installGrade } from './grade';
installGrade();
import { clothTexture, contactTexture, latticeTexture, pavingTexture, plasterTexture, stoneTexture, teakTexture } from './textures';

export const PLACES: Record<string, [number, number, number]> = {
  home: [-14, 0, 0], souq: [-4, 0, 0], square: [7, 0, 0], masjid: [7, 0, 0], cafe: [17, 0, 0], shop: [24, 0, 0],
};

// Morning sun (strict rule: 08:00–11:00). It follows the game clock: low at 08:00, higher by 11:00
// (capped at 45° so shadows stay long and raking; art bible rebuild rules). Azimuth keeps it 30–90° off the
// camera axis, nearly along the lane, so facades rake and thobes get a bright edge (never flat front light).
function minutes(clock: string): number { const [h, m] = clock.split(':').map(Number); return (h || 8) * 60 + (m || 0); }
export function morning(clock: string) {
  const t = Math.min(1, Math.max(0, (minutes(clock) - 480) / 180)); // 0 at 08:00, 1 at 11:00
  const elev = THREE.MathUtils.degToRad(20 + 25 * t);
  const az = THREE.MathUtils.degToRad(10);
  const R = 48;
  const sun = new THREE.Vector3(Math.cos(elev) * Math.cos(az) * R, Math.sin(elev) * R, Math.cos(elev) * Math.sin(az) * R);
  const colour = new THREE.Color('#ffe4c2').lerp(new THREE.Color('#fff3e4'), t);
  const fog = 0.006 - 0.0015 * t; // ~15% haze at 80 m, thinning through the morning
  return { t, sun, colour, fog };
}
const HORIZON = '#d9e3e6';

/** Weak devices get a lighter preset automatically (visuals playbook). */
function lowTier(): boolean {
  const n = navigator as Navigator & { deviceMemory?: number };
  return (n.hardwareConcurrency ?? 8) <= 4 || (n.deviceMemory ?? 8) <= 3;
}

const shared = (() => {
  let cache: ReturnType<typeof make> | null = null;
  function make() {
    const lattice = latticeTexture();
    return {
      plaster: plasterTexture(), stone: stoneTexture(), teak: teakTexture(), paving: pavingTexture(), contact: contactTexture(), lattice,
      cloth: [clothTexture('#2f3f6b', '#d8cdb8'), clothTexture('#c98b2b', '#efe3c8'), clothTexture('#4f6b4a', '#e6dcc6')],
    };
  }
  return () => (cache ??= make());
})();

function Shape({ p }: { p: Part }) {
  const geo = useMemo(() => {
    const [x, y, z] = p.size;
    if (p.shape === 'lathe') return new THREE.LatheGeometry((p.profile ?? []).map(([r, h]) => new THREE.Vector2(r, h)), 32);
    if (p.shape === 'sphere') { const g = new THREE.SphereGeometry(1, 32, 24); g.scale(x, y, z); return g; }
    if (p.shape === 'capsule') return new THREE.CapsuleGeometry(x, y, 6, 14);
    if (p.shape === 'cylinder') return new THREE.CylinderGeometry(x, x, y, 24);
    if (p.shape === 'torus') { const g = new THREE.TorusGeometry(x, y, 8, 28); g.rotateX(Math.PI / 2); return g; }
    const g = new THREE.CylinderGeometry(x * 0.62, x, y, 28, 1); g.scale(1, 1, z / x); return g;
  }, [p]);
  return (
    <mesh geometry={geo} position={p.pos} rotation={p.rot ?? [0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={p.colour} roughness={p.rough ?? 0.75} />
    </mesh>
  );
}

function ContactShadow({ r = 0.55 }: { r?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} userData={{ noRay: true }} renderOrder={1}>
      <planeGeometry args={[r * 2, r * 2]} />
      <meshBasicMaterial map={shared().contact} transparent depthWrite={false} />
    </mesh>
  );
}

/** Speech bubble anchor: just above the head, clamped inside the screen between the HUD and the dialogue panel. */
const bubbleVec = new THREE.Vector3();
function clampBubble(obj: THREE.Object3D, cam: THREE.Camera, size: { width: number; height: number }): [number, number] {
  bubbleVec.setFromMatrixPosition(obj.matrixWorld).project(cam);
  const x = (bubbleVec.x * 0.5 + 0.5) * size.width, y = (-bubbleVec.y * 0.5 + 0.5) * size.height;
  const half = Math.min(170, size.width * 0.42);
  return [Math.min(size.width - half - 8, Math.max(half + 8, x)), Math.min(size.height * 0.6, Math.max(210, y))];
}

const MAN_URL = '/models/man.glb?v=2'; // bump when tools/build-man.mjs output changes
let dressedCache: Dressed | null = null;

/** A real body (skeleton, hands, loose thobe, plain rounded head) with everyday animation. */
function Human({ c, speaking, task, phase }: { c: Char; speaking: boolean; task?: 'sweep' | 'carry' | 'sit' | 'stand'; phase: number }) {
  const gltf = useGLTF(MAN_URL);
  const rig = useMemo(() => {
    if (!dressedCache) {
      let src: THREE.SkinnedMesh | undefined;
      gltf.scene.traverse((o) => { if ((o as THREE.SkinnedMesh).isSkinnedMesh) src = o as THREE.SkinnedMesh; });
      dressedCache = dressBody(src!);
    }
    const d = dressedCache;
    const scene = cloneSkinned(gltf.scene) as THREE.Group;
    let sk: THREE.SkinnedMesh | undefined;
    scene.traverse((o) => { if ((o as THREE.SkinnedMesh).isSkinnedMesh) sk = o as THREE.SkinnedMesh; });
    const g = c.garments;
    sk!.geometry = colouredGeometry(d, g.includes('bisht') ? { thobe: c.colour, over: '#4a3829', overFrom: 0.08 } : g.includes('jacket') ? { thobe: c.colour, over: '#2f3d4f', overFrom: 0.48 } : { thobe: c.colour });
    sk!.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.88 });
    sk!.castShadow = true; sk!.receiveShadow = true; sk!.frustumCulled = false;
    const headBone = scene.getObjectByName('Head')!;
    for (const m of headwearFor(d, sk!, g)) headBone.add(m);
    const mixer = new THREE.AnimationMixer(scene);
    return { scene, mixer, scale: c.height / d.modelHeight };
  }, [gltf, c]);
  const current = useRef<THREE.AnimationAction | null>(null);
  useEffect(() => {
    const name = task === 'sit' ? (speaking ? 'Sitting_Talking_Loop' : 'Sitting_Idle_Loop') : task === 'sweep' ? 'Push_Loop' : speaking ? 'Idle_Talking_Loop' : 'Idle_Loop';
    const clip = gltf.animations.find((a) => a.name === name) ?? gltf.animations.find((a) => a.name === 'Idle_Loop');
    if (!clip) return;
    const next = rig.mixer.clipAction(clip);
    next.reset(); next.time = phase % clip.duration; next.timeScale = 0.9 + (phase % 1) * 0.2; next.play();
    if (current.current && current.current !== next) current.current.crossFadeTo(next, 0.35, false);
    current.current = next;
  }, [rig, speaking, task, gltf, phase]);
  useFrame((_, dt) => rig.mixer.update(Math.min(dt, 0.05)));
  return <primitive object={rig.scene} scale={rig.scale} />;
}

function Person({ c, at, speaking, active, onTap, task, facing = Math.PI / 10, bubble }: { c: Char; at: [number, number, number]; speaking: boolean; active: boolean; onTap?: () => void; task?: 'sweep' | 'carry' | 'sit' | 'stand'; facing?: number; bubble?: ReactNode }) {
  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const parts = useMemo(() => characterParts(c), [c]);
  const top = parts.filter((p) => p.slot === 'head' || p.slot === 'headwear');
  const rest = parts.filter((p) => p.slot !== 'head' && p.slot !== 'headwear');
  const phase = useMemo(() => Math.random() * 10, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phase;
    if (head.current) {
      head.current.position.y = speaking ? Math.abs(Math.sin(t * 6)) * 0.022 : Math.sin(t * 0.35) * 0.004;
      head.current.rotation.x = speaking ? Math.sin(t * 6) * 0.07 : Math.sin(t * 0.21) * 0.03;
      head.current.rotation.y = Math.sin(t * 0.17) * 0.08; // small life: nobody fully still
    }
    if (body.current) {
      const breathe = 1 + Math.sin(t * 1.6) * 0.006;
      body.current.scale.set(breathe, 1, breathe);
      body.current.rotation.z = Math.sin(t * 0.3) * 0.012;
      if (task === 'sweep') body.current.rotation.y = Math.sin(t * 1.4) * 0.35;
    }
  });
  const y = task === 'sit' ? -0.42 : 0;
  return (
    <group position={at} rotation={[0, facing, 0]} userData={c.face === 'none' && c.nameEn ? { charId: c.id } : {}} onClick={(e) => { if (!onTap) return; e.stopPropagation(); onTap(); }}>
      <ContactShadow r={task === 'sit' ? 0.7 : 0.5} />
      {bubble && (
        <Html position={[0, c.height + 0.3, 0]} calculatePosition={clampBubble} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bubble-anchor">{bubble}</div>
        </Html>
      )}
      {task === 'sit' && <mesh position={[0, 0.22, -0.05]} castShadow receiveShadow><boxGeometry args={[1.3, 0.44, 0.5]} /><meshStandardMaterial map={shared().stone} color="#e0d2bb" roughness={0.95} /></mesh>}
      <Suspense fallback={<group ref={body} position={[0, y, 0]}>{rest.map((p) => <Shape key={p.name} p={p} />)}<group ref={head}>{top.map((p) => <Shape key={p.name} p={p} />)}</group></group>}>
        <Human c={c} speaking={speaking} task={task} phase={phase} />
      </Suspense>
      <group position={[0, y, 0]}>
        {task === 'carry' && <mesh position={[0, c.height * 0.62, 0.25]} castShadow><boxGeometry args={[0.5, 0.32, 0.4]} /><meshStandardMaterial map={shared().teak} color="#c9a57a" roughness={0.8} /></mesh>}
        {task === 'sweep' && <mesh position={[0.28, 0.55, 0.25]} rotation={[0.5, 0, 0.2]} castShadow><cylinderGeometry args={[0.015, 0.015, 1.2, 6]} /><meshStandardMaterial color="#9b7b4f" roughness={0.8} /></mesh>}
      </group>
      {active && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} userData={{ noRay: true }}>
          <ringGeometry args={[0.42, 0.5, 48]} />
          <meshBasicMaterial color="#ffd38a" transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  );
}

/** The merged quarter: a handful of draw calls for every house, bay, door and the minaret. */
function Quarter({ shadows }: { shadows: boolean }) {
  const geo = useMemo(() => buildQuarter(17), []);
  const t = shared();
  // Wear is computed in world space inside these materials (wallShader.ts): grime band, worn gandal courses,
  // streaks, macro variation and roughness variation. No extra draw calls.
  const mats = useMemo(() => ({
    // Reference photos: ground floors are plastered like the rest (stone shows only where plaster has gone)
    stone: applyWallWear(new THREE.MeshStandardMaterial({ map: t.plaster, vertexColors: true, roughness: 0.9 }), { grime: 0.6, macro: 0.18, streaks: true, spall: true }),
    plaster: applyWallWear(new THREE.MeshStandardMaterial({ map: t.plaster, vertexColors: true, roughness: 0.88 }), { grime: 0.5, gandal: true, streaks: true, macro: 0.16, spall: true }),
    teak: applyWallWear(new THREE.MeshStandardMaterial({ map: t.teak, vertexColors: true, roughness: 0.72 }), { grime: 0.15, macro: 0.08, roughVar: 0.08 }),
  }), [t]);
  return (
    <group>
      <mesh geometry={geo.stone} material={mats.stone} castShadow={shadows} receiveShadow />
      <mesh geometry={geo.plaster} material={mats.plaster} castShadow={shadows} receiveShadow />
      <mesh geometry={geo.teak} material={mats.teak} castShadow={shadows} receiveShadow />
      {/* lattice screens cast patterned sun onto walls and lane (art bible Tier 1: dappled shade) */}
      <mesh geometry={geo.lattice} castShadow={shadows} receiveShadow><meshStandardMaterial map={t.lattice.map} alphaMap={t.lattice.alpha} alphaTest={0.5} vertexColors roughness={0.7} side={THREE.DoubleSide} /></mesh>
      <mesh geometry={geo.dark}><meshStandardMaterial color="#0e0a07" roughness={1} /></mesh>
      {/* street clutter: AC units, cables, shutter boxes (one draw call) */}
      <mesh geometry={geo.metal} castShadow={shadows} receiveShadow><meshStandardMaterial vertexColors roughness={0.55} /></mesh>
    </group>
  );
}

function Stall({ x, z, cloth, goods }: { x: number; z: number; cloth: number; goods: 'fruit' | 'sacks' | 'pots' }) {
  const t = shared();
  const R = useMemo(() => { let s = Math.floor(x * 97 + 13); return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32); }, [x]);
  const items = useMemo(() => Array.from({ length: goods === 'fruit' ? 14 : 5 }, () => [R(), R(), R()]), [goods, R]);
  return (
    <group position={[x, 0, z]} rotation={[0, (R() - 0.5) * 0.06, 0]}>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow><boxGeometry args={[1.9, 0.84, 0.85]} /><meshStandardMaterial map={t.teak} color="#b8916a" roughness={0.75} /></mesh>
      {[-0.95, 0.95].map((px) => <mesh key={px} position={[px, 1.25, 0.55]} castShadow><cylinderGeometry args={[0.03, 0.03, 2.5, 6]} /><meshStandardMaterial color="#5a3d28" roughness={0.7} /></mesh>)}
      <mesh position={[0, 2.38, 0.2]} rotation={[-1.2, 0, 0]} castShadow receiveShadow><planeGeometry args={[2.3, 1.3]} /><meshStandardMaterial map={t.cloth[cloth]} roughness={0.95} side={THREE.DoubleSide} /></mesh>
      {goods === 'fruit' && items.map(([a, b, c], i) => (
        <mesh key={i} position={[-0.75 + a * 1.5, 0.92 + c * 0.06, -0.25 + b * 0.5]} castShadow><sphereGeometry args={[0.08, 12, 10]} /><meshStandardMaterial color={c > 0.5 ? '#a8261c' : '#c7a03a'} roughness={0.45} /></mesh>
      ))}
      {goods === 'sacks' && items.map(([a, b], i) => (
        <mesh key={i} position={[-0.7 + i * 0.35, 1.0, -0.1 + b * 0.2]} castShadow><cylinderGeometry args={[0.15, 0.17, 0.32, 12]} /><meshStandardMaterial color={['#c9a467', '#a8643a', '#d8c08a', '#7d5a36', '#c8b080'][i]} roughness={0.95} /></mesh>
      ))}
      {goods === 'pots' && items.map(([a], i) => (
        <mesh key={i} position={[-0.6 + i * 0.3, 0.98, 0]} castShadow><cylinderGeometry args={[0.07, 0.11, 0.26, 14]} /><meshStandardMaterial color="#b08d57" metalness={1} roughness={0.32 + a * 0.15} /></mesh>
      ))}
    </group>
  );
}

function Crates({ x, z, n = 3 }: { x: number; z: number; n?: number }) {
  const t = shared();
  return (
    <group position={[x, 0, z]}>
      {Array.from({ length: n }, (_, i) => (
        <mesh key={i} position={[(i % 2) * 0.55 - 0.25, 0.22 + Math.floor(i / 2) * 0.44, (i % 2) * 0.08]} rotation={[0, i * 0.17, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.44, 0.45]} /><meshStandardMaterial map={t.teak} color="#c8a57c" roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function Props() {
  const t = shared();
  const { size } = useThree();
  const portrait = size.width < size.height; // the camera differs by screen shape, so does the foreground dressing
  // the square's disc (UV 0–1 over 9.2 m) gets its own repeat so its stones match the lane's (2.5 m per texture tile)
  const squarePaving = useMemo(() => { const p = t.paving.clone(); p.repeat.set(9.2 / 2.5, 9.2 / 2.5); p.needsUpdate = true; return p; }, [t]);
  return (
    <group>
      {/* souq: three stalls against the facade, cloth awnings (indigo, saffron, green accents) */}
      <Stall x={-6.4} z={BACK_FACE_Z + 0.65} cloth={0} goods="fruit" />
      <Stall x={-1.6} z={BACK_FACE_Z + 0.65} cloth={1} goods="sacks" />
      <Stall x={22.6} z={BACK_FACE_Z + 0.65} cloth={2} goods="pots" />
      {/* square: paving, the drinking fountain (water for everyone) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7, 0.004, 1.8]} receiveShadow><circleGeometry args={[4.6, 48]} /><meshStandardMaterial map={squarePaving} color="#efe6d8" roughness={0.9} /></mesh>
      <group position={[5.0, 0, -0.9]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow><cylinderGeometry args={[0.8, 0.9, 0.7, 24]} /><meshStandardMaterial map={t.stone} color="#efe4d2" roughness={0.9} /></mesh>
        <mesh position={[0, 0.705, 0]}><cylinderGeometry args={[0.68, 0.68, 0.02, 24]} /><meshStandardMaterial color="#5f8f9f" metalness={0} roughness={0.05} /></mesh>
        <mesh position={[0, 1.1, 0]} castShadow><cylinderGeometry args={[0.07, 0.1, 0.8, 12]} /><meshStandardMaterial color="#b08d57" metalness={1} roughness={0.3} /></mesh>
        <ContactShadow r={1.2} />
      </group>
      {/* café: low tables and stools, tea glasses */}
      {[15.6, 18.4].map((x, i) => (
        <group key={x} position={[x, 0, BACK_FACE_Z + 1.1 + i * 0.2]}>
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow><cylinderGeometry args={[0.42, 0.42, 0.04, 20]} /><meshStandardMaterial map={t.teak} color="#a77b55" roughness={0.6} /></mesh>
          <mesh position={[0, 0.22, 0]} castShadow><cylinderGeometry args={[0.04, 0.06, 0.44, 8]} /><meshStandardMaterial color="#3d2a1c" roughness={0.6} /></mesh>
          <mesh position={[0.12, 0.51, 0.05]}><cylinderGeometry args={[0.03, 0.025, 0.08, 10]} /><meshStandardMaterial color="#c97f3a" transparent opacity={0.85} roughness={0.1} /></mesh>
          {[-0.65, 0.65].map((sx) => <mesh key={sx} position={[sx, 0.22, 0.1]} castShadow receiveShadow><cylinderGeometry args={[0.2, 0.18, 0.44, 12]} /><meshStandardMaterial map={t.teak} color="#8a6444" roughness={0.75} /></mesh>)}
          <ContactShadow r={0.9} />
        </group>
      ))}
      {/* home: stone bench and plant tins by the door; shop: crates */}
      <mesh position={[-16.2, 0.22, BACK_FACE_Z + 0.35]} castShadow receiveShadow><boxGeometry args={[1.6, 0.44, 0.5]} /><meshStandardMaterial map={t.stone} color="#e6d9c3" roughness={0.95} /></mesh>
      {[-12.3, -11.8].map((x, i) => <mesh key={x} position={[x, 0.2, BACK_FACE_Z + 0.3]} castShadow><cylinderGeometry args={[0.16, 0.14, 0.4, 12]} /><meshStandardMaterial color={i ? '#9a8f80' : '#7f8f9a'} metalness={1} roughness={0.5} /></mesh>)}
      {[-12.3, -11.8].map((x) => <mesh key={x + 'p'} position={[x, 0.55, BACK_FACE_Z + 0.3]} castShadow><sphereGeometry args={[0.24, 10, 8]} /><meshStandardMaterial color="#4f6b3a" roughness={0.9} /></mesh>)}
      <Crates x={25.6} z={BACK_FACE_Z + 0.5} n={4} />
      {/* foreground dressing just off the sight line of every place: layers + partial occlusion (art bible Tier 1) */}
      {Object.entries(PLACES).filter(([k]) => k !== 'masjid').map(([k, [px]]) => (
        <group key={k} position={portrait ? [px + 3.05, 0, 3.0] : [px + 4.6, 0, 1.7]}>
          <mesh position={[0, 1.6, 0]} castShadow><cylinderGeometry args={[0.055, 0.065, 3.2, 8]} /><meshStandardMaterial map={t.teak} color="#6b4a32" roughness={0.75} /></mesh>
          {/* lantern (off in the morning): dark iron corner posts, pale glass panes, a small cap */}
          <mesh position={[-0.28, 2.55, 0]} castShadow><boxGeometry args={[0.17, 0.28, 0.17]} /><meshStandardMaterial color="#26221e" roughness={0.6} /></mesh>
          <mesh position={[-0.28, 2.55, 0]}><boxGeometry args={[0.135, 0.22, 0.18]} /><meshStandardMaterial color="#d9d6cc" roughness={0.15} /></mesh>
          <mesh position={[-0.28, 2.55, 0]}><boxGeometry args={[0.18, 0.22, 0.135]} /><meshStandardMaterial color="#d9d6cc" roughness={0.15} /></mesh>
          <mesh position={[-0.28, 2.74, 0]} castShadow><coneGeometry args={[0.14, 0.12, 4]} /><meshStandardMaterial color="#26221e" roughness={0.6} /></mesh>
          <Crates x={0.35} z={0.25} n={k === 'cafe' || k === 'home' ? 3 : 2} />
        </group>
      ))}
    </group>
  );
}

/** Sky light strength: enough to fill shade, low enough to keep contrast (art bible: commit to contrast). */
function EnvIntensity({ v }: { v: number }) {
  const { scene } = useThree();
  useEffect(() => { (scene as THREE.Scene & { environmentIntensity: number }).environmentIntensity = v; }, [scene, v]);
  return null;
}

function Ground() {
  const t = shared();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0, 2]} receiveShadow>
      <planeGeometry args={[120, 40]} />
      <meshStandardMaterial map={t.paving} color="#f6dcbc" roughness={0.92} />
    </mesh>
  );
}

/** Sun with a shadow camera that follows the action (shadow map only where the player looks). */
function SunLight({ target, shadows, sun, colour }: { target: [number, number, number]; shadows: boolean; sun: THREE.Vector3; colour: THREE.Color }) {
  const light = useRef<THREE.DirectionalLight>(null);
  useFrame(() => {
    const l = light.current; if (!l) return;
    l.position.set(target[0] + sun.x, sun.y, target[2] + sun.z);
    l.target.position.set(target[0], 0, target[2]); l.target.updateMatrixWorld();
  });
  return (
    <directionalLight ref={light} intensity={7} color={colour} castShadow={shadows}
      shadow-mapSize={[1536, 1536]} shadow-bias={-0.0004} shadow-normalBias={0.03}
      shadow-camera-left={-16} shadow-camera-right={16} shadow-camera-top={16} shadow-camera-bottom={-16} shadow-camera-near={1} shadow-camera-far={90} />
  );
}

/** ~200 dust motes drifting in the sunlit air near the action: one draw call, never in front of faces (there are none). */
function DustMotes({ target }: { target: [number, number, number] }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry(); const n = 200; const p = new Float32Array(n * 3); let s = 17;
    const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
    for (let i = 0; i < n; i++) { p[i * 3] = (r() - 0.5) * 14; p[i * 3 + 1] = 0.3 + r() * 4.5; p[i * 3 + 2] = -1 + r() * 6; }
    g.setAttribute('position', new THREE.BufferAttribute(p, 3)); return g;
  }, []);
  useFrame(({ clock }) => {
    const pts = ref.current; if (!pts) return;
    const t = clock.getElapsedTime();
    pts.position.set(target[0] + Math.sin(t * 0.05) * 0.6, Math.sin(t * 0.07) * 0.15, target[2]);
  });
  return (
    <points ref={ref} geometry={geo} userData={{ noRay: true }}>
      <pointsMaterial size={0.018} color="#fff1d6" transparent opacity={0.55} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/**
 * Eye-level camera (1.55 m), level horizon, looking diagonally along the lane (leading lines, sky over the far roofs).
 * Portrait phones: the frame is shifted (view offset) so the horizon sits at ~45% from the top, keeping people
 * above the dialogue panel without tilting the camera down. A slow lateral drift gives motion parallax.
 */
function CameraRig({ target }: { target: [number, number, number] }) {
  const { camera, size } = useThree();
  const pos = useRef(new THREE.Vector3(target[0] + 3, 1.55, target[2] + 4.2));
  const look = useRef(new THREE.Vector3(...target));
  useFrame(({ clock }, dt) => {
    const cam = camera as THREE.PerspectiveCamera;
    const portrait = size.width < size.height;
    const t = clock.getElapsedTime();
    // Handheld feel: slow lateral drift (parallax) + tiny multi-octave sway (0.1–0.5 Hz, ~0.15°). Off when the
    // player asks the system for reduced motion ("still camera").
    const still = STILL;
    const drift = still ? 0 : Math.sin(t * 0.09) * 0.35;
    const swayX = still ? 0 : (Math.sin(t * 0.63) * 0.6 + Math.sin(t * 1.7 + 1.3) * 0.3 + Math.sin(t * 2.9 + 0.4) * 0.1) * 0.022;
    const swayY = still ? 0 : (Math.sin(t * 0.81 + 2.1) * 0.6 + Math.sin(t * 2.3) * 0.4) * 0.012;
    const k = 1 - Math.exp(-dt * 2.2);
    // Narrower lens than before (portrait 54° visible, landscape 44°): the camera steps back along the lane
    // instead of widening, staying in front of the opposite houses (z ≤ 5.4).
    const want = portrait
      ? new THREE.Vector3(target[0] + 4.4 + drift, 1.55, target[2] + 5.2)
      : new THREE.Vector3(target[0] + 5.4 + drift, 1.6, target[2] + 5.4);
    pos.current.lerp(want, k);
    look.current.lerp(new THREE.Vector3(target[0] - 2.0, 1.55, target[2] - 0.8), k); // down the lane: leading lines, sky over far roofs
    cam.position.copy(pos.current);
    cam.lookAt(look.current.x + swayX, cam.position.y + swayY, look.current.z); // level: vertical lines stay vertical
    const visibleFov = portrait ? 54 : 44;
    const horizonFromTop = portrait ? 0.45 : 0.5;
    const fullH = size.height * 2;
    cam.fov = (2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(visibleFov / 2)) * 2) * 180) / Math.PI;
    cam.aspect = size.width / fullH;
    cam.setViewOffset(size.width, fullH, 0, size.height - horizonFromTop * size.height, size.width, size.height);
    cam.updateProjectionMatrix();
  });
  return null;
}

const STILL = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const LAB = typeof location !== 'undefined' && new URLSearchParams(location.search).has('lab');

/** Lab-only probe (?lab=1): visibility of each character from the camera, screen position, frame times, draw stats. */
function LabProbe() {
  const { camera, scene, gl, size } = useThree();
  const frames = useRef<number[]>([]);
  useFrame(() => { frames.current.push(performance.now()); if (frames.current.length > 2000) frames.current.splice(0, 1000); });
  useEffect(() => {
    if (!LAB) return;
    const ray = new THREE.Raycaster();
    (window as unknown as { __awProbe: unknown }).__awProbe = {
      visibility: () => {
        camera.updateMatrixWorld();
        const out: Record<string, { visible: boolean; blockedBy: string | null; screen: { x: number; y: number }; inFrame: boolean }> = {};
        scene.traverse((o) => {
          const id = o.userData.charId as string | undefined;
          if (!id) return;
          const box = new THREE.Box3().setFromObject(o);
          const c = box.getCenter(new THREE.Vector3());
          const head = new THREE.Vector3(c.x, box.max.y - 0.12, c.z);
          const checks = [head, c].map((pt) => {
            const dir = pt.clone().sub(camera.position); const dist = dir.length();
            ray.set(camera.position, dir.normalize()); ray.far = dist;
            const hit = ray.intersectObjects(scene.children, true).find((h) => !h.object.userData.noRay);
            let owner: THREE.Object3D | null = hit?.object ?? null; let mine = false;
            while (owner) { if (owner === o) { mine = true; break; } owner = owner.parent; }
            return { clear: !hit || mine, by: hit && !mine ? (hit.object.name || hit.object.type) : null };
          });
          const ndc = head.clone().project(camera);
          out[id] = {
            visible: checks.some((k) => k.clear),
            blockedBy: checks.every((k) => !k.clear) ? checks[0].by : null,
            screen: { x: (ndc.x + 1) / 2 * size.width, y: (1 - ndc.y) / 2 * size.height },
            inFrame: Math.abs(ndc.x) <= 1 && Math.abs(ndc.y) <= 1 && ndc.z < 1,
          };
        });
        return out;
      },
      frames: () => frames.current.slice(),
      stats: () => ({ calls: gl.info.render.calls, triangles: gl.info.render.triangles, textures: gl.info.memory.textures, geometries: gl.info.memory.geometries }),
    };
  }, [camera, scene, gl, size]);
  return null;
}

export interface Placed { c: Char; at: [number, number, number] }

export function World({ place, people, speaker, onTapPerson, activeId, clock = '08:30', bubble }: { place: string; people: Placed[]; speaker: string | null; activeId: string | null; onTapPerson: (id: string) => void; clock?: string; bubble?: { for: string; node: ReactNode } | null }) {
  const target = PLACES[place] ?? PLACES.home;
  const m = useMemo(() => morning(clock), [clock]);
  const low = useMemo(lowTier, []);
  const shadows = !low;
  // Phones can drop the WebGL context under memory pressure: pause calmly and rebuild the view on tap.
  const [lost, setLost] = useState(false);
  const [gen, setGen] = useState(0);
  if (lost) return (
    <div className="gl-lost" onClick={() => { setLost(false); setGen((g) => g + 1); }}>
      <p>The view paused to save memory.</p><p className="small">Tap to continue</p>
    </div>
  );
  return (
    <Canvas key={gen} shadows={shadows ? { type: THREE.PCFSoftShadowMap } : false} dpr={low ? [1, 1] : [1, 1.5]}
      camera={{ fov: 60, position: [target[0] + 3, 1.55, 4.6], near: 0.1, far: 400 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.AgXToneMapping; // tone-map once (art bible)
        gl.toneMappingExposure = 1.18;
        gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); setLost(true); });
      }}>
      {/* Morning only (strict rule: 08:00–11:00): physical sky, sky light on every surface, warm bounce from sand and plaster */}
      <Sky sunPosition={m.sun.toArray()} turbidity={7} rayleigh={1.4} mieCoefficient={0.006} mieDirectionalG={0.82} distance={1000} />
      <Environment key={clock} frames={1} resolution={64}><Sky sunPosition={m.sun.toArray()} turbidity={7} rayleigh={1.4} mieCoefficient={0.006} mieDirectionalG={0.82} distance={1000} /></Environment>
      <fogExp2 attach="fog" args={[HORIZON, m.fog]} />
      {/* cool sky above, warm bounce from sand and coral below; kept well under the sun (sun:fill ~4–6:1) */}
      <hemisphereLight args={['#bfd8ff', '#c89a6a', 0.3]} />
      <EnvIntensity v={0.45} />
      <SunLight target={target} shadows={shadows} sun={m.sun} colour={m.colour} />
      <DustMotes target={target} />
      <Ground />
      <Quarter shadows={shadows} />
      <Props />
      {EXTRAS.map((e) => <Person key={e.id} c={e} at={e.at} speaking={false} active={false} task={e.task} facing={e.task === 'carry' ? -Math.PI / 2 : Math.PI / 8} />)}
      {people.map((p) => (
        <Person key={p.c.id} c={p.c} at={p.at} speaking={speaker === p.c.id} active={activeId === p.c.id} onTap={() => onTapPerson(p.c.id)} facing={Math.PI / 5} bubble={bubble?.for === p.c.id ? bubble.node : undefined} />
      ))}
      <CameraRig target={target} />
      {LAB && <LabProbe />}
    </Canvas>
  );
}
