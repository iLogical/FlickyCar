import Vector2 from "../structs/Vector2";
import { Point } from "pixi.js";

export default interface IGameObject {
  sprite: PIXI.Sprite;
  AddToStage(stage: PIXI.Container): void;
  Anchor(anchorPosition: Vector2): void;
  Intersects(gameObject: IGameObject): boolean;
}