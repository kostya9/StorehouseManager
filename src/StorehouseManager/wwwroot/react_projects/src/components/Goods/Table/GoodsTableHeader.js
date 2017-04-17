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
                <div className="left"><p>Prev</p></div>
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
                <div className="right"><p>Next</p></div>
                </div></div>);
    }
}