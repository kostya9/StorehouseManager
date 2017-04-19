/**
 * Created by kostya on 4/12/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

import {Nav, NavItem, Navbar, Button} from 'react-bootstrap'
import {LinkContainer, IndexLinkContainer} from "react-router-bootstrap";

import css from './Menu.css'

export default class Menu extends Component {
    render() {
        return (<div className="text-center">
            <div className="sidebar-nav"><Navbar><Nav>
                    <IndexLinkContainer to="/">
                        <NavItem>Areas</NavItem>
                    </IndexLinkContainer>
        </Nav> </Navbar> </div>
            <h2>Goods</h2>
            <Button className="register-btn" onClick={this.props.startRegisterGoods}>Register</Button>
        <div className="sidebar-nav"><Navbar><Nav>
            <LinkContainer to="/not-storing">
                <NavItem>Not Storing</NavItem>
            </LinkContainer>
            <LinkContainer to="/rejected">
                <NavItem>Rejected</NavItem>
            </LinkContainer>
        </Nav> </Navbar></div>
        </div>)
    }
}