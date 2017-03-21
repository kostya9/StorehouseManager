import React, {Component} from 'react'
import css from './Selector.css'
import {connect} from 'react-redux'
import Area from './Area'
import * as actionCreators from './../actionCreators';
import {findDOMNode} from 'react-dom'

class Selector extends Component {

    getMouseRelativePosition(e) {
      const rect = findDOMNode(this.refs.selector).getBoundingClientRect()
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
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
        if (!this.props.drawing)
            return;

        this.props.stopDrawing()
    }

    onMouseLeave() {
        this.onMouseUp()
    }

    render() {
        return (
          <div className="selectorWrapper"
              onMouseDown={(e) => this.onMouseDown(e)}
              onMouseMove={(e) => this.onMouseMove(e)}
              onMouseUp={() => this.onMouseUp()}
              onMouseLeave={() => this.onMouseLeave()}
              style={{width: this.props.width + 200, height: this.props.height + 200, padding: 100}}>
            <div style={{width: this.props.width, height: this.props.height}} className="selector" ref="selector">
                {this.props.currentDrawFigure
                    ? <Area x={this.props.currentDrawFigure.position.x}
                            y={this.props.currentDrawFigure.position.y}
                            height={this.props.currentDrawFigure.height} width={this.props.currentDrawFigure.width}/>
                    : ''
                }
           </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {currentDrawFigure: state.currentDrawFigure, drawing: state.drawing, width: state.width, height: state.height}
}

export const SelectorContainer = connect(mapStateToProps, actionCreators)(Selector);

export default Selector;
