import { Canvas } from "@react-three/fiber";
import { Sky, PointerLockControls, Reflector } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Fbx } from "./Fbx";
import { Player } from "./Player";
import { Ground } from "./Ground";

// Controls: WASD + left click

export default function Model3D() {
  return (
    <Canvas
      shadows
      gl={{ alpha: false }}
      camera={{ fov: 45 }}
      raycaster={{
        computeOffsets: (e) => ({
          offsetX: e.target.width / 2,
          offsetY: e.target.height / 2,
        }),
      }}
    >
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={1} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Fbx />
        <Ground />
        <Player />
        {/* <Reflector
          blur={[0, 0]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={0.1} // How much blur mixes with surface roughness
          mixStrength={0.25} // Strength of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality
          args={[10, 30]} // PlaneBufferGeometry arguments
          position={[0, 0, -20]}
          rotation={[0, 0, 2 * Math.PI]}
          mirror={0.5} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          minDepthThreshold={0.25}
          maxDepthThreshold={1}
          depthScale={50}>
          {(Material, props) => <Material metalness={0} roughness={0} {...props} />}
        </Reflector> */}
      </Physics>
      <PointerLockControls />
    </Canvas>
  );
}
