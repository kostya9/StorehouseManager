/**
 * Created by kostya on 4/16/2017.
 */

export const LOAD_GOODSITEMS_SUCCESS = 'LOAD_GOODSITEMS_SUCCESS';
export const LOAD_GOODSITEMS_ARRIVED_SUCCESS = 'LOAD_GOODSITEMS_ARRIVED_SUCCESS';
export const LOAD_GOODSITEMS_ACCEPTED_SUCCESS = 'LOAD_GOODSITEMS_ACCEPTED_SUCCESS';
export const LOAD_GOODSITEMS_STORING_SUCCESS = 'LOAD_GOODSITEMS_STORING_SUCCESS';
export const LOAD_GOODSITEMS_WAITINGFORUNLOAD_SUCCESS = 'LOAD_GOODSITEMS_WAITINGFORUNLOAD_SUCCESS';
export const LOAD_GOODSITEMS_UNLOADED_SUCCESS = 'LOAD_GOODSITEMS_UNLOADED_SUCCESS';
export const LOAD_GOODSITEMS_REGISTERED_SUCCESS = 'LOAD_GOODSITEMS_REGISTERED_SUCCESS';
export const LOAD_GOODSITEMS_REJECTED_SUCCESS = 'LOAD_GOODSITEMS_REJECTED_SUCCESS';

export const LOAD_AREA_MARK_HINTS_SUCCESS = 'LOAD_AREA_MARK_HINTS_SUCCESS';
export const LOAD_TRANSITIONS_SUCCESS = 'LOAD_TRANSITIONS_SUCCESS';

export const START_REGISTERING_ITEM = 'START_REGISTERING_ITEM';
export const CANCEL_REGISTERING_ITEM = 'CANCEL_REGISTERING_ITEM';
export const REGISTER_ITEM_SUCCESS = 'REGISTER_ITEM_SUCCESS';

export const LOAD_GOODSITEM_SUCCESS = 'LOAD_GOODSITEM_SUCCESS';

const goods = (state = {goodsItems: [], registered: [], arrived: [], rejected: [], accepted: [], storing: {}, waitingForUnload: [], unloaded: [],
                hints: {marks: []}, selectedItem: {}, transitionReport: {transitions: [], goodsItemId:0}}, action) => {
    switch(action.type) {
        case LOAD_GOODSITEM_SUCCESS:
            return {...state, selectedItem: action.item};
        case LOAD_GOODSITEMS_SUCCESS:
            return {...state, goodsItems: action.goodsItems};
        case LOAD_GOODSITEMS_REGISTERED_SUCCESS:
            return {...state, registered: action.goodsItems};
        case LOAD_GOODSITEMS_ARRIVED_SUCCESS:
            return {...state, arrived: action.goodsItems};
        case LOAD_GOODSITEMS_ACCEPTED_SUCCESS:
            return {...state, accepted: action.goodsItems};
        case LOAD_GOODSITEMS_STORING_SUCCESS:
            let newStoring = {...state.storing};
            newStoring[action.id] = action.goodsItems;
            return {...state, storing: newStoring};
        case LOAD_GOODSITEMS_WAITINGFORUNLOAD_SUCCESS:
            return {...state, waitingForUnload: action.goodsItems};
        case LOAD_GOODSITEMS_UNLOADED_SUCCESS:
            return {...state, unloaded: action.goodsItems};
        case LOAD_GOODSITEMS_REJECTED_SUCCESS:
            return {...state, rejected: action.goodsItems};
        case LOAD_AREA_MARK_HINTS_SUCCESS:
            return {...state, hints: action.hints};
        case LOAD_TRANSITIONS_SUCCESS:
            return {...state, transitionReport: {goodsItemId:action.id, transitions: action.transitions}};
        case START_REGISTERING_ITEM:
            return{...state, newItem: {}};
        case CANCEL_REGISTERING_ITEM:
            let {newItem, ...newState} = state;
            return newState;
        case REGISTER_ITEM_SUCCESS:
            return {...state, registered: [action.item, ...state.registered]};
        default:
            return state;
    }
};

export default goods;