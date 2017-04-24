/**
 * Created by kostya on 4/24/2017.
 */

import React, {Component} from 'react';
import {Button} from "react-bootstrap";

import * as actionCreators from './../../actionCreators';
import {connect} from "react-redux";

import css from './GoodsTransitionsReport.css'
import TimeView from "../Shared/TimeView";


class GoodsTransitionsReport extends Component {
    componentWillReceiveProps(next) {
        if ((this.props.params.id != next.params.id) || (this.props.transitions == undefined)) {
            next.loadTransitions(next.params.id);
        }

        if(next.goodsItem.id != next.params.id)
            next.loadGoodsItem(next.params.id)
    }

    goBack() {
        this.props.router.goBack();
    }

    componentWillMount() {
        this.props.loadTransitions(this.props.params.id);
    }

    generateItem(transition) {
        return (<div className="goods-table-item" key={transition.id}>
            <div className="time"><p><TimeView time={new Date(transition.transitionTime)}/></p></div>
            <div className="name"><p>{transition.from}</p></div>
            <div className="name"><p>{transition.to}</p></div>
            <div className="name"><p>{transition.note}</p></div>
        </div>)
    }

    render() {
        if(this.props.selectedGoodsItemId == undefined || this.props.goodsItem == undefined ||
            this.props.params.id != this.props.selectedGoodsItemId || this.props.params.id != this.props.goodsItem.id)
            return (            <div><Button onClick={() => this.goBack()} className="back-btn">Back</Button>
                <div className="nothing-selected-container"><div className="nothing-selected">
                    <h2>Loading...</h2>
                </div></div></div>)

        return (<div className="transitions">
            <div><Button onClick={() => this.goBack()} className="back-btn">Back</Button></div>
            <div className="outsideArea">
                <div className="goodsTableContainer">
                    <div className="goods-table-item">
                        <div className="header-text"><p>{this.props.goodsItem.name}</p></div>
                    </div>
                    <div className="goods-table text-center">
                        <div>
                            <div className="goods-table-item goods-table-header">
                                <div className="time"><p>When</p></div>
                                <div className="name"><p>From</p></div>
                                <div className="name"><p>To</p></div>
                                <div className="name"><p>Why/Where</p></div>
                            </div>
                        </div>
                        {this.props.transitions.map(t => this.generateItem(t))}
                    </div>
                </div>
            </div>
            </div>)
    }
}

const mapStateToProps = (state) =>  {
    return {
        transitions: state.goods.transitionReport.transitions,
        selectedGoodsItemId: state.goods.transitionReport.goodsItemId,
        goodsItem: state.goods.selectedItem
    }
}

const GoodsTransitionsReportContainer = connect(mapStateToProps, actionCreators)(GoodsTransitionsReport);

export default GoodsTransitionsReportContainer;