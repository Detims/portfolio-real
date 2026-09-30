const AMMO_PATH =
    "https://cdn.jsdelivr.net/gh/kripken/ammo.js@79190a1f03845794b1bba1777f30037349967658/builds/ammo.wasm.js";

let ammoPromise;

function loadAmmo() {
    if (!ammoPromise) {
        ammoPromise = (async () => {
            if (typeof globalThis.Ammo === "undefined") {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src = AMMO_PATH;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            return globalThis.Ammo();
        })();
    }

    return ammoPromise;
}

async function AmmoPhysics() {
    const AmmoLib = await loadAmmo();
    const collisionConfiguration =
        new AmmoLib.btDefaultCollisionConfiguration();
    const dispatcher = new AmmoLib.btCollisionDispatcher(
        collisionConfiguration,
    );
    const broadphase = new AmmoLib.btDbvtBroadphase();
    const solver = new AmmoLib.btSequentialImpulseConstraintSolver();
    const world = new AmmoLib.btDiscreteDynamicsWorld(
        dispatcher,
        broadphase,
        solver,
        collisionConfiguration,
    );
    const gravity = new AmmoLib.btVector3(0, -9.8, 0);
    const worldTransform = new AmmoLib.btTransform();

    world.setGravity(gravity);
    AmmoLib.destroy(gravity);

    const dynamicBodies = [];
    const bodyRecords = [];
    const meshMap = new WeakMap();

    let disposed = false;
    let paused = false;
    let lastTime = performance.now();

    function createShape(geometry) {
        const parameters = geometry.parameters;

        if (geometry.type === "BoxGeometry") {
            const halfExtents = new AmmoLib.btVector3(
                parameters.width / 2,
                parameters.height / 2,
                parameters.depth / 2,
            );
            const shape = new AmmoLib.btBoxShape(halfExtents);
            shape.setMargin(0.02);
            AmmoLib.destroy(halfExtents);
            return shape;
        }

        if (
            geometry.type === "SphereGeometry" ||
            geometry.type === "IcosahedronGeometry"
        ) {
            const shape = new AmmoLib.btSphereShape(
                parameters.radius ?? 1,
            );
            shape.setMargin(0.02);
            return shape;
        }

        throw new Error(
            `AmmoPhysics: Unsupported geometry type: ${geometry.type}`,
        );
    }

    function addMesh(mesh, mass = 0, restitution = 0) {
        if (disposed || meshMap.has(mesh)) {
            return;
        }

        const shape = createShape(mesh.geometry);
        const transform = new AmmoLib.btTransform();
        const origin = new AmmoLib.btVector3(
            mesh.position.x,
            mesh.position.y,
            mesh.position.z,
        );
        const rotation = new AmmoLib.btQuaternion(
            mesh.quaternion.x,
            mesh.quaternion.y,
            mesh.quaternion.z,
            mesh.quaternion.w,
        );
        const localInertia = new AmmoLib.btVector3(0, 0, 0);

        transform.setIdentity();
        transform.setOrigin(origin);
        transform.setRotation(rotation);

        const motionState = new AmmoLib.btDefaultMotionState(transform);
        shape.calculateLocalInertia(mass, localInertia);

        const bodyInfo = new AmmoLib.btRigidBodyConstructionInfo(
            mass,
            motionState,
            shape,
            localInertia,
        );
        bodyInfo.set_m_restitution(restitution);

        const body = new AmmoLib.btRigidBody(bodyInfo);
        world.addRigidBody(body);
        meshMap.set(mesh, body);
        bodyRecords.push({ body, motionState, shape });

        if (mass > 0) {
            dynamicBodies.push({ body, mesh });
        }

        AmmoLib.destroy(bodyInfo);
        AmmoLib.destroy(localInertia);
        AmmoLib.destroy(rotation);
        AmmoLib.destroy(origin);
        AmmoLib.destroy(transform);
    }

    function addScene(scene) {
        scene.traverse((child) => {
            if (!child.isMesh) {
                return;
            }

            const physics = child.userData.physics;

            if (physics) {
                addMesh(
                    child,
                    physics.mass,
                    physics.restitution,
                );
            }
        });
    }

    function setMeshTransform(
        mesh,
        position,
        quaternion,
        angularVelocity,
    ) {
        const body = meshMap.get(mesh);

        if (!body) {
            throw new Error(
                "AmmoPhysics: Mesh must be added before setting its transform.",
            );
        }

        const origin = new AmmoLib.btVector3(
            position.x,
            position.y,
            position.z,
        );
        const rotation = new AmmoLib.btQuaternion(
            quaternion.x,
            quaternion.y,
            quaternion.z,
            quaternion.w,
        );
        const linearVelocity = new AmmoLib.btVector3(0, 0, 0);
        const spin = new AmmoLib.btVector3(
            angularVelocity.x,
            angularVelocity.y,
            angularVelocity.z,
        );

        worldTransform.setIdentity();
        worldTransform.setOrigin(origin);
        worldTransform.setRotation(rotation);

        body.setWorldTransform(worldTransform);
        body.getMotionState()?.setWorldTransform(worldTransform);
        body.clearForces();
        body.setLinearVelocity(linearVelocity);
        body.setAngularVelocity(spin);
        body.activate(true);

        AmmoLib.destroy(spin);
        AmmoLib.destroy(linearVelocity);
        AmmoLib.destroy(rotation);
        AmmoLib.destroy(origin);
    }

    function setMeshPosition(mesh, position) {
        setMeshTransform(
            mesh,
            position,
            { x: 0, y: 0, z: 0, w: 1 },
            { x: 0, y: 0, z: 0 },
        );
    }

    function setPaused(value) {
        paused = value;
        lastTime = performance.now();
    }

    function step() {
        if (disposed) {
            return;
        }

        const time = performance.now();

        if (paused) {
            lastTime = time;
            return;
        }

        const delta = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;
        world.stepSimulation(delta, 10);

        for (const { body, mesh } of dynamicBodies) {
            const motionState = body.getMotionState();

            if (!motionState) {
                continue;
            }

            motionState.getWorldTransform(worldTransform);

            const position = worldTransform.getOrigin();
            const quaternion = worldTransform.getRotation();

            mesh.position.set(position.x(), position.y(), position.z());
            mesh.quaternion.set(
                quaternion.x(),
                quaternion.y(),
                quaternion.z(),
                quaternion.w(),
            );
        }
    }

    const stepInterval = window.setInterval(step, 1000 / 60);

    function dispose() {
        if (disposed) {
            return;
        }

        disposed = true;
        window.clearInterval(stepInterval);

        for (const { body, motionState, shape } of bodyRecords) {
            world.removeRigidBody(body);
            AmmoLib.destroy(body);
            AmmoLib.destroy(motionState);
            AmmoLib.destroy(shape);
        }

        AmmoLib.destroy(worldTransform);
        AmmoLib.destroy(world);
        AmmoLib.destroy(solver);
        AmmoLib.destroy(broadphase);
        AmmoLib.destroy(dispatcher);
        AmmoLib.destroy(collisionConfiguration);
    }

    return {
        addMesh,
        addScene,
        dispose,
        setMeshPosition,
        setMeshTransform,
        setPaused,
    };
}

export { AmmoPhysics };
