/**
 * Created by kostya on 4/22/2017.
 */
import React, {Component} from 'react';
import GoodsTable from "../Table/GoodsTable";

export default class RegisteredTable extends Component{
    removeConfirmText(name) {
        return "Are you sure you want to remove " + name + "?";
    }

    arriveConfirmText(name) {
        return "Are you sure that " + name + " arrived ?";
    }

    render() {
        return (<GoodsTable goodsItems={this.props.registered} name="Registered"
                    leftText="Remove" leftFunc={this.props.removeGoodsItem} leftConfirmText={this.removeConfirmText}
                    rightText="Arrive" rightFunc={this.props.arriveGoodsItem} rightConfirmText={this.arriveConfirmText}/>);
    }
}