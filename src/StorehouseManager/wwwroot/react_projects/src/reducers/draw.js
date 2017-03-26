import Rectangle from './../domain/rectangle'
import BoundRectangle from './../domain/boundRectangle'
import CollisionDetector from './../domain/collisionDetector'

import {cloneDeep} from 'lodash'

export const START_DRAWING = 'START_DRAWING'
export const STOP_DRAWING = 'STOP_DRAWING'
export const MOUSE_MOVE = 'MOUSE_MOVE'

const draw = (state, action) => {
    switch (action.type) {
        case MOUSE_MOVE:
            {
                if (!state.drawing)
                    return state;

                if (CollisionDetector.isCollision(state, action.newMousePosition))
                    return { ...state, drawing: false};

                let additionalWidth = action.newMousePosition.x - state.currentDrawFigure.position.x - state.currentDrawFigure.width
                let additionalHeight = action.newMousePosition.y - state.currentDrawFigure.position.y - state.currentDrawFigure.height
                let newDrawFigure = cloneDeep(state.currentDrawFigure)

                newDrawFigure.extend(additionalWidth, additionalHeight)

                return { ...state, currentDrawFigure: newDrawFigure }
            }
        case START_DRAWING:
            let x = action.position.x
            let y = action.position.y
            const rectangle = new Rectangle(x, y, 0, 0);
            const newBoundRectangle = new BoundRectangle(rectangle, 0, 0, state.width, state.height)
            var newState = {...state, drawing: true, currentDrawFigure: newBoundRectangle }

            if (CollisionDetector.isCollision(newState, {x, y}))
                return state;

            return newState;
        case STOP_DRAWING:
            return { ...state, drawing: false }
        default:
            return state
    }
}

export default draw;
