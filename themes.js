/* =====================================================================
   THEMA'S voor de startpagina en alle spellen.

   - Het standaardthema (STANDAARD_THEMA) staat in settings.js.
     'auto' kiest op datum: elk thema met een `periode` is in die periode
     actief, anders het eerste thema in de lijst.
   - Op de startpagina kan iedereen zelf een thema kiezen; dat wordt
     onthouden. Een link met ?thema=halloween gaat altijd voor.
   - Een nieuw thema toevoegen: kopieer een blok in THEMAS en pas het aan.
   ===================================================================== */
const THEMAS = {

  winter: {
    naam: 'Winter', icoon: '❄️',
    periode: null,
    // texts the games and home screen show
    words: {
      heading: 'Kies een spel ❄️',
      monsters: 'Sneeuwmonsters', monster: 'sneeuwmonster', monsterIcon: '⛄',
      ball: 'sneeuwbal', balls: 'sneeuwballen',
      caught: 'Oei, gepakt! ⛄', tooFast: 'De sneeuwmonsters waren te snel.'
    },
    // CSS variables for the HTML around the games
    vars: {
      '--bg': '#060f26', '--bg2': '#102657', '--fg': '#f3f7ff', '--muted': '#b8c7ea',
      '--accent': '#ffcf40', '--accent-ink': '#3a2200', '--accent-shadow': '#b77900',
      '--card': 'rgba(255, 255, 255, 0.08)', '--card-edge': 'rgba(255, 255, 255, 0.16)',
      '--chip': 'rgba(4, 12, 34, 0.82)',
      '--glow1': 'rgba(80, 255, 190, 0.18)', '--glow2': 'rgba(150, 120, 255, 0.18)'
    },
    // colors for the 3D game panels, buttons and effects
    ui: {
      panel: 'rgba(8,20,52,0.9)', edge: 'rgba(160,200,255,0.6)', line: 'rgba(160,200,255,0.3)',
      accent: '#ffcf40', accentLight: '#fff1b8', text: '#dfe8ff', muted: '#b8c7ea', tip: '#fff3c4',
      btn: { idle: ['#5a95ff', '#2a5bdb'], good: ['#46e591', '#16a058'], bad: ['#ff7477', '#cc2d33'], dim: ['#56627f', '#394360'], start: ['#ffd65a', '#f29d0b'] },
      startInk: '#3a2200',
      confetti: [0xffcf40, 0x46e591, 0xffffff, 0x7fb2ff, 0xff8fb1],
      ray: 0x9fd3ff, ball: 0xffffff, ballGlow: 0x334466, puff: [0xffffff], puddle: 0xbfdcff,
      map: { sea: '#12306a', other: '#3a4868', otherEdge: '#5b6b90', land: '#e3ebf7', border: '#1b2d57', hover: '#ffe28a' }
    },
    // home screen: falling particles and the landscape at the bottom
    page: {
      particles: { count: 60, make: () => ({ cls: 'flake', size: 2 + Math.random() * 5, secs: 8 + Math.random() * 10, drift: Math.random() * 80 - 40 }) },
      css: `
        .fx i.flake { border-radius: 50%; background: #fff; opacity: 0.8; }`,
      sky: '',
      ground: `
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none">
          <g fill="#1f4a3a">
            <polygon points="60,120 95,30 130,120"/><polygon points="120,130 150,55 180,130"/>
            <polygon points="800,115 840,20 880,115"/><polygon points="870,125 900,60 930,125"/>
            <polygon points="450,135 470,85 490,135"/>
          </g>
          <path d="M0,110 C200,80 350,140 520,115 C700,90 820,135 1000,105 L1000,200 L0,200 Z" fill="#e6eefa"/>
          <path d="M0,150 C250,125 450,170 650,150 C820,135 900,160 1000,145 L1000,200 L0,200 Z" fill="#cfdcf2"/>
        </svg>`
    },

    // 3D surroundings: night sky, aurora, snowy forest, snowfall
    scene(THREE, scene) {
      scene.fog = new THREE.Fog(0x0d1f4a, 18, 60);
      scene.add(new THREE.HemisphereLight(0xc4d8ff, 0x2a3656, 0.95));
      const sun = new THREE.DirectionalLight(0xe8f0ff, 0.55); sun.position.set(4, 10, 2); scene.add(sun);
      themeSky(THREE, scene, ['#040a22', '#0c1d4c', '#1a3a78', '#1a3a78'], 700);

      const auroras = [];
      (function () {
        const c = document.createElement('canvas'); c.width = 256; c.height = 64;
        const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 64);
        g.addColorStop(0, 'rgba(120,90,255,0)'); g.addColorStop(0.35, 'rgba(110,140,255,0.5)'); g.addColorStop(0.7, 'rgba(80,255,170,0.95)'); g.addColorStop(1, 'rgba(80,255,170,0)');
        x.fillStyle = g; x.fillRect(0, 0, 256, 64); x.globalCompositeOperation = 'destination-in';
        const h = x.createLinearGradient(0, 0, 256, 0); h.addColorStop(0, 'rgba(0,0,0,0)'); h.addColorStop(0.2, '#000'); h.addColorStop(0.8, '#000'); h.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = h; x.fillRect(0, 0, 256, 64);
        const tex = new THREE.CanvasTexture(c);
        [[0, 17, -34, 0], [-30, 20, -12, Math.PI / 2.6], [28, 19, -16, -Math.PI / 2.8]].forEach(([px, py, pz, ry], i) => {
          const geo = new THREE.PlaneGeometry(50, 12, 60, 1);
          const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
          m.position.set(px, py, pz); m.rotation.y = ry; m.userData.base = geo.attributes.position.array.slice(); m.userData.phase = i * 2.1;
          scene.add(m); auroras.push(m);
        });
      })();

      const ground = new THREE.Mesh(new THREE.CircleGeometry(60, 64), new THREE.MeshLambertMaterial({ color: 0xe6eefa }));
      ground.rotation.x = -Math.PI / 2; scene.add(ground);
      const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5a3b24 }), leafMat = new THREE.MeshLambertMaterial({ color: 0x1f5a45 }), snowMat = new THREE.MeshLambertMaterial({ color: 0xf4f8ff });
      for (let i = 0; i < 46; i++) {
        const a = Math.random() * 6.283, r = 7 + Math.random() * 22, s = 0.8 + Math.random() * 1.3, t = new THREE.Group();
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1 * s, 0.13 * s, 0.6 * s, 6), trunkMat); trunk.position.y = 0.3 * s; t.add(trunk);
        for (let k = 0; k < 3; k++) { const cone = new THREE.Mesh(new THREE.ConeGeometry((0.9 - k * 0.22) * s, 1.1 * s, 8), leafMat); cone.position.y = (0.9 + k * 0.62) * s; t.add(cone); }
        const cap = new THREE.Mesh(new THREE.ConeGeometry(0.28 * s, 0.35 * s, 8), snowMat); cap.position.y = 2.4 * s; t.add(cap);
        t.position.set(Math.cos(a) * r, 0, Math.sin(a) * r); t.rotation.y = Math.random() * 6; scene.add(t);
      }

      const fall = themeFall(THREE, scene, 500, [0xffffff], 0.05, 0.85, 1);

      return function update(dt, t) {
        fall(dt, t);
        auroras.forEach(m => {
          const pos = m.geometry.attributes.position, base = m.userData.base;
          for (let i = 0; i < pos.count; i++) { const x = base[i*3]; pos.array[i*3+2] = Math.sin(x * 0.14 + t * 0.5 + m.userData.phase) * 3 + Math.sin(x * 0.05 + t * 0.2) * 2; }
          pos.needsUpdate = true; m.material.opacity = 0.65 + Math.sin(t * 0.6 + m.userData.phase) * 0.25;
        });
      };
    },

    // a snowman with a scarf, holding a pole for the answer sign (sign hangs at about y 1.7)
    monster(THREE, i) {
      const k = themeCache(this, () => ({
        snow: new THREE.MeshLambertMaterial({ color: 0xf8fbff }), coal: new THREE.MeshLambertMaterial({ color: 0x222222 }),
        carrot: new THREE.MeshLambertMaterial({ color: 0xff8a1f }), stick: new THREE.MeshLambertMaterial({ color: 0x6b4423 }),
        scarf: [0xe53935, 0x1e88e5, 0x7cb342, 0xab47bc].map(c => new THREE.MeshLambertMaterial({ color: c })),
        b1: new THREE.SphereGeometry(0.32, 20, 14), b2: new THREE.SphereGeometry(0.24, 20, 14), b3: new THREE.SphereGeometry(0.17, 20, 14),
        eye: new THREE.SphereGeometry(0.025, 8, 6), nose: new THREE.ConeGeometry(0.035, 0.16, 10), scarfGeo: new THREE.TorusGeometry(0.17, 0.045, 8, 20),
        arm: new THREE.CylinderGeometry(0.015, 0.02, 0.45, 6), pole: new THREE.CylinderGeometry(0.02, 0.02, 1.0, 6)
      }));
      const body = new THREE.Group();
      const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); body.add(m); return m; };
      add(k.b1, k.snow, 0, 0.3, 0); add(k.b2, k.snow, 0, 0.78, 0); add(k.b3, k.snow, 0, 1.14, 0);
      add(k.eye, k.coal, -0.06, 1.19, 0.15); add(k.eye, k.coal, 0.06, 1.19, 0.15);
      add(k.nose, k.carrot, 0, 1.13, 0.22).rotation.x = Math.PI / 2;
      add(k.scarfGeo, k.scarf[i % 4], 0, 0.98, 0).rotation.x = Math.PI / 2;
      [0.1, 0.17, 0.24].forEach(y => add(k.eye, k.coal, 0, 0.62 + y, 0.235));
      add(k.arm, k.stick, -0.36, 0.95, 0).rotation.z = 1.0;
      add(k.arm, k.stick, 0.3, 1.0, 0).rotation.z = -0.5;
      add(k.pole, k.stick, 0.4, 1.2, 0);
      return body;
    }
  },

  halloween: {
    naam: 'Halloween', icoon: '🎃',
    periode: { van: [10, 1], tot: [11, 2] },   // [maand, dag]
    words: {
      heading: 'Kies een spel 🎃',
      monsters: 'Pompoenmonsters', monster: 'pompoenmonster', monsterIcon: '🎃',
      ball: 'snoepje', balls: 'snoepjes',
      caught: 'Boe, gepakt! 👻', tooFast: 'De pompoenmonsters waren te snel.'
    },
    vars: {
      '--bg': '#0d0618', '--bg2': '#2a1240', '--fg': '#fff4e8', '--muted': '#d4c2e8',
      '--accent': '#ff9a2e', '--accent-ink': '#2a1000', '--accent-shadow': '#b04a00',
      '--card': 'rgba(255, 255, 255, 0.07)', '--card-edge': 'rgba(255, 170, 80, 0.25)',
      '--chip': 'rgba(20, 8, 36, 0.85)',
      '--glow1': 'rgba(255, 130, 30, 0.2)', '--glow2': 'rgba(150, 60, 255, 0.24)'
    },
    ui: {
      panel: 'rgba(22,10,40,0.9)', edge: 'rgba(255,160,70,0.6)', line: 'rgba(255,160,70,0.3)',
      accent: '#ff9a2e', accentLight: '#ffd9a8', text: '#f1e4ff', muted: '#c9b3e6', tip: '#ffe9c4',
      btn: { idle: ['#9a5cff', '#6a2fd0'], good: ['#46e591', '#16a058'], bad: ['#ff7477', '#cc2d33'], dim: ['#5a4a6f', '#3c3050'], start: ['#ffad42', '#f0700b'] },
      startInk: '#2a1000',
      confetti: [0xff8a1f, 0xb07aff, 0x8dff6a, 0xffd24a, 0xffffff],
      ray: 0xffa04a, ball: 0xff8a1f, ballGlow: 0x662200, puff: [0xff8a1f, 0xb07aff, 0xffd24a], puddle: 0x7dff6a,
      map: { sea: '#1f0f3a', other: '#3d2f55', otherEdge: '#5c4a7a', land: '#f3e6d0', border: '#2a1640', hover: '#ffc27a' }
    },
    page: {
      particles: { count: 34, make: () => ({ cls: 'leaf', size: 8 + Math.random() * 8, secs: 9 + Math.random() * 9, drift: Math.random() * 160 - 80,
        color: ['#ff8a1f', '#d9541e', '#ffb42e', '#8a3a12'][Math.floor(Math.random() * 4)] }) },
      css: `
        .fx i.leaf { border-radius: 0 80% 0 80%; background: var(--c); opacity: 0.85; animation-name: fall, spin; }
        @keyframes spin { to { rotate: 720deg; } }
        .moon { position: absolute; top: 7vh; right: 9vw; width: clamp(70px, 14vw, 140px); aspect-ratio: 1; border-radius: 50%;
          background: radial-gradient(circle at 38% 36%, #fffbe8, #ffe9a8 55%, #f2c86a);
          box-shadow: 0 0 60px 18px rgba(255, 220, 140, 0.35), 0 0 160px 60px rgba(255, 160, 60, 0.15); }
        .bat { position: absolute; font-size: clamp(1.4rem, 4vw, 2.2rem); filter: brightness(0.3); animation: flap 0.3s ease-in-out infinite alternate, fly 22s linear infinite; }
        .bat:nth-child(3) { top: 18vh; animation-delay: 0s, -8s; animation-duration: 0.25s, 26s; }
        .bat:nth-child(4) { top: 30vh; font-size: 1.2rem; animation-delay: 0s, -17s; animation-duration: 0.22s, 31s; }
        .bat:nth-child(2) { top: 11vh; }
        @keyframes flap { to { scale: 1 0.7; } }
        @keyframes fly { from { left: -10vw; translate: 0 0; } 50% { translate: 0 6vh; } to { left: 110vw; translate: 0 0; } }
        @media (prefers-reduced-motion: reduce) { .bat { display: none; } }`,
      sky: `<div class="moon"></div><span class="bat">🦇</span><span class="bat">🦇</span><span class="bat">🦇</span>`,
      ground: `
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none">
          <g fill="#1a0f26" stroke="#1a0f26" stroke-linecap="round">
            <path d="M95,125 L100,40 M100,70 L70,45 M100,58 L128,35 M99,90 L125,78" stroke-width="7" fill="none"/>
            <path d="M860,120 L866,30 M865,62 L835,38 M866,50 L895,28 M864,85 L892,70" stroke-width="8" fill="none"/>
            <path d="M470,135 L472,92 M472,108 L455,95 M472,100 L488,88" stroke-width="4" fill="none"/>
            <path d="M300,128 v-22 a12,12 0 0 1 24,0 v22 Z M640,124 v-26 a14,14 0 0 1 28,0 v26 Z"/>
          </g>
          <path d="M0,110 C200,80 350,140 520,115 C700,90 820,135 1000,105 L1000,200 L0,200 Z" fill="#2b1a3d"/>
          <path d="M0,150 C250,125 450,170 650,150 C820,135 900,160 1000,145 L1000,200 L0,200 Z" fill="#1d1129"/>
          <defs><filter id="pglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter></defs>
          ${svgPumpkin(200, 150, 19, 13, 0)}${svgPumpkin(228, 158, 11, 8, -1)}
          ${svgPumpkin(560, 162, 13, 10, 1)}
          ${svgPumpkin(760, 152, 21, 14, 2)}${svgPumpkin(733, 160, 10, 7, -1)}${svgPumpkin(925, 166, 14, 10, 0)}
        </svg>`
    },

    // 3D surroundings: full moon, bats, bare trees, gravestones, glowing pumpkins, falling leaves
    scene(THREE, scene) {
      scene.fog = new THREE.Fog(0x1a0d2e, 16, 58);
      scene.add(new THREE.HemisphereLight(0xb9a0ff, 0x24163a, 0.9));
      const moonLight = new THREE.DirectionalLight(0xffe2b8, 0.55); moonLight.position.set(-6, 10, -8); scene.add(moonLight);
      themeSky(THREE, scene, ['#04010c', '#170a30', '#4a1a46', '#2a1240'], 400);

      // moon with a soft glow
      const moon = new THREE.Mesh(new THREE.SphereGeometry(4, 32, 16), new THREE.MeshBasicMaterial({ color: 0xfff1c8, fog: false }));
      moon.position.set(-16, 24, -46); scene.add(moon);
      const gc = document.createElement('canvas'); gc.width = gc.height = 128;
      const gx = gc.getContext('2d'), rg = gx.createRadialGradient(64, 64, 10, 64, 64, 64);
      rg.addColorStop(0, 'rgba(255,220,150,0.7)'); rg.addColorStop(0.4, 'rgba(255,170,80,0.25)'); rg.addColorStop(1, 'rgba(255,140,40,0)');
      gx.fillStyle = rg; gx.fillRect(0, 0, 128, 128);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(gc), blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
      glow.position.copy(moon.position); glow.scale.set(26, 26, 1); scene.add(glow);

      const ground = new THREE.Mesh(new THREE.CircleGeometry(60, 64), new THREE.MeshLambertMaterial({ color: 0x3a2f4a }));
      ground.rotation.x = -Math.PI / 2; scene.add(ground);
      const place = (o, r, a) => { o.position.set(Math.cos(a) * r, 0, Math.sin(a) * r); scene.add(o); };

      // bare, crooked trees
      const barkMat = new THREE.MeshLambertMaterial({ color: 0x2a1f24 });
      for (let i = 0; i < 34; i++) {
        const s = 0.9 + Math.random() * 1.4, t = new THREE.Group();
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07 * s, 0.16 * s, 2.4 * s, 6), barkMat);
        trunk.position.y = 1.2 * s; trunk.rotation.z = (Math.random() - 0.5) * 0.15; t.add(trunk);
        for (let k = 0; k < 4; k++) {
          const len = (0.6 + Math.random() * 0.6) * s, br = new THREE.Mesh(new THREE.CylinderGeometry(0.02 * s, 0.06 * s, len, 5), barkMat);
          const y = (1.2 + k * 0.32) * s, side = k % 2 ? 1 : -1, tilt = side * (0.6 + Math.random() * 0.5);
          br.position.set(Math.sin(tilt) * len / 2 * -1, y + Math.cos(tilt) * len / 2, 0); br.rotation.z = tilt;
          const holder = new THREE.Group(); holder.rotation.y = Math.random() * 6.283; holder.add(br); t.add(holder);
        }
        t.rotation.y = Math.random() * 6; place(t, 8 + Math.random() * 22, Math.random() * 6.283);
      }

      // gravestones
      const stoneMat = new THREE.MeshLambertMaterial({ color: 0x77738a });
      const slab = new THREE.BoxGeometry(0.5, 0.6, 0.12), top = new THREE.CylinderGeometry(0.25, 0.25, 0.12, 16, 1, false, 0, Math.PI);
      for (let i = 0; i < 14; i++) {
        const g = new THREE.Group(), s = 0.8 + Math.random() * 0.5;
        const a = new THREE.Mesh(slab, stoneMat); a.position.y = 0.3; g.add(a);
        const b = new THREE.Mesh(top, stoneMat); b.rotation.set(Math.PI / 2, Math.PI / 2, 0); b.position.y = 0.6; g.add(b);
        g.scale.setScalar(s); g.rotation.set((Math.random() - 0.5) * 0.2, 0, (Math.random() - 0.5) * 0.25);
        const ang = Math.random() * 6.283; place(g, 5 + Math.random() * 10, ang); g.rotation.y = -ang - Math.PI / 2;
      }

      // pumpkin patches: a few in each group, mostly carved and glowing, all facing the player
      for (let i = 0; i < 9; i++) {
        const ang = Math.random() * 6.283, r = 3.5 + Math.random() * 9, n = 1 + Math.floor(Math.random() * 3);
        const patch = new THREE.Group(); place(patch, r, ang); patch.lookAt(0, 0, 0);
        for (let k = 0; k < n; k++) {
          const carved = k === 0 || Math.random() < 0.4;
          const p = themePumpkin(THREE, {
            size: (k === 0 ? 1.1 : 0.6) + Math.random() * 0.6, carved,
            color: carved ? undefined : PUMPKIN_COLORS[Math.floor(Math.random() * PUMPKIN_COLORS.length)]
          });
          p.position.set(k === 0 ? 0 : (k === 1 ? -1 : 1) * (0.45 + Math.random() * 0.2), 0, k === 0 ? 0 : -0.15 - Math.random() * 0.3);
          p.rotation.y = carved ? (Math.random() - 0.5) * 0.5 : Math.random() * 6.283;
          patch.add(p);
        }
      }

      // bats circling overhead
      const batMat = new THREE.MeshBasicMaterial({ color: 0x0a0510, side: THREE.DoubleSide });
      const wingGeo = new THREE.BufferGeometry();
      wingGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, -0.08, 0.45, 0.05, 0.02, 0, 0, 0.1, 0.45, 0.05, 0.02, 0.3, -0.04, 0.12, 0, 0, 0.1]), 3));
      const bats = [];
      for (let i = 0; i < 10; i++) {
        const b = new THREE.Group(), wl = new THREE.Group(), wr = new THREE.Group();
        b.add(new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), batMat));
        wl.add(new THREE.Mesh(wingGeo, batMat)); wr.add(new THREE.Mesh(wingGeo, batMat)); wr.scale.x = -1;
        b.add(wl, wr); b.scale.setScalar(1.5 + Math.random());
        b.userData = { wl, wr, r: 8 + Math.random() * 14, h: 6 + Math.random() * 7, sp: (0.12 + Math.random() * 0.15) * (i % 2 ? 1 : -1), a: Math.random() * 6.283, f: 14 + Math.random() * 6 };
        scene.add(b); bats.push(b);
      }

      const fall = themeFall(THREE, scene, 220, [0xff8a1f, 0xd9541e, 0xffb42e, 0x8a3a12], 0.09, 0.9, 0.5);

      return function update(dt, t) {
        fall(dt, t);
        bats.forEach(b => {
          const u = b.userData; u.a += u.sp * dt;
          b.position.set(Math.cos(u.a) * u.r, u.h + Math.sin(t * 1.3 + u.r) * 0.6, Math.sin(u.a) * u.r);
          b.rotation.y = (u.sp > 0 ? Math.PI : 0) - u.a;   // head along the flight path
          const w = Math.sin(t * u.f) * 0.7; u.wl.rotation.z = w; u.wr.rotation.z = -w;
        });
        glow.material.opacity = 0.85 + Math.sin(t * 0.7) * 0.15;
      };
    },

    // a pumpkin head on a cloak, holding a pole for the answer sign (sign hangs at about y 1.7)
    monster(THREE, i) {
      const k = themeCache(this, () => ({
        cloak: [0x4b2a7a, 0x2f5a3a, 0x6a1f2a, 0x24305a].map(c => new THREE.MeshLambertMaterial({ color: c })),
        stick: new THREE.MeshLambertMaterial({ color: 0x3a2a1f }),
        cloakGeo: new THREE.ConeGeometry(0.36, 1.05, 16),
        arm: new THREE.CylinderGeometry(0.015, 0.02, 0.45, 6), pole: new THREE.CylinderGeometry(0.02, 0.02, 1.0, 6)
      }));
      const body = new THREE.Group();
      const add = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); body.add(m); return m; };
      add(k.cloakGeo, k.cloak[i % 4], 0, 0.52, 0);
      const head = themePumpkin(THREE, { size: 0.85, carved: true, face: i + Math.floor(Math.random() * 8), vine: false });
      head.position.y = 1.06 - head.userData.center; body.add(head);   // every monster gets its own face
      add(k.arm, k.stick, -0.3, 0.85, 0).rotation.z = 1.0;
      add(k.arm, k.stick, 0.26, 0.9, 0).rotation.z = -0.5;
      add(k.pole, k.stick, 0.4, 1.2, 0);
      return body;
    }
  }
};

