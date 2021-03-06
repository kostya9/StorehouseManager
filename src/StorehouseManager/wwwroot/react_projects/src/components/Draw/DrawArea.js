import React, {Component} from 'react'
import css from './DrawArea.css'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6

import {AREA_ENTER, AREA_EXIT, AREA_SECTION} from '../../domain/area'

class DrawArea extends Component {
  getBorderColor(id) {
    if(this.props.type == AREA_EXIT)
      return 'red'
    if(this.props.type == AREA_ENTER)
      return 'blue'
    if(this.props.type == AREA_SECTION)
      return '#3D9970';
    return 'gray'
  }

  getBorderStyle(id) {
    if(id == this.props.selectedId)
      return 'solid';
    return 'dashed';
  }
  getPositionProperties() {
      const width = Math.abs(this.props.width);
      const height = Math.abs(this.props.height);
      let y = this.props.y;
      let x = this.props.x;
      if(this.props.height < 0) {
        y -= height;
      }

      if(this.props.width < 0) {
        x -= width;
      }

      return {
        width, height, x, y
      }
  }

  onClick() {
    this.props.selectArea(this.props.id)
  }

  render() {
    const positionProps = this.getPositionProperties();
    return (
      <div key="0" className={"drawArea " + ((this.props.id == this.props.selectedId) && "border-animate")} style={{width: positionProps.width, height: positionProps.height,
          top: positionProps.y, left: positionProps.x, borderColor: this.getBorderColor(this.props.id), borderStyle: this.getBorderStyle(this.props.id)}} onClick={() => this.onClick()} />
    )
  }
}

export default DrawArea;
