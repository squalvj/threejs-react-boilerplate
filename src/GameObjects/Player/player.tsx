import { useEffect, useState } from "react";
import { ECS } from "../../lib/state";

const Player = () => {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const fn = setInterval(() => {
      setSpeed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(fn);
    };
  }, []);

  return (
    <ECS.Entity>
      <ECS.Component name="position" data={{ x: 0, y: 0, z: 0 }} />
      <ECS.Component name="velocity" data={{ x: speed, y: 0, z: 0 }} />
      <ECS.Component name="health" data={100} />
      <ECS.Component name="three">
        <mesh scale={speed}>
          <sphereGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </ECS.Component>
    </ECS.Entity>
  );
};
export default Player;
