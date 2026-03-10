import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Individual Arabic alphabet letters
const ARABIC_LETTERS = [
    'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ',
    'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق',
    'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي',
    'لا', 'ة', 'ء', 'ى',
];

// Arabic calligraphy words (smaller, background layer)
const ARABIC_WORDS = [
    'الخطّ', 'جمال', 'نور', 'روح', 'قلم',
    'حِكمة', 'فنّ', 'حبر', 'أصالة', 'أبديّة',
];

function makeLetterSprite(char, size, color, opacity) {
    const dim = 256;
    const c = document.createElement('canvas');
    c.width = dim;
    c.height = dim;
    const ctx = c.getContext('2d');

    // Subtle radial glow behind the letter
    const grd = ctx.createRadialGradient(dim / 2, dim / 2, 0, dim / 2, dim / 2, dim / 2);
    grd.addColorStop(0, `${color}22`);
    grd.addColorStop(0.5, `${color}08`);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, dim, dim);

    ctx.font = `${size}px "Amiri", "Traditional Arabic", "Arial Unicode MS", serif`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.direction = 'rtl';
    ctx.fillText(char, dim / 2, dim / 2 + 8);

    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({
        map: tex, transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    return new THREE.Sprite(mat);
}

function makeWordSprite(word, color, opacity) {
    const c = document.createElement('canvas');
    c.width = 384;
    c.height = 128;
    const ctx = c.getContext('2d');
    ctx.font = `italic 52px "Amiri", serif`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.direction = 'rtl';
    ctx.fillText(word, 192, 64);
    const tex = new THREE.CanvasTexture(c);
    return new THREE.Sprite(new THREE.SpriteMaterial({
        map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
}

export default function ParticleCanvas() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;
        let animId, _cleanup;

        document.fonts.ready.then(() => {
            const W = mount.clientWidth;
            const H = mount.clientHeight;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000);
            camera.position.z = 600;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(W, H);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            mount.appendChild(renderer.domElement);

            // ── Particle field ──────────────────────────────────────────────
            const COUNT = 3000;
            const pos = new Float32Array(COUNT * 3);
            const col = new Float32Array(COUNT * 3);
            const sz = new Float32Array(COUNT);
            const pal = [
                new THREE.Color('#c9a84c'), new THREE.Color('#f0d080'),
                new THREE.Color('#8aaec9'), new THREE.Color('#ffffff'),
            ];
            for (let i = 0; i < COUNT; i++) {
                pos[i * 3] = (Math.random() - .5) * 2000;
                pos[i * 3 + 1] = (Math.random() - .5) * 1500;
                pos[i * 3 + 2] = (Math.random() - .5) * 800;
                const c2 = pal[Math.floor(Math.random() * pal.length)];
                col[i * 3] = c2.r; col[i * 3 + 1] = c2.g; col[i * 3 + 2] = c2.b;
                sz[i] = Math.random() * 3 + 0.5;
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
            geo.setAttribute('size', new THREE.BufferAttribute(sz, 1));

            const glowC = document.createElement('canvas'); glowC.width = glowC.height = 64;
            const gc = glowC.getContext('2d');
            const gg = gc.createRadialGradient(32, 32, 0, 32, 32, 32);
            gg.addColorStop(0, 'rgba(255,255,255,1)'); gg.addColorStop(.4, 'rgba(255,255,255,.4)'); gg.addColorStop(1, 'rgba(255,255,255,0)');
            gc.fillStyle = gg; gc.fillRect(0, 0, 64, 64);

            const particles = new THREE.Points(geo, new THREE.PointsMaterial({
                size: 4, map: new THREE.CanvasTexture(glowC), vertexColors: true,
                transparent: true, opacity: .85, sizeAttenuation: true,
                depthWrite: false, blending: THREE.AdditiveBlending,
            }));
            scene.add(particles);

            // ── Constellation lines ─────────────────────────────────────────
            const lPts = [];
            for (let i = 0; i < 120; i++) {
                const ax = (Math.random() - .5) * 1600, ay = (Math.random() - .5) * 1000, az = (Math.random() - .5) * 400;
                lPts.push(new THREE.Vector3(ax, ay, az));
                lPts.push(new THREE.Vector3(ax + (Math.random() - .5) * 200, ay + (Math.random() - .5) * 200, az + (Math.random() - .5) * 100));
            }
            const lines = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(lPts),
                new THREE.LineBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: .06, blending: THREE.AdditiveBlending })
            );
            scene.add(lines);

            // ── LAYER 1: Large floating Arabic individual letters ───────────
            const letterGroup = new THREE.Group();
            const letterData = [];

            ARABIC_LETTERS.forEach((letter, i) => {
                const isGold = i % 3 !== 2;
                const color = isGold ? '#c9a84c' : '#8aaec9';
                const opacity = 0.22 + Math.random() * 0.28;   // 0.22 – 0.50
                const fontSize = 140 + Math.random() * 80;       // 140 – 220 px on canvas
                const sprite = makeLetterSprite(letter, fontSize, color, opacity);

                // Scatter across a wide 3D field
                const angle = (i / ARABIC_LETTERS.length) * Math.PI * 2;
                const radius = 180 + Math.random() * 620;
                const x = Math.cos(angle + Math.random() * .6) * radius * (0.5 + Math.random() * .7);
                const y = (Math.random() - 0.5) * 1200;
                const z = (Math.random() - 0.5) * 500 - 60;
                sprite.position.set(x, y, z);

                // World scale: some big, some small
                const worldScale = 55 + Math.random() * 85;
                sprite.scale.set(worldScale, worldScale, 1);

                letterGroup.add(sprite);
                letterData.push({
                    sprite,
                    baseX: x, baseY: y,
                    floatSpeedX: 0.00015 + Math.random() * 0.0004,
                    floatSpeedY: 0.00012 + Math.random() * 0.0003,
                    phaseX: Math.random() * Math.PI * 2,
                    phaseY: Math.random() * Math.PI * 2,
                    ampX: 30 + Math.random() * 55,
                    ampY: 20 + Math.random() * 40,
                });
            });
            scene.add(letterGroup);

            // ── LAYER 2: Smaller floating Arabic words (deeper background) ──
            const wordGroup = new THREE.Group();
            const wordData = [];

            ARABIC_WORDS.forEach((word, i) => {
                const isGold = i % 2 === 0;
                const color = isGold ? '#c9a84c' : '#8aaec9';
                const opacity = 0.12 + Math.random() * 0.14;
                const sprite = makeWordSprite(word, color, opacity);

                const x = (Math.random() - 0.5) * 1800;
                const y = (Math.random() - 0.5) * 1300;
                const z = (Math.random() - 0.5) * 200 - 150;
                sprite.position.set(x, y, z);

                const ws = 70 + Math.random() * 60;
                sprite.scale.set(ws * 2.2, ws, 1);

                wordGroup.add(sprite);
                wordData.push({
                    sprite, baseX: x, baseY: y,
                    spd: 0.0001 + Math.random() * 0.0002,
                    phase: Math.random() * Math.PI * 2,
                    amp: 18 + Math.random() * 30,
                });
            });
            scene.add(wordGroup);

            // ── Mouse parallax ──────────────────────────────────────────────
            let mouseX = 0, mouseY = 0;
            const onMouse = e => {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            };
            window.addEventListener('mousemove', onMouse);

            const onResize = () => {
                const w = mount.clientWidth, h = mount.clientHeight;
                camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
            };
            window.addEventListener('resize', onResize);

            // ── Animation loop ──────────────────────────────────────────────
            let t = 0;
            const animate = () => {
                animId = requestAnimationFrame(animate);
                t += 0.0004;

                particles.rotation.y = t * 0.15;
                particles.rotation.x = t * 0.05;
                lines.rotation.y = t * 0.10;

                // Float individual letters with independent X/Y sine waves
                letterData.forEach(d => {
                    d.sprite.position.x = d.baseX + Math.sin(t * d.floatSpeedX * 1000 + d.phaseX) * d.ampX;
                    d.sprite.position.y = d.baseY + Math.cos(t * d.floatSpeedY * 1000 + d.phaseY) * d.ampY;
                });

                // Float background words
                wordData.forEach(d => {
                    const ft = t * d.spd * 1000;
                    d.sprite.position.x = d.baseX + Math.sin(ft + d.phase) * d.amp;
                    d.sprite.position.y = d.baseY + Math.cos(ft * .8 + d.phase) * (d.amp * .6);
                });

                // Slow gentle tilt of the whole letter field
                letterGroup.rotation.z = Math.sin(t * 0.25) * 0.03;
                wordGroup.rotation.z = Math.sin(t * 0.18 + 1) * 0.025;

                // Camera parallax toward mouse
                camera.position.x += (mouseX * 60 - camera.position.x) * 0.02;
                camera.position.y += (-mouseY * 40 - camera.position.y) * 0.02;
                camera.lookAt(scene.position);

                renderer.render(scene, camera);
            };
            animate();

            _cleanup = () => {
                cancelAnimationFrame(animId);
                window.removeEventListener('mousemove', onMouse);
                window.removeEventListener('resize', onResize);
                renderer.dispose();
                if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
            };
        });

        return () => { if (_cleanup) _cleanup(); };
    }, []);

    return (
        <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
    );
}
