/**
 * Created by kostya on 4/23/2017.
 */

import React, {Component} from 'react'

import css from './GoodsOutsideArea.css'
import * as actionCreators from './../../actionCreators';
import GoodsTable from "./Table/GoodsTable";
import {connect} from "react-redux";

export class GoodsUnloaded extends Component {
    render() {
        return (<div className="outsideArea">
            <div className="goodsTableContainer">
                <GoodsTable goodsItems={this.props.unloaded} name="Unloaded" router={this.props.router}/>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        unloaded: state.goods.unloaded,
    }
}

const GoodsUnloadedContainer = connect(mapStateToProps, actionCreators)(GoodsUnloaded);

export default GoodsUnloadedContainer;