import React, { useRef } from "react";
import { useFBX } from "@react-three/drei";

export const Fbx = props => {
  const group = useRef();
  const fbx = useFBX("../../assets/vr-model3d/cottage_fbx.fbx");
  return (
    <group>
      <primitive
        object={fbx}
        position={[0, 0, 0]}
        scale={(0.01, 0.01, 0.01)}
        dispose={null}
      />
    </group>
  );
}

useFBX.preload("../../assets/vr-model3d/cottage_fbx.fbx");
