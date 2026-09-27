'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { GLOBE_CENTER_X } from './planet-layout';

export type PlanetControls = {
  paused: boolean;
  reduced: boolean;
  dragging: boolean;
  dragDx: number;
  dragDy: number;
  lastInteraction: number;
};

const AUTO_SPIN = 0.3;
const SEA = 0.04;

// Value noise 3D yang deterministik: planet selalu sama di setiap kunjungan.
function hash(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz);
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), u), lerp(c(0, 1, 0), c(1, 1, 0), u), v),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), u), lerp(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  ) * 2 - 1;
}
function elevation(d: THREE.Vector3) {
  let e = 0, amp = 0.6, f = 1.7;
  for (let i = 0; i < 4; i++) {
    e += noise(d.x * f + 11.3, d.y * f + 4.1, d.z * f - 7.7) * amp;
    amp *= 0.5;
    f *= 2.1;
  }
  return e;
}
function radiusAt(e: number) {
  return e < SEA ? 1 : 1 + (e - SEA) * 0.22 + Math.max(0, e - 0.34) * 0.35;
}

const PALETTE = {
  deep: new THREE.Color('#2f78c4'),
  shallow: new THREE.Color('#4fa6e0'),
  sand: new THREE.Color('#e9dca4'),
  grass: new THREE.Color('#6f9e3c'),
  forest: new THREE.Color('#4f7d2e'),
  rock: new THREE.Color('#a39a88'),
  snow: new THREE.Color('#f5f3ee'),
};

function landColor(e: number, out: THREE.Color) {
  if (e < SEA - 0.12) return out.copy(PALETTE.deep);
  if (e < SEA) return out.copy(PALETTE.shallow);
  if (e < SEA + 0.03) return out.copy(PALETTE.sand);
  if (e < 0.2) return out.copy(PALETTE.grass);
  if (e < 0.32) return out.copy(PALETTE.forest);
  if (e < 0.42) return out.copy(PALETTE.rock);
  return out.copy(PALETTE.snow);
}

