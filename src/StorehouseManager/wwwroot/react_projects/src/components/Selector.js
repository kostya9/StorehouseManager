import React, {Component} from 'react'

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

        return this.props.areas.find((area) => area.id === id);
    }

    getDrawerCssClasses() {
        const classes = "text-center";
        if(this.props.selectedId === -1)
            return classes + " col-xs-12";
        else
            return classes + " col-lg-7 col-md-8";

    }

    getAreaDetails() {
        if(this.props.selectedId === -1)
            return "";

        const selectedArea = this.getSelectedArea();

        return (<div className="col-sm-5">
            <AreaDetails id={this.props.selectedId} name={selectedArea.name} type={selectedArea.type} updateArea={this.props.updateArea}
                         removeArea={this.props.removeArea} areaTypesAvailability={this.props.areaTypesAvailability} reset={() => this.props.selectArea(-1)}/>
        </div>);
    }

    render() {

        return (
            <div>
                <div className="row col-xs-12 drawAndSelected">
                    <div className={this.getDrawerCssClasses()}>
                        <Drawer drawing={this.props.drawing} areas={this.props.areas} selectedId={this.props.selectedId}
                          currentDrawFigure={this.props.currentDrawFigure} height={this.props.height} width={this.props.width}
                          startDrawing={this.props.startDrawing} addArea={this.props.addArea} stopDrawing={this.props.stopDrawing} mouseMove={this.props.mouseMove}
                          selectArea={this.props.selectArea} startAddArea={this.props.startAddArea}/>
                    </div>
                    {this.getAreaDetails()}
                    <AddArea stopDrawing={this.props.stopDrawing} addingAreaRectangle={this.props.addingAreaRectangle} cancel={this.props.cancelAddArea}
                             add={this.props.addArea} areaTypesAvailability={this.props.areaTypesAvailability}/>
                </div>
                <AreaList areas={this.props.areas} selectArea={this.props.selectArea} selectedId={this.props.selectedId}/>
            </div>
        )
    }
}

export default Selector;
