/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';
import GoodsTableItem from "./GoodsTableItem";
import GoodsTableHeader from './GoodsTableHeader'

import css from './GoodsTable.css'

export default class GoodsTable extends Component {
    createGoodsTableItem(goodsItem) {
        return (<GoodsTableItem name={goodsItem.name} time={goodsItem.lastTransition} left={null} right={null} key={goodsItem.id} id={goodsItem.id} shipper={goodsItem.shipper}/>)
    }

    render() {
        return (<div className="">

            <div className="goods-table text-center">
                <GoodsTableHeader name={this.props.name}/>
                {this.props.goodsItems.map(this.createGoodsTableItem)}</div>
        </div>);
    }
}