/**
 * Created by kostya on 4/12/2017.
 */
import React, {Component} from 'react';

import Menu from "./Menu/Menu";
import Selector from "./Selector";

import css from './App.css'

export default class App extends Component {
    render() {
        return (
            <div>
                <div className="col-xs-2">
                    <Menu />
                </div>
                <div className="col-xs-10 vertical-line">
                    {this.props.children}
                </div>
            </div>
        )
    }
}