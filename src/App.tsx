import { useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { ECS } from "./lib/state";
import "./App.css";
import Player from "./GameObjects/Player/player";

const movingEntities = ECS.world.with("position", "velocity");

const MovementSystem = () => {
  useFrame((_, dt) => {
    for (const entity of movingEntities) {
      console.log(entity);
      entity.position.x += entity.velocity.x * dt;
      entity.position.y += entity.velocity.y * dt;
      entity.position.z += entity.velocity.z * dt;
    }
  });

  return null;
};

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [{ size }, set] = useControls(() => ({ size: 1 }));

  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  MovementSystem();

  return (
    <>
      <Player />
      <mesh
        {...props}
        ref={meshRef}
        scale={size}
        onClick={(event) => set({ size: size + 1 })}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    </>
  );
}

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas flat>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={2}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
