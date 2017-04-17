/**
 * Created by kostya on 4/17/2017.
 */

import React, {Component} from 'react'

import css from './GoodsOutsideArea.css'
import * as actionCreators from './../../actionCreators';
import GoodsTable from "./Table/GoodsTable";
import {connect} from "react-redux";

export class GoodsRejected extends Component {
    render() {
        return (<div className="outsideArea">
            <div className="goodsTableContainer">
                <GoodsTable goodsItems={this.props.rejected} name="Rejected"/>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        rejected: state.goods.rejected,
    }
}

const GoodsRejectedContainer = connect(mapStateToProps, actionCreators)(GoodsRejected);

export default GoodsRejectedContainer;