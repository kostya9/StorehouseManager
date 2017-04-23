/**
 * Created by kostya on 4/12/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

import {Nav, NavItem, Navbar, Button, FormControl} from 'react-bootstrap'
import {LinkContainer, IndexLinkContainer} from "react-router-bootstrap";

import css from './Menu.css'

export default class Menu extends Component {
    changeArea(e) {
        this.props.selectArea(e.target.value - 0);
    }

    generateSelectOption(area) {
        return (<option value={area.id} key={area.id}>{area.id + " : " + area.name}</option>)
    }

    render() {
        return (<div className="text-center">
            <h2>Areas</h2>
            <FormControl componentClass="select" className="text-center menu-area-select" onChange={(e) => this.changeArea(e)} value={this.props.selectedId}>
                <option defaultValue disabled>Choose an area</option>
                {this.props.areas.map(area => this.generateSelectOption(area))}
            </FormControl>
            <div className="sidebar-nav"><Navbar><Nav>
                    <IndexLinkContainer to="/">
                        <NavItem>Areas</NavItem>
                    </IndexLinkContainer>
                <IndexLinkContainer to={"/area-edit"}>
                    <NavItem>Area Edit</NavItem>
                </IndexLinkContainer>
        </Nav> </Navbar> </div>
            <h2>Goods</h2>
            <Button className="register-btn" onClick={this.props.startRegisterGoods}>Register</Button>
        <div className="sidebar-nav"><Navbar><Nav>
            <LinkContainer to="/rejected">
                <NavItem>Rejected</NavItem>
            </LinkContainer>
            <LinkContainer to="/not-storing">
                <NavItem>Not Storing</NavItem>
            </LinkContainer>
            <LinkContainer to="/transition">
                <NavItem>Transition</NavItem>
            </LinkContainer>
            <LinkContainer to="/storing">
                <NavItem>Storing</NavItem>
            </LinkContainer>
            <LinkContainer to="/unloaded">
                <NavItem>Unloaded</NavItem>
            </LinkContainer>
        </Nav> </Navbar></div>
        </div>)
    }
}