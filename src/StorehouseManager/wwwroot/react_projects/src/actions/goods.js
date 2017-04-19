/**
 * Created by kostya on 4/16/2017.
 */

import GoodsApi from "../api/goods";

import {LOAD_GOODSITEMS_SUCCESS, LOAD_GOODSITEMS_REGISTERED_SUCCESS, LOAD_GOODSITEMS_ARRIVED_SUCCESS, LOAD_GOODSITEMS_REJECTED_SUCCESS} from './../reducers/goods'
import {CANCEL_REGISTERING_ITEM, REGISTER_ITEM_SUCCESS, START_REGISTERING_ITEM} from "../reducers/goods";

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

function loadGoodItemsRejectedSuccess(goodsItems) {
    return loadGoodsItemsSuccessPrototype(LOAD_GOODSITEMS_REJECTED_SUCCESS, goodsItems);
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