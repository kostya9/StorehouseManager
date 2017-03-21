import {START_DRAWING,STOP_DRAWING, MOUSE_MOVE} from './reducers/draw'

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
