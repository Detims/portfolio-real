import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AmmoPhysics } from "three/addons/physics/AmmoPhysics.js";

export function HeroGeometry() {
    const mountRef = useRef<HTMLDivElement>(null);    

    useEffect(() => {
        const mount = mountRef.current;

        if (!mount) return;

        let cancelled = false;
        let renderer: THREE.WebGLRenderer | undefined;
        let spawnInterval: number | undefined;

        let tileGeometry: THREE.BoxGeometry | undefined;
        let tileMaterial: THREE.MeshStandardMaterial | undefined;

        async function initialize() {
            const physics = await AmmoPhysics();

            if (cancelled) return;

            // Scene, Camera, Lighting

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
            camera.position.set( -1, 1.5, 4 );
            camera.lookAt(0, 0.5, 0);

            const povLight = new THREE.SpotLight( 0xffffff, 10, 15);
            povLight.position.set(-1.5, 4, 6);
            povLight.target.position.set(0, 0, 0);

            povLight.castShadow = true;
            povLight.shadow.mapSize.set(2048, 2048);
            povLight.shadow.camera.near = 0.5;
            povLight.shadow.camera.far = 15;
            povLight.shadow.bias = -0.0001;

            scene.add(povLight);
            scene.add(povLight.target);

            const spotLight = new THREE.SpotLight(0xffffff, 60, 15, Math.PI / 4, 0.65, 2);
            spotLight.position.set(-1, 5, 1);
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
            
            const ground = new THREE.Mesh(
                new THREE.PlaneGeometry(10, 10),
                new THREE.MeshStandardMaterial({ color: 0x103413 }),
            );
            ground.rotation.x = -Math.PI / 2;
            ground.castShadow = false;
            ground.receiveShadow = true;
            scene.add(ground);

            const shadowPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(10, 10),
                new THREE.ShadowMaterial({
                    color: 0x000000,
                    opacity: 0.8,
                }),
            );
            shadowPlane.rotation.x = -Math.PI / 2;
            shadowPlane.receiveShadow = true;
            scene.add(shadowPlane);

            // Physics body of the floor

            const floorCollider = new THREE.Mesh(
                new THREE.BoxGeometry( 10, 0.5, 10 ),
                new THREE.MeshBasicMaterial()
            );
            floorCollider.position.y = -0.25;
            floorCollider.visible = false;
            scene.add( floorCollider );

            // Tiles

            tileGeometry = new THREE.BoxGeometry( 0.5, 0.25 , 1 );
            tileMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
            
            let spawnedTileCount = 0;
            const maxTileCount = 100;

            const tiles = new THREE.InstancedMesh( tileGeometry, tileMaterial, spawnedTileCount );
            tiles.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
            tiles.castShadow = true;
            tiles.receiveShadow = true;

            const matrix = new THREE.Matrix4();

            for (let i = 0; i < tiles.count; i++) {
                matrix.makeTranslation(0, -20, 0);
                tiles.setMatrixAt(i, matrix);
            }

            tiles.instanceMatrix.needsUpdate = true;
            scene.add(tiles);

            // Add physics to objects
            physics.addMesh(floorCollider, 0); // 0 mass makes it a fixed body
            physics.addMesh(tiles, 1, 0.1);

            // Renderer

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( Math.min(window.devicePixelRatio, 1.5) );
            renderer.shadowMap.enabled = true;
            renderer.setAnimationLoop(() => {
                renderer?.render(scene, camera);
            });

            renderer.domElement.style.display = "block";
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";

            mount?.appendChild(renderer.domElement);

            function resize() {
                if (!renderer) return;

                const width = Math.max(mount?.clientWidth, 1);
                const height = Math.max(mount?.clientHeight, 1);

                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height, false);
            }

            const resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(mount);
            resize();

            spawnInterval = window.setInterval(() => {
                if (spawnedTileCount >= maxTileCount) {
                    window.clearInterval(spawnInterval);
                    return;
                }
                
                const tile = new THREE.Mesh(tileGeometry, tileMaterial);
        
                tile.position.set(
                    THREE.MathUtils.randFloat(-0.5, 0.5),
                    THREE.MathUtils.randFloat(5, 7),
                    THREE.MathUtils.randFloat(-0.5, 0.5),
                );

                tile.quaternion.setFromEuler(
                    new THREE.Euler(
                        THREE.MathUtils.randFloat(-Math.PI, Math.PI),
                        THREE.MathUtils.randFloat(-Math.PI, Math.PI),
                        THREE.MathUtils.randFloat(-Math.PI, Math.PI),
                    ),
                );

                tile.castShadow = true;
                tile.receiveShadow = true;

                scene.add(tile);

                physics.addMesh(tile, 1, 0.1);

                spawnedTileCount++;
            }, 250);

            return () => resizeObserver.disconnect();
        }

        let disconnectResizeObserver: (() => void) | undefined;

        void initialize().then((cleanup) => {
            disconnectResizeObserver = cleanup;
        });

        return () => {
            cancelled = true;
            
            if (spawnInterval !== undefined) {
                window.clearInterval(spawnInterval);
            }

            disconnectResizeObserver?.();

            renderer?.setAnimationLoop(null);
            renderer?.domElement.remove();
            renderer?.dispose();

            tileGeometry?.dispose();
            tileMaterial?.dispose();
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