function buildPlanet() {
  const geo = new THREE.IcosahedronGeometry(1, 28);
  const pos = geo.attributes.position;
  const elev = new Float32Array(pos.count);
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    elev[i] = elevation(v);
    v.multiplyScalar(radiusAt(elev[i]));
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  // Satu warna per segitiga supaya tampilannya low-poly.
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i += 3) {
    landColor((elev[i] + elev[i + 1] + elev[i + 2]) / 3, c);
    for (let k = 0; k < 3; k++) c.toArray(colors, (i + k) * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function randomDir(rand: () => number, out: THREE.Vector3) {
  const z = rand() * 2 - 1, t = rand() * Math.PI * 2, r = Math.sqrt(1 - z * z);
  return out.set(r * Math.cos(t), z, r * Math.sin(t));
}

function Trees() {
  const cones = useRef<THREE.InstancedMesh>(null);
  const blobs = useRef<THREE.InstancedMesh>(null);
  const COUNT = 160;
  useEffect(() => {
    const rand = seeded(7);
    const d = new THREE.Vector3(), m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    let a = 0, b = 0;
    for (let tries = 0; tries < 4000 && (a < COUNT || b < COUNT); tries++) {
      randomDir(rand, d);
      const e = elevation(d);
      if (e < SEA + 0.04 || e > 0.3) continue;
      const k = 0.7 + rand() * 0.6;
      q.setFromUnitVectors(up, d);
      const conifer = e > 0.18;
      const mesh = conifer ? cones.current : blobs.current;
      if (!mesh || (conifer ? a : b) >= COUNT) continue;
      d.multiplyScalar(radiusAt(e) + (conifer ? 0.02 : 0.018) * k);
      m.compose(d, q, s.set(k, k, k));
      mesh.setMatrixAt(conifer ? a++ : b++, m);
    }
    if (cones.current) {
      cones.current.count = a;
      cones.current.instanceMatrix.needsUpdate = true;
    }
    if (blobs.current) {
      blobs.current.count = b;
      blobs.current.instanceMatrix.needsUpdate = true;
    }
  }, []);
  return (
    <>
      <instancedMesh ref={cones} args={[undefined, undefined, COUNT]}>
        <coneGeometry args={[0.018, 0.05, 5]} />
        <meshStandardMaterial color="#3d6b2a" flatShading roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={blobs} args={[undefined, undefined, COUNT]}>
        <icosahedronGeometry args={[0.02, 0]} />
        <meshStandardMaterial color="#5c8f33" flatShading roughness={0.9} />
      </instancedMesh>
    </>
  );
}

function Clouds({ controls }: { controls: RefObject<PlanetControls> }) {
  const group = useRef<THREE.Group>(null);
  const puffs = useMemo(() => {
    const rand = seeded(42);
    const out: { p: [number, number, number]; s: number }[] = [];
    const d = new THREE.Vector3(), o = new THREE.Vector3();
    for (let i = 0; i < 16; i++) {
      randomDir(rand, d);
      // Kosongkan area puncak supaya awan tidak menutupi karakter.
      if (d.y > 0.55) d.y = -d.y;
      d.normalize();
      const r = 1.2 + rand() * 0.08;
      for (let j = 0; j < 4; j++) {
        o.set(rand() - 0.5, (rand() - 0.5) * 0.4, rand() - 0.5).multiplyScalar(0.13);
        out.push({ p: d.clone().multiplyScalar(r).add(o).toArray() as [number, number, number], s: 0.05 + rand() * 0.05 });
      }
    }
    return out;
  }, []);
  useFrame((_, dt) => {
    const c = controls.current;
    if (group.current && !c.reduced && !c.paused) group.current.rotation.y += dt * 0.035;
  });
  return (
    <group ref={group}>
      {puffs.map((p, i) => (
        <mesh key={i} position={p.p} scale={p.s}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#ffffff" flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

const atmosphereShader = {
  uniforms: { color: { value: new THREE.Color('#bfe3ff') } },
  vertexShader: /* glsl */ `
    varying vec3 vN; varying vec3 vV;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vN = normalize(normalMatrix * normal);
      vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 color; varying vec3 vN; varying vec3 vV;
    void main() {
      float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.5);
      gl_FragColor = vec4(color, f * 0.85);
    }`,
};

const SKIN = '#e9b48c';
function Limb({ color, length, radius }: { color: string; length: number; radius: number }) {
  return (
    <mesh position={[0, -length / 2, 0]}>
      <capsuleGeometry args={[radius, length - radius * 2, 4, 10]} />
      <meshStandardMaterial color={color} roughness={0.75} />
    </mesh>
  );
}

type RunnerParts = {
  root: THREE.Group;
  body: THREE.Group;
  legL: THREE.Group;
  legR: THREE.Group;
  armL: THREE.Group;
  armR: THREE.Group;
};

function Runner({ parts }: { parts: RefObject<Partial<RunnerParts>> }) {
  const set = (k: keyof RunnerParts) => (el: THREE.Group | null) => {
    if (el) parts.current[k] = el;
  };
  return (
    <group ref={set('root')} scale={0.36}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.22, 24]} />
        <meshBasicMaterial color="#1c3b1a" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <group ref={set('body')}>
        {/* Kaki: celana khaki, kaus kaki putih, sepatu kuning */}
        {([-1, 1] as const).map((side) => (
          <group key={side} ref={set(side < 0 ? 'legL' : 'legR')} position={[side * 0.075, 0.46, 0]}>
            <Limb color="#cdb689" length={0.2} radius={0.065} />
            <group position={[0, -0.18, 0]}>
              <Limb color={SKIN} length={0.2} radius={0.048} />
              <mesh position={[0, -0.22, 0.035]}>
                <boxGeometry args={[0.09, 0.06, 0.16]} />
                <meshStandardMaterial color="#f2c94c" roughness={0.6} />
              </mesh>
            </group>
          </group>
        ))}
        {/* Badan: kaus hijau ThreeL */}
        <mesh position={[0, 0.6, 0]}>
          <capsuleGeometry args={[0.13, 0.16, 6, 14]} />
          <meshStandardMaterial color="#12805c" roughness={0.8} />
        </mesh>
        {/* Tas punggung */}
        <mesh position={[0, 0.63, -0.14]}>
          <boxGeometry args={[0.2, 0.22, 0.09]} />
          <meshStandardMaterial color="#0b3b2e" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.7, -0.19]}>
          <boxGeometry args={[0.2, 0.08, 0.02]} />
          <meshStandardMaterial color="#f2c94c" roughness={0.7} />
        </mesh>
        {([-1, 1] as const).map((side) => (
          <group key={side} ref={set(side < 0 ? 'armL' : 'armR')} position={[side * 0.17, 0.72, 0]}>
            <Limb color="#12805c" length={0.11} radius={0.05} />
            <group position={[0, -0.09, 0]}>
              <Limb color={SKIN} length={0.17} radius={0.038} />
            </group>
          </group>
        ))}
        {/* Kepala, rambut, topi kuning */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.13, 20, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
        {([-1, 1] as const).map((side) => (
          <mesh key={side} position={[side * 0.045, 0.91, 0.122]}>
            <sphereGeometry args={[0.016, 10, 8]} />
            <meshStandardMaterial color="#1f1a17" roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 0.92, -0.025]}>
          <sphereGeometry args={[0.132, 20, 16]} />
          <meshStandardMaterial color="#3b2616" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.955, 0]}>
          <sphereGeometry args={[0.138, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f2c94c" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.96, 0.12]}>
          <boxGeometry args={[0.2, 0.018, 0.12]} />
          <meshStandardMaterial color="#d4a72c" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

const damp = (a: number, b: number, lambda: number, dt: number) => a + (b - a) * (1 - Math.exp(-lambda * dt));

function World({ controls }: { controls: RefObject<PlanetControls> }) {
  const planet = useRef<THREE.Group>(null);
  const parts = useRef<Partial<RunnerParts>>({});
  const geometry = useMemo(buildPlanet, []);
  const s = useMemo(
    () => ({
      omega: new THREE.Vector3(),
      axis: new THREE.Vector3(),
      dq: new THREE.Quaternion(),
      inv: new THREE.Quaternion(),
      probe: new THREE.Vector3(),
      yaw: Math.PI,
      phase: 0,
      activity: 0,
      greet: 0,
      height: 1,
      time: 0,
    }),
    [],
  );

  useEffect(() => {
    planet.current?.quaternion.setFromEuler(new THREE.Euler(0.4, 0.8, 0));
  }, []);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20);
    const c = controls.current;
    const p = parts.current;
    if (!planet.current || !p.root || !p.body || !p.legL || !p.legR || !p.armL || !p.armR) return;
    s.time += dt;

    if (c.dragging) {
      // Geser horizontal menggulung planet ke samping, vertikal ke depan/belakang.
      const k = 0.006 / Math.max(dt, 1e-3);
      s.omega.x = damp(s.omega.x, c.dragDy * k, 30, dt);
      s.omega.z = damp(s.omega.z, -c.dragDx * k, 30, dt);
      c.dragDx = c.dragDy = 0;
    } else {
      const idle = performance.now() - c.lastInteraction > 1500;
      const auto = idle && !c.paused && !c.reduced ? AUTO_SPIN : 0;
      s.omega.x = damp(s.omega.x, auto, 2.2, dt);
      s.omega.z = damp(s.omega.z, 0, 2.2, dt);
    }
    s.omega.clampLength(0, 2.5);

    const speed = s.omega.length();
    if (speed > 1e-5) {
      s.axis.copy(s.omega).divideScalar(speed);
      s.dq.setFromAxisAngle(s.axis, speed * dt);
      planet.current.quaternion.premultiply(s.dq).normalize();
    }

    // Tinggi permukaan tepat di bawah kaki karakter.
    s.inv.copy(planet.current.quaternion).invert();
    s.probe.set(0, 1, 0).applyQuaternion(s.inv);
    s.height = damp(s.height, radiusAt(elevation(s.probe)), 12, dt);
    p.root.position.set(0, s.height - 0.005, 0);

    // Karakter berlari berlawanan dengan arah gerak permukaan.
    const moving = speed > 0.03;
    const greeting = c.paused && !c.dragging && speed < 0.05;
    let targetYaw = s.yaw;
    if (moving) targetYaw = Math.atan2(s.omega.z, -s.omega.x);
    else if (greeting) targetYaw = 0;
    s.yaw += Math.atan2(Math.sin(targetYaw - s.yaw), Math.cos(targetYaw - s.yaw)) * (1 - Math.exp(-8 * dt));
    p.root.rotation.y = s.yaw;

    s.activity = damp(s.activity, THREE.MathUtils.smoothstep(speed, 0.02, 0.25), 8, dt);
    s.greet = damp(s.greet, greeting && !c.reduced ? 1 : 0, 5, dt);
    s.phase += (0.6 + speed * 9) * dt * Math.PI * 2 * Math.min(1, s.activity * 3);

    const a = s.activity;
    const swing = Math.sin(s.phase);
    p.legL.rotation.x = swing * 0.85 * a;
    p.legR.rotation.x = -swing * 0.85 * a;
    p.armL.rotation.x = -swing * 0.9 * a;
    p.armR.rotation.x = swing * 0.9 * a * (1 - s.greet);
    p.armL.rotation.z = -0.12;
    p.armR.rotation.z = 0.12 + s.greet * (2.5 + Math.sin(s.time * 9) * 0.35);
    p.body.position.y = Math.abs(Math.cos(s.phase)) * 0.05 * a;
    p.body.rotation.x = 0.16 * a;
  });

  return (
    <>
      <group ref={planet}>
        <mesh geometry={geometry}>
          <meshStandardMaterial vertexColors flatShading roughness={0.85} metalness={0} />
        </mesh>
        <Trees />
      </group>
      <mesh scale={1.1}>
        <sphereGeometry args={[1, 48, 32]} />
        <shaderMaterial args={[atmosphereShader]} transparent depthWrite={false} />
      </mesh>
      <Clouds controls={controls} />
      <Runner parts={parts} />
    </>
  );
}

// Di desktop canvas selebar hero. Ukuran planet dihitung dari lebar layar (bukan tinggi)
// supaya tepi kirinya selalu berhenti di separuh kanan dan tidak menabrak teks.
function Framing() {
  const camera = useThree((st) => st.camera) as THREE.PerspectiveCamera;
  const width = useThree((st) => st.size.width);
  const height = useThree((st) => st.size.height);
  useEffect(() => {
    const aspect = width / height;
    const wide = width >= 1024;
    const angular = Math.asin(1.1 / camera.position.length());
    const radiusPx = wide ? width * 0.25 : Math.min(width * 0.46, height * 0.62);
    const tanHalf = Math.max((height / 2) * Math.tan(angular) / radiusPx, Math.tan(THREE.MathUtils.degToRad(17)));
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(tanHalf));
    camera.filmOffset = wide ? -(GLOBE_CENTER_X - 0.5) * 2 * tanHalf * aspect * camera.getFilmWidth() : 0;
    camera.updateProjectionMatrix();
  }, [camera, width, height]);
  return null;
}

export default function PlanetScene({
  controls,
  active,
}: {
  controls: RefObject<PlanetControls>;
  active: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.6, 2.6], fov: 40, near: 0.1, far: 20 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.78, 0)}
      gl={{ antialias: true, alpha: true }}
    >
      <hemisphereLight args={['#f1f8ff', '#5d7f4a', 1.3]} />
      <directionalLight position={[2.5, 4, 3]} intensity={2.4} color="#fff6e5" />
      <directionalLight position={[-3, 1, -2]} intensity={0.5} color="#cfe8ff" />
      <Framing />
      <World controls={controls} />
    </Canvas>
  );
}
