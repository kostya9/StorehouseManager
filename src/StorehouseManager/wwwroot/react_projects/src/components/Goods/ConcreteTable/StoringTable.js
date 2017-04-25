/**
 * Created by kostya on 4/23/2017.
 */

import React, {Component} from 'react';
import GoodsTable from "../Table/GoodsTable";
import StoreTransitionMarkedAreaHint from "../CustomTransitionHandlers/StoreTransitionMarkedAreaHint";

export default class StoringTable extends Component {
    componentWillMount() {
        this.hideHints();
    }

    showHints(id) {
        this.props.loadAreaMarkHints(id);
        this.setState({showHint: true, selectedGoodsItemId: id});
    }

    confirm(areaId) {
        this.props.storeGoodsItem(this.state.selectedGoodsItemId, areaId)
    }

    hideHints() {
        this.setState({showHint: false});
    }

    rightConfirmText(name) {
        return `Area you sure that ${name} is going to be unloaded and has no need to be stored?`
    }

    render() {
        return (<div>
            <StoreTransitionMarkedAreaHint show={this.state.showHint} hints={this.props.hints.marks} areas={this.props.areas} recommended={this.props.hints.recommendedAreaId}
                                           cancel={() => this.hideHints()} confirm={(areaId) => {this.hideHints(); this.confirm(areaId)}}/>
            <GoodsTable goodsItems={this.props.storing} name="Storing"
                            leftText="Store" confirmLeft={false} leftFunc={(id) => this.showHints(id)}
                            rightText="Wait For Unload" rightFunc={(goodsItemId) => this.props.waitingForUnloadGoodsItem(goodsItemId, this.props.selectedId)} rightConfirmText={this.rightConfirmText} router={this.props.router}/>
        </div>);
    }
}