import { Canvas } from "@react-three/fiber";
import "./App.css";
import { CameraControls, Center, Environment, Grid } from "@react-three/drei";

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

const Comp = () => {
  return (
    <>
      <ambientLight />
      <CameraControls />
      <Center top>
        <directionalLight castShadow position-z={0.5} intensity={10} />
        <mesh receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
        <Environment preset="apartment" />
      </Center>
    </>
  );
};

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas shadows camera={{ position: [0, 3, 5], fov: 60 }}>
        <Comp />
        <Ground />
      </Canvas>
    </div>
  );
}

export default App;
