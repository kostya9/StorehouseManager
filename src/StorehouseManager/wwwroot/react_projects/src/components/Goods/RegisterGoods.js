/**
 * Created by kostya on 4/17/2017.
 */

import React, {Component} from 'react';
import {Button, ControlLabel, Form, FormControl, FormGroup, Modal} from "react-bootstrap";

import css from './RegisterGoods.css'

export default class RegisterGoods extends Component {
    componentWillReceiveProps() {
        this.setState({name: 'Default', shipper: 'OAO Default',
            temperatureLow: 20,
            temperatureHigh: 25,
            humidityLow: 0.2,
            humidityHigh: 0.5});
    }

    componentWillMount() {
        this.setState({name: 'Default', shipper: 'OAO Default',
            temperatureLow: 20,
            temperatureHigh: 25,
            humidityLow: 0.2,
            humidityHigh: 0.5});
    }

    hide() {
        this.props.cancel();
    }

    register(e) {
        e.preventDefault();
        this.props.register({
            name: this.state.name,
            shipper: this.state.shipper,
            temperatureLow: this.state.temperatureLow,
            temperatureHigh: this.state.temperatureHigh,
            humidityLow: this.state.humidityLow,
            humidityHigh: this.state.humidityHigh
        });
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
                    <FormGroup>
                        <ControlLabel>Temperature</ControlLabel>
                        <div className="data-range">
                            <FormControl onChange={(e) => this.handleTemperatureLow(e)} value={this.state.temperatureLow} componentClass="input" />
                            <ControlLabel>To</ControlLabel>
                            <FormControl onChange={(e) => this.handleTemperatureHigh(e)} value={this.state.temperatureHigh} componentClass="input" />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Humidity</ControlLabel>
                        <div className="data-range">
                            <FormControl onChange={(e) => this.handleHumidityLow(e)} value={this.state.humidityLow} componentClass="input" />
                            <ControlLabel>To</ControlLabel>
                            <FormControl onChange={(e) => this.handleHumidityHigh(e)} value={this.state.humidityHigh} componentClass="input" />
                        </div>
                    </FormGroup>
                    <hr />
                    <Button onClick={(e) => {this.register(e)}} className="col-xs-3 col-xs-offset-5">Register</Button>
                </Form>
            </Modal.Body>
        </Modal>)
    }

    handleTemperatureLow(e) {
        if(isNaN(e.target.value) || (e.target.value > this.state.temperatureHigh))
            return;
        this.setState({...this.state,
            temperatureLow: e.target.value
        })
    }

    handleTemperatureHigh(e) {
        if(isNaN(e.target.value) || (e.target.value < this.state.temperatureLow))
            return;
        this.setState({...this.state,
            temperatureHigh: e.target.value
        })
    }

    handleHumidityLow(e) {
        if(isNaN(e.target.value) || (e.target.value > this.state.humidityHigh))
            return;
        this.setState({...this.state,
            humidityLow: e.target.value
        })
    }

    handleHumidityHigh(e) {
        if(isNaN(e.target.value) || (e.target.value < this.state.humidityLow))
            return;
        this.setState({...this.state,
            humidityHigh: e.target.value
        })
    }
}