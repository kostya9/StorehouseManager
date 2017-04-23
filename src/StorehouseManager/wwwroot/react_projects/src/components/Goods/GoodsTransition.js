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
import WaitingForUnloadTable from "./ConcreteTable/WaitingForUnloadTable";

class GoodsTransition extends Component {

    render() {
        return (
            <div className="outsideArea">
                <div className="goodsTableContainer">
                    <AcceptedTable rejectGoodsItem={this.props.rejectGoodsItem} accepted={this.props.accepted} hints={this.props.hints} areas={this.props.areas}
                                   loadAreaMarkHints={this.props.loadAreaMarkHints} storeGoodsItem={this.props.storeGoodsItem} router={this.props.router}/>
                </div>
                <div className="goodsTableContainer">
                    <WaitingForUnloadTable waitingForUnload={this.props.waitingForUnload} unloadGoodsItem={this.props.unloadGoodsItem} router={this.props.router}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        accepted: state.goods.accepted,
        hints: state.goods.hints,
        areas: state.areas.areasList,
        waitingForUnload : state.goods.waitingForUnload
    }
}

const GoodsTransitionAreaContainer = connect(mapStateToProps, actionCreators)(GoodsTransition);

export default GoodsTransitionAreaContainer;