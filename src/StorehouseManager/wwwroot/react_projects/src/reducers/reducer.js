import areas from './areas'
import draw from './draw'

export default function reduce(state = {width: 400, height: 400, areas: [], drawing: false, selectedId: -1}, action) {
    if(Object.keys(state).length == 0)
      return reduce(undefined, action);
    state = draw(state, action)
    state = areas(state, action)
    return state;
}
