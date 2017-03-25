import React, {Component} from 'react'
import css from './DrawArea.css'

class DrawArea extends Component {
  getBorderColor(id) {
    if(id == this.props.selectedId)
      return 'green';
    return 'black';
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

  render() {
    const positionProps = this.getPositionProperties();
    return (
      <div className="drawArea" style={{width: positionProps.width, height: positionProps.height,
          top: positionProps.y, left: positionProps.x, borderColor: this.getBorderColor(this.props.id), borderStyle: this.getBorderStyle(this.props.id)}}></div>
    )
  }
}

export default DrawArea;
