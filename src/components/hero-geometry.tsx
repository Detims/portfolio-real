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

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 2);
            scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
            dirLight.position.set( 5, 5, 5 );
            dirLight.castShadow = true;
            scene.add( dirLight );

            // Floor

            const shadowPlane = new THREE.Mesh(
                new THREE.PlaneGeometry( 10, 10 ),
                new THREE.ShadowMaterial( {
                    color: 0x103413,
                    opacity: 1,
                } ),
            );

            shadowPlane.rotation.x = -Math.PI / 2;
            shadowPlane.receiveShadow = true;
            scene.add( shadowPlane );

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
            const tileCount = 100;
            
            const tiles = new THREE.InstancedMesh( tileGeometry, tileMaterial, tileCount );
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
        
            let nextTileIndex: number = 0;

            spawnInterval = window.setInterval(() => {
                if (nextTileIndex >= tiles.count) {
                    window.clearInterval(spawnInterval);
                    return;
                }

                const spawnPosition = new THREE.Vector3(
                    THREE.MathUtils.randFloat(-0.5, 0.5),
                    THREE.MathUtils.randFloat(5, 7),
                    THREE.MathUtils.randFloat(-0.5, 0.5),
                );

                physics.setMeshPosition(tiles, spawnPosition, nextTileIndex);
                nextTileIndex++;
            }, 500);

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
