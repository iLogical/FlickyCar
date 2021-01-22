import IGameObject from "./IGameObject";
import Vector2 from "../structs/Vector2";
import IVehicle from "./IVehicle";
import Game from "../Game";
import { Point } from "pixi.js";

export default class Player implements IVehicle {
  speed: number;
  destination: Vector2;
  gameObject: IGameObject;
  sprite: PIXI.Sprite;

  constructor(gameObject: IGameObject, speed: number) {
    this.gameObject = gameObject;
    this.sprite = this.gameObject.sprite;
    this.speed = speed;
    this.destination = Vector2.Zero();
  }

  AddToStage(stage: PIXI.Container): void {
    this.gameObject.AddToStage(stage);
  }

  Anchor(anchorPosition: Vector2): void {
    this.gameObject.Anchor(anchorPosition);
  }

  Intersects(gameObject: IGameObject): boolean {
    return this.gameObject.Intersects(gameObject);
  }

  Drive(): void {
    let dx = this.destination.x - this.sprite.x;

    if (Math.abs(dx) < this.speed) {
      this.sprite.x = this.destination.x;
    }
    else {
      this.sprite.x += Math.sign(dx) * (this.speed * 0.5);
    }
  }
}