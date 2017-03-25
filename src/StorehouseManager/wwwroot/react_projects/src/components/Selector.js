import React, {Component} from 'react'
import css from './Selector.css'
import {connect} from 'react-redux'
import * as actionCreators from './../actionCreators';
import {findDOMNode} from 'react-dom'

import Area from './DrawArea'
import AreaList from './AreaList'

let id = 0;
class Selector extends Component {

    getMouseRelativePosition(e) {
      const rect = findDOMNode(this.refs.selector).getBoundingClientRect()
      const mouseX = e.clientX || e.touches[0].clientX || e.changedTouches[0].clientX
      const mouseY = e.clientY || e.touches[0].clientY || e.changedTouches[0].clientY
      const x = mouseX- rect.left;
      const y = mouseY - rect.top;
      return {x, y}
    }
    onMouseDown(e) {
        e.preventDefault()
        if (this.props.drawing)
            return;
        const pos = this.getMouseRelativePosition(e)
        this.props.startDrawing(pos)
    }

    onMouseMove(e) {
        e.preventDefault()
        if (!this.props.drawing)
            return;

        const pos = this.getMouseRelativePosition(e)
        this.props.mouseMove(pos)
    }

    onMouseUp() {
        this.props.stopDrawing()
        this.props.addArea(id++)
    }

    onMouseLeave() {
      if(!this.props.drawing)
          return;
      this.onMouseUp()
    }

    createArea(area) {
        return (<Area x={area.position.x}
                            y={area.position.y}
                            height={area.height} width={area.width} key={area.id} id={area.id} selectedId={this.props.selectedId}/>)
    }

    render() {
        return (
          <div>
          <div className="selectorWrapper"
              onMouseDown={(e) => this.onMouseDown(e)}
              onMouseMove={(e) => this.onMouseMove(e)}
              onMouseUp={() => this.onMouseUp()}
              onMouseLeave={() => this.onMouseLeave()}
              style={{width: this.props.width + 200, height: this.props.height + 200, padding: 100}}>
            <div style={{width: this.props.width, height: this.props.height}} className="selector" ref="selector">
                {this.props.currentDrawFigure
                    ? this.createArea(this.props.currentDrawFigure)
                    : ''
                }
                {this.props.areas.map(a => this.createArea(a))}
           </div>
          </div>
          <AreaList areas={this.props.areas} selectArea={this.props.selectArea} selectedId={this.props.selectedId}/>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {currentDrawFigure: state.currentDrawFigure,
        drawing: state.drawing,
        width: state.width,
        height: state.height,
        areas: state.areas,
        selectedId: state.selectedId}
}

export const SelectorContainer = connect(mapStateToProps, actionCreators)(Selector);

export default Selector;
