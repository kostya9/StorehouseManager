/**
 * Created by kostya on 4/12/2017.
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionCreators from './../actionCreators';

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
                    <Selector {...this.props} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentDrawFigure: state.draw.currentDrawFigure,
        drawing: state.draw.drawing,
        width: state.draw.width,
        height: state.draw.height,
        areas: state.areas.areasList,
        selectedId: state.areas.selectedId,
        form: state.form,
        addingAreaRectangle: state.areas.addingAreaRectangle,
        areaTypesAvailability: state.areas.areaTypesAvailability
    }
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);