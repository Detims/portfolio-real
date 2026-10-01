import type {
    Mesh,
    Object3D,
    Quaternion,
    Vector3,
} from "three";

export interface AmmoPhysicsObject {
    addMesh(
        mesh: Mesh,
        mass?: number,
        restitution?: number,
    ): void;
    addScene(scene: Object3D): void;
    dispose(): void;
    setMeshPosition(mesh: Mesh, position: Vector3): void;
    setMeshTransform(
        mesh: Mesh,
        position: Vector3,
        quaternion: Quaternion,
        angularVelocity: Vector3,
    ): void;
    setPaused(paused: boolean): void;
}

export function AmmoPhysics(): Promise<AmmoPhysicsObject>;
