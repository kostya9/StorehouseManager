/**
 * Created by kostya on 4/23/2017.
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";

import * as actionCreators from './../../actionCreators';

import css from './GoodsDetails.css'

class GoodsDetails extends Component {
    componentWillReceiveProps(next) {
        if((this.props.params.id != next.params.id) || (this.props.id == undefined))
            next.loadGoodsItem(next.params.id);
    }

    componentWillMount() {
        this.props.loadGoodsItem(this.props.params.id);
    }

    goBack() {
        this.props.router.goBack();
    }

    render() {

        if(this.props.id == undefined || this.props.params.id != this.props.id)
            return (
            <div><Button onClick={() => this.goBack()} className="back-btn">Back</Button>
                <div className="nothing-selected-container"><div className="nothing-selected">
                    <h2>Loading...</h2>
                </div></div></div>
            )

        return (<div><div>
            <Button onClick={() => this.goBack()} className="back-btn">Back</Button>
        </div>
<div className="goods-details">
    <div className="text-center">
    <h2>Goods Item Details</h2>
    </div>
        <hr/>
            <Form onSubmit={(e) => this.goBack()}>
                <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl value={this.props.name}  componentClass="input" disabled/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Shipper</ControlLabel>
                    <FormControl value={this.props.shipper} componentClass="input" disabled/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Status</ControlLabel>
                    <FormControl value={this.props.status}  componentClass="input" disabled/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Temperature</ControlLabel>
                    <div className="data-range">
                        <FormControl value={this.props.temperatureLow} componentClass="input" disabled/>
                        <ControlLabel>To</ControlLabel>
                        <FormControl value={this.props.temperatureHigh} componentClass="input" disabled/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Humidity</ControlLabel>
                    <div className="data-range">
                        <FormControl value={this.props.humidityLow} componentClass="input" disabled/>
                        <ControlLabel>To</ControlLabel>
                        <FormControl value={this.props.humidityHigh} componentClass="input" disabled/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Volume</ControlLabel>
                    <FormControl value={this.props.volume} componentClass="input" disabled/>
                </FormGroup>
                <Button onClick={() => this.goToReport()} className="generate-report">Generate report</Button>
            </Form>
</div>
        </div>)
    }

    goToReport() {
        this.props.router.push(`/goods/${this.props.params.id}/transitions`)
    }
}

function mapStateToProps(state) {
    return {
        ...state.goods.selectedItem
    }
}

const GoodsDetailsContainer = connect(mapStateToProps, actionCreators)(GoodsDetails);

export default GoodsDetailsContainer;