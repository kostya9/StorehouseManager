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

    componentWillReceiveProps(next) {
    }


    padNumber(number) {
        const pad = number < 10 ? '0' : '';
        return pad + number;
    }

    leftClick() {
        if(this.confirmLeft)
            this.setState({confirmLeft: true})
        else
            this.props.leftFunc();
    }

    leftClickCancel() {
        this.setState({confirmLeft: false})
    }

    rightClick() {
        if(this.confirmRight)
            this.setState({confirmRight: true})
        else
            this.props.rightFunc();
    }

    rightClickCancel() {
        this.setState({confirmRight: false});
    }

    goToItemDetails() {
        this.props.router.push(`/goods/${this.props.id}`)
    }

    render() {
        if(this.props.confirmLeft == undefined)
            this.confirmLeft = true;
        else
            this.confirmLeft = this.props.confirmLeft;

        if(this.props.confirmRight == undefined)
            this.confirmRight = true;
        else
            this.confirmRight = this.props.confirmRight;

        const time = new Date(this.props.time);
        return (<div className="goods-table-item">
            <ConfirmButton show={this.confirmLeft && this.state.confirmLeft} text={this.props.leftText}
                           cancel={() => this.leftClickCancel()} confirm={() => {this.props.leftFunc(); this.leftClickCancel();}}/>
            {this.props.leftFunc && <div className="left" onClick={() => this.leftClick()}><p>&larr;</p></div> }
            <div className="details" onClick={() => this.goToItemDetails()}>
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
            <ConfirmButton show={this.confirmRight && this.state.confirmRight} text={this.props.rightText}
                           cancel={() => this.rightClickCancel()} confirm={() => {this.props.rightFunc(); this.rightClickCancel();}}/>
            {this.props.rightFunc && <div className="right" onClick={() => this.rightClick()}><p>&rarr;</p></div> }
        </div>);
    }
}