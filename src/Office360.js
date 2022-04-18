import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dataConfig from "./configData.json";
extend({ OrbitControls });

const Office360 = () => {
  const initData = dataConfig.vr_dome_list[0];
  const [inItDataState, setDataState] = useState(initData);

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

  function redirectionControl(arrowControlId) {
    const domeDataFilter = dataConfig.vr_dome_list.filter(
      (element) => element["dome_id"] === arrowControlId
    );
    if (domeDataFilter.length > 0) {
      setDataState(domeDataFilter[0]);
    } else {
      alert("Something went wrong!!!!!!");
    }
  }

  function ImageControlComponent(props) {
    const mesh = useRef();
    const image = useLoader(THREE.TextureLoader, props.imageUrl);
    // useFrame(() => {
    //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    // })
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
      inItDataState.d360_file_name
    );

    return (
      <mesh scale={[-1, 1, 1]}>
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
    <Canvas camera={{ position: [-0.1, 0, 0] }}>
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
        {inItDataState.vr_object_list.vr_move_arrow_list.map((item) => {
          return (
            <ImageControlComponent
              onClick={(e) => {
                redirectionControl(item.vr_move_arrow_id);
              }}
              scale={item.vr_move_arrow_scale}
              position={item.vr_move_arrow_position}
              imageUrl={item.vr_move_arrow_file_name}
            />
          );
        })}
        { inItDataState.vr_object_list.vr_image_list !== undefined ? inItDataState.vr_object_list.vr_image_list.map((item) => {
          return (
            <ImageControlComponent
              // onClick={(e) => {
              //   redirectionControl(item.vr_image_id);
              // }}
              scale={item.vr_image_scale}
              position={item.vr_image_position}
              imageUrl={item.vr_image_file_name}
            />
          );
        }) : null }
      </Suspense>
    </Canvas>
  );
};

export default Office360;
