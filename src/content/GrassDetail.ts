import Texture from "../services/Texture";
import Vector2 from "../structs/Vector2";
import RotationHelper from "../services/RotationHelper";
import AnchorPosition from "../structs/AnchorPosition";
import Direction from "../structs/Direction";

export default class GrassDetail {

  _verge: PIXI.Sprite;

  constructor(position: Vector2, rotation: Direction = Direction.Up, tint: number) {
    this._verge = new PIXI.Sprite(new PIXI.Texture(Texture.FromCache('grassDetail'), new PIXI.Rectangle(0, 0, 64, 64)));
    this._verge.tint = tint;
    this._verge.position.y = position.y;
    this._verge.position.x = position.x;

    if (rotation == Direction.Right) {
      this._verge.rotation = RotationHelper.DegToRad(90);
      this._verge.position.x += this._verge.width;
    }

    if (rotation == Direction.Down) {
      this._verge.rotation = RotationHelper.DegToRad(180);
      this._verge.position.y += this._verge.height;
      this._verge.position.x += this._verge.width;
    }

    if (rotation == Direction.Left) {
      this._verge.rotation = RotationHelper.DegToRad(270);
      this._verge.position.y += this._verge.height;
    }
  }

  AddToStage(stage: PIXI.Container): void {
    stage.addChild(this._verge);
  }
}