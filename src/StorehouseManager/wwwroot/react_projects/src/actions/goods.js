/**
 * Created by kostya on 4/16/2017.
 */

import GoodsApi from "../api/goods";

import {LOAD_GOODSITEMS_SUCCESS} from './../reducers/goods'

export function loadGoodItemsSuccess(goodsItems) {
    return {
        type: LOAD_GOODSITEMS_SUCCESS,
        goodsItems: goodsItems
    };
}

export function loadGoodsItems() {
    return dispatch => {
        return GoodsApi.fetchGoodsItems()
            .then((goodsItems) => {
                dispatch(loadGoodItemsSuccess(goodsItems))
            });
    }
}