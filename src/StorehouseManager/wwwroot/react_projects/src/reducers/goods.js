/**
 * Created by kostya on 4/16/2017.
 */

export const LOAD_GOODSITEMS_SUCCESS = 'LOAD_GOODSITEMS_SUCCESS';
export const LOAD_GOODSITEMS_ARRIVED_SUCCESS = 'LOAD_GOODSITEMS_ARRIVED_SUCCESS';
export const LOAD_GOODSITEMS_REGISTERED_SUCCESS = 'LOAD_GOODSITEMS_REGISTERED_SUCCESS';
export const LOAD_GOODSITEMS_REJECTED_SUCCESS = 'LOAD_GOODSITEMS_REJECTED_SUCCESS';

const goods = (state = {goodsItems: [], registered: [], arrived: [], rejected: []}, action) => {
    switch(action.type) {
        case LOAD_GOODSITEMS_SUCCESS:
            return {...state, goodsItems: action.goodsItems};
        case LOAD_GOODSITEMS_ARRIVED_SUCCESS:
            return {...state, arrived: action.goodsItems};
        case LOAD_GOODSITEMS_REGISTERED_SUCCESS:
            return {...state, registered: action.goodsItems};
        case LOAD_GOODSITEMS_REJECTED_SUCCESS:
            return {...state, rejected: action.goodsItems};
        default:
            return state;
    }
};

export default goods;