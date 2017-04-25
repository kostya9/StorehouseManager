import  Rectangle from './rectangle'



// PATTERN: Decorator
export default class BoundRectangle extends Rectangle {
  constructor(rectangle, xMin, yMin, xMax, yMax) {
    super();
    const maximumPosition = {x: xMax, y: yMax};
    const minimumPosition = {x: xMin, y: yMin};

    this.getMinimumPosition = () => minimumPosition;
    this.getMaximumPosition = () => maximumPosition;

    this.rectangle = rectangle;

    // Position to bound position
    const newPosition = this.getBoundPosition(rectangle.position.x, rectangle.position.y);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;

    // Save and Reset
    const prevWidth = this.width;
    const prevHeight = this.height;
    this.width = 0;
    this.height = 0;

    this.extend(prevWidth, prevHeight);
  }

  get position() {
    return this.rectangle.position;
  }

  set position(newPosition) {
    this.rectangle.position = newPosition;
  }

  get width() {
    return this.rectangle.width;
  }

  set width(newValue) {
    this.rectangle.width = newValue;
  }

  get height() {
      return this.rectangle.height;
  }

  set height(newValue) {
      this.rectangle.height = newValue;
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
    this.rectangle.extend(width, height);

    const endPosition = this.rectangle.getEndPosition();
    const newPosition = this.getBoundPosition(endPosition.x, endPosition.y);
    this.width = newPosition.x - this.position.x;
    this.height = newPosition.y - this.position.y;
  }
}
