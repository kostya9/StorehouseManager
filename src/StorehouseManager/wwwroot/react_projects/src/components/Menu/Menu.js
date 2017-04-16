/**
 * Created by kostya on 4/12/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

import {Nav, NavItem, Navbar} from 'react-bootstrap'
import {LinkContainer, IndexLinkContainer} from "react-router-bootstrap";

import css from './Menu.css'

export default class Menu extends Component {
    render() {
        return (<div className="sidebar-nav">
            <Navbar><Nav>
                    <IndexLinkContainer to="/">
                        <NavItem>Areas</NavItem>
                    </IndexLinkContainer>
                    <LinkContainer to="/goods">
                        <NavItem>Goods</NavItem>
                    </LinkContainer>
        </Nav> </Navbar>
        </div>)
    }
}