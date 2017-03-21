
export const START_DRAWING = 'START_DRAWING'
export const STOP_DRAWING = 'STOP_DRAWING'
export const MOUSE_MOVE = 'MOUSE_MOVE'

const draw = (state = {width: 300, height: 300, drawing: false}, action) => {
  if(Object.keys(state).length == 0)
    return draw(undefined, action)
  switch(action.type) {
    case MOUSE_MOVE:
      if(!state.drawing)
        return state;

      let width = action.newMousePosition.x - state.currentDrawFigure.position.x
      const otherBorderX = width + state.currentDrawFigure.position.x;
      if(otherBorderX > state.width)
        width = state.width - state.currentDrawFigure.position.x
      else if(otherBorderX < 0)
        width = 0 - state.currentDrawFigure.position.x

      let height = action.newMousePosition.y - state.currentDrawFigure.position.y
      const otherBorderY = height + state.currentDrawFigure.position.y;
      if(otherBorderY > state.height)
        height = state.height - state.currentDrawFigure.position.y
      else if(otherBorderY < 0)
        height = 0 - state.currentDrawFigure.position.y
      return {
        ...state,
        currentDrawFigure : {...state.currentDrawFigure,
          width: width, height: height},
      }
    case START_DRAWING:
      return {
        ...state,
        drawing: true,
        currentDrawFigure: {
          position: {x: action.position.x, y: action.position.y},
          width: 0,
          height: 0
        }
      }
    case STOP_DRAWING:
      return {
        ...state,
        drawing: false
      }
    default:
      return state
  }
}

export default draw;
