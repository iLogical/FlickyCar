import Direction from "../structs/Direction";

export default class Random {
  static Int(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static Decimal(min: number = 0, max: number = 1): number {
    return Math.random() * (max - min) + min;
  }

  static Direction(): Direction {
    let rand1 = Random.Int(0, 4);
    if (rand1 == 1) {
      return Direction.Up
    }
    if (rand1 == 2) {
      return Direction.Right
    }

    if (rand1 == 2) {
      return Direction.Down
    }
    return Direction.Left;
  }
}