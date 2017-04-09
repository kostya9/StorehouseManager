import React, {Component} from 'react'

import Area from './Area'
import AreaDomain from '../../domain/area'

export default class AreaList extends Component{

  render() {
    return (<ul className="row areaList">
      {this.props.areas.map((area) =>
        {
          return (
          <li key={area.id}><Area selectArea={this.props.selectArea} id={area.id} name={area.name} selected={area.id == this.props.selectedId} type={AreaDomain.fromTypeToName(area.type)}/></li>
        )})}
    </ul>)
  }

}
