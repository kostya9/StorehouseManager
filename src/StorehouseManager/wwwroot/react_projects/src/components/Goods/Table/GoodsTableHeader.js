/**
 * Created by kostya on 4/17/2017.
 */

import React, {Component} from 'react';

import css from './GoodsTableItem.css'
import crate from '../../../img/crate.png'

import css1 from './GoodsTableHeader.css'

export default class GoodsTableHeader extends Component {
    render() {
            return (
            <div><div className="goods-table-item">
                <div className="header-text"><p>{this.props.name}</p></div>
            </div>
                <div className="goods-table-item goods-table-header">
                    {this.props.leftText && <div className="left"><p>{this.props.leftText}</p></div>}
                <div>
                    <div className="icon-container">
                        <p></p>
                    </div>
                    <div className="name">
                        <p>Name</p>
                    </div>
                    <div className="name">
                        <p>Shipper</p>
                    </div>
                    <div className="time">
                        <p>Time of transition</p>
                    </div>
                </div>
                    {this.props.rightText && <div className="right"><p>{this.props.rightText}</p></div>}
                </div></div>);
    }
}