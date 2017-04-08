import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'

import css from './Drawer.css'
import Area from './DrawArea'
export default class Drawer extends Component {

  getMouseRelativePosition(e) {
    const rect = findDOMNode(this.refs.drawer).getBoundingClientRect()
    const mouseX = e.clientX || e.touches[0].clientX || e.changedTouches[0].clientX
    const mouseY = e.clientY || e.touches[0].clientY || e.changedTouches[0].clientY
    const x = mouseX- rect.left;
    const y = mouseY - rect.top;
    return {x, y}
  }
  onMouseDown(e) {
      e.preventDefault()
      if (this.props.currentDrawFigure != undefined)
          return;
      const pos = this.getMouseRelativePosition(e)
      this.props.startDrawing(pos)
  }

  onMouseMove(e) {
      e.preventDefault()
      if (!this.props.drawing)
      {
        return;
      }

      const pos = this.getMouseRelativePosition(e)
      this.props.mouseMove(pos)
  }

  onMouseUp() {
    if(this.props.currentDrawFigure == undefined)
        return;
    const rectangle = this.props.currentDrawFigure
    if(Math.abs(rectangle.height) < 10 || Math.abs(rectangle.width) < 10)
    {
      this.props.stopDrawing()
      return;
    }

    this.props.startAddArea(rectangle)
  }

  onMouseLeave() {
    this.onMouseUp()
  }

  createArea(area) {
      return (<Area x={area.position.x}
                          y={area.position.y}
                          height={area.height} width={area.width} key={area.id} id={area.id} selectedId={this.props.selectedId} selectArea={this.props.selectArea} type={area.type}/>)
  }

  render() {
    return (
      <div className="drawerWrapper"
          onMouseDown={(e) => this.onMouseDown(e)}
          onMouseMove={(e) => this.onMouseMove(e)}
          onMouseUp={() => this.onMouseUp()}
          onMouseLeave={() => this.onMouseLeave()}
          style={{width: this.props.width + 100, height: this.props.height + 100, padding: 50}}>
        <div style={{width: this.props.width, height: this.props.height}} className="drawer" ref="drawer">
            {this.props.currentDrawFigure
                ? this.createArea(this.props.currentDrawFigure)
                : ''
            }
            {this.props.areas.map(a => this.createArea(a))}
       </div>
      </div>
    )
  }
}
