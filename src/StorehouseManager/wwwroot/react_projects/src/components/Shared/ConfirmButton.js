/**
 * Created by kostya on 4/20/2017.
 */

import React, {Component} from 'react';

import * as actionCreators from './../../actions/shared';
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";

export default class ConfirmButton extends Component{

    hide() {
        this.props.cancel();
    }

    confirm(e) {
        e.preventDefault();
        this.props.confirm();
        this.hide();
    }

    render() {
        return (<Modal show={this.props.show} onHide={() => this.hide()} dialogClassName="custom-modal" className="text-center">
            <Modal.Header closeButton>
                <h2>{this.props.text}</h2>
            </Modal.Header>
            <Modal.Body>
                <div style={{height: 30}}>
                <Button className="col-xs-offset-3 col-xs-2" onClick={(e) => this.confirm(e)}>Yes</Button>
                <Button className="col-xs-offset-2 col-xs-2" onClick={() => this.hide()}>No</Button>
                </div>
            </Modal.Body>
        </Modal>)
    }
}
