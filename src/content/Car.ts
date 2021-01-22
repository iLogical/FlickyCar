import IGameObject from "./IGameObject";
import Vector2 from "../structs/Vector2";
import IVehicle from "./IVehicle";
import Game from "../Game";
import { Point } from "pixi.js";
import Random from "../services/Random";
import Scheduler from "../services/Scheduler";

export default class Car implements IVehicle {
  destination: Vector2;
  speed: number;
  gameObject: IGameObject;
  sprite: PIXI.Sprite;

  constructor(gameObject: IGameObject, speed: number = 0) {
    this.gameObject = gameObject;
    this.sprite = this.gameObject.sprite;
    this.speed = speed;
  }

  AddToStage(stage: PIXI.Container): void {
    this.gameObject.AddToStage(stage);
  }

  Anchor(anchorPosition: Vector2): void {
    this.gameObject.Anchor(anchorPosition);
  }

  Intersects(gameObject: IGameObject): boolean {
    if(Game.failed || Game.resetting) {
      return false;
    }    

    return this.gameObject.Intersects(gameObject);
  }

  HeadingForCollision(vehicle: IVehicle): void {
    var bounds = this.sprite.getBounds();

    let point = new Point(vehicle.sprite.position.x, (vehicle.sprite.position.y + vehicle.sprite.height + (this.speed * Random.Int(15, 25))));
    if (this.speed * 0.97 > vehicle.speed && (bounds.x + bounds.width > point.x && bounds.x < point.x + 0 && bounds.y + bounds.height > point.y && bounds.y < point.y + 0)) {
      this.speed = this.speed * 0.97;
      return;
    }

    point = new Point(vehicle.sprite.position.x, (vehicle.sprite.position.y + vehicle.sprite.height + (this.speed * Random.Int(7, 15))));
    if (bounds.x + bounds.width > point.x && bounds.x < point.x + 0 && bounds.y + bounds.height > point.y && bounds.y < point.y + 0) {
      this.speed = vehicle.speed;
    }
  }

  Drive(): void {
    this.sprite.position.y += Game.speed - this.speed;
  }

  OffScreen(): boolean {
    return this.sprite.position.y - this.sprite.height * 0.75 > Game.renderer.height;
  }

  ResetPosition() {
    this.Visible(false);
    this.sprite.position.y = -this.sprite.height * Random.Int(1, 5);
    this.speed = Random.Int(Game.speed * 0.33, Game.speed * 0.4)
    this.Visible(true);
  }

  Visible(visible: boolean): void {
    if (visible) {
      this.sprite.alpha = 1;
    } else {
      this.sprite.alpha = 0;
    }
  }
}