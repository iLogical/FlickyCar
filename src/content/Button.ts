import Vector2 from '../structs/Vector2'
import IGameObject from './IGameObject';

export default class Button implements IGameObject {
  Intersects(gameObject: IGameObject): boolean {
    throw new Error("Method not implemented.");
  }
  alpha: number;
  sprite: PIXI.Sprite;
  container: PIXI.Container;
  onClick: Function;

  constructor(texture: PIXI.Texture, position: Vector2, size: Vector2) {
    this.container = new PIXI.Container();
    this.container.interactive = true;
    this.container.buttonMode = true;

    this.onClick = () => { };
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x = position.x;
    this.sprite.y = position.y;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.scale.x = size.x / texture.width;
    this.sprite.scale.y = size.y / texture.height;

    this.container.addChild(this.sprite);

    this.container.on('pointerdown', () => {
      if (this.sprite.interactive === true) {
        this.onClick();
      }
    });
  }

  public Alpha(alpha: number): void {
    this.sprite.alpha = alpha;
    this.alpha = this.sprite.alpha;   
  }

  Visible(visible: boolean): void {
    this.sprite.visible = visible;
    this.container.children.forEach(x => {
      x.visible = visible;
    });
  }

  set Enabled(enabled: boolean) {
    this.sprite.interactive = enabled;
    this.sprite.buttonMode = enabled;
  }

  Anchor(anchor: Vector2): void {
    this.sprite.anchor.set(anchor.x, anchor.y);
  }

  AddToStage(stage: PIXI.Container): void {
    stage.addChild(this.container);
  }
}