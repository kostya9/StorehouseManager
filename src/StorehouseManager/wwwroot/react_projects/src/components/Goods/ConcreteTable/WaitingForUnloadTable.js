/**
 * Created by kostya on 4/23/2017.
 */
import React, {Component} from 'react'
import GoodsTable from "../Table/GoodsTable";

import css from './WaitingForUnloadTable.css'

export default class WaitingForUnloadTable extends Component {
    unloadConfirmText(name) {
        return `Are you sure that ${name} is unloaded?`;
    }
    render() {
        return (<div className="wait-for-unload"><GoodsTable goodsItems={this.props.waitingForUnload} name="Waiting for unload"
                                 rightText="Unload" rightFunc={this.props.unloadGoodsItem} rightConfirmText={this.unloadConfirmText} router={this.props.router}/></div>);
    }
}