import {START_DRAWING,STOP_DRAWING, MOUSE_MOVE} from './reducers/draw'
import {ADD_AREA, SELECT_AREA, SET_NAME, REMOVE_AREA, CANCEL_ADD_AREA, START_ADD_AREA} from './reducers/areas'

export {addArea, removeArea, updateArea} from './actions/areas';
export {loadGoodsItems, loadGoodsItemsRegistered, loadGoodsItemsArrived,
  registerGoodsItem, startRegisterGoods, cancelRegisterGoods,
  removeGoodsItem} from './actions/goods';

export function selectArea(id) {
  return {
    type: SELECT_AREA,
    id: id
  }
}

export function startDrawing(position) {
  return {
    type: START_DRAWING,
    position: position
  }
}

export function stopDrawing() {
  return {
    type: STOP_DRAWING
  }
}

export function mouseMove(newMousePosition) {
  return {
    type: MOUSE_MOVE,
    newMousePosition: newMousePosition
  }
}

export function cancelAddArea() {
  return {
    type: CANCEL_ADD_AREA
  }
}

export function startAddArea(rectangle) {
  return {
    type: START_ADD_AREA,
    rectangle: rectangle
  }
}
