import Vector2D from './vector2d'

export const START_DRAWING = 'START_DRAWING'
export const STOP_DRAWING = 'STOP_DRAWING'
export const MOUSE_MOVE = 'MOUSE_MOVE'

function valueInRange(value, edgeFirst, edgeSecond) {
  const rangeMin = Math.min(edgeFirst, edgeSecond)
  const rangeMax = Math.max(edgeFirst, edgeSecond)
  return (value >= rangeMin) && (value <= rangeMax)
}

function areAreasCollided(firstAreaStartingPosition, firstAreaEndingPosition,
  secondAreaStartingPosition, secondAreaEndingPosition) {
    const x_overlap_start = valueInRange(firstAreaStartingPosition.x, secondAreaStartingPosition.x, secondAreaEndingPosition.x)
      || valueInRange(secondAreaStartingPosition.x, firstAreaStartingPosition.x, firstAreaEndingPosition.x)

    const x_overlap_end = valueInRange(firstAreaEndingPosition.x, secondAreaStartingPosition.x, secondAreaEndingPosition.x)
      || valueInRange(secondAreaEndingPosition.x, firstAreaStartingPosition.x, firstAreaEndingPosition.x)

      const x_overlap = x_overlap_end || x_overlap_start;

    const y_overlap_start = valueInRange(firstAreaStartingPosition.y, secondAreaStartingPosition.y, secondAreaEndingPosition.y)
      || valueInRange(secondAreaStartingPosition.y, firstAreaStartingPosition.y, firstAreaEndingPosition.y)

      const y_overlap_end = valueInRange(firstAreaEndingPosition.y, secondAreaStartingPosition.y, secondAreaEndingPosition.y)
        || valueInRange(secondAreaEndingPosition.y, firstAreaStartingPosition.y, firstAreaEndingPosition.y)

      const y_overlap = y_overlap_start || y_overlap_end;

      return x_overlap && y_overlap;
}

function isCollision(state, newMousePosition) {
  if(state.areas == undefined)
    return false;
  for (const area of state.areas) {
    if(areAreasCollided(state.currentDrawFigure.position, newMousePosition,
      area.position, {x: area.position.x + area.width, y: area.position.y + area.height}))
      return true;
  }
  return false;
}

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

const draw = (state, action) => {
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

        if(isCollision(state, action.newMousePosition))
          return {...state, drawing: false};

      return {
        ...state,
        currentDrawFigure : {...state.currentDrawFigure,
          width: size.width, height: size.height},
      }
    }
    case START_DRAWING:
      let x = action.position.x
      let y = action.position.y

      x = x > state.width
        ? state.width
        : x < 0
        ? 0
        : x

      y = y > state.height
        ? state.height
        : y < 0
        ? 0
        : y

      var newState =  {
        ...state,
        drawing: true,
        currentDrawFigure: {
          position: {x: x, y: y},
          width: 0,
          height: 0
        }
      }

        if(isCollision(newState, {x, y}))
          return state;

        return newState;
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
