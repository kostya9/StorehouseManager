/**
 * Created by kostya on 4/16/2017.
 */

import GoodsApi from "../api/goods";

import {LOAD_GOODSITEMS_SUCCESS, LOAD_GOODSITEMS_REGISTERED_SUCCESS, LOAD_GOODSITEMS_ARRIVED_SUCCESS,
LOAD_GOODSITEMS_REJECTED_SUCCESS, LOAD_GOODSITEMS_STORING_SUCCESS, LOAD_GOODSITEMS_WAITINGFORUNLOAD_SUCCESS, LOAD_GOODSITEMS_UNLOADED_SUCCESS} from './../reducers/goods'
import {
    CANCEL_REGISTERING_ITEM, LOAD_GOODSITEMS_ACCEPTED_SUCCESS, REGISTER_ITEM_SUCCESS,
    START_REGISTERING_ITEM
} from "../reducers/goods";

function loadGoodsItemsSuccessPrototype(type, goodsItems) {
    return {
        type: type,
        goodsItems: goodsItems
    }
}

function loadGoodItemsSuccess(goodsItems) {
    return loadGoodsItemsSuccessPrototype(LOAD_GOODSITEMS_SUCCESS,goodsItems);
}

function loadGoodItemsRegisteredSuccess(goodsItems) {
    return loadGoodsItemsSuccessPrototype(LOAD_GOODSITEMS_REGISTERED_SUCCESS, goodsItems)
}

function loadGoodItemsArrivedSuccess(goodsItems) {
    return loadGoodsItemsSuccessPrototype(LOAD_GOODSITEMS_ARRIVED_SUCCESS, goodsItems);
}

function loadGoodItemsAcceptedSuccess(goodsItems) {
    return loadGoodsItemsSuccessPrototype(LOAD_GOODSITEMS_ACCEPTED_SUCCESS, goodsItems);
}

function loadGoodItemsWaitingForUnloadSuccess(goodsItems) {
    return loadGoodsItemsSuccessPrototype(LOAD_GOODSITEMS_WAITINGFORUNLOAD_SUCCESS, goodsItems);
}

function loadGoodItemsUnloadedSuccess(goodsItems) {
    return loadGoodsItemsSuccessPrototype(LOAD_GOODSITEMS_UNLOADED_SUCCESS, goodsItems);
}

function loadGoodItemsRejectedSuccess(goodsItems) {
    return loadGoodsItemsSuccessPrototype(LOAD_GOODSITEMS_REJECTED_SUCCESS, goodsItems);
}

function loadGoodsItemsStoringSuccess(id, goodsItems) {
    return {
        type: LOAD_GOODSITEMS_STORING_SUCCESS,
        id: id,
        goodsItems: goodsItems
    }
}

function registerGoodsSuccess(goodsItem) {
    return {type: REGISTER_ITEM_SUCCESS, item: goodsItem};
}

export function startRegisterGoods() {
    return {
        type: START_REGISTERING_ITEM
    }
}

export function cancelRegisterGoods() {
    return {
        type: CANCEL_REGISTERING_ITEM
    }
}

export function registerGoodsItem(item) {
    return dispatch => {
        return GoodsApi.registerGoods(item)
            .then((goodsItem) => {
                dispatch(registerGoodsSuccess(goodsItem))
                dispatch(loadGoodsItems());
            });
    }
}

export function loadGoodsItems() {
    return dispatch => {
        return GoodsApi.fetchGoodsItems()
            .then((goodsItems) => {
                dispatch(loadGoodItemsSuccess(goodsItems))
            });
    }
}

export function loadGoodsItemsArrived() {
    return dispatch => {
        return GoodsApi.fetchGoodsItemsArrived()
            .then((goodsItems) => {
                dispatch(loadGoodItemsArrivedSuccess(goodsItems))
            });
    }
}

export function loadGoodsItemsAccepted() {
    return dispatch => {
        return GoodsApi.fetchGoodsItemsAccepted()
            .then((goodsItems) => {
                dispatch(loadGoodItemsAcceptedSuccess(goodsItems))
            });
    }
}

export function loadGoodsItemsStoring(areaId) {
    return dispatch => {
        return GoodsApi.fetchGoodsItemsStoring(areaId)
            .then((goodsItems) => {
                dispatch(loadGoodsItemsStoringSuccess(goodsItems))
            });
    }
}

export function loadGoodsItemsWaitingForUnload() {
    return dispatch => {
        return GoodsApi.fetchGoodsItemsWaitingForUnload()
            .then((goodsItems) => {
                dispatch(loadGoodItemsWaitingForUnloadSuccess(goodsItems))
            });
    }
}

export function loadGoodsItemsUnloaded() {
    return dispatch => {
        return GoodsApi.fetchGoodsItemsUnloaded()
            .then((goodsItems) => {
                dispatch(loadGoodItemsUnloadedSuccess(goodsItems))
            });
    }
}

export function loadGoodsItemsRegistered() {
    return dispatch => {
        return GoodsApi.fetchGoodsItemsRegistered()
            .then((goodsItems) => {
                dispatch(loadGoodItemsRegisteredSuccess(goodsItems))
            });
    }
}

export function loadGoodsItemsRejected() {
    return dispatch => {
        return GoodsApi.fetchGoodsItemsRejected()
            .then((goodsItems) => {
                dispatch(loadGoodItemsRejectedSuccess(goodsItems))
            });
    }
}

export function removeGoodsItem(id) {
    return (dispatch) => {
        return GoodsApi.removeGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsRegistered())
            })
    }
}

export function arriveGoodsItem(id) {
    return (dispatch) => {
        return GoodsApi.arriveGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsRegistered());
                dispatch(loadGoodsItemsArrived())
            });
    }
}

export function acceptGoodsItem(id) {
    return (dispatch) => {
        return GoodsApi.acceptGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsArrived());
                dispatch(loadGoodsItemsAccepted());
            });
    }
}

export function storeGoodsItem(id, areaId) {
    return (dispatch) => {
        return GoodsApi.storeGoodsItem(id, areaId)
            .then(() => {
                dispatch(loadGoodsItemsAccepted());
                dispatch(loadGoodsItemsStoring(areaId));
            })
    }
}

export function changeStoreGoodsItem(id, fromAreaId, toAreaId) {
    return (dispatch) => {
        return GoodsApi.storeGoodsItem(id, toAreaId)
            .then(() => {
                dispatch(loadGoodsItemsStoring(fromAreaId));
                dispatch(loadGoodsItemsStoring(toAreaId));
            })
    }
}

export function waitingForUnloadGoodsItem(id, fromAreaId) {
    return (dispatch) => {
        return GoodsApi.waitingForUnloadGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsStoring(fromAreaId));
                dispatch(loadGoodItemsUnloadedSuccess());
            })
    }
}

export function unloadGoodsItem(id) {
    return (dispatch) => {
        return GoodsApi.unloadGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsWaitingForUnload());
                dispatch(loadGoodsItemsUnloaded());
            })
    }
}

export function rejectGoodsItem(id, reasoning) {
    return (dispatch) => {
        return GoodsApi.rejectGoodsItem(id, reasoning)
            .then(() => {
                dispatch(loadGoodsItemsArrived());
                dispatch(loadGoodsItemsRejected());
            })
    }
}