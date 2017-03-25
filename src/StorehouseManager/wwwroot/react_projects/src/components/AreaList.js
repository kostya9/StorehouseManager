import React, {Component} from 'react'

import Area from './Area'

export default class AreaList extends Component{

  render() {
    return (<ul className="areaList">
      {this.props.areas.map((area) =>
        {
          return (
          <li key={area.id}><Area selectArea={this.props.selectArea} id={area.id} selected={area.id == this.props.selectedId}/></li>
        )})}
    </ul>)
  }

}
