/**
 * Created by kostya on 4/16/2017.
 */

import GoodsApi from "../api/goods";

import {LOAD_GOODSITEMS_SUCCESS, LOAD_GOODSITEMS_REGISTERED_SUCCESS, LOAD_GOODSITEMS_ARRIVED_SUCCESS, LOAD_GOODSITEMS_REJECTED_SUCCESS} from './../reducers/goods'

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