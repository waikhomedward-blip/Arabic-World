import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Character as Char } from '../core/content';
import { characterParts, type Part } from './characterSpec';

export const PLACES: Record<string, [number, number, number]> = {
  home: [-14, 0, 0], souq: [-4, 0, 0], masjid: [7, 0, 0], cafe: [17, 0, 0], shop: [24, 0, 0],
};

function Shape({ p }: { p: Part }) {
  const geo = useMemo(() => {
    const [x, y, z] = p.size;
    if (p.shape === 'sphere') return new THREE.SphereGeometry(x, 32, 24);
    if (p.shape === 'capsule') return new THREE.CapsuleGeometry(x, y, 6, 12);
    if (p.shape === 'cylinder') return new THREE.CylinderGeometry(x, x, y, 24);
    if (p.shape === 'torus') { const g = new THREE.TorusGeometry(x, y, 8, 28); g.rotateX(Math.PI / 2); return g; }
    const g = new THREE.CylinderGeometry(x * 0.62, x, y, 28, 1); g.scale(1, 1, z / x); return g;
  }, [p]);
  return (
    <mesh geometry={geo} position={p.pos} castShadow>
      <meshStandardMaterial color={p.colour} roughness={0.85} />
    </mesh>
  );
}

function Person({ c, at, speaking, active, onTap }: { c: Char; at: [number, number, number]; speaking: boolean; active: boolean; onTap?: () => void }) {
  const head = useRef<THREE.Group>(null);
  const parts = useMemo(() => characterParts(c), [c]);
  const top = parts.filter((p) => p.slot === 'head' || p.slot === 'headwear');
  const rest = parts.filter((p) => p.slot !== 'head' && p.slot !== 'headwear');
  useFrame(({ clock }) => {
    if (!head.current) return;
    const t = clock.getElapsedTime();
    head.current.position.y = speaking ? Math.abs(Math.sin(t * 6)) * 0.025 : Math.sin(t * 1.3) * 0.004;
    head.current.rotation.x = speaking ? Math.sin(t * 6) * 0.08 : 0;
  });
  return (
    <group position={at} rotation={[0, Math.PI / 10, 0]} onClick={(e) => { e.stopPropagation(); onTap?.(); }}>
      {rest.map((p) => <Shape key={p.name} p={p} />)}
      <group ref={head}>{top.map((p) => <Shape key={p.name} p={p} />)}</group>
      {active && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.38, 0.46, 40]} />
          <meshBasicMaterial color="#ffd38a" transparent opacity={0.85} />
        </mesh>
      )}
    </group>
  );
}