/* ---------- shared helpers for the 3D scenes ---------- */

// gradient sky dome [top, upper, horizon, below] plus stars
function themeSky(THREE, scene, stops, stars) {
  const c = document.createElement('canvas'); c.width = 8; c.height = 256;
  const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, stops[0]); g.addColorStop(0.45, stops[1]); g.addColorStop(0.5, stops[2]); g.addColorStop(1, stops[3]);
  x.fillStyle = g; x.fillRect(0, 0, 8, 256);
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(80, 32, 16), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.BackSide, fog: false })));
  const p = new Float32Array(stars * 3);
  for (let i = 0; i < stars; i++) { const th = Math.random() * 6.283, ph = Math.random() * 1.41; p[i*3] = 70 * Math.sin(ph) * Math.cos(th); p[i*3+1] = 70 * Math.cos(ph) + 2; p[i*3+2] = 70 * Math.sin(ph) * Math.sin(th); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(p, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, fog: false })));
}

// falling particles (snow, leaves) around the player; returns the per-frame update
function themeFall(THREE, scene, n, colors, size, opacity, speed) {
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), cc = new THREE.Color();
  for (let i = 0; i < n; i++) {
    pos[i*3] = (Math.random() - 0.5) * 30; pos[i*3+1] = Math.random() * 12; pos[i*3+2] = (Math.random() - 0.5) * 30;
    cc.setHex(colors[i % colors.length]); col[i*3] = cc.r; col[i*3+1] = cc.g; col[i*3+2] = cc.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size, vertexColors: true, transparent: true, opacity })));
  return function (dt, t) {
    for (let i = 0; i < n; i++) {
      pos[i*3+1] -= dt * (0.35 + (i % 7) * 0.05) * speed; pos[i*3] += Math.sin(t * 0.8 + i) * dt * 0.08 / speed;
      if (pos[i*3+1] < 0) pos[i*3+1] = 12;
    }
    geo.attributes.position.needsUpdate = true;
  };
}

