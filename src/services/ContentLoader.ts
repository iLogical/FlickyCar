import Vector2 from '../structs/Vector2';
import Road from '../content/Road';
import GameObject from '../content/GameObject';
import Car from '../content/Car';
import Button from '../content/Button';
import Texture from './Texture';
import AnchorPosition from '../structs/AnchorPosition';
import Game from '../Game';
import Player from '../content/Player';
import Random from './Random';
import ScrollingBackground from '../content/ScrollingBackground';
import Direction from '../structs/Direction';
import { Point } from 'pixi.js';
import Ui from '../content/Ui';

export default class ContentLoader {
  obstacles: Array<Car>
  loader: PIXI.loaders.Loader;

  constructor(loader: PIXI.loaders.Loader) {
    this.loader = loader;
    this.obstacles = [];
  }

  LoadTextures(): void {
    this.loader.add("grassBackground", Texture.Load('grass.png'));
    this.loader.add("grassVerge", Texture.Load('grass-verge.png'));
    this.loader.add("grassDetail", Texture.Load('grass-geometric-shape.png'));
    this.loader.add("roadMarking", Texture.Load('Road-lines.png'));
    this.loader.add("playerCar", Texture.Load('player-vehicle.png'));
    this.loader.add("car", Texture.Load('vehicle-object.png'));
    this.loader.add("lane", Texture.Load('Test.bmp'));
    this.loader.add("splash", Texture.Load('carweavers-intro.png'));
    this.loader.add("score", Texture.Load('Score.png'));
    this.loader.add("fuel", Texture.Load('Fuel.png'));
    this.loader.add("tree", Texture.Load('tree.png'));
  }

