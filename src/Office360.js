import * as THREE from "three";
import ReactDOM from "react-dom";
import React, { Suspense, useRef } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CanvasRenderer } from "three";
import { render } from "@testing-library/react";

extend({ OrbitControls });

const Office360 = () => {
  function Controls(props) {
    const { camera, gl } = useThree();
    const ref = useRef();
    useFrame(() => ref.current.update());
    return (
      <orbitControls
        ref={ref}
        target={[0, 0, 0]}
        {...props}
        args={[camera, gl.domElement]}
      />
    );
  }


  function ArrowsControl(props) {
    const mesh = useRef();
    const image =  useLoader(
        THREE.TextureLoader,
        props.imageUrl
      );
    // useFrame(() => {
    //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    // })
    // const cubesLoader = useLoader(cubes)
    return (
      <mesh {...props} ref={mesh} scale={props.scale}>
        <planeGeometry attach="geometry" args={[1, 1]} />
        <meshBasicMaterial
          opacity={1}
          attach="material"
          map={image}
          side={THREE.DoubleSide}
          transparent={true}
        />
      </mesh>
    );
  }

  function Dome() {
    const texture = useLoader(
      THREE.TextureLoader,
      "./assets/360-image/20211115_152603_078.jpg"
    );

    return (
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.BackSide}
        />
      </mesh>
    );
  }

  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Controls
        enableZoom={true}
        enablePan={false}
        enableDamping
        dampingFactor={0.2}
        // autoRotate
        rotateSpeed={-0.5}
      />
      <Suspense fallback={null}>
        <Dome />
        {/* <ArrowsControl /> */}
        <ArrowsControl
          onClick={(e) => {
            alert("arrow pn1");
          }}
          scale={(3,3,3)}
          position={[-6.5, -4.5, -8]}
          imageUrl={"./assets/360-image/vr-move-arrow/Arrow_02.png"}
        />
        <ArrowsControl
          onClick={(e) => {
            alert("arrow pn2");
          }}
          scale={(10,10,10)}
          position={[-15.5, -15, 45]}
          imageUrl={"./assets/360-image/vr-move-arrow/Arrow_01.png"}
        />
      </Suspense>
    </Canvas>
  );
};

export default Office360;
