/**
 * Created by kostya on 4/22/2017.
 */

import React, {Component} from 'react';
import {Button, FormControl, Modal} from "react-bootstrap";

import css from './StoreTransitionMarkedAreaHint.css'

export default class StoreTransitionMarkedAreaHint extends Component {
    componentWillReceiveProps(next) {
        if(next.hints.length == 0)
            return;
        this.setState({selectedId: next.hints[0].areaId - 0})
    }

    componentWillMount() {
        this.setState({});
    }

    hide() {
        this.props.cancel();
    }

    confirm(e) {
        e.preventDefault();
        this.props.confirm();
        this.hide();
    }

    changeArea(e) {
        this.setState({
            selectedId: e.target.value - 0
        });

    }

    getBackgroundColor(type) {
        switch(type) {
            case -1:
                return 'red';
            case 0:
                return 'orange';
            case 1:
                return 'lightgreen';
        }

        return 'white'
    }

    generateSelectOption(hint) {
        const currentArea = this.props.areas.find(area => area.id === hint.areaId);
        return (<option key={hint.areaId} style={{backgroundColor: this.getBackgroundColorByHint(hint)}} value={hint.areaId}>{currentArea.id} : {currentArea.name}</option>);
    }

    getBackgroundColorByHint(hint) {
        const markTypes = hint.marks.map(m => m.mark);
        const minMark = Math.min.apply(Math, markTypes);
        return this.getBackgroundColor(minMark);
    }

    getHintBySelectedId() {
        const id = this.state.selectedId;
        return this.props.hints.find(h => id === h.areaId);
    }

    getSelectedBackgroundColor() {
        const hint = this.getHintBySelectedId();
        if(!hint)
            return 'white';
        return this.getBackgroundColorByHint(hint);
    }

    getSelectedAreaMarkNotes() {
        const id = this.state.selectedId;
        const hint = this.props.hints.find(h => h.areaId === id);
        if(hint == undefined)
            return [];
        return hint.marks.map(m => m.note);
    }

    render() {
        return (<Modal show={this.props.show} onHide={() => this.hide()} dialogClassName="mark-modal" className="text-center">
            <Modal.Header closeButton>
                <h2>Area recommender (hints)</h2>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <FormControl componentClass="select" onChange={(e) => this.changeArea(e)} value={this.state.selectedId} className="mark-select"
                                 style={{backgroundColor: this.getSelectedBackgroundColor()}}>
                        {this.props.hints.map(hint => this.generateSelectOption(hint))}
                    </FormControl>

                    <ul>
                        {this.getSelectedAreaMarkNotes().map(note => (<li>{note}</li>))}
                    </ul>
                    <hr/>
                    <Button className="mark-confirm-btn" onClick={(e) => this.confirm(e)}>Store</Button>
                </div>
            </Modal.Body>
        </Modal>)
    }
}
