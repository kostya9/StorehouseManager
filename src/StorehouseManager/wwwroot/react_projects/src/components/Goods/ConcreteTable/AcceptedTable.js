/**
 * Created by kostya on 4/22/2017.
 */

import React, {Component} from 'react';
import GoodsTable from "../Table/GoodsTable";
import StoreTransitionMarkedAreaHint from "../CustomTransitionHandlers/StoreTransitionMarkedAreaHint";
import GoodsReject from "../CustomTransitionHandlers/GoodsReject";

export default class AcceptedTable extends Component {
    rejectConfirmText(name) {
        return `Are you sure you want to reject ${name} ?`;
    }

    componentWillMount() {
        this.hideHints();
    }

    showHints(id) {
        this.props.loadAreaMarkHints(id);
        this.setState({showHint: true});
    }

    hideHints() {
        this.setState({showHint: false});
    }

    confirmStore(id) {
        this.props.storeGoodsItem(id);
    }

    showReject(id) {
        this.setState({
            showReject: true,
            selectedId: id
        })
    }

    hideReject() {
        this.setState({showReject: false})
    }

    confirmReject(id, reason) {
        this.props.rejectGoodsItem(id, reason);
    }

        render() {
            const selected = this.props.accepted.find(a => a.id === this.state.selectedId);
        return (<div>
            <GoodsReject show={this.state.showReject} id={this.state.selectedId}
                         confirm={(id, reason) => this.confirmReject(id, reason)} cancel={() => this.hideReject()} name={selected && selected.name}/>
            <StoreTransitionMarkedAreaHint show={this.state.showHint} hints={this.props.hints.marks} areas={this.props.areas} recommended={this.props.hints.recommendedAreaId}
                                           cancel={() => this.hideHints()} confirm={(id) => {this.hideHints(); this.confirmStore(id)}}/>

            <GoodsTable goodsItems={this.props.accepted} name="Accepted"
                        leftText="Reject" rightText="Store"
                        confirmLeft={false} leftFunc={(id) => this.showReject(id)}
                        confirmRight={false} rightFunc={(id) => this.showHints(id)}/>
        </div>);
    }
}