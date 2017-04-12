import React, {Component} from 'react'

import css from './Area.css'

export default class Area extends Component {
  render() {
    return (
    <div className="area" onClick={() => this.props.selectArea(this.props.id)}>
      {
        this.props.selected ? <span className="selected key area-info-badge">+</span> : ''
      }
      <span className="key area-info-badge">Id</span>
      <span className="value area-info-badge">{this.props.id}</span>
      <span className="key area-info-badge">Name</span>
      <span className="value area-info-badge area-name">{this.props.name}</span>
      <span className="key area-info-badge">Type</span>
      <span className="value area-info-badge">{this.props.type}</span>
  </div>)
  }
}
