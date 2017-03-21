import React, {Component} from 'react'
import css from './Area.css'

class Area extends Component {
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
      <div className="area" style={{width: positionProps.width, height: positionProps.height, top: positionProps.y, left: positionProps.x}}></div>
    )
  }
}

export default Area;