  LoadObjects(): void {
    this.loader.load(() => {
      const ui = new Ui(new PIXI.Text('0', { fontFamily: 'Arial', fontSize: 36, fill: 0xffffff, align: 'center' }), new Vector2(0, 18), Vector2.One());
      Game.scheduler.Add(() => {
        ui.Score++;
      }, 64);

      Game.scheduler.Add(() => {
        ui.Fuel -= 1;
      }, 500);

      const splashScreen = new Button(new PIXI.Texture(Texture.FromCache('splash'), new PIXI.Rectangle(0, 0, Game.renderer.width, Game.renderer.height)), Vector2.Zero(), new Vector2(Game.renderer.width, Game.renderer.height));
      splashScreen.Anchor(AnchorPosition.TopLeft());
      splashScreen.Alpha(1);
      splashScreen.onClick = () => {
        if(Game.failed === false) {
          return
        }
        ui.Reset();

        let lane = 1;
        this.obstacles.forEach((obstacle, index) => {

          lane++;
          if (lane > 3) {
            lane = 1;
          }
          
          obstacle.sprite.visible = true;
          
          obstacle.ResetPosition();
          obstacle.sprite.position.y = -(obstacle.sprite.height * 2) * (index * 3);
          road.MoveLane(obstacle, lane, true);

          splashScreen.Visible(false);
          resetButton.Visible(false);
        });
        Game.scheduler.Start();
        splashScreen.Enabled = false;
        resetButton.Enabled = false;
        Game.failed = false;
        Game.resetting = false;
      };

      const resetButton = new Button(PIXI.Texture.WHITE, Vector2.Zero(), new Vector2(Game.renderer.width, Game.renderer.height));
      resetButton.Anchor(AnchorPosition.TopLeft());
      resetButton.Alpha(0.66);

      const resetWindowBox = new PIXI.Container();
      resetWindowBox.position = new Point(Game.renderer.width / 2, Game.renderer.height / 2);
      const resetWindowBoxBackground = new GameObject(PIXI.Texture.WHITE, Vector2.Zero(), new Vector2(50, 25));
      resetWindowBoxBackground.sprite.alpha = 0;
      resetWindowBox.addChild(resetWindowBoxBackground.sprite);
      const resetWindowText = new PIXI.Text('If You See This Its Broken', { fontFamily: 'Arial', fontSize: 36, fontWeight: 'bolder', fill: 0xFFFFFF, align: 'center' });
      resetWindowText.anchor.x = AnchorPosition.Center().x;
      resetWindowText.anchor.y = AnchorPosition.Center().y;
      resetWindowBox.addChild(resetWindowText);
      resetButton.sprite.tint = 0x000000;
      resetButton.container.addChild(resetWindowBox);
      resetButton.Visible(false);
      resetButton.Enabled = false;

      const backgroundTexture = new ScrollingBackground();
      backgroundTexture.AddToStage(Game.stage);

      const carTexture = new PIXI.Texture(Texture.FromCache('car'), new PIXI.Rectangle(0, 0, 64, 128));
      const playerCarTexture = new PIXI.Texture(Texture.FromCache('playerCar'), new PIXI.Rectangle(0, 0, 64, 128));
      const laneTexture = new PIXI.Texture(Texture.FromCache('lane'), new PIXI.Rectangle(0, 0, 100, 100));

      const road = new Road(laneTexture, 0.5, 3);
      road.AddToStage(Game.stage);

      Game.scheduler.Add(() => {
        backgroundTexture.Update(Game.speed);
        road.Update(Game.speed);
      }, 16);

      const player = new Player(new GameObject(playerCarTexture, new Vector2(Game.renderer.width * 0.5, Game.renderer.height * 0.6), Vector2.One()), Game.speed);
      player.AddToStage(Game.stage);
      road.AddCar(player, 2);

      Game.scheduler.Add(() => {
        player.Drive();
      }, 16);

      for (let i = 0; i < 10; i++) {
        const oncomingCar = new Car(new GameObject(carTexture, new Vector2(0, -Random.Int(100, 500)), Vector2.One()), Random.Decimal(Game.speed * 0.90, Game.speed * 0.99));
        oncomingCar.AddToStage(Game.stage);
        road.AddCar(oncomingCar, Random.Int(1, road.lanes.length));
        this.obstacles.push(oncomingCar);
      }

      this.obstacles.forEach((obstacle) => {
        Game.scheduler.Add(() => {
          obstacle.Drive();
          if (player.Intersects(obstacle)) {
            Game.failed = true;
          }

          if (obstacle.OffScreen()) {
            obstacle.ResetPosition();
            obstacle.speed = Random.Decimal(0, 2);
            road.MoveLane(obstacle, Random.Int(1, road.lanes.length), true);
          }

          this.obstacles.forEach((otherObstacle) => {
            if (otherObstacle === obstacle) {
              return;
            }
            obstacle.HeadingForCollision(otherObstacle);
            if (obstacle.Intersects(otherObstacle)) {
              obstacle.ResetPosition();
            }
          });
        }, 16);
      });

      Game.scheduler.Add(() => {
        if (Game.failed === false && ui.fuel <= 0) {
          Game.failed = true;
        }
        if (Game.failed == true && Game.resetting === false) {
          Game.resetting = true;
          Game.scheduler.Pause();
          resetWindowText.text = `GAME OVER\nYOUR SCORE: ${ui.Score}`;
          resetButton.Enabled = true;
          resetButton.Visible(true);

          setTimeout(() => {
            resetButton.Enabled = false;
            resetButton.Visible(false);

            splashScreen.Enabled = true;
            splashScreen.Visible(true);
          }, 5000);
        }
      }, 32);

      const leftButton = new Button(PIXI.Texture.WHITE, Vector2.Zero(), new Vector2(Game.renderer.width / 3, Game.renderer.height));
      leftButton.Anchor(AnchorPosition.TopLeft());
      leftButton.Alpha(0);
      leftButton.onClick = () => {
          road.ChangeLane(player, Direction.Left);
          ui.Fuel--;
      };
      leftButton.AddToStage(Game.stage);

      const rightButton = new Button(PIXI.Texture.WHITE, new Vector2(Game.renderer.width, 0), new Vector2(Game.renderer.width / 3, Game.renderer.height));
      rightButton.Anchor(AnchorPosition.TopRight());
      rightButton.Alpha(0);
      rightButton.onClick = () => {
          road.ChangeLane(player, Direction.Right);
          ui.Fuel--;
      };
      rightButton.AddToStage(Game.stage);

      resetButton.AddToStage(Game.stage);

      ui.AddToStage(Game.stage);

      splashScreen.AddToStage(Game.stage);
    });
  }

  OnComplete(action: Function): void {
    this.loader.onComplete.add(action)
  }

  private AddObstacle(): void {

  }
}