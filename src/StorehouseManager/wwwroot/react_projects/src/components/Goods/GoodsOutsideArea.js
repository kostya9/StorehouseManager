/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionCreators from './../../actionCreators';

import css from './GoodsOutsideArea.css'

import GoodsTable from "./Table/GoodsTable";

class GoodsOutsideArea extends Component {
    render() {
        return (
            <div className="outsideArea">
                <div className="goodsTableContainer"><GoodsTable goodsItems={this.props.registered} name="Registered" leftText="Remove" leftFunc={this.props.removeGoodsItem}/></div>
                <div className="goodsTableContainer"><GoodsTable goodsItems={this.props.arrived} name="Arrived"/></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        goodsItems: state.goods.goodsItems,
        registered: state.goods.registered,
        arrived: state.goods.arrived
    }
}

const GoodsOutsideAreaContainer = connect(mapStateToProps, actionCreators)(GoodsOutsideArea);

export default GoodsOutsideAreaContainer;