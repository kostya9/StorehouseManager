import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from './../actionCreators';

import css from './Selector.css'

import AreaDetails from './AreaDetails'
import AreaList from './AreaList'
import Drawer from './Drawer'

class Selector extends Component {

    getSelectedName() {
      const id = this.props.selectedId;
        if (id == -1)
            return '';

        const area = this.props.areas.find((area) => area.id == id);
        return area.name;
    }

    render() {
        return (
            <div>
                <div className="row col-xs-12 drawAndSelected">
                    <div className="col-md-6 col-sm-8">
                        <Drawer drawing={this.props.drawing} areas={this.props.areas} selectedId={this.props.selectedId}
                          currentDrawFigure={this.props.currentDrawFigure} height={this.props.height} width={this.props.width}
                          startDrawing={this.props.startDrawing} addArea={this.props.addArea} stopDrawing={this.props.stopDrawing} mouseMove={this.props.mouseMove}
                          selectArea={this.props.selectArea}/>
                    </div>
                    <div className="col-md-6 selectedDetails col-sm-8">
                        {this.props.selectedId != -1
                            ? <AreaDetails id={this.props.selectedId} name={this.getSelectedName()} setName={this.props.setName} removeArea={this.props.removeArea}/>
                            : ''}
                    </div>
                </div>
                <AreaList areas={this.props.areas} selectArea={this.props.selectArea} selectedId={this.props.selectedId}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentDrawFigure: state.currentDrawFigure,
        drawing: state.drawing,
        width: state.width,
        height: state.height,
        areas: state.areas,
        selectedId: state.selectedId,
        form: state.form
    }
}

export const SelectorContainer = connect(mapStateToProps, actionCreators)(Selector);

export default Selector;
