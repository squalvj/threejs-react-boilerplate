import { ECS } from "../../lib/state";

const Player = () => {
  return (
    <ECS.Entity>
      <ECS.Component name="position" data={{ x: 0, y: 0, z: 0 }} />
      <ECS.Component name="velocity" data={{ x: 0, y: 0, z: 0 }} />
      <ECS.Component name="health" data={100} />
      <ECS.Component name="three">
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </ECS.Component>
    </ECS.Entity>
  );
};
export default Player;
