/**
 * Created by kostya on 4/22/2017.
 */

import React, {Component} from 'react';
import {Button, FormControl, Label, Modal} from "react-bootstrap";

import css from './StoreTransitionMarkedAreaHint.css'

export default class StoreTransitionMarkedAreaHint extends Component {
    componentWillReceiveProps(next) {
        if(next.hints.length == 0 || next.hints == this.props.hints)
        {
            this.setState({loading: true, selectedId: -1});
            return;
        }


        let loading = this.state.loading;
        if(next.show == true && this.props.show == true)
        {
            loading = false;
        }

        let id = next.hints[0].areaId - 0;

        if(next.recommended != undefined && (next.hints.find(h => h.areaId == next.recommended) != null))
            id = next.recommended

        this.setState({selectedId: id, loading: loading})
    }

    componentWillMount() {
        this.setState({loading: true});
    }

    hide() {
        this.props.cancel();
        this.setState({loading: true})
    }

    confirm(e) {
        e.preventDefault();
        this.props.confirm(this.state.selectedId);
        this.hide();
    }

    changeArea(e) {
        this.setState({
            selectedId: e.target.value - 0
        });

    }

    getCssClass(type) {
        switch(type) {
            case -1:
                return 'danger';
            case 0:
                return 'warning';
            case 1:
                return 'accepted';
        }

        return ''
    }

    generateSelectOption(hint) {
        const currentArea = this.props.areas.find(area => area.id === hint.areaId);
        const colorClass = this.getCssClassByHint(hint);
        return (<option key={hint.areaId} value={hint.areaId} className={colorClass}>
            {currentArea.id} : {currentArea.name}
            </option>);
    }

    getCssClassByHint(hint) {

        const markTypes = hint.marks.map(m => m.mark);
        const minMark = Math.min.apply(Math, markTypes);
        const colorClass = this.getCssClass(minMark);
        let classes = "";
        if((hint.areaId === this.props.recommended) && (colorClass !== 'danger'))
            classes = "mark-recommended ";
        return classes + colorClass;
    }

    getHintBySelectedId() {
        const id = this.state.selectedId;
        return this.props.hints.find(h => id === h.areaId);
    }

    getSelectedCssClass() {
        const hint = this.getHintBySelectedId();
        if(!hint)
            return 'white';
        return this.getCssClassByHint(hint);
    }

    getSelectedAreaMarkNotes() {
        const id = this.state.selectedId;
        const hint = this.props.hints.find(h => h.areaId === id);
        if(hint == undefined)
            return [];
        return hint.marks.map(m => m.note);
    }

    isDanger() {
        const hint = this.getHintBySelectedId();
        if(hint == undefined)
            return false;
        const markTypes = hint.marks.map(m => m.mark);
        const minMark = Math.min.apply(Math, markTypes);
        const colorClass = this.getCssClass(minMark);
        return colorClass === "danger";

    }

    render() {
        let i = 0;
        let label;
        if(this.state.selectedId == this.props.recommended)
            label = <Label className="slide current">recommended</Label>
        return (<Modal show={this.props.show} onHide={() => this.hide()} dialogClassName="mark-modal" className="text-center">
            <Modal.Header closeButton>
                <h2>Area recommender (hints)</h2>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="mark-selected-selector">
                        <FormControl componentClass="select" onChange={(e) => this.changeArea(e)} value={this.state.selectedId} className={"mark-select " + this.getSelectedCssClass()}>
                            {this.state.loading && <option selected disabled value={-1}>Loading...</option>}
                            {this.props.hints.map(hint => this.generateSelectOption(hint))}
                        </FormControl>
                        {label}
                    </div>

                    <div className="mark-notes">
                        {this.getSelectedAreaMarkNotes().map(note => (<div key={i++}>{note}</div>))}
                    </div>
                    <hr/>
                    <Button className={"mark-confirm-btn"} onClick={(e) => this.confirm(e)} disabled={this.isDanger()}>Store</Button>
                </div>
            </Modal.Body>
        </Modal>)
    }
}
