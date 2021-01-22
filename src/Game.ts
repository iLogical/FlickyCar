import * as PIXI from 'pixi.js'
import Scheduler from './services/Scheduler';
import ContentLoader from './services/ContentLoader';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export default class Game {
  static resetting: boolean;
  static failed: boolean;
  private width: number = 1050;
  private height: number = 1900;
  static speed: number;
  static renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  static scheduler: Scheduler;
  static stage: PIXI.Container;

  loader: ContentLoader;

  constructor() {
    Game.scheduler = new Scheduler();
    Game.renderer = this.InitialiseRenderer();
    Game.stage = this.InitializeStage();
    Game.speed = 15;
    Game.failed = true;
    Game.resetting = true;
    this.loader = new ContentLoader(PIXI.loader);
  }

  private InitialiseRenderer(): PIXI.WebGLRenderer | PIXI.CanvasRenderer {
    let renderer = PIXI.autoDetectRenderer(this.width, this.height, {
      backgroundColor: 0x608038
    });
    renderer.view.style.padding = "0";
    renderer.view.style.margin = "0 auto";
    renderer.view.style.display = "flex";

    document.body.appendChild(renderer.view);
    return renderer;
  }

  private InitializeStage(): PIXI.Container {
    let stage = new PIXI.Container();
    stage.buttonMode = false;
    stage.interactive = false;
    return stage;
  }

  private static Animate(time: number): number {
    Game.renderer.render(Game.stage);
    Game.scheduler.Update(time);
    return requestAnimationFrame(Game.Animate);
  }

  Load(): void {
    this.loader.LoadTextures();
    this.loader.LoadObjects();
    this.loader.OnComplete(() => {
      Game.scheduler.Update(0);
      Game.Animate(0);
    });
  }
}