import React, {Component} from 'react'

import {Modal, FormControl, FormGroup, ControlLabel, Button, Form} from 'react-bootstrap'

import Area, {AREA_ENTER, AREA_EXIT, AREA_SECTION} from '../../domain/area'
import AreaTypeSelect from './AreaTypeSelect'


export default class AddArea extends Component {

  componentWillReceiveProps() {
    this.setState({name: 'Default', type: AREA_SECTION});
  }

  componentWillMount() {
    this.setState({name: 'Default', type: AREA_SECTION});
  }

  hide() {
    this.props.cancel();
    this.props.stopDrawing();
  }

  addArea(e) {
    e.preventDefault();
    this.props.add(this.props.addingAreaRectangle, this.state.type, this.state.name);
    this.hide();

  }

  handleNameChange(e) {
    this.setState({...this.state, name: e.target.value});
  }

  handleTypeChange(e) {
    this.setState({...this.state, type: e.target.value});
  }

  render() {
    return (<Modal show={this.props.addingAreaRectangle != undefined} onHide={() => this.hide()} dialogClassName="add-modal">
      <Modal.Header closeButton>
        <h2>Add area</h2>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => this.addArea(e)}>
          <FormGroup>
          <ControlLabel>Area Type</ControlLabel>
          <AreaTypeSelect onChange={(e) => this.handleTypeChange(e)} value={this.state.type} areaTypesAvailability={this.props.areaTypesAvailability}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl onChange={(e) => this.handleNameChange(e)} value={this.state.name} componentClass="input" />
        </FormGroup>
          <hr />
        <Button onClick={(e) => {this.addArea(e)}} className="col-xs-3 col-xs-offset-5">Add</Button>
      </Form>
      </Modal.Body>
    </Modal>)
  }
}
