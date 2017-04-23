/**
 * Created by kostya on 4/12/2017.
 */
import React, {Component} from 'react';

import Menu from "./Menu/Menu";
import Selector from "./Selector";

import css from './App.css'
import RegisterGoods from "./Goods/RegisterGoods";
import {connect} from "react-redux";

import * as actionCreators from './../actionCreators';
import EasyTransition from 'react-easy-transition'

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="col-xs-2 app-menu">
                    <Menu startRegisterGoods={this.props.startRegisterGoods}/>
                </div>
                <div className="col-xs-10 vertical-line app-component">
                    <EasyTransition
                        path={location.pathname}
                        initialStyle={{opacity: 0}}
                        transition="opacity 0.2s ease-in-out"
                        finalStyle={{opacity: 1}}
                    >
                    {this.props.children}
                    </EasyTransition>
                </div>
                <RegisterGoods newItem={this.props.newItem} cancel={this.props.cancelRegisterGoods} register={this.props.registerGoodsItem}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newItem: state.goods.newItem
    }
}

const AppContainer = connect(mapStateToProps, actionCreators)(App);

export default AppContainer;