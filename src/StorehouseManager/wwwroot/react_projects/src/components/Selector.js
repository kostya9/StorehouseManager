import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from './../actionCreators';

import css from './Selector.css'

import AreaDetails from './Areas/AreaDetails'
import AreaList from './Areas/AreaList'
import Drawer from './Draw/Drawer'
import AddArea from './Areas/AddArea'

class Selector extends Component {

    getSelectedArea() {
      const id = this.props.selectedId;
        if (id === -1)
            return null;

        return this.props.areas.find((area) => area.id == id);
    }

    render() {
        const selectedArea = this.getSelectedArea();
        return (
            <div>
                <div className="row col-xs-12 drawAndSelected">
                    <div className="col-sm-9">
                        <Drawer drawing={this.props.drawing} areas={this.props.areas} selectedId={this.props.selectedId}
                          currentDrawFigure={this.props.currentDrawFigure} height={this.props.height} width={this.props.width}
                          startDrawing={this.props.startDrawing} addArea={this.props.addArea} stopDrawing={this.props.stopDrawing} mouseMove={this.props.mouseMove}
                          selectArea={this.props.selectArea} startAddArea={this.props.startAddArea}/>
                    </div>
                    <div className="col-sm-3">
                        {this.props.selectedId != -1
                            ? <AreaDetails id={this.props.selectedId} name={selectedArea.name} type={selectedArea.type} updateArea={this.props.updateArea}
                                           removeArea={this.props.removeArea} areaTypesAvailability={this.props.areaTypesAvailability}/>
                            : ''}
                    </div>
                    <AddArea stopDrawing={this.props.stopDrawing} addingAreaRectangle={this.props.addingAreaRectangle} cancel={this.props.cancelAddArea}
                             add={this.props.addArea} areaTypesAvailability={this.props.areaTypesAvailability}/>
                </div>
                <AreaList areas={this.props.areas} selectArea={this.props.selectArea} selectedId={this.props.selectedId}/>
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

export const SelectorContainer = connect(mapStateToProps, actionCreators)(Selector);

export default Selector;
