import React, {Component} from 'react'

import Area from './Area'
import AreaDomain from '../../domain/area'

import css from './AreaList.css';

export default class AreaList extends Component{

  render() {
    return (
        <div className="text-center">
          <h2>Areas</h2>
          <ul className="row areaList text-center">
      {this.props.areas.map((area) =>
        {
          return (
          <li key={area.id}>
            <Area selectArea={this.props.selectArea} id={area.id} name={area.name} selected={area.id == this.props.selectedId} type={AreaDomain.fromTypeToName(area.type)}/>
          </li>
        )})}
        </ul></div>)
  }

}
