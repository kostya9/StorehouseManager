/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';
import GoodsTableItem from "./GoodsTableItem";
import GoodsTableHeader from './GoodsTableHeader'

import css from './GoodsTable.css'

export default class GoodsTable extends Component {
    createGoodsTablesItem(goodsItem, rightFunc, leftFunc, leftText, rightText) {
        return (<GoodsTableItem name={goodsItem.name} time={goodsItem.lastTransition} key={goodsItem.id} id={goodsItem.id} shipper={goodsItem.shipper}
                                leftFunc={leftFunc && (() => leftFunc(goodsItem.id))} leftText={leftText}
                                rightFunc={rightFunc && (() => rightFunc(goodsItem.id))} rightText={rightText}
        />)
    }

    render() {
        return(<div className="goods-table text-center">
                <GoodsTableHeader
                    name={this.props.name}
                    leftText={this.props.leftText}
                    rightText={this.props.rightText}/>
                {this.props.goodsItems.map(gi => this.createGoodsTablesItem(gi, this.props.rightFunc, this.props.leftFunc,
                    this.props.leftConfirmText && this.props.leftConfirmText(gi.name),
                    this.props.rightConfirmText && this.props.rightConfirmText(gi.name)))}
        </div>);
    }
}