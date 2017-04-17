/**
 * Created by kostya on 4/16/2017.
 */

import {address} from './apiConstants'

import {createPutFetchOptions, createDeleteFetchOptions, sameOriginOption, createPostFetchOptions} from './apiFunctions';

export default class GoodsApi {
    static fetchGoodsItems() {
        return fetch(address + '/api/goodsitems', sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItemsArrived() {
        return fetch(address + '/api/goodsitems/arrived', sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItemsRegistered() {
        return fetch(address + '/api/goodsitems/registered', sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItemsRejected() {
        return fetch(address + '/api/goodsitems/rejected', sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }
}