import areas from './areas'
import draw from './draw'
import goods from "./goods";
import {shared} from "./shared";

export default function reduce(state = {}, action) {
    let areasList = state.areas == undefined ? undefined : state.areas.areasList
    state.draw = draw(state.draw, action, areasList) // Need all areas for collision detection
    state.areas = areas(state.areas, action);
    state.goods = goods(state.goods, action);
    state.shared = shared(state.shared, action);
    return {...state};
}
