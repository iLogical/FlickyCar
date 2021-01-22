import IBackgroundItem from "./IBackgroundItem";
import Vector2 from "../structs/Vector2";
import Texture from "../services/Texture";
import Game from "../Game";

export default class RoadMarking implements IBackgroundItem {
  sprites: Array<PIXI.Container>;
  constructor(position: number) {
    this.sprites = [];
    for (let i = 0; i < Math.floor(Game.renderer.height / 188); i++) {
      const sprite = new PIXI.Sprite(new PIXI.Texture(Texture.FromCache('roadMarking'), new PIXI.Rectangle(0, 0, 16, 188)));
      sprite.position.x = position;
      sprite.position.y = i * 188;
      this.sprites.push(sprite);
    }
  }

  AddToStage(backgroundItem: PIXI.Container): void {
    this.sprites.forEach((sprite) => {
      backgroundItem.addChild(sprite);
    });
  }
}