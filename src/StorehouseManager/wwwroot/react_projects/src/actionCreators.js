import {START_DRAWING,STOP_DRAWING, MOUSE_MOVE} from './reducers/draw'
import {ADD_AREA, SELECT_AREA} from './reducers/areas'

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

export function addArea(id) {
  return {
    type: ADD_AREA,
    id: id
  }
}
