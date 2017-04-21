/**
 * Created by kostya on 4/17/2017.
 */

import React, {Component} from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from "react-bootstrap";

export default class RegisterGoods extends Component {
    componentWillReceiveProps() {
        this.setState({name: 'Default', shipper: 'OAO Default'});
    }

    componentWillMount() {
        this.setState({name: 'Default', shipper: 'OAO Default'});
    }

    hide() {
        this.props.cancel();
    }

    register(e) {
        e.preventDefault();
        this.props.register({name: this.state.name, shipper: this.state.shipper});
        this.hide();

    }

    handleNameChange(e) {
        this.setState({...this.state, name: e.target.value});
    }

    handleShipperChange(e) {
        this.setState({...this.state, shipper: e.target.value});
    }

    render() {
        return (<Modal show={this.props.newItem != undefined} onHide={() => this.hide()} dialogClassName="add-modal">
            <Modal.Header closeButton>
                <h2>Register goods</h2>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => this.register(e)}>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl onChange={(e) => this.handleNameChange(e)} value={this.state.name}  componentClass="input"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Shipper</ControlLabel>
                        <FormControl onChange={(e) => this.handleShipperChange(e)} value={this.state.shipper} componentClass="input" />
                    </FormGroup>
                    <hr />
                    <Button onClick={(e) => {this.register(e)}} className="col-xs-3 col-xs-offset-5">Register</Button>
                </Form>
            </Modal.Body>
        </Modal>)
    }
}