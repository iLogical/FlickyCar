export default class Scheduler {
  paused = false;
  oldTime = 0;
  updatables: Array<Update> = [];
  toRemove: Array<Function> = [];
  Add(fn: Function, timer: number, once: boolean = false): void {
    this.updatables.push(new Update(fn, timer, timer, once === true));
  }
  Remove(fn: Function): void {
    this.toRemove.push(fn);
  }
  Update(time: number): void {
    if (this.toRemove.length > 0) {
      this.toRemove.forEach((removable) => {
        const index = this.updatables.findIndex(updatable => updatable.function === removable);
        if (index === -1) {
          return;
        }
        this.updatables.splice(index, 1);
      });
    }
    const delta = time - this.oldTime;
    this.oldTime = time;
    if (this.paused) {
      return;
    }
    this.updatables.forEach((updatable) => {
      updatable.runningTime -= delta;
      if (updatable.runningTime <= 0) {
        updatable.runningTime = updatable.timer;
        if (this.toRemove.indexOf(updatable.function) === -1) {
          updatable.function(time, delta);
        }
        if (updatable.once) {
          this.Remove(updatable.function);
        }
      }
    });
  }
  Pause() :void {
    this.paused = true;
  }
  Start() :void {
    this.paused = false;
  }
}

class Update {
  function: Function;
  timer: number;
  runningTime: number;
  once: boolean;

  constructor(fn: Function, timer: number, runningTime: number, once: boolean) {
    this.function = fn;
    this.timer = timer;
    this.runningTime = runningTime;
    this.once = once;
  }
}