function Building({ x, z, w, h, d, c }: { x: number; z: number; w: number; h: number; d: number; c: string }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={c} roughness={0.95} />
      </mesh>
      {/* rawashin: wooden bay windows of Hijazi houses */}
      {Array.from({ length: Math.max(1, Math.floor(h / 3)) }, (_, i) => (
        <mesh key={i} position={[0, 2.2 + i * 2.8, d / 2 + 0.18]} castShadow>
          <boxGeometry args={[w * 0.45, 1.5, 0.36]} />
          <meshStandardMaterial color="#6b4630" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Minaret({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 7, 0]} castShadow><cylinderGeometry args={[0.7, 0.9, 14, 16]} /><meshStandardMaterial color="#efe3cf" /></mesh>
      <mesh position={[0, 14.2, 0]}><cylinderGeometry args={[1.15, 1.15, 0.4, 16]} /><meshStandardMaterial color="#d8c6a8" /></mesh>
      <mesh position={[0, 15.4, 0]}><cylinderGeometry args={[0.55, 0.6, 2.2, 16]} /><meshStandardMaterial color="#efe3cf" /></mesh>
      <mesh position={[0, 17.2, 0]}><coneGeometry args={[0.6, 1.6, 16]} /><meshStandardMaterial color="#7d8f6a" /></mesh>
      <mesh position={[0, 15.6, 0]}><sphereGeometry args={[0.25, 8, 8]} /><meshBasicMaterial color="#ffe0a3" /></mesh>
    </group>
  );
}

function Lantern({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <group position={[x, y, z]}>
      <mesh><boxGeometry args={[0.22, 0.32, 0.22]} /><meshBasicMaterial color="#ffcf7a" /></mesh>
      <pointLight color="#ffb35c" intensity={3} distance={6} decay={2} />
    </group>
  );
}

function Props() {
  return (
    <group>
      {/* souq stalls */}
      {[-6.5, -3.5, -0.8].map((x, i) => (
        <group key={i} position={[x - 0.6, 0, -1.7]}>
          <mesh position={[0, 0.45, 0]}><boxGeometry args={[1.8, 0.9, 0.9]} /><meshStandardMaterial color="#8a5a3c" /></mesh>
          <mesh position={[0, 2.1, 0.1]} rotation={[-0.25, 0, 0]}><boxGeometry args={[2.1, 0.05, 1.4]} /><meshStandardMaterial color={['#b5543c', '#c99a3b', '#3f6e73'][i]} side={THREE.DoubleSide} /></mesh>
          {i === 0 && [0, 1, 2, 3, 4].map((k) => (
            <mesh key={k} position={[-0.6 + k * 0.3, 1.0, 0]}><sphereGeometry args={[0.11, 12, 10]} /><meshStandardMaterial color="#b3261e" /></mesh>
          ))}
        </group>
      ))}
      {/* masjid courtyard water cooler */}
      <group position={[5.6, 0, -1.6]}>
        <mesh position={[0, 0.6, 0]}><boxGeometry args={[0.8, 1.2, 0.5]} /><meshStandardMaterial color="#cfd6d8" metalness={0.4} roughness={0.4} /></mesh>
      </group>
      {/* café benches */}
      {[15.5, 18.5].map((x) => (
        <mesh key={x} position={[x, 0.25, -1.5]}><boxGeometry args={[1.6, 0.5, 0.6]} /><meshStandardMaterial color="#5d3b28" /></mesh>
      ))}
      {/* home door */}
      <mesh position={[-14, 1.2, -1.4]}><boxGeometry args={[1.3, 2.4, 0.1]} /><meshStandardMaterial color="#4a2f1f" /></mesh>
    </group>
  );
}

function CameraRig({ target }: { target: [number, number, number] }) {
  const { camera, size } = useThree();
  const look = useRef(new THREE.Vector3(...target));
  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 2.2);
    const aspect = size.width / size.height;
    const dist = aspect < 1 ? 6.4 : 6.5;
    const cam = camera as THREE.PerspectiveCamera;
    const fov = aspect < 1 ? 64 : 45;
    if (cam.fov !== fov) { cam.fov = fov; cam.updateProjectionMatrix(); }
    const want = new THREE.Vector3(target[0] + 0.8, aspect < 1 ? 2.2 : 1.9, target[2] + dist);
    camera.position.lerp(want, k);
    look.current.lerp(new THREE.Vector3(target[0] + 0.4, aspect < 1 ? 0.55 : 1.2, target[2]), k);
    camera.lookAt(look.current);
  });
  return null;
}

export interface Placed { c: Char; at: [number, number, number] }

export function World({ place, people, speaker, onTapPerson, activeId }: { place: string; people: Placed[]; speaker: string | null; activeId: string | null; onTapPerson: (id: string) => void }) {
  const target = PLACES[place] ?? PLACES.home;
  const buildings = useMemo(() => {
    const cols = ['#d8b98f', '#e3c9a1', '#cfa77a', '#e8d2ad', '#c99d74'];
    const out: { x: number; z: number; w: number; h: number; d: number; c: string }[] = [];
    for (let i = 0; i < 12; i++) out.push({ x: -20 + i * 4.2, z: -4.5, w: 3.9, h: 6 + ((i * 7) % 5) * 1.6, d: 4, c: cols[i % cols.length] });
    for (let i = 0; i < 10; i++) out.push({ x: -18 + i * 4.8, z: 13, w: 4.4, h: 5 + ((i * 3) % 4) * 1.8, d: 4, c: cols[(i + 2) % cols.length] });
    return out;
  }, []);
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 45, position: [target[0], 2.3, 8] }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#e9a777']} />
      <fog attach="fog" args={['#d99a72', 14, 46]} />
      <hemisphereLight args={['#ffd9b0', '#5a3a2a', 0.9]} />
      <directionalLight position={[-18, 9, 6]} intensity={2.1} color="#ffb070" />
      <ambientLight intensity={0.15} color="#8f7cff" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 40]} />
        <meshStandardMaterial color="#b9946b" roughness={1} />
      </mesh>
      {buildings.map((b, i) => <Building key={i} {...b} />)}
      <Minaret x={8.5} z={-3.6} />
      <Props />
      {[-12, -6, -1, 4, 10, 15, 20].map((x) => <Lantern key={x} x={x} y={2.8} z={-2.4} />)}
      {people.map((p) => (
        <Person key={p.c.id} c={p.c} at={p.at} speaking={speaker === p.c.id} active={activeId === p.c.id} onTap={() => onTapPerson(p.c.id)} />
      ))}
      <CameraRig target={target} />
    </Canvas>
  );
}
