// The world, built to docs/ART_BIBLE.md: one motivated key (the morning sun), sky light, warm bounce,
// AgX once, soft shadows + contact shadows, haze that grows with distance, layered composition with
// foreground dressing, an eye-level camera with slow parallax drift, and men at work in the background.
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Sky } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Character as Char } from '../core/content';
import { characterParts, EXTRAS, type Part } from './characterSpec';
import { buildQuarter, BACK_FACE_Z } from './quarter';
import { clothTexture, contactTexture, latticeTexture, pavingTexture, plasterTexture, stoneTexture, teakTexture } from './textures';

export const PLACES: Record<string, [number, number, number]> = {
  home: [-14, 0, 0], souq: [-4, 0, 0], square: [7, 0, 0], masjid: [7, 0, 0], cafe: [17, 0, 0], shop: [24, 0, 0],
};

// Morning sun from the east-south-east, ~29° up (strict rule: 08:00–11:00)
const SUN = new THREE.Vector3(36, 21, 24); // low and from the east: rakes along the facades so bays, doors and people cast shadows
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

function Person({ c, at, speaking, active, onTap, task, facing = Math.PI / 10 }: { c: Char; at: [number, number, number]; speaking: boolean; active: boolean; onTap?: () => void; task?: 'sweep' | 'carry' | 'sit' | 'stand'; facing?: number }) {
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
      {task === 'sit' && <mesh position={[0, 0.22, -0.05]} castShadow receiveShadow><boxGeometry args={[1.3, 0.44, 0.5]} /><meshStandardMaterial map={shared().stone} color="#e0d2bb" roughness={0.95} /></mesh>}
      <group ref={body} position={[0, y, 0]}>
        {rest.map((p) => <Shape key={p.name} p={p} />)}
        <group ref={head}>{top.map((p) => <Shape key={p.name} p={p} />)}</group>
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
  return (
    <group>
      <mesh geometry={geo.stone} castShadow={shadows} receiveShadow><meshStandardMaterial map={t.stone} vertexColors roughness={0.93} /></mesh>
      <mesh geometry={geo.plaster} castShadow={shadows} receiveShadow><meshStandardMaterial map={t.plaster} vertexColors roughness={0.9} /></mesh>
      <mesh geometry={geo.teak} castShadow={shadows} receiveShadow><meshStandardMaterial map={t.teak} vertexColors roughness={0.68} /></mesh>
      <mesh geometry={geo.lattice} receiveShadow><meshStandardMaterial map={t.lattice.map} alphaMap={t.lattice.alpha} alphaTest={0.5} vertexColors roughness={0.7} side={THREE.DoubleSide} /></mesh>
      <mesh geometry={geo.dark}><meshStandardMaterial color="#20160f" roughness={1} /></mesh>
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
  return (
    <group>
      {/* souq: three stalls against the facade, cloth awnings (indigo, saffron, green accents) */}
      <Stall x={-6.4} z={BACK_FACE_Z + 0.65} cloth={0} goods="fruit" />
      <Stall x={-1.6} z={BACK_FACE_Z + 0.65} cloth={1} goods="sacks" />
      <Stall x={22.6} z={BACK_FACE_Z + 0.65} cloth={2} goods="pots" />
      {/* square: paving, the drinking fountain (water for everyone) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7, 0.004, 1.8]} receiveShadow><circleGeometry args={[4.6, 48]} /><meshStandardMaterial map={t.paving} color="#efe6d8" roughness={0.9} /></mesh>
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
      {[-12.3, -11.8].map((x, i) => <mesh key={x} position={[x, 0.2, BACK_FACE_Z + 0.3]} castShadow><cylinderGeometry args={[0.16, 0.14, 0.4, 12]} /><meshStandardMaterial color={i ? '#9a8f80' : '#7f8f9a'} metalness={0.6} roughness={0.5} /></mesh>)}
      {[-12.3, -11.8].map((x) => <mesh key={x + 'p'} position={[x, 0.55, BACK_FACE_Z + 0.3]} castShadow><sphereGeometry args={[0.24, 10, 8]} /><meshStandardMaterial color="#4f6b3a" roughness={0.9} /></mesh>)}
      <Crates x={25.6} z={BACK_FACE_Z + 0.5} n={4} />
      {/* foreground dressing just off the sight line of every place: layers + partial occlusion (art bible Tier 1) */}
      {Object.entries(PLACES).filter(([k]) => k !== 'masjid').map(([k, [px]]) => (
        <group key={k} position={[px + 2.1, 0, 3.0]}>
          <mesh position={[0, 1.6, 0]} castShadow><cylinderGeometry args={[0.055, 0.065, 3.2, 8]} /><meshStandardMaterial map={t.teak} color="#6b4a32" roughness={0.75} /></mesh>
          <mesh position={[-0.28, 2.55, 0]} castShadow><boxGeometry args={[0.2, 0.3, 0.2]} /><meshStandardMaterial color="#8c6a3c" metalness={0.6} roughness={0.45} /></mesh>
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
function SunLight({ target, shadows }: { target: [number, number, number]; shadows: boolean }) {
  const light = useRef<THREE.DirectionalLight>(null);
  useFrame(() => {
    const l = light.current; if (!l) return;
    l.position.set(target[0] + SUN.x, SUN.y, target[2] + SUN.z);
    l.target.position.set(target[0], 0, target[2]); l.target.updateMatrixWorld();
  });
  return (
    <directionalLight ref={light} intensity={4.6} color="#ffe2b8" castShadow={shadows}
      shadow-mapSize={[1536, 1536]} shadow-bias={-0.0004} shadow-normalBias={0.03}
      shadow-camera-left={-16} shadow-camera-right={16} shadow-camera-top={16} shadow-camera-bottom={-16} shadow-camera-near={1} shadow-camera-far={90} />
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
    const drift = Math.sin(t * 0.09) * 0.35;
    const k = 1 - Math.exp(-dt * 2.2);
    const want = portrait
      ? new THREE.Vector3(target[0] + 1.2 + drift, 1.55, target[2] + 5.0)
      : new THREE.Vector3(target[0] + 3.4 + drift, 1.6, target[2] + 5.6);
    pos.current.lerp(want, k);
    look.current.lerp(new THREE.Vector3(target[0] - 2.0, 1.55, target[2] - 0.8), k); // down the lane: leading lines, sky over far roofs
    cam.position.copy(pos.current);
    cam.lookAt(look.current.x, cam.position.y, look.current.z); // level: vertical lines stay vertical
    const visibleFov = portrait ? 68 : 50;
    const horizonFromTop = portrait ? 0.45 : 0.5;
    const fullH = size.height * 2;
    cam.fov = (2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(visibleFov / 2)) * 2) * 180) / Math.PI;
    cam.aspect = size.width / fullH;
    cam.setViewOffset(size.width, fullH, 0, size.height - horizonFromTop * size.height, size.width, size.height);
    cam.updateProjectionMatrix();
  });
  return null;
}

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

export function World({ place, people, speaker, onTapPerson, activeId }: { place: string; people: Placed[]; speaker: string | null; activeId: string | null; onTapPerson: (id: string) => void }) {
  const target = PLACES[place] ?? PLACES.home;
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
        gl.toneMappingExposure = 0.82;
        gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); setLost(true); });
      }}>
      {/* Morning only (strict rule: 08:00–11:00): physical sky, sky light on every surface, warm bounce from sand and plaster */}
      <Sky sunPosition={SUN.toArray()} turbidity={7} rayleigh={1.4} mieCoefficient={0.006} mieDirectionalG={0.82} distance={1000} />
      <Environment frames={1} resolution={64}><Sky sunPosition={SUN.toArray()} turbidity={7} rayleigh={1.4} mieCoefficient={0.006} mieDirectionalG={0.82} distance={1000} /></Environment>
      <fogExp2 attach="fog" args={[HORIZON, 0.011]} />
      <hemisphereLight args={['#cfe0ff', '#c79a6a', 0.22]} />
      <EnvIntensity v={0.42} />
      <SunLight target={target} shadows={shadows} />
      <Ground />
      <Quarter shadows={shadows} />
      <Props />
      {EXTRAS.map((e) => <Person key={e.id} c={e} at={e.at} speaking={false} active={false} task={e.task} facing={e.task === 'carry' ? -Math.PI / 2 : Math.PI / 8} />)}
      {people.map((p) => (
        <Person key={p.c.id} c={p.c} at={p.at} speaking={speaker === p.c.id} active={activeId === p.c.id} onTap={() => onTapPerson(p.c.id)} facing={Math.PI / 5} />
      ))}
      <CameraRig target={target} />
      {LAB && <LabProbe />}
    </Canvas>
  );
}
