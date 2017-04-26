/**
 * Created by kostya on 4/16/2017.
 */

import {address} from './apiConstants'

import {
    createPutFetchOptions, createDeleteFetchOptions, sameOriginOption, createPostFetchOptions,
    handleErrors, parseAndHandleErrors
} from './apiFunctions';

export default class GoodsApi {
    static registerGoods(goodsItem) {
        return fetch(address + '/api/goodsitems/operations/create', createPostFetchOptions(JSON.stringify(goodsItem)))
            .then(parseAndHandleErrors)
    }
    static fetchGoodsItems(state) {
        return fetch(address + '/api/goodsitems/filter/' + state, sameOriginOption)
            .then(parseAndHandleErrors)
    }

    static fetchGoodsItem(id) {
        return fetch(address + '/api/goodsitems/filter/' + id, sameOriginOption)
            .then(parseAndHandleErrors)
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
            .then(parseAndHandleErrors);
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
            .then(parseAndHandleErrors);
    }

    static arriveGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "arrive");
    }

    static acceptGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "accept");
    }

    static storeGoodsItem(id, areaId) {
        return fetch(this.getOperationAddress(id, "store") + "?areaId=" + areaId, createPostFetchOptions(''))
            .then(parseAndHandleErrors);
    }

    static waitingForUnloadGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "waitforunload");
    }

    static unloadGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "unload");
    }

    static removeGoodsItem(id) {
        return this.simpleGoodsItemOperation(id, "remove")

    }

    static rejectGoodsItem(id, reasoning) {
        return fetch(this.getOperationAddress(id, "reject") + "?reasoning=" + reasoning, createPostFetchOptions(''))
            .then(parseAndHandleErrors);
    }

    static fetchHints(id) {
        return fetch(`/api/goodsitems/${id}/areamark`, sameOriginOption)
            .then(parseAndHandleErrors);
    }

    static fetchTransitions(id) {
        return fetch(`/api/goodsitems/${id}/transitions`, sameOriginOption)
            .then(parseAndHandleErrors);
    }
}