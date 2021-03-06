/**
 * Created by kostya on 4/16/2017.
 */

import GoodsApi from "../api/goods";

import {LOAD_GOODSITEMS_SUCCESS, LOAD_GOODSITEMS_REGISTERED_SUCCESS, LOAD_GOODSITEMS_ARRIVED_SUCCESS,
LOAD_GOODSITEMS_REJECTED_SUCCESS, LOAD_GOODSITEMS_STORING_SUCCESS, LOAD_GOODSITEMS_WAITINGFORUNLOAD_SUCCESS, LOAD_GOODSITEMS_UNLOADED_SUCCESS} from './../reducers/goods'
import {
    CANCEL_REGISTERING_ITEM, LOAD_AREA_MARK_HINTS_SUCCESS, LOAD_GOODSITEM_SUCCESS, LOAD_GOODSITEMS_ACCEPTED_SUCCESS,
    LOAD_TRANSITIONS_SUCCESS,
    REGISTER_ITEM_SUCCESS,
    START_REGISTERING_ITEM
} from "../reducers/goods";
import {loadAreas} from "./areas";
import {notificationFailure} from "./notification";

function loadGoodsItemSuccess(item) {
    return {
        type: LOAD_GOODSITEM_SUCCESS,
        item: item
    }
}

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

function loadAreaMarkHintsSuccess(hints) {
    return {
        type: LOAD_AREA_MARK_HINTS_SUCCESS,
        hints: hints
    }
}

export function registerGoodsItem(item) {
    return dispatch => {
        return GoodsApi.registerGoods(item)
            .then((goodsItem) => {
                dispatch(registerGoodsSuccess(goodsItem));
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
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
                dispatch(loadGoodsItemsStoringSuccess(areaId, goodsItems))
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
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function arriveGoodsItem(id) {
    return (dispatch) => {
        return GoodsApi.arriveGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsRegistered());
                dispatch(loadGoodsItemsArrived())
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function acceptGoodsItem(id) {
    return (dispatch) => {
        return GoodsApi.acceptGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsArrived());
                dispatch(loadGoodsItemsAccepted());
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function storeGoodsItem(id, areaId) {
    return (dispatch) => {
        return GoodsApi.storeGoodsItem(id, areaId)
            .then(() => {
                dispatch(loadGoodsItemsAccepted());
                dispatch(loadGoodsItemsStoring(areaId));
                dispatch(loadAreas())
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function changeStoreGoodsItem(id, fromAreaId, toAreaId) {
    return (dispatch) => {
        return GoodsApi.storeGoodsItem(id, toAreaId)
            .then(() => {
                dispatch(loadGoodsItemsStoring(fromAreaId));
                dispatch(loadGoodsItemsStoring(toAreaId));
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function waitingForUnloadGoodsItem(id, fromAreaId) {
    return (dispatch) => {
        return GoodsApi.waitingForUnloadGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsStoring(fromAreaId));
                dispatch(loadGoodsItemsWaitingForUnload());
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function unloadGoodsItem(id) {
    return (dispatch) => {
        return GoodsApi.unloadGoodsItem(id)
            .then(() => {
                dispatch(loadGoodsItemsWaitingForUnload());
                dispatch(loadGoodsItemsUnloaded());
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function rejectGoodsItem(id, reasoning) {
    return (dispatch) => {
        return GoodsApi.rejectGoodsItem(id, reasoning)
            .then(() => {
                dispatch(loadGoodsItemsAccepted());
                dispatch(loadGoodsItemsArrived());
                dispatch(loadGoodsItemsRejected());
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function loadAreaMarkHints(id) {
    return (dispatch) => {
        return GoodsApi.fetchHints(id)
            .then((hints) => {
                dispatch(loadAreaMarkHintsSuccess(hints));
            });
    }
}

export function loadGoodsItem(id) {
    return (dispatch) => {
        return GoodsApi.fetchGoodsItem(id)
            .then((item) => {
                dispatch(loadGoodsItemSuccess(item))
            })
    }
}

export function loadTransitions(id) {
    return (dispatch) => {
        return  GoodsApi.fetchTransitions(id)
            .then((transitions) => {
                dispatch(loadTransitionsSuccess(id, transitions));
            })
    }
}

function loadTransitionsSuccess(id, transitions) {
    return {
        type: LOAD_TRANSITIONS_SUCCESS,
        id: id,
        transitions: transitions
    }
}