/**
 * Created by kostya on 4/22/2017.
 */
import React, {Component} from 'react';
import GoodsTable from "../Table/GoodsTable";
import GoodsReject from "../CustomTransitionHandlers/GoodsReject";

export default class ArrivedTable extends Component {

    componentWillMount() {
        this.setState({});
    }

    acceptConfirmText(name) {
        return "Are you sure you want to accept " + name + "?";
    }

    show(id) {
        this.setState({
            show: true,
            selectedId: id
        })
    }

    hide() {
        this.setState({show: false})
    }

    confirm(id, reason) {
        this.props.rejectGoodsItem(id, reason);
        this.hide();
    }

    render() {
        const selected = this.props.arrived.find(a => a.id === this.state.selectedId);
        return (<div>
            <GoodsReject show={this.state.show} id={this.state.selectedId} confirm={(id, reason) => this.confirm(id, reason)} cancel={() => this.hide()} name={selected && selected.name}/>
            <GoodsTable goodsItems={this.props.arrived} name="Arrived"
                    leftText="Reject" leftFunc={(id) => this.show(id)} confirmLeft={false}
                                 rightText="Accept" rightFunc={this.props.acceptGoodsItem} rightConfirmText={this.acceptConfirmText}/></div>);
    }

}

