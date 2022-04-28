import React, { useRef } from "react"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

export default function Body(props) {
  const group = useRef()
  const texture = useLoader(
    THREE.TextureLoader,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7OX5z96GGvEGlyrCQxcbDCLLzaU9AOfM3w&usqp=CAU",
  )
  return (
    <group ref={group} dispose={null} {...props}>
      <mesh castShadow>
        <planeGeometry castShadow attach="geometry" args={[10, 10]} />
        <meshBasicMaterial attach="material" map={texture} transparent side={THREE.BackSide} />
      </mesh>
    </group>
  )
}