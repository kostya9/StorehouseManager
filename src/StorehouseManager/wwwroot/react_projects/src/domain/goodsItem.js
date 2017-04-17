/**
 * Created by kostya on 4/16/2017.
 */

export default class GoodsItem {
    constructor(id, name, shipper, lastTransition, status) {
        this.id = id;
        this.name = name;
        this.lastTransition = lastTransition;
        this.status = status;
        this.shipper = shipper;
    }
}