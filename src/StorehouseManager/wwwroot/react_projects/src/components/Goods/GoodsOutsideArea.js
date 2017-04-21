/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionCreators from './../../actionCreators';

import css from './GoodsOutsideArea.css'

import GoodsTable from "./Table/GoodsTable";

class GoodsOutsideArea extends Component {

    removeConfirmText(name) {
        return "Are you sure you want to remove " + name + "?";
    }

    rejectConfirmText(name) {
        return "Are you sure you want to reject " + name + "?";
    }

    acceptConfirmText(name) {
        return "Are you sure you want to accept " + name + "?";
    }

    arriveConfirmText(name) {
        return "Are you sure that " + name + " arrived ?";
    }

    render() {
        return (
            <div className="outsideArea">
                <div className="goodsTableContainer">
                    <GoodsTable goodsItems={this.props.registered} name="Registered"
                                leftText="Remove" leftFunc={this.props.removeGoodsItem} leftConfirmText={this.removeConfirmText}
                                rightText="Arrive" rightFunc={this.props.arriveGoodsItem} rightConfirmText={this.arriveConfirmText}/>
                </div>
                <div className="goodsTableContainer">
                    <GoodsTable goodsItems={this.props.arrived} name="Arrived"
                                leftText="Reject" leftFunc={this.props.rejectGoodsItem} leftConfirmText={this.rejectConfirmText}
                                rightText="Accept" rightFunc={this.props.acceptGoodsItem} rightConfirmText={this.acceptConfirmText}/>
                </div>
                <div className="goodsTableContainer">
                    <GoodsTable goodsItems={this.props.accepted} name="Accepted"
                                leftText="Reject" leftFunc={this.props.rejectGoodsItem}  leftConfirmText={this.rejectConfirmText}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        goodsItems: state.goods.goodsItems,
        registered: state.goods.registered,
        arrived: state.goods.arrived,
        accepted: state.goods.accepted
    }
}

const GoodsOutsideAreaContainer = connect(mapStateToProps, actionCreators)(GoodsOutsideArea);

export default GoodsOutsideAreaContainer;