/**
 * Created by kostya on 4/16/2017.
 */

import {address} from './apiConstants'

import {createPutFetchOptions, createDeleteFetchOptions, sameOriginOption, createPostFetchOptions} from './apiFunctions';

export default class GoodsApi {
    static registerGoods(goodsItem) {
        return fetch(address + '/api/goodsitems/operations/create', createPostFetchOptions(JSON.stringify(goodsItem)))
            .then((response) => {
                return response.json();
            })
    }
    static fetchGoodsItems() {
        return fetch(address + '/api/goodsitems/filter', sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItemsArrived() {
        return fetch(address + '/api/goodsitems/filter/arrived', sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItemsRegistered() {
        return fetch(address + '/api/goodsitems/filter/registered', sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItemsRejected() {
        return fetch(address + '/api/goodsitems/filter/rejected', sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static removeGoodsItem(id) {
        return fetch(address + '/api/goodsitems/operations/' + id + '/remove', createPostFetchOptions(''))
    }
}