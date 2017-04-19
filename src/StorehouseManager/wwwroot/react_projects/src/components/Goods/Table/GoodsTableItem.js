/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';

import css from './GoodsTableItem.css'
import crate from '../../../img/crate.png'
import ConfirmButton from "../../Shared/ConfirmButton";

export default class GoodsTableItem extends Component {
    componentWillMount() {
        this.setState({})
    }

    padNumber(number) {
        const pad = number < 10 ? '0' : '';
        return pad + number;
    }

    leftClick() {
        this.setState({confirmLeft: true})
    }

    leftClickCancel() {
        this.setState({confirmLeft: false})
    }

    rightClick() {
        this.setState({confirmRight: true});
    }

    rightClickCancel() {
        this.setState({confirmRight: false});
    }

    render() {
        const time = new Date(this.props.time);
        return (<div className="goods-table-item">
            {this.state.confirmLeft && <ConfirmButton text={"Are you sure you want to remove " + this.props.name + "?"} cancel={() => this.leftClickCancel()} confirm={() => this.props.leftFunc()}/>}
            {this.props.leftFunc && <div className="left" onClick={() => this.leftClick()}><p>&larr;</p></div> }
            <div>
                <div className="icon-container">
                    <p><img className="icon" src={crate}/></p>
                </div>
                <div className="name">
                    <p>{this.props.name}</p>
                </div>
                <div className="name">
                    <p>{this.props.shipper}</p>
                </div>
                <div className="time">
                    <p><span>{time.getFullYear()}.{this.padNumber(time.getMonth() + 1)}.{this.padNumber(time.getDate())}</span>
                    <span>{this.padNumber(time.getHours())}:{this.padNumber(time.getMinutes())}</span></p>
                </div>
            </div>
            {this.state.confirmRight && <ConfirmButton cancel={() => this.rightClickCancel()} confirm={() => this.props.rightFunc()}/>}
            {this.props.rightFunc && <div className="right" onClick={() => this.props.rightClick}><p>&rarr;</p></div> }
        </div>);
    }
}