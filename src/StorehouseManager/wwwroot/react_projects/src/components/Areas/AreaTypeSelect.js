/**
 * Created by kostya on 4/9/2017.
 */
import React, {Component} from 'react'
import {FormControl} from 'react-bootstrap'
import {AREA_ENTER, AREA_EXIT, AREA_SECTION} from "../../domain/area";
import Area from "../../domain/area";

export default class AreaTypeSelect extends Component {
    isEnterAvailable() {
        return this.props.areaTypesAvailability.enter || this.props.value == AREA_ENTER;
    }

    isExitAvailable() {
        return this.props.areaTypesAvailability.exit || this.props.value == AREA_EXIT;
    }

    render() {
        return (<FormControl componentClass="select" onChange={this.props.onChange} value={this.props.value}>
            <option value={AREA_SECTION}>{Area.fromTypeToName(AREA_SECTION)}</option>
            {this.isEnterAvailable() ? <option value={AREA_ENTER}>{Area.fromTypeToName(AREA_ENTER)}</option> : ''}
            {this.isExitAvailable() ? <option value={AREA_EXIT}>{Area.fromTypeToName(AREA_EXIT)}</option> : ''}
        </FormControl>)
    }
}