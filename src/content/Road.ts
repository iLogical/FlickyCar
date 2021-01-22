import Vector2 from "../structs/Vector2";
import Lane from "./lane";
import GameObject from "./GameObject";
import IGameObject from "./IGameObject";
import Player from "./Player";
import IVehicle from "./IVehicle";
import Game from '../Game';
import Direction from "../structs/Direction";
import BackgroundTile from "./BackgroundTile";
import RoadMarking from "./RoadMarking";

export default class Road {
  backgroundTiles: any[];
  lanes: Lane[];
  currentLane: number;

  constructor(texture: PIXI.Texture, width: number, numberOfLanes: number) {
    this.lanes = [];
    this.currentLane = 0;

    let position = new Vector2(Game.renderer.width * (1 - width) * width, 0)
    let size = new Vector2(Game.renderer.width * width, Game.renderer.height)
    const laneSize = new Vector2(size.x / numberOfLanes, size.y);

    for (let i = 0; i < numberOfLanes; i++) {
      const lanePosition = new Vector2(position.x + (i * laneSize.x), position.y);
      const sprite = new GameObject(texture, lanePosition, new Vector2(laneSize.x / texture.width, laneSize.y / texture.height));
      sprite.Anchor(Vector2.Zero());
      sprite.sprite.tint = 0x1E2432;
      this.lanes.push(new Lane(sprite, laneSize.x));
    }

    this.backgroundTiles = [];
    for (let i = 0; i < 2; i++) {
      const line1Position = new Vector2(0, -Game.renderer.height * i);
      const line1 = new BackgroundTile(line1Position);
      line1.AddBackgroundItem(new RoadMarking((Game.renderer.width / 2) - (laneSize.x / 2) - 8));
      this.backgroundTiles.push(line1);

      const line2Position = new Vector2(0, -Game.renderer.height * i);
      const line2 = new BackgroundTile(line2Position);
      line2.AddBackgroundItem(new RoadMarking((Game.renderer.width / 2) + (laneSize.x / 2) - 8));
      this.backgroundTiles.push(line2);
    }
  }

  Update(speed: number): void {
    this.backgroundTiles.forEach((tile) => {
      tile.Update(speed);
    });
  }

  ChangeLane(car: Player, direction: Direction): void {
    let newLane = this.currentLane;

    if (direction === Direction.Left) {
      this.LaneChange(car, this.currentLane - 1);
    }

    if (direction === Direction.Right) {
      this.LaneChange(car, this.currentLane + 1);
    }
  }

  AddCar(car: IVehicle, startingLane: number = 1): void {
    startingLane--;
    this.LaneChange(car, startingLane, true);
  }

  AddToStage(stage: PIXI.Container): void {
    this.lanes.forEach((lane) => {
      lane.AddToStage(stage);
    });
    this.backgroundTiles.forEach((tile) => {
      tile.AddToStage(stage);
    });
  }

  LaneIsValid(newLane: number): boolean {
    return newLane < this.lanes.length && newLane >= 0;
  }

  MoveLane(car: IVehicle, newLane: number, immediate: boolean = false): void {
    newLane--;
    this.LaneChange(car, newLane, immediate);

  }

  private LaneChange(car: IVehicle, newLane: number, immediate: boolean = false): void {

    if (!this.LaneIsValid(newLane)) {
      return;
    }

    this.currentLane = newLane;
    this.lanes[this.currentLane].ChangeTo(car, immediate);
  }
}