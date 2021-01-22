import IGameObject from "./IGameObject";
import Vector2 from "../structs/Vector2";

export default interface IVehicle extends IGameObject {
  speed: number;
  destination: Vector2;
  Drive(): void;
  Intersects(gameObject: IGameObject): boolean;
}