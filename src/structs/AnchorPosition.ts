import Vector2 from "./Vector2";

class AnchorPosition {

  static TopLeft(): Vector2 {
    return new Vector2(0, 0);
  }

  static TopCenter(): Vector2 {
    return new Vector2(0.5, 0);
  }

  static TopRight(): Vector2 {
    return new Vector2(1, 0);
  }

  static MiddleLeft(): Vector2 {
    return new Vector2(0, 0.5);
  }

  static Center(): Vector2 {
    return new Vector2(0.5, 0.5);
  }

  static MiddleRight(): Vector2 {
    return new Vector2(1, 0.5);
  }

  static BottomLeft(): Vector2 {
    return new Vector2(0, 1);
  }

  static BottomCenter(): Vector2 {
    return new Vector2(0.5, 1);
  }

  static BottomRight(): Vector2 {
    return new Vector2(1, 1);
  }
}

export default AnchorPosition;