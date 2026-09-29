import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AmmoPhysics } from "three/addons/physics/AmmoPhysics.js";

type Tile = {
    id: number;
};

let camera, scene, renderer;
let physics, position;

let tiles;

init();

async function init() {
    physics = await AmmoPhysics();
    position = new THREE.Vector3();

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( -1, 1.5, 2 );
    camera.lookAt(0, 0.5, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    const hemiLight = new THREE.HemisphereLight();
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
    dirLight.position.set( 5, 5, 5 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.zoom = 2;
    scene.add( dirLight );

    const shadowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry( 10, 10 ),
        new THREE.ShadowMaterial( {
            color: 0x444444
        } ),
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.receiveShadow = true;
    scene.add( shadowPlane );

    const floorCollider = new THREE.Mesh(
        new THREE.BoxGeometry( 10, 5, 10 ),
        new THREE.MeshBasicMaterial( { color: 0x666666 } )
    );
    floorCollider.position.y = -2.5;
    floorCollider.userData.physics = { mass: 0 }; // 0 mass creates a fixed body
    floorCollider.visible = false;
    scene.add( floorCollider );

    const material = new THREE.MeshStandardMaterial();

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    // Tiles

    const geometryBox = new THREE.BoxGeometry( 0.075, 0.15 , 0.075 );
    tiles = new THREE.InstancedMesh( geometryBox, material, 400 );
    tiles.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
    tiles.castShadow = true;
    tiles.receiveShadow = true;
    tiles.userData.physics = { mass: 1 };
    scene.add( tiles );
    
    for (let i = 0; i < tiles.count; i++) {
        matrix.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
        tiles.setMatrixAt( i, matrix );
        tiles.setColorAt( i, color.setHex( 0xffffff * Math.random() ) );
    }

    physics.addScene( scene );

    // 

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    function animate() {
        renderer.render( scene, camera );
    }
}

export function HeroGeometry() {
    const mountRef = useRef<HTMLDivElement>(null);    
    const  tilesRef = useRef<Tile[]>([]);

    // useEffect(() => {
    //     const intervalId = window.setInterval(() => {
    //         const tile = createPhysicsTile();
    //         tilesRef.current.push(tile);
    //     }, 1000);

    //     return () => {
    //         window.clearInterval(intervalId);

    //         for (const tile of tilesRef.current) {
    //             destroyPhysicsTile(tile);
    //         }

    //         tilesRef.current = [];
    //     };
    // }, []);

    return (
        <div
            ref={mountRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        />
    );
}
