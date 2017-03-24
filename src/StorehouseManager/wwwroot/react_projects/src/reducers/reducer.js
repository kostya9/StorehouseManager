import areas from './areas'
import draw from './draw'

export default function reduce(state = {width: 300, height: 300, areas: [], drawing: false}, action) {
    if(Object.keys(state).length == 0)
      return reduce(undefined, action);
    state = draw(state, action)
    state = areas(state, action)
    return state;
}
