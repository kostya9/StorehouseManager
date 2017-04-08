import React, {Component} from 'react'

import {Modal, FormControl, FormGroup, ControlLabel, Button, Form} from 'react-bootstrap'

import Area, {AREA_ENTER, AREA_EXIT, AREA_SECTION} from '../domain/area'



export default class AddArea extends Component {

  componentWillReceiveProps() {
    this.setState({name: 'Default', type: AREA_SECTION})
  }

  componentWillMount() {
    this.setState({name: 'Default', type: AREA_SECTION})
  }

  hide() {
    this.props.cancel()
    this.props.stopDrawing()
  }

  addArea(e) {
    e.preventDefault()
    this.props.add(this.state.type, this.state.name)
    this.hide()

  }

  handleNameChange(e) {
    this.setState({...this.state, name: e.target.value});
  }

  handleTypeChange(e) {
    this.setState({...this.state, type: e.target.value})
  }

  render() {
    return (<Modal show={this.props.addingArea != undefined} onHide={() => this.hide()} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <h2>Add area</h2>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => this.addArea(e)}>
        <FormGroup>
        <ControlLabel>Area Type</ControlLabel>
        <FormControl componentClass="select" onChange={(e) => this.handleTypeChange(e)} value={this.state.type}>
          <option value={AREA_SECTION}>{Area.fromTypeToName(AREA_SECTION)}</option>
          {this.props.areaTypesAvailability.enter ? <option value={AREA_ENTER}>{Area.fromTypeToName(AREA_ENTER)}</option> : ''}
          {this.props.areaTypesAvailability.exit ? <option value={AREA_EXIT}>{Area.fromTypeToName(AREA_EXIT)}</option> : ''}
        </FormControl>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <FormControl onChange={(e) => this.handleNameChange(e)} value={this.state.name} componentClass="input" />
      </FormGroup>
      <Button onClick={(e) => {this.addArea(e)}}>Add</Button>
    </Form>
      </Modal.Body>
    </Modal>)
  }
}