/* ---------- pumpkins (Halloween scenery and monster heads) ---------- */

const PUMPKIN_COLORS = ['#ff7a1a', '#f2600c', '#ffa030', '#efe6d2', '#8fa04a'];   // orange shades, white, green
// carved faces: [eyes, nose, mouth]
const PUMPKIN_FACES = [
  ['tri', 'tri', 'teeth'], ['angry', null, 'zigzag'], ['round', null, 'O'], ['happy', 'tri', 'smile'],
  ['tri', null, 'grin'], ['angry', 'tri', 'teeth'], ['round', 'tri', 'zigzag'], ['happy', null, 'grin']
];
const pumpkinStore = {};
const pumpkinCached = (key, build) => pumpkinStore[key] || (pumpkinStore[key] = build());

// ribbed, squashed sphere with a dimple on top; shape 0..2 = round, tall, flat
function pumpkinGeometry(THREE, shape) {
  return pumpkinCached('geo' + shape, () => {
    const [sy, depth] = [[0.8, 0.07], [0.95, 0.09], [0.66, 0.06]][shape];
    const g = new THREE.SphereGeometry(0.3, 48, 24), p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const lobe = 1 - depth * (1 - Math.sqrt(Math.abs(Math.sin(5 * Math.atan2(z, x)))));   // 10 ribs
      const t = Math.min(1, Math.hypot(x, z) / 0.3 * 2), dimple = 0.6 + 0.4 * t * t * (3 - 2 * t);
      p.setXYZ(i, x * lobe, y * sy * dimple, z * lobe);
    }
    g.computeVertexNormals(); g.computeBoundingBox();
    g.userData = { bottom: -g.boundingBox.min.y, top: 0.3 * sy * 0.6 };
    return g;
  });
}

