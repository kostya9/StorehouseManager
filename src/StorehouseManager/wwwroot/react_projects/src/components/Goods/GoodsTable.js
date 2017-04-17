/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';
import GoodsTableItem from "./GoodsTableItem";

import css from './GoodsTable.css'

export default class GoodsTable extends Component {
    createGoodsTableItem(goodsItem) {
        return (<GoodsTableItem name={goodsItem.name} time={goodsItem.lastTransition} left={null} right={null} key={goodsItem.id} id={goodsItem.id}/>)
    }

    render() {
        return (<div className="col-xs-4">
            <div className="goods-table text-center">{this.props.goodsItems.map(this.createGoodsTableItem)}</div>
        </div>);
    }
}