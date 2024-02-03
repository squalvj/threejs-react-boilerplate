import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { ECS } from "./lib/state";
import "./App.css";
import Player from "./GameObjects/Player/player";
import {
  KeyboardControls,
  KeyboardControlsEntry,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { OrthographicCamera as OrthographicCameraType } from "three";

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

const movingEntities = ECS.world.with("position", "velocity");
const GRID_SIZE = 20;

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

  // useFrame((state, delta) => (meshRef.current.rotation.x += delta));

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

const Camera = (props) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // setDefaultCamera,
    size: { width, height },
  } = useThree();

  const camera = useRef<OrthographicCameraType>(null!);

  // Aspect ratio depending on window size taller or wider
  const aspect = width > height ? height / width : width / height;
  const [zoom, setZoom] = useState(aspect * 50);

  useEffect(() => {
    // void setDefaultCamera(camera.current);
    camera.current.rotation.order = "YXZ";
    camera.current.rotation.y = -Math.PI / 4;
    camera.current.rotation.x = Math.atan(-1 / Math.sqrt(2));
    camera.current.translateZ(100);

    window.addEventListener("wheel", (e) => {
      // Limit zoom dimensions
      if (e.deltaY < 0 && camera.current.zoom <= aspect * 300)
        setZoom(camera.current.zoom - (e.deltaY / 120) * 10);
      if (e.deltaY > 0 && camera.current.zoom >= aspect * 50)
        setZoom(camera.current.zoom - (e.deltaY / 120) * 10);
    });
  }, []);

  return (
    <OrthographicCamera
      makeDefault
      ref={camera}
      zoom={zoom}
      near={0.1}
      far={500}
      rotation={[Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0]}
      onUpdate={(self) => self.updateProjectionMatrix()}
      {...props}
    />
  );
};

function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <KeyboardControls map={map}>
        <Canvas>
          <Camera />
          <ambientLight intensity={Math.PI / 2} />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
