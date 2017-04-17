/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';

import css from './GoodsTableItem.css'
import crate from './../../img/crate.png'

export default class GoodsTableItem extends Component {
    padNumber(number) {
        const pad = number < 10 ? '0' : '';
        return pad + number;
    }

    render() {
        const time = new Date(this.props.time);
        return (<div className="goods-table-item">
            <div className="left"><p>&larr;</p></div>
            <div>
                <div className="icon-container">
                    <p><img className="icon" src={crate}/></p>
                </div>
                <div className="name">
                    <p>{this.props.name}</p>
                </div>
                <div className="time">
                    <p><span>{time.getFullYear()}.{this.padNumber(time.getMonth())}.{this.padNumber(time.getDate())}</span>
                    <span>{this.padNumber(time.getHours())}:{this.padNumber(time.getMinutes())}</span></p>
                </div>
            </div>
        <div className="right"><p>&rarr;</p></div>
        </div>);
    }
}