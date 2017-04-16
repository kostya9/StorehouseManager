/**
 * Created by kostya on 4/16/2017.
 */

export const LOAD_GOODSITEMS_SUCCESS = 'LOAD_GOODSITEMS_SUCCESS';

const goods = (state = {goodsItems: []}, action) => {
    switch(action.type) {
        case LOAD_GOODSITEMS_SUCCESS:
            return {...state, goodsItems: action.goodsItems};
        default:
            return state;
    }
}

export default goods;