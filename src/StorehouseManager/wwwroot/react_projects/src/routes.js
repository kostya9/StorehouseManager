/**
 * Created by kostya on 4/16/2017.
 */
import React from 'react'

import {Route, IndexRoute} from 'react-router'

import GoodsOutsideAreaContainer from "./components/Goods/GoodsOutsideArea";
import SelectorContainer from './components/Selector'
import App from "./components/App";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SelectorContainer} />
        <Route path="goods" component={GoodsOutsideAreaContainer}/>
    </Route>
)

