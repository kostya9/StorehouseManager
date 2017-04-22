/**
 * Created by kostya on 4/22/2017.
 */
import React, {Component} from 'react';
import {Button, FormControl, FormGroup, Label, Modal} from "react-bootstrap";

import css from './GoodsReject.css'

export default class GoodsReject extends Component {
    rejectConfirmText() {
        return "Are you sure you want to reject " + this.props.name + "?";
    }

    componentWillMount() {
        this.setState({});
    }

    componentWillReceiveProps() {
        this.setState({reason: ""});
    }

    hide() {
        this.props.cancel();
    }

    confirm(e) {
        e.preventDefault();
        this.props.confirm(this.props.id, this.state.reason);
        this.hide();
    }

    handleChange(e) {
        this.setState({
            reason: e.target.value
        })
    }

    render() {
        return (<Modal show={this.props.show} onHide={() => this.hide()} dialogClassName="custom-modal" className="text-center">
            <Modal.Header closeButton>
                <h2>{this.rejectConfirmText()}</h2>
            </Modal.Header>
            <Modal.Body>
                <FormGroup>
                    <Label>Reasoning</Label>
                    <FormControl componentClass="textarea"  onChange={(e) => this.handleChange(e)} value={this.state.reason} className="reasoning"/>
                </FormGroup>
                <div style={{height: 30}}>
                    <Button className="col-xs-offset-3 col-xs-2" onClick={(e) => this.confirm(e)}>Yes</Button>
                    <Button className="col-xs-offset-2 col-xs-2" onClick={() => this.hide()}>No</Button>
                </div>
            </Modal.Body>
        </Modal>)
    }
}