import  Rectangle from './rectangle'


export default class BoundRectangle extends Rectangle {
  constructor(rectangle, xMin, yMin, xMax, yMax) {
    super(0, 0, 0, 0);
    const maximumPosition = {x: xMax, y: yMax};
    const minimumPosition = {x: xMin, y: yMin};

    this.getMinimumPosition = () => minimumPosition;
    this.getMaximumPosition = () => maximumPosition;

    const newPosition = this.getBoundPosition(rectangle.position.x, rectangle.position.y);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;

    this.extend(rectangle.width, rectangle.height);
  }

  getBoundPosition(x, y) {
    let newX = x;
    let newY = y;

    if(x > this.getMaximumPosition().x) {
      newX = this.getMaximumPosition().x;
    }
    else if(x < this.getMinimumPosition().x) {
      newX = this.getMinimumPosition().x;
    }

    if(y > this.getMaximumPosition().y) {
      newY = this.getMaximumPosition().y;
    }
    else if(y < this.getMinimumPosition().y) {
      newY = this.getMinimumPosition().y;
    }

    return {x: newX, y: newY}
  }

  extend(width, height) {
    const prevWidth = this.width;
    const prevHeight = this.height;
    super.extend(width, height);

    const endPosition = this.getEndPosition();
    const newPosition = this.getBoundPosition(endPosition.x, endPosition.y);
    this.width = newPosition.x - this.position.x;
    this.height = newPosition.y - this.position.y;
  }
}
