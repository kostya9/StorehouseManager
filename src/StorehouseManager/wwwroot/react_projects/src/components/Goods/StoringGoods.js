/**
 * Created by kostya on 4/23/2017.
 */
import React, {Component} from 'react';
import StoringTable from "./ConcreteTable/StoringTable";
import * as actionCreators from './../../actionCreators';
import {connect} from "react-redux";

class StoringGoods extends Component {

    componentWillMount() {
        this.props.loadGoodsItemsStoring(this.props.selectedId);
    }

    componentWillReceiveProps(next) {
        if(this.props.selectedId !== next.selectedId)
            next.loadGoodsItemsStoring(next.selectedId);
    }

    storeGoodsItem(id, to) {
        this.props.changeStoreGoodsItem(id, this.props.selectedId, to);
    }

    render() {
        if(this.props.selectedId == undefined || this.props.selectedId == -1) {
            return (
                <div className="nothing-selected-container"><div className="nothing-selected">
                    <h2>Nothing selected</h2>
                </div></div>)
        }
        return (
            <div className="outsideArea">
                <div className="goodsTableContainer">
                    <StoringTable storing={this.props.storing} hints={this.props.hints} areas={this.props.areas} selectedId={this.props.selectedId}
            storeGoodsItem={(id, to) => this.storeGoodsItem(id, to)} waitingForUnloadGoodsItem={this.props.waitingForUnloadGoodsItem} loadAreaMarkHints={this.props.loadAreaMarkHints}
                              loadGoodsItemsStoring={this.props.loadGoodsItemsStoring} router={this.props.router}/>
                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    let storing = state.goods.storing[state.areas.selectedId];
    if(storing == undefined)
        storing = [];
    return {
        storing: storing,
        hints: state.goods.hints,
        areas: state.areas.areasList,
        selectedId: state.areas.selectedId
    }
}

const StoringGoodsContainer = connect(mapStateToProps, actionCreators)(StoringGoods);

export default StoringGoodsContainer;