// skin with darker grooves, and the carved face drawn where the sphere faces +z (u = 0.25)
function pumpkinMaterial(THREE, color, face) {
  return pumpkinCached('mat' + color + face, () => {
    const W = 1024, H = 512, skin = document.createElement('canvas'); skin.width = W; skin.height = H;
    const x = skin.getContext('2d');
    x.fillStyle = color; x.fillRect(0, 0, W, H);
    for (let k = 0; k < 10; k++) {   // grooves at u = k/10, matching the geometry
      const gx = k * W / 10, gr = x.createLinearGradient(gx - W / 20, 0, gx + W / 20, 0);
      gr.addColorStop(0, 'rgba(255,255,220,0.12)'); gr.addColorStop(0.42, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(60,15,0,0.45)');
      gr.addColorStop(0.58, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(255,255,220,0.12)');
      x.fillStyle = gr; x.fillRect(gx - W / 20, 0, W / 10, H);
    }
    const vg = x.createLinearGradient(0, 0, 0, H);
    vg.addColorStop(0, 'rgba(40,20,0,0.55)'); vg.addColorStop(0.25, 'rgba(0,0,0,0)'); vg.addColorStop(0.75, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(30,10,0,0.6)');
    x.fillStyle = vg; x.fillRect(0, 0, W, H);
    const map = new THREE.CanvasTexture(skin);
    if (face == null) return new THREE.MeshLambertMaterial({ map });

    const f = document.createElement('canvas'); f.width = W; f.height = H;
    drawPumpkinFace(f.getContext('2d'), PUMPKIN_FACES[face % PUMPKIN_FACES.length], 256, 240);
    x.drawImage(tinted(f, '#2a0c00'), 0, 0);              // carved holes look dark in daylight…
    const glow = document.createElement('canvas'); glow.width = W; glow.height = H;
    const gx = glow.getContext('2d'); gx.fillStyle = '#260900'; gx.fillRect(0, 0, W, H);
    gx.shadowColor = '#ff9a00'; gx.shadowBlur = 18; gx.drawImage(tinted(f, '#ffd23a'), 0, 0);   // …and glow from the candle inside
    return new THREE.MeshLambertMaterial({ map, emissive: 0xffffff, emissiveMap: new THREE.CanvasTexture(glow) });
  });
}
function tinted(src, color) {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const x = c.getContext('2d'); x.drawImage(src, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = color; x.fillRect(0, 0, c.width, c.height);
  return c;
}
// face around (cx, cy) on the texture; about 2.8 px per degree of the pumpkin's surface
function drawPumpkinFace(x, [eyes, nose, mouth], cx, cy) {
  x.fillStyle = '#fff';
  const poly = pts => { x.beginPath(); pts.forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.closePath(); x.fill(); };
  [-1, 1].forEach(o => {
    const ex = cx + o * 58, ey = cy - 38;
    if (eyes === 'tri') poly([[ex - 30, ey + 22], [ex + 30, ey + 22], [ex, ey - 28]]);
    if (eyes === 'round') { x.beginPath(); x.ellipse(ex, ey, 22, 27, 0, 0, 6.283); x.fill(); }
    if (eyes === 'angry') poly([[ex + o * 32, ey - 24], [ex - o * 26, ey], [ex + o * 6, ey + 24]]);
    if (eyes === 'happy') { x.beginPath(); x.arc(ex, ey + 14, 30, Math.PI, 0); x.arc(ex, ey + 14, 14, 0, Math.PI, true); x.fill(); }
  });
  if (nose === 'tri') poly([[cx - 14, cy + 12], [cx + 14, cy + 12], [cx, cy - 10]]);
  const my = cy + 42;
  if (mouth === 'smile' || mouth === 'teeth' || mouth === 'grin') {
    const w = mouth === 'grin' ? 112 : 88;
    x.beginPath(); x.moveTo(cx - w, my - 8); x.quadraticCurveTo(cx, my + 92, cx + w, my - 8); x.quadraticCurveTo(cx, my + 36, cx - w, my - 8); x.fill();
    x.globalCompositeOperation = 'destination-out';      // teeth stay as pumpkin skin
    if (mouth === 'teeth') { x.fillRect(cx - 34, my + 18, 20, 22); x.fillRect(cx + 16, my + 18, 20, 22); x.fillRect(cx - 9, my + 40, 18, 20); }
    if (mouth === 'grin') x.fillRect(cx - 12, my + 30, 24, 26);
    x.globalCompositeOperation = 'source-over';
  }
  if (mouth === 'zigzag') {
    const pts = [[cx - 96, my]];
    for (let k = 0; k <= 8; k++) pts.push([cx - 96 + k * 24, my + (k % 2 ? 22 : 44) + Math.sin(k / 8 * Math.PI) * 18]);
    pts.push([cx + 96, my]);
    for (let k = 8; k >= 0; k--) pts.push([cx - 96 + k * 24, my + (k % 2 ? 0 : 18) + Math.sin(k / 8 * Math.PI) * 12]);
    poly(pts);
  }
  if (mouth === 'O') { x.beginPath(); x.ellipse(cx, my + 24, 28, 34, 0, 0, 6.283); x.fill(); }
}

// a pumpkin standing on y = 0, carved face toward +z; userData.center = height of its middle
function themePumpkin(THREE, { size = 1, carved = true, color, face, shape, vine = true } = {}) {
  const g = new THREE.Group();
  shape = shape == null ? Math.floor(Math.random() * 3) : shape;
  color = color || PUMPKIN_COLORS[Math.floor(Math.random() * 3)];
  face = carved ? (face == null ? Math.floor(Math.random() * PUMPKIN_FACES.length) : face % PUMPKIN_FACES.length) : null;
  const geo = pumpkinGeometry(THREE, shape), body = new THREE.Mesh(geo, pumpkinMaterial(THREE, color, face));
  body.position.y = geo.userData.bottom; g.add(body);
  // curved stem, sometimes with a curly vine
  const k = Math.floor(Math.random() * 2);
  const stemGeo = pumpkinCached('stem' + k, () => {
    const s = new THREE.CylinderGeometry(0.022, 0.045, 0.16, 7, 6), p = s.attributes.position;
    for (let i = 0; i < p.count; i++) { const h = p.getY(i) + 0.08; p.setX(i, p.getX(i) + (k ? 1.6 : 0.9) * h * h); }
    s.computeVertexNormals(); s.translate(0, 0.07, 0); return s;
  });
  const stemMat = pumpkinCached('stemMat' + k, () => new THREE.MeshLambertMaterial({ color: k ? 0x6b5a2a : 0x4a6b2a }));
  const stem = new THREE.Mesh(stemGeo, stemMat);
  stem.position.y = geo.userData.bottom + geo.userData.top - 0.01; stem.rotation.y = Math.random() * 6.283; g.add(stem);
  if (vine && Math.random() < 0.6) {
    const v = new THREE.Mesh(pumpkinCached('vine', () => new THREE.TorusGeometry(0.07, 0.007, 5, 20, Math.PI * 1.6)),
      pumpkinCached('vineMat', () => new THREE.MeshLambertMaterial({ color: 0x3d6b2a })));
    v.position.set(0.05, stem.position.y + 0.04, 0); v.rotation.set(Math.PI / 2 + 0.3, 0, Math.random() * 6.283); g.add(v);
  }
  g.scale.setScalar(size);
  g.userData.center = geo.userData.bottom * size;
  return g;
}

// a flat pumpkin for the home-screen landscape; face -1 = not carved
function svgPumpkin(cx, cy, rx, ry, face) {
  const dark = face < 0 ? '#c9551b' : '#d9571a', light = face < 0 ? '#e8742a' : '#ff7a1a';
  const sx = rx / 20, sy = ry / 14, P = (x, y) => `${(cx + x * sx).toFixed(1)},${(cy + y * sy).toFixed(1)}`;
  const faces = [
    `M${P(-10, -3)} L${P(-4, -3)} L${P(-7, -9)} Z M${P(4, -3)} L${P(10, -3)} L${P(7, -9)} Z M${P(-11, 2)} Q${P(0, 14)} ${P(11, 2)} Q${P(0, 7)} ${P(-11, 2)} Z`,
    `M${P(-11, -8)} L${P(-3, -4)} L${P(-9, -2)} Z M${P(11, -8)} L${P(3, -4)} L${P(9, -2)} Z M${P(-11, 2)} L${P(-7, 7)} L${P(-3, 4)} L${P(0, 8)} L${P(3, 4)} L${P(7, 7)} L${P(11, 2)} L${P(0, 5)} Z`,
    `M${P(-11, -3)} Q${P(-7, -10)} ${P(-3, -3)} Z M${P(3, -3)} Q${P(7, -10)} ${P(11, -3)} Z M${P(-13, 1)} Q${P(0, 15)} ${P(13, 1)} Q${P(0, 6)} ${P(-13, 1)} Z`
  ];
  const f = faces[face];
  return `<g>
    <path d="M${P(-1, -13)} Q${P(0, -19)} ${P(4, -21)} L${P(5, -19)} Q${P(2, -17)} ${P(2, -13)} Z" fill="#4a6b2a"/>
    <ellipse cx="${cx - rx * 0.45}" cy="${cy}" rx="${rx * 0.55}" ry="${ry}" fill="${dark}"/>
    <ellipse cx="${cx + rx * 0.45}" cy="${cy}" rx="${rx * 0.55}" ry="${ry}" fill="${dark}"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.55}" ry="${ry * 1.02}" fill="${light}"/>
    ${f ? `<path d="${f}" fill="#ffb000" filter="url(#pglow)"/><path d="${f}" fill="#ffe14a"/>` : ''}
  </g>`;
}

// materials and geometries a theme builds once and reuses for every monster
function themeCache(theme, build) { return theme._cache || (theme._cache = build()); }

/* ---------- which theme is active ---------- */

function themaOpDatum(d) {
  const md = (d.getMonth() + 1) * 100 + d.getDate();
  const hit = Object.keys(THEMAS).find(k => {
    const p = THEMAS[k].periode; if (!p) return false;
    const from = p.van[0] * 100 + p.van[1], to = p.tot[0] * 100 + p.tot[1];
    return from <= to ? md >= from && md <= to : md >= from || md <= to;   // a period may run over new year
  });
  return hit || Object.keys(THEMAS)[0];
}
// the theme picked on the home screen ('auto' or empty = follow STANDAARD_THEMA)
function gekozenThema() { try { return localStorage.getItem('thema') || 'auto'; } catch (e) { return 'auto'; } }
function kiesThema(naam) { try { if (naam && naam !== 'auto') localStorage.setItem('thema', naam); else localStorage.removeItem('thema'); } catch (e) {} }

const THEMA_NAAM = (function () {
  const want = new URLSearchParams(location.search).get('thema');
  if (want && THEMAS[want]) { kiesThema(want); return want; }
  const stored = gekozenThema();
  if (THEMAS[stored]) return stored;
  const std = typeof STANDAARD_THEMA === 'string' ? STANDAARD_THEMA : 'auto';   // settings.js may be missing
  return THEMAS[std] ? std : themaOpDatum(new Date());
})();
const THEMA = THEMAS[THEMA_NAAM];

// page colors follow the theme
(function () {
  const root = document.documentElement;
  Object.keys(THEMA.vars).forEach(k => root.style.setProperty(k, THEMA.vars[k]));
  root.dataset.thema = THEMA_NAAM;
})();
