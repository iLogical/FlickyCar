import Vector2 from "../structs/Vector2";
import AnchorPosition from "../structs/AnchorPosition";
import IGameObject from "./IGameObject";
import { Point } from "pixi.js";

export default class GameObject implements IGameObject {
  sprite: PIXI.Sprite;
  constructor(texture: PIXI.Texture, position: Vector2, scale: Vector2) {
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.x = position.x;
    this.sprite.y = position.y;
    this.sprite.interactive = false;
    this.sprite.buttonMode = false;
    this.sprite.scale.x = scale.x;
    this.sprite.scale.y = scale.y;

    this.Anchor(AnchorPosition.Center());
  }

  Visible(visible: boolean): void {
    this.sprite.visible = visible;
  }

  Anchor(anchor: Vector2): void {
    this.sprite.anchor.set(anchor.x, anchor.y);
  }

  AddToStage(stage: PIXI.Container): void {
    stage.addChild(this.sprite);
  }

  Intersects(other: IGameObject): boolean {
    var ab = this.sprite.getBounds();
    var bb = other.sprite.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
  }
}