export default class Rectangle {
  constructor(x, y, width, height) {
    if(x == undefined || y == undefined || width == undefined || height == undefined)
      return;

    this.position = {x, y};
    this.height = 0;
    this.width = 0;

    this.extend(width, height);
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
