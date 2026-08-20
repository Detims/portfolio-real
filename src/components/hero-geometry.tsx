import { useEffect, useRef } from "react";
import * as THREE from "three";

const MAX_PIXEL_RATIO = 1.5;
const DESKTOP_PARTICLE_COUNT = 18_000;
const COMPACT_PARTICLE_COUNT = 6_000;
const POINTER_RADIUS = 1.15;
const POINTER_FORCE = 0.026;
const RETURN_FORCE = 0.006;
const VELOCITY_DAMPING = 0.91;

function createParticleTexture() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 64;
    canvas.height = 64;

    if (context) {
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.28, "rgba(229, 231, 255, 0.95)");
        gradient.addColorStop(0.62, "rgba(129, 140, 248, 0.42)");
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function createSeededRandom(seed: number) {
    let state = seed >>> 0;

    return () => {
        state += 0x6d2b79f5;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
    };
}

export function HeroGeometry() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;

        if (!mount) {
            return;
        }

        const reducedMotionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
        const isCompact = coarsePointerQuery.matches || mount.clientWidth < 768;
        const particleCount = isCompact
            ? COMPACT_PARTICLE_COUNT
            : DESKTOP_PARTICLE_COUNT;

        let renderer: THREE.WebGLRenderer;

        try {
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: !isCompact,
                powerPreference: "high-performance",
            });
        } catch {
            return;
        }

        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO),
        );
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.style.display = "block";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.width = "100%";
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0, 7.5);

        const sourceGeometry = new THREE.IcosahedronGeometry(2.25, 1);
        const samplingGeometry = sourceGeometry.index
            ? sourceGeometry.toNonIndexed()
            : sourceGeometry;
        const sourcePositions = samplingGeometry.getAttribute("position");
        const triangleCount = sourcePositions.count / 3;
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const random = createSeededRandom(0x1c05a);
        const color = new THREE.Color();

        for (let particle = 0; particle < particleCount; particle += 1) {
            const triangle = Math.floor(random() * triangleCount) * 3;
            let barycentricU = random();
            let barycentricV = random();

            if (barycentricU + barycentricV > 1) {
                barycentricU = 1 - barycentricU;
                barycentricV = 1 - barycentricV;
            }

            const ax = sourcePositions.getX(triangle);
            const ay = sourcePositions.getY(triangle);
            const az = sourcePositions.getZ(triangle);
            const bx = sourcePositions.getX(triangle + 1);
            const by = sourcePositions.getY(triangle + 1);
            const bz = sourcePositions.getZ(triangle + 1);
            const cx = sourcePositions.getX(triangle + 2);
            const cy = sourcePositions.getY(triangle + 2);
            const cz = sourcePositions.getZ(triangle + 2);
            const positionIndex = particle * 3;

            positions[positionIndex] =
                ax + barycentricU * (bx - ax) + barycentricV * (cx - ax);
            positions[positionIndex + 1] =
                ay + barycentricU * (by - ay) + barycentricV * (cy - ay);
            positions[positionIndex + 2] =
                az + barycentricU * (bz - az) + barycentricV * (cz - az);
            originalPositions[positionIndex] = positions[positionIndex];
            originalPositions[positionIndex + 1] = positions[positionIndex + 1];
            originalPositions[positionIndex + 2] = positions[positionIndex + 2];

            color.setHSL(
                0.62 + random() * 0.085,
                0.82 + random() * 0.14,
                0.58 + random() * 0.15,
            );
            colors[positionIndex] = color.r;
            colors[positionIndex + 1] = color.g;
            colors[positionIndex + 2] = color.b;
        }

        if (samplingGeometry !== sourceGeometry) {
            samplingGeometry.dispose();
        }
        sourceGeometry.dispose();

        const particleGeometry = new THREE.BufferGeometry();
        const positionAttribute = new THREE.BufferAttribute(positions, 3);
        positionAttribute.setUsage(THREE.DynamicDrawUsage);
        particleGeometry.setAttribute("position", positionAttribute);
        particleGeometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3),
        );
        particleGeometry.computeBoundingSphere();

        const particleTexture = createParticleTexture();
        const particleMaterial = new THREE.PointsMaterial({
            alphaTest: 0.001,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            map: particleTexture,
            opacity: reducedMotionQuery.matches ? 0.78 : 0,
            size: isCompact ? 0.042 : 0.034,
            sizeAttenuation: true,
            transparent: true,
            vertexColors: true,
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particles.rotation.set(-0.16, 0.34, 0.07);
        scene.add(particles);

        const interactionGeometry = new THREE.IcosahedronGeometry(2.25, 1);
        const interactionMaterial = new THREE.MeshBasicMaterial({
            visible: false,
        });
        const interactionMesh = new THREE.Mesh(
            interactionGeometry,
            interactionMaterial,
        );
        const pointer = new THREE.Vector2(2, 2);
        const pointerLocalPosition = new THREE.Vector3();
        const raycaster = new THREE.Raycaster();
        const clock = new THREE.Clock();

        let animationFrame = 0;
        let pointerIsWithinHero = false;
        let reducedMotion = reducedMotionQuery.matches;
        let fadeStartedAt = 0;
        let activeParticleCount = particleCount;

        const renderStaticFrame = () => {
            positions.set(originalPositions);
            velocities.fill(0);
            positionAttribute.needsUpdate = true;
            particles.rotation.set(-0.16, 0.34, 0.07);
            particleMaterial.opacity = 0.78;
            renderer.render(scene, camera);
        };

        const updateSize = () => {
            const width = Math.max(mount.clientWidth, 1);
            const height = Math.max(mount.clientHeight, 1);
            const heightScale = THREE.MathUtils.clamp(height / 760, 0.72, 1);

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
            activeParticleCount =
                width < 768
                    ? Math.min(COMPACT_PARTICLE_COUNT, particleCount)
                    : particleCount;
            particleGeometry.setDrawRange(0, activeParticleCount);
            particleMaterial.size = width < 768 ? 0.042 : 0.034;
            particles.scale.setScalar((width < 768 ? 0.73 : 1) * heightScale);

            if (reducedMotion) {
                renderStaticFrame();
            }
        };

        const handlePointerMove = (event: PointerEvent) => {
            const bounds = mount.getBoundingClientRect();
            const isInside =
                event.clientX >= bounds.left &&
                event.clientX <= bounds.right &&
                event.clientY >= bounds.top &&
                event.clientY <= bounds.bottom;

            pointerIsWithinHero = isInside;

            if (!isInside || bounds.width === 0 || bounds.height === 0) {
                pointer.set(2, 2);
                return;
            }

            pointer.set(
                ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
                -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
            );
        };

        const deactivatePointer = () => {
            pointerIsWithinHero = false;
            pointer.set(2, 2);
        };

        const animate = (time: number) => {
            animationFrame = 0;

            if (reducedMotion) {
                renderStaticFrame();
                return;
            }

            const frameScale = Math.min(clock.getDelta() * 60, 2);
            const elapsed = clock.elapsedTime;
            particleMaterial.opacity = Math.min(
                0.8,
                ((time - fadeStartedAt) / 1_300) * 0.8,
            );
            particles.rotation.y = 0.34 + elapsed * 0.045;
            particles.rotation.x = -0.16 + Math.sin(elapsed * 0.2) * 0.025;
            particles.rotation.z = 0.07 + Math.sin(elapsed * 0.16) * 0.018;

            let pointerIsActive = false;

            if (pointerIsWithinHero && !coarsePointerQuery.matches) {
                particles.updateMatrixWorld();
                interactionMesh.matrixWorld.copy(particles.matrixWorld);
                raycaster.setFromCamera(pointer, camera);
                const intersection = raycaster.intersectObject(
                    interactionMesh,
                    false,
                )[0];
                pointerIsActive = Boolean(intersection);

                if (intersection) {
                    pointerLocalPosition.copy(intersection.point);
                    particles.worldToLocal(pointerLocalPosition);
                }
            }

            const activePositionLength = activeParticleCount * 3;

            for (let index = 0; index < activePositionLength; index += 3) {
                let velocityX = velocities[index];
                let velocityY = velocities[index + 1];
                let velocityZ = velocities[index + 2];

                if (pointerIsActive) {
                    const offsetX = positions[index] - pointerLocalPosition.x;
                    const offsetY = positions[index + 1] - pointerLocalPosition.y;
                    const offsetZ = positions[index + 2] - pointerLocalPosition.z;
                    const distanceSquared =
                        offsetX * offsetX +
                        offsetY * offsetY +
                        offsetZ * offsetZ;

                    if (
                        distanceSquared > 0.0001 &&
                        distanceSquared < POINTER_RADIUS * POINTER_RADIUS
                    ) {
                        const distance = Math.sqrt(distanceSquared);
                        const force =
                            (1 - distance / POINTER_RADIUS) *
                            POINTER_FORCE *
                            frameScale;
                        velocityX += (offsetX / distance) * force;
                        velocityY += (offsetY / distance) * force;
                        velocityZ += (offsetZ / distance) * force;
                    }
                }

                velocityX +=
                    (originalPositions[index] - positions[index]) *
                    RETURN_FORCE *
                    frameScale;
                velocityY +=
                    (originalPositions[index + 1] - positions[index + 1]) *
                    RETURN_FORCE *
                    frameScale;
                velocityZ +=
                    (originalPositions[index + 2] - positions[index + 2]) *
                    RETURN_FORCE *
                    frameScale;

                const damping = Math.pow(VELOCITY_DAMPING, frameScale);
                velocityX *= damping;
                velocityY *= damping;
                velocityZ *= damping;
                velocities[index] = velocityX;
                velocities[index + 1] = velocityY;
                velocities[index + 2] = velocityZ;
                positions[index] += velocityX * frameScale;
                positions[index + 1] += velocityY * frameScale;
                positions[index + 2] += velocityZ * frameScale;
            }

            positionAttribute.needsUpdate = true;
            renderer.render(scene, camera);
            animationFrame = window.requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (!reducedMotion && animationFrame === 0) {
                clock.start();
                fadeStartedAt = performance.now();
                animationFrame = window.requestAnimationFrame(animate);
            }
        };

        const handleMotionPreferenceChange = (
            event: MediaQueryListEvent,
        ) => {
            reducedMotion = event.matches;

            if (reducedMotion) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = 0;
                deactivatePointer();
                renderStaticFrame();
            } else {
                particleMaterial.opacity = 0;
                startAnimation();
            }
        };

        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(mount);
        reducedMotionQuery.addEventListener(
            "change",
            handleMotionPreferenceChange,
        );

        if (!coarsePointerQuery.matches) {
            window.addEventListener("pointermove", handlePointerMove, {
                passive: true,
            });
            window.addEventListener("blur", deactivatePointer);
            document.documentElement.addEventListener(
                "pointerleave",
                deactivatePointer,
            );
        }

        updateSize();

        if (reducedMotion) {
            renderStaticFrame();
        } else {
            startAnimation();
        }

        return () => {
            window.cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            reducedMotionQuery.removeEventListener(
                "change",
                handleMotionPreferenceChange,
            );
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("blur", deactivatePointer);
            document.documentElement.removeEventListener(
                "pointerleave",
                deactivatePointer,
            );

            particleGeometry.dispose();
            particleMaterial.dispose();
            particleTexture.dispose();
            interactionGeometry.dispose();
            interactionMaterial.dispose();
            renderer.dispose();
            renderer.forceContextLoss();
            renderer.domElement.remove();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        />
    );
}
