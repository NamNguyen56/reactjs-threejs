import * as THREE from "three";
import ReactDOM from "react-dom";
import React, { Suspense, useRef, useState } from "react";
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
import dataConfig from "./configData.json";
extend({ OrbitControls });

const Office360 = () => {
  const office1 = {
    domeObj: {
      imgItems: [
        {
          imageUrl: "./assets/360-image/vr-move-arrow/Arrow_01.png",
          position: [-15.5, -15, 45],
        },
      ],
      bgDomeUrl: "./assets/360-image/20211115_152630_546.jpg",
    },
  };

  const office2 = {
    domeObj: {
      imgItems: [
        // {
        //   imageUrl: "./assets/360-image/vr-move-arrow/Arrow_03.png",
        //   position: [-6.5, -4.5, -8],
        //   dataItem: {},
        // },
        // {
        //   imageUrl: "./assets/360-image/vr-move-arrow/Arrow_02.png",
        //   position: [-15.5, -15, -45],
        // },
        {
          imageUrl: "./assets/360-image/vr-move-arrow/Arrow_01.png",
          position: [-15.5, -15, 45],
        },
      ],
      bgDomeUrl: "./assets/360-image/20211115_152639_597.jpg",
    },
  };

  const office3 = {
    domeObj: {
      imgItems: [
        // {
        //   imageUrl: "./assets/360-image/vr-move-arrow/Arrow_03.png",
        //   position: [-6.5, -4.5, -8],
        //   dataItem: {},
        // },
        // {
        //   imageUrl: "./assets/360-image/vr-move-arrow/Arrow_02.png",
        //   position: [-15.5, -15, -45],
        // },
        {
          imageUrl: "./assets/360-image/vr-move-arrow/Arrow_01.png",
          position: [-15.5, -15, 45],
        },
      ],
      bgDomeUrl: "./assets/360-image/20211115_152708_994.jpg",
    },
  };

  const office4 = {
    domeObj: {
      imgItems: [
        // {
        //   imageUrl: "./assets/360-image/vr-move-arrow/Arrow_03.png",
        //   position: [-6.5, -4.5, -8],
        //   dataItem: {},
        // },
        // {
        //   imageUrl: "./assets/360-image/vr-move-arrow/Arrow_02.png",
        //   position: [-15.5, -15, -45],
        // },
        {
          imageUrl: "./assets/360-image/vr-move-arrow/Arrow_01.png",
          position: [-15.5, -15, 45],
        },
      ],
      bgDomeUrl: "./assets/360-image/20211115_152717_965.jpg",
    },
  };

  const office5 = {
    domeObj: {
      imgItems: [
        {
          imageUrl: "./assets/360-image/vr-move-arrow/Arrow_01.png",
          position: [-1.5, -40, -40],
          scale: (20, 20, 20),
          dataItem: office1,
        },
      ],
      bgDomeUrl: "./assets/360-image/20220324_175326_398.jpg",
    },
  };


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

  function ArrowsControl(props) {
    const mesh = useRef();
    const image = useLoader(THREE.TextureLoader, props.imageUrl);
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
      inItDataState.d360_file_name
      // "./assets/360-image/20211115_152603_078.jpg"
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
        {inItDataState.vr_object_list.vr_move_arrow_list.map((item) => {
          return (
            <ArrowsControl
              onClick={(e) => {
                redirectionControl(item.vr_move_arrow_id);
              }}
              scale={item.vr_move_arrow_scale}
              position={item.vr_move_arrow_position}
              imageUrl={item.vr_move_arrow_file_name}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
};

export default Office360;
