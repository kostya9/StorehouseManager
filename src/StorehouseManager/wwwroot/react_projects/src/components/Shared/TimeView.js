/**
 * Created by kostya on 4/24/2017.
 */
import React, {Component} from 'react'

export default class TimeView extends Component {
    padNumber(number) {
        const pad = number < 10 ? '0' : '';
        return pad + number;
    }

    render() {
        const time = this.props.time;
        return (<span><span>{time.getFullYear()}.{this.padNumber(time.getMonth() + 1)}.{this.padNumber(time.getDate())}</span>
            <span>{this.padNumber(time.getHours())}:{this.padNumber(time.getMinutes())}</span></span>)
    }
}