
export const START_DRAWING = 'START_DRAWING'
export const STOP_DRAWING = 'STOP_DRAWING'
export const MOUSE_MOVE = 'MOUSE_MOVE'

function getBoundSize(position, size, borderTopLeft, borderBottomRight) {
  let width = size.width;
  if(position.x + width > borderBottomRight.x) {
    width = borderBottomRight.x - position.x
  }
  else if(position.x + width < borderTopLeft.x) {
    width = borderTopLeft.x - position.x
  }

  let height = size.height;
  if(position.y + height > borderBottomRight.y) {
    height = borderBottomRight.y - position.y
  }
  else if(position.y + height < borderTopLeft.y) {
    height = borderTopLeft.y - position.y
  }

  return {height, width}
} 

const draw = (state = {width: 300, height: 300, drawing: false}, action) => {
  if(Object.keys(state).length == 0)
    return draw(undefined, action)
  switch(action.type) {
    case MOUSE_MOVE:
    {
      if(!state.drawing)
        return state;

      let width = action.newMousePosition.x - state.currentDrawFigure.position.x
      let height = action.newMousePosition.y - state.currentDrawFigure.position.y
      
      let size = getBoundSize(state.currentDrawFigure.position, 
        {height, width},
        {x: 0, y: 0}, {x: state.height, y: state.width});

      return {
        ...state,
        currentDrawFigure : {...state.currentDrawFigure,
          width: size.width, height: size.height},
      }
    }
    case START_DRAWING:
      let x = action.position.x
      let y = action.position.y
      
      let size = getBoundSize({x, y}, 
        {height: 0, width: 0}, 
        {x: 0, y: 0}, {x: state.width, y: state.height});

      return {
        ...state,
        drawing: true,
        currentDrawFigure: {
          position: {x: x, y: y},
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
