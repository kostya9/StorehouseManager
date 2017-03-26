import Rectangle from './rectangle'

export default class Area extends Rectangle{
  constructor(rectangle, id) {
    super(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
    this.id = id;
    this.name = 'Default';
  }
}
