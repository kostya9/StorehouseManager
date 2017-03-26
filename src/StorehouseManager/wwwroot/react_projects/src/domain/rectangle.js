export default class Rectangle {
  constructor(x, y, width, height) {
    this.position = {x, y};
    this.height = height;
    this.width = width;
  }

  getEndPosition() {
    return {
      x: this.position.x + this.width,
      y: this.position.y + this.height
    }
  }

  extend(width, height) {
    this.width += width;
    this.height += height;
  }

  contains(point) {
    const endPoint = this.getEndPosition();
    return point.x >= this.position.x && point.x <= endPoint.x
      && point.y >= this.position.y && point.y <= endPoint.y;
  }
}
