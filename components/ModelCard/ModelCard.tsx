"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";

const Scene = () => {
  const gltf = useLoader(GLTFLoader, "/burger.glb");
  return <primitive object={gltf.scene} />;
};

function ModelCard() {
  const [clicked, click] = useState(false);
  return (
    <div>
      {" "}
      <Suspense fallback={<div>loading</div>}>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          {/* <mesh scale={clicked ? 1.5 : 1} onClick={() => click(!clicked)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"hotpink"} />
          </mesh> */}

          <Scene />

          <OrbitControls />
        </Canvas>{" "}
      </Suspense>
    </div>
  );
}

export default ModelCard;
