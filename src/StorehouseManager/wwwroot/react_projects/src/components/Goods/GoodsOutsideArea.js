/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionCreators from './../../actionCreators';

import css from './GoodsOutsideArea.css'

import GoodsTable from "./Table/GoodsTable";
import RegisteredTable from "./ConcreteTable/RegisteredTable";
import ArrivedTable from "./ConcreteTable/ArrivedTable";
import AcceptedTable from "./ConcreteTable/AcceptedTable";

class GoodsOutsideArea extends Component {

    render() {
        return (
            <div className="outsideArea">
                <div className="goodsTableContainer">
                    <RegisteredTable removeGoodsItem={this.props.removeGoodsItem} registered={this.props.registered} arriveGoodsItem={this.props.arriveGoodsItem} router={this.props.router}/>
                </div>
                <div className="goodsTableContainer">
                    <ArrivedTable rejectGoodsItem={this.props.rejectGoodsItem} arrived={this.props.arrived} acceptGoodsItem={this.props.acceptGoodsItem} router={this.props.router}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        registered: state.goods.registered,
        arrived: state.goods.arrived
    }
}

const GoodsOutsideAreaContainer = connect(mapStateToProps, actionCreators)(GoodsOutsideArea);

export default GoodsOutsideAreaContainer;