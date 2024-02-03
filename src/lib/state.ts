/* state.ts */
import { World } from "miniplex";
import createReactAPI from "miniplex-react";

/* Our entity type */
export type Entity = {
  position: { x: 0; y: 0; z: 0 };
  velocity: { x: number; y: 0; z: 0 };
  health: 100;
  three: React.FC;
};

/* Create a Miniplex world that holds our entities */
const world = new World<Entity>();

/* Create and export React bindings */
export const ECS = createReactAPI(world);
