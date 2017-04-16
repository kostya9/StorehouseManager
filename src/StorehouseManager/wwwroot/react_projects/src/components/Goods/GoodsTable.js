/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';
import GoodsTableItem from "./GoodsTableItem";

export default class GoodsTable extends Component {
    createGoodsTableItem(goodsItem) {
        return (<GoodsTableItem name={goodsItem.name} time={goodsItem.timeStatusChange} left={null} right={null} key={goodsItem.id} id={goodsItem.id}/>)
    }

    render() {
        return (<div>
            <ul>
                {this.props.goodsItems.map(this.createGoodsTableItem)}
            </ul>
        </div>);
    }
}