import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import React, { useRef, Suspense } from "react";
import { Loader, useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export const Fbx = (props) => {
  const [ref] = useBox(() => ({
    mass: 1,
    type: "Static",
    ...props,
  }));

  const fbx = useLoader(FBXLoader, "../../assets/vr-model3d/se-007.fbx");
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.5,
  });

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 0, -20]}
        castShadow
      />
      <directionalLight color="#ffffff"  position={[10, 0, -20]}/> 
      <Suspense fallback={<Loader />}>
        <mesh ref={ref} scale={props.scale} material-reflectivity={1}>
          <primitive
            object={fbx}
            position={[0, 0, -20]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={(0.05, 0.05, 0.05)}
            material={material}
            dispose={null}
          />
        </mesh>
      </Suspense>
    </>
  );
};

// useFBX.preload("../../assets/vr-model3d/se-007.fbx");
