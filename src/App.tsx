import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { CameraControls, Center, Environment, Grid } from "@react-three/drei";
import { PropsWithChildren, useRef } from "react";
import { Mesh, Vector3 } from "three";

function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: "#000000",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#9d4b4b",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

const Scene = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ambientLight />
      <CameraControls />
      <Center top>
        <directionalLight castShadow position-z={0.5} intensity={10} />
        {children}
        <Environment preset="apartment" />
      </Center>
    </>
  );
};

const Model = ({
  x,
  y,
  z,
  theta,
  randX,
  randY,
  randZ,
}: {
  x: number;
  y: number;
  z: number;
  randX: number;
  randY: number;
  randZ: number;
  theta: number;
}) => {
  const box = useRef<Mesh>(null);
  const v = new Vector3(x, y, z);
  useFrame((state) => {
    if (box.current) {
      const time = state.clock.getElapsedTime();
      const dx = Math.cos(theta + time * 2) + randX;
      const dy = Math.sin(theta + time * 2) + randY;
      box.current.position.set(dx, dy, 0);
    }
  });

  return (
    <mesh receiveShadow ref={box} position={v}>
      <sphereGeometry args={[0.1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
};

const num = 50;

function App() {
  const models = [...new Array(num)].map((_, i) => {
    const theta = (i / num) * Math.PI * 2;
    const x = Math.cos(theta);
    const y = Math.sin(theta);
    const z = 0;
    const randX = Math.random() / 2;
    const randY = Math.random() / 2;
    const randZ = Math.random() / 0.3;
    return (
      <Model
        x={x}
        y={y}
        z={z}
        theta={theta}
        key={i}
        randX={randX}
        randY={randY}
        randZ={randZ}
      />
    );
  });
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas shadows camera={{ position: [0, 3, 5], fov: 60 }}>
        <Scene>{models.map((e) => e)}</Scene>
        <Ground />
      </Canvas>
    </div>
  );
}

export default App;
