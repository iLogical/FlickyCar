import Vector2 from "../structs/Vector2";
import Game from "../Game";
import Direction from "../structs/Direction";
import IBackgroundItem from "./IBackgroundItem";

export default class BackgroundTile {
  private _backgroundContainer: PIXI.Container;

  constructor(position: Vector2) {
    this._backgroundContainer = new PIXI.Container();
    this._backgroundContainer.position.x = position.x;
    this._backgroundContainer.position.y = position.y;
  }

  AddBackgroundItem(backgroundItem: IBackgroundItem): void {
    backgroundItem.AddToStage(this._backgroundContainer);
  }

  Update(speed: number): void {
    this._backgroundContainer.position.y += speed;
    if (this._backgroundContainer.position.y > Game.renderer.height) {
      this._backgroundContainer.position.y -= Game.renderer.height * 2;
    }
  }

  AddToStage(stage: PIXI.Container): void {
    stage.addChild(this._backgroundContainer);
  }
}