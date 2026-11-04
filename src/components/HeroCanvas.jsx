import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// X 3D besar di tengah hero (seolah background panggung), tema putih × biru.
// Pencahayaan studio (key + rim + spotlight). Seluruh gerak otonom: putaran pelan,
// tilt ayun, melayang, dan ledakan berkala — tanpa kursor maupun klik.
const BAR_LEN = 5.4;
const BAR_TH = 1.0;
const BAR_DP = 1.06;
const PARTICLES = 2600;
const SHARDS = 22;
const COLOR_X = '#2563eb';
// Siklus ledakan otonom: jeda tenang, lalu X pecah jadi partikel dan menyusun ulang.
const BLAST_CYCLE = 11;
const BLAST_DURATION = 2.4;
const BLAST_OFFSET = 4;
const PARTICLE_COLORS = ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (typeof mql !== 'object' || mql === null) return false;
  return typeof mql.matches === 'boolean' ? mql.matches : false;
}

function sampleXVolume(rng, out) {
  const bar = rng() < 0.5 ? 1 : -1;
  const u = (rng() * 2 - 1) * (BAR_LEN / 2 - BAR_TH / 2);
  const v = (rng() * 2 - 1) * (BAR_TH / 2 - 0.08);
  const z = (rng() * 2 - 1) * (BAR_DP / 2 - 0.08);
  out[0] = u * Math.SQRT1_2 - v * Math.SQRT1_2 * bar;
  out[1] = u * Math.SQRT1_2 + v * Math.SQRT1_2 * bar;
  out[2] = z;
}

