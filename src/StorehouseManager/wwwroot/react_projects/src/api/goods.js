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
    static fetchGoodsItems(state) {
        return fetch(address + '/api/goodsitems/filter/' + state, sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItem(id) {
        return fetch(address + '/api/goodsitems/filter/' + id, sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItemsRegistered() {
        return this.fetchGoodsItems("registered");
    }

    static fetchGoodsItemsArrived() {
        return this.fetchGoodsItems("arrived");
    }

    static fetchGoodsItemsAccepted() {
        return this.fetchGoodsItems("accepted");
    }

    static fetchGoodsItemsStoring(areaId) {
        return fetch(address + '/api/goodsitems/filter/storing?areaId=' + areaId, sameOriginOption)
            .then((response) => {
                return response.json();
            })
    }

    static fetchGoodsItemsWaitingForUnload() {
        return this.fetchGoodsItems("waitingforunload");
    }

    static fetchGoodsItemsUnloaded() {
        return this.fetchGoodsItems("unloaded");
    }

    static fetchGoodsItemsRejected() {
        return this.fetchGoodsItems("rejected");
    }

    static getOperationAddress(id, operation) {
        return address + "/api/goodsitems/operations/" + id + "/" + operation;
    }


    static simpleGoodsItemOperation(id, operation) {
        return fetch(this.getOperationAddress(id, operation), createPostFetchOptions(''))
    }

    static arriveGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "arrive");
    }

    static acceptGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "accept");
    }

    static storeGoodsItem(id, areaId) {
        return fetch(this.getOperationAddress(id, "store") + "?areaId=" + areaId, createPostFetchOptions(''))
    }

    static waitingForUnloadGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "waitforunload");
    }

    static unloadGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "unload");
    }

    static removeGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "remove");
    }

    static rejectGoodsItem(id, reasoning) {
        return fetch(this.getOperationAddress(id, "reject") + "?reasoning=" + reasoning, createPostFetchOptions(''))
    }

    static fetchHints(id) {
        return fetch(`/api/goodsitems/${id}/areamark`, sameOriginOption)
            .then((result) => {
                return result.json();
            })
    }

    static fetchTransitions(id) {
        return fetch(`/api/goodsitems/${id}/transitions`, sameOriginOption)
            .then((result) => {
                return result.json();
            })
    }
}