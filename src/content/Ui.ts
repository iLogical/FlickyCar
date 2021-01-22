import IGameObject from "./IGameObject";
import Vector2 from "../structs/Vector2";
import AnchorPosition from "../structs/AnchorPosition";
import Game from "../Game";
import Texture from "../services/Texture";

export default class Ui {
  private fuelBarSize: number = 210;
  fuelBar: PIXI.Sprite;
  fuelObject: PIXI.Text;
  fuelContainer: PIXI.Container;
  scoreObject: PIXI.Text;
  scoreContainer: PIXI.Container;
  fuel: number;
  score: number;
  text: PIXI.Text;

  constructor(texture: PIXI.Text, position: Vector2, scale: Vector2) {
    this.scoreContainer = new PIXI.Container();
    const scoreBackground = new PIXI.Sprite(new PIXI.Texture(Texture.FromCache('score'), new PIXI.Rectangle(0, 0, 244, 72)));
    scoreBackground.anchor.x = AnchorPosition.TopLeft().x;
    this.scoreContainer.addChild(scoreBackground);
    this.scoreObject = new PIXI.Text('Score: 0', { fontFamily: 'Arial', fontSize: 36, fill: 0x000000, align: 'center' });
    this.scoreObject.x = 20;
    this.scoreObject.y = 20;
    this.scoreObject.anchor.x = AnchorPosition.MiddleLeft().x;
    this.scoreObject.anchor.y = AnchorPosition.MiddleLeft().y;
    this.scoreContainer.addChild(this.scoreObject);

    this.fuelContainer = new PIXI.Container();
    const fuelBackground = new PIXI.Sprite(new PIXI.Texture(Texture.FromCache('fuel'), new PIXI.Rectangle(0, 0, 327, 72)));
    this.fuelBar = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.fuelBar.tint = 0xFF0000;
    this.fuelBar.width = 1;
    this.fuelBar.scale.x = 20;
    this.fuelBar.height = 32;
    this.fuelBar.x = Game.renderer.width - 16;
    this.fuelBar.y = 6;
    this.fuelBar.anchor.x = AnchorPosition.TopRight().x;
    this.fuelBar.anchor.y = AnchorPosition.TopRight().y;

    fuelBackground.x = Game.renderer.width;
    fuelBackground.anchor.x = AnchorPosition.TopRight().x;
    this.fuelContainer.addChild(fuelBackground);
    this.fuelObject = new PIXI.Text('Fuel:', { fontFamily: 'Arial', fontSize: 36, fill: 0xffffff, align: 'center' });
    this.fuelObject.x = Game.renderer.width - 270;
    this.fuelObject.y = 20;
    this.fuelObject.anchor.x = AnchorPosition.Center().x;
    this.fuelObject.anchor.y = AnchorPosition.Center().y;
    this.fuelContainer.addChild(this.fuelObject);    
    this.fuelContainer.addChild(this.fuelBar);

    this.score = 0;    
    this.fuel = 0;
  }

  set Score(score: number) {    
    this.score = score;
    this.scoreObject.text = `Score: ${this.score}`;
  }
  get Score(): number{
    return this.score;
  }

  set Fuel(fuel: number) {    
    this.fuel = fuel;
    this.fuelBar.scale.x = 20 * (this.fuel * 0.01);
  }

  get Fuel(): number{
    return this.fuel;
  }

  Reset() :void {
    this.Score = 0;
    this.Fuel = 100;
  }

  Visible(visible: boolean): void {
    this.text.visible = visible;
  }

  AddToStage(stage: PIXI.Container): void {
    stage.addChild(this.scoreContainer);
    stage.addChild(this.fuelContainer);
  }
}