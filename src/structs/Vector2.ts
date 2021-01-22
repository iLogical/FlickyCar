class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static From(number: number): Vector2 {
    return new Vector2(number, number);
  }

  static Zero(): Vector2 {
    return Vector2.From(0);
  }

  static One(): Vector2 {
    return Vector2.From(1);
  }
}

export default Vector2;