// mode "stage": panggung penuh layar (desktop) — X boleh besar, di belakang teks.
// mode "band": kanvas tetap full-bleed, tapi X diposisikan di "zona aman"
// (focus = {top, bottom} dalam fraksi tinggi hero) agar tidak menimpa teks.
export default function HeroCanvas({ mode = 'stage', focus }) {
  const mountRef = useRef(null);
  const focusRef = useRef(focus);
  focusRef.current = focus;
  const fitRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduced = prefersReducedMotion();

    const scene = new THREE.Scene();
    // Transparan agar menyatu dengan gradasi putih–biru hero (tanpa kotak putih).
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 150);
    camera.position.set(0, 0, 9.4);

    // Jarak kamera dasar + lebar panggung (satuan dunia) yang wajib muat horizontal,
    // supaya X tetap utuh & proporsional di layar sempit maupun lebar.
    // Jarak sedikit lebih jauh dari sebelumnya: X tetap dominan, tapi tidak
    // mendesak blok judul di kiri.
    const BASE_DIST = 12.6;
    const STAGE_WIDTH = 8.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Dunia yang wajib muat pada mode "band" (lebar & tinggi), plus jarak minimum.
    const BAND_FIT = 5.8;
    // Bounding box kasar X (batang 5.4 diputar 45° + ketebalan).
    const X_SPAN = 4.6;

    const fitCamera = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      const aspect = w / h;
      const vFov = (camera.fov * Math.PI) / 180;
      const tanHalf = Math.tan(vFov / 2);
      const distForWidth = STAGE_WIDTH / (2 * tanHalf * aspect);
      camera.aspect = aspect;

      if (mode === 'band') {
        const f = focusRef.current || { top: 0.46, bottom: 0.78 };
        const top = Math.min(Math.max(f.top, 0), 0.85) * h;
        const bottom = Math.min(Math.max(f.bottom, 0.15), 1) * h;
        const region = Math.max(bottom - top, 60);
        const centerPx = (top + bottom) / 2;
        // X mengisi 86% zona aman (dulu 80%) → di layar kecil terlihat
        // cukup besar, tapi masih menyisakan jarak ke teks di atas dan
        // blok EST di bawah.
        let dist = (X_SPAN * h) / (2 * tanHalf * region * 0.86);
        // ...dan tetap utuh secara horizontal.
        dist = Math.max(dist, (X_SPAN * 1.15) / (2 * tanHalf * aspect), 6.2);
        camera.position.z = dist;
        const pxPerWorld = h / (2 * tanHalf * dist);
        // Vertikal: pusat X jatuh persis di tengah zona aman.
        camera.position.y = (centerPx - h / 2) / pxPerWorld;
        // Horizontal: di layar sempit X digeser sedikit ke kanan supaya
        // komposisinya sama seperti desktop — teks di kiri, objek di kanan —
        // bukan benda kecil yang berdiri pas di tengah ruang kosong.
        const centerXPx = w * 0.55;
        camera.position.x = (w / 2 - centerXPx) / pxPerWorld;
      } else {
        camera.position.z = Math.max(BASE_DIST, distForWidth);
        camera.position.y = 0;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    fitCamera();
    fitRef.current = fitCamera;

    const barGeo = new RoundedBoxGeometry(BAR_LEN, BAR_TH, BAR_DP, 6, 0.2);
    const xMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLOR_X),
      metalness: 0.6,
      roughness: 0.2,
    });

    const xGroup = new THREE.Group();
    const bar1 = new THREE.Mesh(barGeo, xMat);
    bar1.rotation.z = Math.PI / 4;
    const bar2 = new THREE.Mesh(barGeo, xMat);
    bar2.rotation.z = -Math.PI / 4;
    xGroup.add(bar1, bar2);

    const spin = new THREE.Group();
    spin.add(xGroup);
    scene.add(spin);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x93c5fd, 1.8));

    const key = new THREE.DirectionalLight(0xffffff, 4.2);
    key.position.set(4, 8, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x93c5fd, 2.4);
    rim.position.set(-4, -3, -4);
    scene.add(rim);

    const spot = new THREE.PointLight(0x60a5fa, 34, 18, 2);
    spot.position.set(-3, 2, 3.5);
    spot.castShadow = true;
    scene.add(spot);

    const ringGeo = new THREE.TorusGeometry(1.45, 0.05, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLOR_X),
      metalness: 0.85,
      roughness: 0.18,
      transparent: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.1;
    scene.add(ring);

    // ---- Suasana ala hero TRIONN: serpihan, debu, dan garis cahaya melayang.
    // Scene tidak lagi hanya satu huruf diam — ada kedalaman yang bergerak.
    // Semua lapisan dibuat tipis/transparan agar teks di atasnya tetap terbaca.
    const dim = mode === 'band' ? 0.4 : 1;
    // Di mode "band" X mengecil di zona aman, jadi serpihan ikut dirapatkan
    // supaya tidak melayang di belakang teks.
    const spread = mode === 'band' ? 0.62 : 1;

    const shardGroup = new THREE.Group();
    scene.add(shardGroup);
    const shardGeo = new THREE.BoxGeometry(1, 1, 0.05);
    const shards = [];

    for (let i = 0; i < SHARDS; i += 1) {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(PARTICLE_COLORS[i % PARTICLE_COLORS.length]),
        transparent: true,
        opacity: (0.16 + Math.random() * 0.3) * dim,
        metalness: 0.35,
        roughness: 0.4,
        depthWrite: false,
      });
      const shard = new THREE.Mesh(shardGeo, mat);
      shard.scale.set(0.6 + Math.random() * 1.9, 0.1 + Math.random() * 0.45, 1);
      const ang = Math.random() * Math.PI * 2;
      const rad = (3.1 + Math.random() * 2.7) * spread;
      shard.position.set(
        Math.cos(ang) * rad,
        Math.sin(ang) * rad * 0.68,
        -3.2 + Math.random() * 2.2
      );
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      shard.userData = {
        baseY: shard.position.y,
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.35,
        float: 0.12 + Math.random() * 0.22,
      };
      shardGroup.add(shard);
      shards.push(shard);
    }

    const dustCount = 320;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      dustPos[i * 3] = (Math.random() - 0.5) * 15;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      dustPos[i * 3 + 2] = -6 + Math.random() * 5;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.045,
      color: new THREE.Color('#60a5fa'),
      transparent: true,
      opacity: 0.55 * dim,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const streakGroup = new THREE.Group();
    scene.add(streakGroup);
    const streakGeo = new THREE.PlaneGeometry(1, 0.012);
    const streaks = [];

    for (let i = 0; i < 6; i += 1) {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(i % 2 ? '#1d4ed8' : '#60a5fa'),
        transparent: true,
        opacity: 0.5 * dim,
        depthWrite: false,
      });
      const streak = new THREE.Mesh(streakGeo, mat);
      streak.scale.set(1.4 + Math.random() * 3.4, 1, 1);
      // Kilauan hanya di sisi kanan panggung (area X), tidak melintasi headline.
      streak.position.set(-1.5 + Math.random() * 9, (Math.random() - 0.5) * 7, -4 + Math.random() * 4);
      streak.rotation.z = (Math.random() - 0.5) * 0.9;
      streak.userData = { speed: 0.06 + Math.random() * 0.14 };
      streakGroup.add(streak);
      streaks.push(streak);
    }

    const rng = Math.random;
    const home = new Float32Array(PARTICLES * 3);
    const color = new Float32Array(PARTICLES * 3);
    const pos = new Float32Array(PARTICLES * 3);
    const vel = new Float32Array(PARTICLES * 3);
    const tmp = [0, 0, 0];
    const c = new THREE.Color();

    for (let i = 0; i < PARTICLES; i += 1) {
      sampleXVolume(rng, tmp);
      home[i * 3] = tmp[0];
      home[i * 3 + 1] = tmp[1];
      home[i * 3 + 2] = tmp[2];
      pos[i * 3] = tmp[0];
      pos[i * 3 + 1] = tmp[1];
      pos[i * 3 + 2] = tmp[2];
      c.set(PARTICLE_COLORS[Math.floor(rng() * PARTICLE_COLORS.length)]);
      color[i * 3] = c.r;
      color[i * 3 + 1] = c.g;
      color[i * 3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(color, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.97,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    particles.visible = false;
    const pSpin = new THREE.Group();
    pSpin.add(particles);
    scene.add(pSpin);

    let exploding = false;
    let seeded = false;

    const clock = new THREE.Clock();
    let raf = 0;
    const ease = { ry: 0, rx: 0 };
    let scale = 1;
    let fieldScale = 1;

    // Batas putar: X tidak boleh sampai menyamping (90°), karena dua batangnya
    // akan tampak sebagai persegi tipis dan huruf X hilang. Ayunan dibuat cukup
    // lebar (±41°) agar kedalaman/efek 3D-nya terasa, tapi di atas ~45° hurufnya
    // mulai terbaca seperti "K", jadi clamp dipasang di batas itu.
    const MAX_RY = 0.72;
    const MAX_RX = 0.3;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Ledakan dipicu jam, bukan interaksi: satu siklus tenang lalu satu ledakan.
      const phase = (t + BLAST_OFFSET) % BLAST_CYCLE;
      const blasting = phase > BLAST_CYCLE - BLAST_DURATION;

      const targetRy = Math.sin(t * 0.38) * 0.58 + Math.sin(t * 0.17) * 0.1;
      const targetRx = Math.sin(t * 0.55) * 0.16;
      ease.ry += (targetRy - ease.ry) * Math.min(1, 5.0 * dt);
      ease.rx += (targetRx - ease.rx) * Math.min(1, 5.0 * dt);
      ease.ry = Math.max(-MAX_RY, Math.min(MAX_RY, ease.ry));
      ease.rx = Math.max(-MAX_RX, Math.min(MAX_RX, ease.rx));
      spin.rotation.y = ease.ry;
      spin.rotation.x = ease.rx;
      spin.rotation.z = Math.sin(t * 0.4) * 0.1;
      spin.position.y = Math.sin(t * 0.7) * 0.12 + Math.sin(t * 0.5) * 0.05;

      // Cahaya ikut menggeser pelan → kilau menyapu permukaan, jadi volume 3D
      // X terbaca walaupun bentuknya hanya berayun bolak-balik.
      key.position.x = 4 + Math.sin(t * 0.45) * 2.4;
      key.position.y = 8 + Math.sin(t * 0.32) * 1.4;

      // Serpihan melayang: berputar pelan + naik-turun, seperti potongan scene
      // di hero TRIONN.
      for (let i = 0; i < shards.length; i += 1) {
        const shard = shards[i];
        const d = shard.userData;
        shard.rotation.x += d.spin * dt;
        shard.rotation.z += d.spin * dt * 0.6;
        shard.position.y = d.baseY + Math.sin(t * 0.5 + d.phase) * d.float;
      }
      dust.rotation.y = Math.sin(t * 0.05) * 0.2;

      for (let i = 0; i < streaks.length; i += 1) {
        const streak = streaks[i];
        streak.position.x += streak.userData.speed * dt * 3;
        if (streak.position.x > 8) streak.position.x = -1.5;
      }

      // Saat ledakan, lapisan suasana ikut terdorong keluar (tipis saja, agar
      // serpihan tidak menutupi headline).
      const fieldTarget = blasting ? 1.12 : 1;
      fieldScale += (fieldTarget - fieldScale) * Math.min(1, (blasting ? 9 : 4) * dt);
      shardGroup.scale.setScalar(fieldScale);
      streakGroup.scale.setScalar(fieldScale);
      pSpin.rotation.copy(spin.rotation);
      pSpin.position.copy(spin.position);

      if (blasting && !exploding) {
        exploding = true;
        seeded = false;
      }
      if (exploding && blasting && !seeded) {
        for (let i = 0; i < PARTICLES; i += 1) {
          const ix = i * 3;
          pos[ix] = home[ix] + (rng() - 0.5) * 0.07;
          pos[ix + 1] = home[ix + 1] + (rng() - 0.5) * 0.07;
          pos[ix + 2] = home[ix + 2] + (rng() - 0.5) * 0.07;
          const len = Math.hypot(pos[ix], pos[ix + 1], pos[ix + 2]) + 1e-4;
          const speed = 2.4 + rng() * 5.4;
          vel[ix] = (pos[ix] / len) * speed + (rng() - 0.5) * 2;
          vel[ix + 1] = (pos[ix + 1] / len) * speed + (rng() - 0.5) * 2;
          vel[ix + 2] = (pos[ix + 2] / len) * speed + (rng() - 0.5) * 2;
        }
        pGeo.attributes.position.needsUpdate = true;
        seeded = true;
        particles.visible = true;
      }
      if (exploding && !blasting) {
        const k = 4.2;
        const damp = 2.9;
        for (let i = 0; i < PARTICLES; i += 1) {
          const ix = i * 3;
          vel[ix] += (home[ix] - pos[ix]) * k * dt - vel[ix] * damp * dt;
          vel[ix + 1] += (home[ix + 1] - pos[ix + 1]) * k * dt - vel[ix + 1] * damp * dt;
          vel[ix + 2] += (home[ix + 2] - pos[ix + 2]) * k * dt - vel[ix + 2] * damp * dt;
        }
      }

      if (particles.visible) {
        const step = Math.min(dt * 60, 3);
        for (let i = 0; i < PARTICLES * 3; i += 1) {
          pos[i] += vel[i] * step;
          if (pos[i] > 45 || pos[i] < -45) pos[i] = Math.max(-45, Math.min(45, pos[i]));
        }
        pGeo.attributes.position.needsUpdate = true;

        // Partikel memudar saat hampir kembali ke bentuk X, agar tidak tampak
        // seperti bintik yang menempel di permukaan huruf.
        let far = 0;
        for (let i = 0; i < PARTICLES; i += 6) {
          const ix = i * 3;
          const d = Math.hypot(pos[ix] - home[ix], pos[ix + 1] - home[ix + 1], pos[ix + 2] - home[ix + 2]);
          if (d > far) far = d;
        }
        pMat.opacity = Math.min(0.97, far * 0.9);
      }

      // X tidak pernah hilang: saat ledakan ia hanya berdenyut lebih kecil,
      // lalu ring berubah jadi gelombang kejut yang melebar dan memudar.
      const scaleTarget = blasting ? 0.86 : 1;
      scale += (scaleTarget - scale) * Math.min(1, (blasting ? 12 : 7) * dt);
      xGroup.scale.setScalar(scale);

      const shock = blasting ? phase - (BLAST_CYCLE - BLAST_DURATION) : 0;
      const shockP = Math.min(Math.max(shock / BLAST_DURATION, 0), 1);
      ring.scale.setScalar(blasting ? 1 + shockP * 1.6 : 1);
      ringMat.opacity = blasting ? Math.max(0, 1 - shockP * 1.15) : 1;
      ring.rotation.z += dt * 0.25;

      if (exploding && !blasting && scale > 0.985) {
        let settled = true;
        for (let i = 0; i < PARTICLES; i += 1) {
          const ix = i * 3;
          if (
            Math.hypot(pos[ix] - home[ix], pos[ix + 1] - home[ix + 1], pos[ix + 2] - home[ix + 2]) >
            0.4
          ) {
            settled = false;
            break;
          }
        }
        if (settled) {
          exploding = false;
          particles.visible = false;
        }
      }

      if (reduced) {
        renderer.render(scene, camera);
        cancelAnimationFrame(raf);
        return;
      }
      renderer.render(scene, camera);
    };
    tick();

    const ro = new ResizeObserver(fitCamera);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ringGeo.dispose();
      ringMat.dispose();
      barGeo.dispose();
      xMat.dispose();
      shardGeo.dispose();
      shards.forEach((shard) => shard.material.dispose());
      dustGeo.dispose();
      dustMat.dispose();
      streakGeo.dispose();
      streaks.forEach((streak) => streak.material.dispose());
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [mode]);

  // Zona aman berubah (mis. tagline dari API / ukuran layar) → cukup refit kamera.
  useEffect(() => {
    fitRef.current?.();
  }, [focus]);

  return (
    <div
      ref={mountRef}
      aria-label="Autonomous 3D X sculpture"
      className="pointer-events-none absolute inset-0 h-full w-full select-none"
    />
  );
}
