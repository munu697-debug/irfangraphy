import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * InkCanvas — A self-contained Three.js ink-particle burst
 * that activates when the section scrolls into view.
 * Position: absolute behind the section content.
 */
export default function InkCanvas() {
    const mountRef = useRef(null);
    const activeRef = useRef(false);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const W = mount.clientWidth;
        const H = mount.clientHeight;

        // ── Scene ──────────────────────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000);
        camera.position.z = 500;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // ── Ink drop glow texture ──────────────────────────────────────────
        const tc = document.createElement('canvas');
        tc.width = tc.height = 64;
        const tCtx = tc.getContext('2d');
        const tg = tCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        tg.addColorStop(0, 'rgba(201,168,76,1)');
        tg.addColorStop(0.3, 'rgba(201,168,76,0.6)');
        tg.addColorStop(1, 'rgba(201,168,76,0)');
        tCtx.fillStyle = tg;
        tCtx.fillRect(0, 0, 64, 64);
        const dropTex = new THREE.CanvasTexture(tc);

        // ── Ink particle pool: 600 particles ──────────────────────────────
        const COUNT = 600;
        const posArr = new Float32Array(COUNT * 3);
        const velArr = []; // { vx, vy, vz, life, maxLife }
        const colArr = new Float32Array(COUNT * 3);
        const szArr = new Float32Array(COUNT);

        // Colour palette: gold, soft white, faint blue
        const paletteCols = [
            [0.788, 0.659, 0.298], // #c9a84c gold
            [0.941, 0.816, 0.502], // #f0d080 bright gold
            [0.541, 0.682, 0.788], // #8aaec9 soft blue
            [1.0, 1.0, 1.0], // white
        ];

        for (let i = 0; i < COUNT; i++) {
            posArr[i * 3] = posArr[i * 3 + 1] = posArr[i * 3 + 2] = 0;
            velArr.push({ vx: 0, vy: 0, vz: 0, life: 0, maxLife: 1 });

            const pc = paletteCols[Math.floor(Math.random() * paletteCols.length)];
            colArr[i * 3] = pc[0]; colArr[i * 3 + 1] = pc[1]; colArr[i * 3 + 2] = pc[2];
            szArr[i] = 0;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(szArr, 1));

        const mat = new THREE.PointsMaterial({
            size: 6, map: dropTex, vertexColors: true,
            transparent: true, opacity: 0.9,
            sizeAttenuation: true, depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        // ── Burst function: trigger a fountain of ink drops ────────────────
        let burstCount = 0;
        const burst = (originX = 0, originY = 0) => {
            for (let i = 0; i < COUNT; i++) {
                if (velArr[i].life <= 0) {
                    // Spawn from a horizontal line spread (like ink on paper)
                    const spawnX = (Math.random() - 0.5) * 600;
                    const spawnY = originY + (Math.random() - 0.5) * 20;
                    posArr[i * 3] = spawnX;
                    posArr[i * 3 + 1] = spawnY;
                    posArr[i * 3 + 2] = (Math.random() - 0.5) * 100;

                    const speed = 0.5 + Math.random() * 2.5;
                    const angle = Math.random() * Math.PI * 2;
                    const lift = Math.random() * 1.8 + 0.4; // slight upward bias
                    velArr[i].vx = Math.cos(angle) * speed * 0.5;
                    velArr[i].vy = lift;
                    velArr[i].vz = (Math.random() - 0.5) * 0.5;
                    velArr[i].maxLife = 80 + Math.random() * 120;
                    velArr[i].life = velArr[i].maxLife;

                    szArr[i] = 3 + Math.random() * 8;
                }
            }
            geo.attributes.size.needsUpdate = true;
        };

        // ── Ripple ring to visualize the ink spread ────────────────────────
        const ringGeom = new THREE.RingGeometry(0, 1, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xc9a84c, side: THREE.DoubleSide,
            transparent: true, opacity: 0, wireframe: true,
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = -Math.PI / 2;
        scene.add(ring);

        let ringRadius = 0, ringActive = false;

        // ── Intersection Observer: trigger on scroll ──────────────────────
        let triggered = false;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !triggered) {
                    triggered = true;
                    activeRef.current = true;
                    // Multiple staggered bursts for a dramatic reveal
                    burst(0, 0);
                    setTimeout(() => burst(0, 60), 300);
                    setTimeout(() => burst(0, -60), 600);
                    // Activate ripple ring
                    ringActive = true;
                }
            });
        }, { threshold: 0.35 });

        observer.observe(mount);

        // ── Resize ─────────────────────────────────────────────────────────
        const onResize = () => {
            const w = mount.clientWidth, h = mount.clientHeight;
            camera.aspect = w / h; camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        // ── Animation loop ──────────────────────────────────────────────────
        let animId, t = 0;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            t++;

            if (activeRef.current) {
                let anyAlive = false;
                for (let i = 0; i < COUNT; i++) {
                    if (velArr[i].life > 0) {
                        anyAlive = true;
                        velArr[i].life--;

                        // Gravity + drag
                        velArr[i].vy -= 0.012;
                        velArr[i].vx *= 0.985;
                        velArr[i].vy *= 0.985;

                        posArr[i * 3] += velArr[i].vx;
                        posArr[i * 3 + 1] += velArr[i].vy;
                        posArr[i * 3 + 2] += velArr[i].vz;

                        // Fade out
                        const life01 = velArr[i].life / velArr[i].maxLife;
                        szArr[i] = (3 + Math.random() * 5) * life01;
                    } else {
                        szArr[i] = 0;
                    }
                }
                geo.attributes.position.needsUpdate = true;
                geo.attributes.size.needsUpdate = true;

                // Ripple ring expand
                if (ringActive) {
                    ringRadius += 4;
                    ring.scale.set(ringRadius, ringRadius, 1);
                    ringMat.opacity = Math.max(0, 0.4 - ringRadius / 500);
                    if (ringRadius > 500) { ringActive = false; ringMat.opacity = 0; }
                }

                // Continuously re-trigger with fresh gentle bursts while alive
                if (anyAlive && t % 180 === 0) {
                    burst(0, (Math.random() - 0.5) * 80);
                }
            }

            // Very gentle ambient rotation of ink cloud
            points.rotation.z = Math.sin(t * 0.003) * 0.04;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div ref={mountRef} style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            zIndex: 0, pointerEvents: 'none',
        }} />
    );
}
