import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { AmmoPhysics } from "../lib/ammo-physics.js";

type MahjongTile = {
    body: THREE.Mesh;
    face: THREE.Mesh;
};

const TILE_WIDTH = 0.4;
const TILE_THICKNESS = 0.32;
const TILE_LENGTH = 0.5;

const SPAWN_INTERVAL = 250;
const TILE_LIFETIME = 10_000;
const TILE_POOL_SIZE = Math.ceil(TILE_LIFETIME / SPAWN_INTERVAL);

export function HeroGeometry() {
    const mountRef = useRef<HTMLDivElement>(null);    

    useEffect(() => {
        const mount = mountRef.current;

        if (!mount) return;

        let cancelled = false;

        async function initialize(container: HTMLDivElement) {
            const physics = await AmmoPhysics();

            if (cancelled) {
                physics.dispose();
                return;
            }

            let spawnInterval: number | undefined;

            // Scene, Camera, Lighting

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
            camera.position.set( -1.4, 2.2, 6 );
            camera.lookAt(0, 0.35, 0);

            const povLight = new THREE.SpotLight( 0xffffff, 10, 15, Math.PI / 5, 0.65, 3);
            povLight.position.set(-1.5, 5, 10);
            povLight.target.position.set(0, 0, 0);

            povLight.castShadow = true;
            povLight.shadow.mapSize.set(2048, 2048);
            povLight.shadow.camera.near = 0.5;
            povLight.shadow.camera.far = 30;
            povLight.shadow.bias = -0.0001;

            scene.add(povLight);
            scene.add(povLight.target);

            const spotLight = new THREE.SpotLight(0xffffff, 60, 15, Math.PI / 5, 0.65, 2);
            spotLight.position.set(-1, 5, 3);
            spotLight.target.position.set(0, 0, 0);

            spotLight.castShadow = true;
            spotLight.shadow.mapSize.set(2048, 2048);
            spotLight.shadow.camera.near = 0.5;
            spotLight.shadow.camera.far = 15;
            spotLight.shadow.bias = -0.0001;
            spotLight.shadow.normalBias = 0.02;            
            
            scene.add(spotLight);
            scene.add(spotLight.target)

            // Floor
            
            const textureLoader = new THREE.TextureLoader();
            const groundDiffuseMap = textureLoader.load('/images/texture/felt-color.jpg');
            const groundNormalMap = textureLoader.load('/images/texture/felt-normal.png');

            const ground = new THREE.Mesh(
                new THREE.PlaneGeometry(15, 15),
                new THREE.MeshStandardMaterial({ 
                    map: groundDiffuseMap,
                    normalMap: groundNormalMap,
                    color: 0x1e6324,
                    roughness: 0.9,
                }),
            );
            ground.rotation.x = -Math.PI / 2;
            ground.castShadow = false;
            ground.receiveShadow = true;
            scene.add(ground);

            // Physics body of the floor

            const floorCollider = new THREE.Mesh(
                new THREE.BoxGeometry( 10, 0.5, 10 ),
                new THREE.MeshBasicMaterial()
            );
            floorCollider.position.y = -0.25;
            floorCollider.visible = false;
            scene.add( floorCollider );
            physics.addMesh(floorCollider, 0, 0);

            // Tile Shell

            const roundedGeometry = new RoundedBoxGeometry( TILE_WIDTH, TILE_THICKNESS, TILE_LENGTH, 4, 0.06 );
            const shellMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xf4edda,
                roughness: 0.22,
                clearcoat: 1,
                clearcoatRoughness: 0.12,
            });

            // Tile collision

            const colliderGeometry = new THREE.BoxGeometry( TILE_WIDTH, TILE_THICKNESS, TILE_LENGTH );
            const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });

            // Renderer

            const renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( Math.min(window.devicePixelRatio, 1.5) );
            renderer.shadowMap.enabled = true;

            renderer.domElement.style.display = "block";
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";

            container.appendChild(renderer.domElement);

            // Load tile face textures

            const [faceTextures, backTexture, sideTexture] = await Promise.all([
                Promise.all(
                    Array.from({ length: 37 }, (_, index) => {
                        const filename = String(index + 1).padStart(2, "0");

                        return textureLoader.loadAsync(
                            `/images/mahjong/${filename}.svg`
                        );
                    }),
                ),
                textureLoader.loadAsync("/images/mahjong/back.svg"),
                textureLoader.loadAsync("/images/mahjong/side.svg"),
            ]);

            const allTextures = [
                ...faceTextures,
                backTexture,
                sideTexture,
            ];

            if (cancelled) {
                allTextures.forEach((texture) => {
                    texture.dispose();
                });

                renderer.domElement.remove();
                renderer.dispose();
                physics.dispose();

                colliderGeometry.dispose();
                colliderMaterial.dispose();
                roundedGeometry.dispose();
                shellMaterial.dispose();
                ground.geometry.dispose();
                ground.material.dispose();
                floorCollider.geometry.dispose();
                floorCollider.material.dispose();

                return;
            }

            for (const texture of allTextures) {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            }

            // Tile faces

            const faceGeometry = new THREE.PlaneGeometry(
                TILE_WIDTH * 0.78,
                TILE_LENGTH * 0.78,
            );

            const faceMaterials = faceTextures.map(
                (texture) =>
                    new THREE.MeshPhysicalMaterial({
                        map: texture,
                        transparent: true,
                        alphaTest: 0.05,
                        roughness: 0.25,
                        clearcoat: 0.7,
                        clearcoatRoughness: 0.15,
                        polygonOffset: true,
                        polygonOffsetFactor: -1,
                    }),
            );

            const backMaterial = new THREE.MeshPhysicalMaterial({
                map: backTexture,
                roughness: 0.22,
                clearcoat: 1,
                clearcoatRoughness: 0.12,
            });

            const sideMaterial = new THREE.MeshPhysicalMaterial({
                map: sideTexture,
                roughness: 0.22,
                clearcoat: 1,
                clearcoatRoughness: 0.12,
            });

            const shellMaterials: THREE.Material[] = [
                sideMaterial,
                sideMaterial,
                shellMaterial,
                backMaterial,
                sideMaterial,
                sideMaterial,
            ];

            function resize() {
                if (!renderer) return;

                const width = Math.max(container.clientWidth, 1);
                const height = Math.max(container.clientHeight, 1);

                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height, false);
            }

            const resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(container);
            resize();

            function createMahjongTile(faceIndex: number): MahjongTile {
                const body = new THREE.Mesh(
                    colliderGeometry,
                    colliderMaterial,
                );

                const shell = new THREE.Mesh(
                    roundedGeometry,
                    shellMaterials,
                );

                shell.castShadow = true;
                shell.receiveShadow = true;
                body.add(shell);

                const face = new THREE.Mesh(
                    faceGeometry,
                    faceMaterials[faceIndex],
                );

                face.rotation.x = -Math.PI / 2;
                face.position.y = TILE_THICKNESS / 2 + 0.003;
                body.add(face);

                return { body, face }
            }

            // Shuffle tiles before adding to the pool/respawning them

            function shuffleFaceOrder(faceOrder: number[]) {
                for (let index = faceOrder.length - 1; index > 0; index--) {
                    const swapIndex = Math.floor(Math.random() * (index + 1));
                    [faceOrder[index], faceOrder[swapIndex]] = [
                        faceOrder[swapIndex],
                        faceOrder[index],
                    ];
                }
            }

            const faceOrder = Array.from(
                { length: faceMaterials.length },
                (_, index) => index,
            );
            shuffleFaceOrder(faceOrder);

            // Create tile pool

            const tilePool: MahjongTile[] = [];

            for (let index = 0; index < TILE_POOL_SIZE; index++ ) {
                const tile = createMahjongTile(
                    faceOrder[index % faceOrder.length],
                );

                tile.body.position.set(0, -20, 0);

                scene.add(tile.body);
                physics.addMesh(tile.body, 1, 0.1);

                tilePool.push(tile);
            }

            let nextTileIndex = 0;
            let nextFaceIndex = 0;
            const spawnPosition = new THREE.Vector3();
            const spawnEuler = new THREE.Euler();
            const spawnRotation = new THREE.Quaternion();
            const angularVelocity = new THREE.Vector3();

            function spawnTile() {
                const tile = tilePool[nextTileIndex];

                tile.face.material = faceMaterials[faceOrder[nextFaceIndex]];

                spawnPosition.set(
                    THREE.MathUtils.randFloat(-0.5, 0.5),
                    THREE.MathUtils.randFloat(5, 7),
                    THREE.MathUtils.randFloat(-0.5, 0.5),
                );

                spawnEuler.set(
                    THREE.MathUtils.randFloat(-Math.PI, Math.PI),
                    THREE.MathUtils.randFloat(-Math.PI, Math.PI),
                    THREE.MathUtils.randFloat(-Math.PI, Math.PI),
                );
                spawnRotation.setFromEuler(spawnEuler);
                angularVelocity.set(
                    THREE.MathUtils.randFloat(-3, 3),
                    THREE.MathUtils.randFloat(-3, 3),
                    THREE.MathUtils.randFloat(-3, 3),
                );

                physics.setMeshTransform(
                    tile.body,
                    spawnPosition,
                    spawnRotation,
                    angularVelocity,
                );
                
                nextTileIndex = (nextTileIndex + 1) % tilePool.length;
                nextFaceIndex++;

                if (nextFaceIndex === faceOrder.length) {
                    shuffleFaceOrder(faceOrder);
                    nextFaceIndex = 0;
                }
            }

            function render() {
                renderer?.render(scene, camera);
            }

            function startSimulation() {
                physics.setPaused(false);
                renderer?.setAnimationLoop(render);

                if (spawnInterval === undefined) {
                    spawnInterval = window.setInterval(spawnTile, SPAWN_INTERVAL);
                }
            }

            function pauseSimulation() {
                physics.setPaused(true);
                renderer?.setAnimationLoop(null);

                if (spawnInterval !== undefined) {
                    window.clearInterval(spawnInterval);
                    spawnInterval = undefined;
                }
            }
            
            // Used to detect whether user has scrolled past hero
            const visibilityObserver = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        startSimulation();
                    } else {
                        pauseSimulation();
                    }
                },
                {
                    threshold: 0.05,
                },
            );

            visibilityObserver.observe(container);

            // Cleanup
            return () => {
                if (spawnInterval !== undefined) {
                    window.clearInterval(spawnInterval);
                }

                resizeObserver.disconnect();
                visibilityObserver.disconnect();

                renderer?.setAnimationLoop(null);
                renderer?.domElement.remove();
                renderer?.dispose();
                physics.dispose();

                colliderGeometry.dispose();
                colliderMaterial.dispose();
                roundedGeometry.dispose();
                shellMaterial.dispose();
                faceGeometry.dispose();
                backMaterial.dispose();
                sideMaterial.dispose();

                allTextures.forEach((texture) => {
                    texture.dispose();
                });

                faceMaterials.forEach((material) => {
                    material.dispose();
                });

                ground.geometry.dispose();
                ground.material.dispose();

                floorCollider.geometry.dispose();
                floorCollider.material.dispose();
            }
        }

        let cleanupScene: (() => void) | undefined;

        void initialize(mount).then((cleanup) => {
            if (!cleanup) return;
            if (cancelled) {
                cleanup();
            } else {
                cleanupScene = cleanup;
            }
        })
        .catch((error: unknown) => {
            console.error("Failed to initialize hero scene: ", error);
        });


        return () => {
            cancelled = true;
            cleanupScene?.();
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
