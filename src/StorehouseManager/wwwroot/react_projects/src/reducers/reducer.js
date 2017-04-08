import areas from './areas'
import draw from './draw'

export default function reduce(state = {}, action) {
    let areasList = state.areas == undefined ? undefined : state.areas.areasList
    state.draw = draw(state.draw, action, areasList) // Need all areas for collision detection
    state.areas = areas(state.areas, action)
    return {...state};
}
