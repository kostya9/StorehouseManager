import areas from './areas'
import draw from './draw'

export default function reduce(state = {width: 300, height: 300, areas: [], drawing: false}, action) {
    state = draw(state, action)
    state = areas(state, action)
    return state;
}