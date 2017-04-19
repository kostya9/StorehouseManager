/**
 * Created by kostya on 4/20/2017.
 */

import React, {Component} from 'react';

import * as actionCreators from './../../actions/shared';
import {connect} from "react-redux";
import {Button, Modal} from "react-bootstrap";

class ConfirmButton extends Component{
    componentWillMount() {
        this.props.showConfirmButton();
    }

    hide() {
        this.props.hideConfirmButton();
        this.props.cancel();
    }

    confirm(e) {
        e.preventDefault();
        this.props.confirm();
        this.hide();
    }

    render() {
        return (<Modal show={this.props.confirmButtonShow} onHide={() => this.hide()} dialogClassName="custom-modal" className="text-center">
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

const mapPropsToState = (state) => {
    return {
        confirmButtonShow: state.shared.confirmButtonShow
    }
};

const ConfirmButtonContainer = connect(mapPropsToState, actionCreators)(ConfirmButton);

export default ConfirmButtonContainer;

