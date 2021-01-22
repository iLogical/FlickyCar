import Game from '../Game';
import Texture from '../services/Texture';
import Vector2 from '../structs/Vector2';
import { Point } from 'pixi.js';
import AnchorPosition from '../structs/AnchorPosition';
import BackgroundTile from './BackgroundTile';
import GrassVerge from './GrassVerge';
import Direction from '../structs/Direction';

export default class ScrollingBackground {
  backgroundTiles: Array<BackgroundTile>;

  constructor() {
    this.backgroundTiles = [];
    for (let i = 0; i < 2; i++) {
      const position = new Vector2(0, -Game.renderer.height * i);
      const backgroundTile = new BackgroundTile(position);
      backgroundTile.AddBackgroundItem(new GrassVerge(Direction.Left));
      backgroundTile.AddBackgroundItem(new GrassVerge(Direction.Right));
      this.backgroundTiles.push(backgroundTile);
    }
  }

  Update(speed: number): void {
    this.backgroundTiles.forEach((backgroundTile) => {
      backgroundTile.Update(speed);
    });
  }

  AddToStage(stage: PIXI.Container): void {
    this.backgroundTiles.forEach((backgroundTile) => {
      backgroundTile.AddToStage(stage);
    });
  }
}