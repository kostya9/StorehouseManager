/**
 * Created by kostya on 4/16/2017.
 */

import React, {Component} from 'react';

export default class GoodsTableItem extends Component {
    render() {
        return (<div>
            <span>&larr;</span>
            <span>{this.props.name}</span>
            <span>{this.props.time}</span>
            <span>&rarr;</span>
        </div>);
    }
}