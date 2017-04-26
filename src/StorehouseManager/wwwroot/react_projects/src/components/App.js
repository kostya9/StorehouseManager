/**
 * Created by kostya on 4/12/2017.
 */
import React, {Component} from 'react';

import Menu from "./Menu/Menu";
import Selector from "./Selector";

import css from './App.css'
import RegisterGoods from "./Goods/RegisterGoods";
import {connect} from "react-redux";

import Notifications from 'react-notification-system-redux';

import * as actionCreators from './../actionCreators';
import EasyTransition from 'react-easy-transition'

class App extends Component {
    render() {
        const {notifications} = this.props;
        return (
            <div className="app">
                <Notifications notifications={notifications} />
                <div className="col-xs-2 app-menu">
                    <Menu startRegisterGoods={this.props.startRegisterGoods} areas={this.props.areas} selectedId={this.props.selectedId} selectArea={this.props.selectArea}/>
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
        newItem: state.goods.newItem,
        selectedId: state.areas.selectedId,
        areas: state.areas.areasList,
        notifications: state.notifications
    }
}

const AppContainer = connect(mapStateToProps, actionCreators)(App);

export default AppContainer;