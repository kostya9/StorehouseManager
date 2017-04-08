import Rectangle from './rectangle'

export const AREA_SECTION = 'AREA_SECTION'
export const AREA_ENTER = 'AREA_ENTER'
export const AREA_EXIT = 'AREA_EXIT'

export default class Area extends Rectangle{
  constructor(rectangle, id, type, name) {
    super(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
    this.id = id;
    this.name = name;
    this.type = type;
  }

  static fromTypeToName(type) {
    switch(type) {
      case AREA_SECTION:
        return 'Section'
      case AREA_ENTER:
        return 'Enter'
      case AREA_EXIT:
        return 'Exit'
    }
  }
}
