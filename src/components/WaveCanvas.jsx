import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WaveCanvas() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const W = mount.clientWidth;
        const H = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
        camera.position.z = 80;
        camera.position.y = 30;
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Particles organized in a grid to form a wave
        const countX = 60;
        const countZ = 40;
        const spacing = 4;
        const totalCount = countX * countZ;
        const positions = new Float32Array(totalCount * 3);
        const colors = new Float32Array(totalCount * 3);

        const colorGold = new THREE.Color('#c9a84c');
        const colorBlue = new THREE.Color('#8aaec9');

        let i = 0;
        for (let ix = 0; ix < countX; ix++) {
            for (let iz = 0; iz < countZ; iz++) {
                // x, y, z
                positions[i * 3] = (ix - countX / 2) * spacing;
                positions[i * 3 + 1] = 0; // updated in animation loop
                positions[i * 3 + 2] = (iz - countZ / 2) * spacing;

                // Mix colors based on position
                const mixedColor = colorGold.clone().lerp(colorBlue, ix / countX);
                colors[i * 3] = mixedColor.r;
                colors[i * 3 + 1] = mixedColor.g;
                colors[i * 3 + 2] = mixedColor.b;

                i++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Circular particle texture
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(201,168,76,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 1.5,
            map: texture,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const onResize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        let t = 0;
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            t += 0.03;

            const posAttribute = geometry.attributes.position;
            let i = 0;
            for (let ix = 0; ix < countX; ix++) {
                for (let iz = 0; iz < countZ; iz++) {
                    // Complex sine wave function
                    posAttribute.array[i * 3 + 1] =
                        Math.sin((ix + t) * 0.3) * 5 +
                        Math.sin((iz + t) * 0.5) * 5;
                    i++;
                }
            }
            posAttribute.needsUpdate = true;

            particles.rotation.y = Math.sin(t * 0.1) * 0.1;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
    );
}
