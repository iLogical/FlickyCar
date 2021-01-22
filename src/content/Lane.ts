import GameObject from "./GameObject";
import IVehicle from "./IVehicle";
import Vector2 from "../structs/Vector2";

export default class Lane {
  width: number;
  gameObject: GameObject;

  constructor(sprite: GameObject, width: number) {
    this.gameObject = sprite;
    this.width = width;
  }

  ChangeTo(car: IVehicle, immediate: boolean): void {
    let pos = this.gameObject.sprite.x + this.gameObject.sprite.width / 2;
    if (immediate) {
      car.sprite.position.x = pos;
      car.destination = car.sprite.position;
    } else {
      car.destination = new Vector2(pos, car.sprite.y);
    }
  }

  AddToStage(stage: PIXI.Container): void {
    stage.addChild(this.gameObject.sprite);
  }
}