/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionCreators from './../../actionCreators';

import GoodsTable from "./GoodsTable";

class GoodsOutsideArea extends Component {
    render() {
        return (
            <div>
                <GoodsTable goodsItems={this.props.goodsItems}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        goodsItems: state.goods.goodsItems
    }
}

const GoodsOutsideAreaContainer = connect(mapStateToProps, actionCreators)(GoodsOutsideArea);

export default GoodsOutsideAreaContainer;