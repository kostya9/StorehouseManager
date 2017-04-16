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
}