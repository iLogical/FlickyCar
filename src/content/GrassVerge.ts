import Game from "../Game";
import AnchorPosition from "../structs/AnchorPosition";
import Texture from "../services/Texture";
import GrassDetail from "./GrassDetail";
import Vector2 from "../structs/Vector2";
import RotationHelper from "../services/RotationHelper";
import Direction from "../structs/Direction";
import Random from "../services/Random";

export default class GrassVerge {
  private _backgroundContainer: PIXI.Container;
  constructor(side: Direction) {
    this._backgroundContainer = new PIXI.Container();
    this._backgroundContainer.width = Game.renderer.width / 4;
    this._backgroundContainer.height = Game.renderer.height;
    this._backgroundContainer.pivot.x = AnchorPosition.Center().x;
    this._backgroundContainer.pivot.y = AnchorPosition.Center().y;

    const backgroundTextureRight = PIXI.extras.TilingSprite.from(Texture.FromCache('grassBackground'), Game.renderer.width / 4, Game.renderer.height);

    if (side === Direction.Right) {
      this._backgroundContainer.rotation = RotationHelper.DegToRad(180);
      this._backgroundContainer.position.y = Game.renderer.height - this._backgroundContainer.height;
      this._backgroundContainer.position.x = Game.renderer.width - this._backgroundContainer.width;
    }

    this._backgroundContainer.addChild(backgroundTextureRight);

    for (let i = 0; i < Math.floor(this._backgroundContainer.height / 64); i++) {
      new GrassDetail(new Vector2(0, i * 64), Direction.Up, 0x477f3d).AddToStage(this._backgroundContainer);
      for (let j = 1; j < Math.floor(Game.renderer.width / 4 / 64); j++) {
        new GrassDetail(new Vector2(j * 64, i * 64), Random.Direction(), 0x508e46).AddToStage(this._backgroundContainer);
      }
    }

    for (let i = 0; i < Math.ceil(this._backgroundContainer.height / 55); i++) {
      for (let j = 0; j < Math.ceil(this._backgroundContainer.height / 56); j++) {
        if (Random.Int(0, 100) < 5) {
          const verge = new PIXI.Sprite(new PIXI.Texture(Texture.FromCache('tree'), new PIXI.Rectangle(0, 0, 56, 55)));
          verge.position.y = i * verge.texture.height;
          verge.position.x = j * backgroundTextureRight.width + verge.width + (verge.width * Random.Decimal(0, 1));
          this._backgroundContainer.addChild(verge);
        }
      }
    }

    for (let i = 0; i < Math.ceil(this._backgroundContainer.height / 96); i++) {
      const verge = new PIXI.Sprite(new PIXI.Texture(Texture.FromCache('grassVerge'), new PIXI.Rectangle(0, 0, 16, 96)));
      verge.position.y = i * verge.texture.height;
      verge.position.x = backgroundTextureRight.width - verge.width;
      this._backgroundContainer.addChild(verge);
    }
  }

  AddToStage(stage: PIXI.Container): void {
    stage.addChild(this._backgroundContainer);
  }
}