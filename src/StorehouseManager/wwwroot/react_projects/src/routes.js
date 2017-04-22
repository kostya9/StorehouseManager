/**
 * Created by kostya on 4/16/2017.
 */
import React from 'react'

import {Route, IndexRoute} from 'react-router'

import GoodsOutsideAreaContainer from "./components/Goods/GoodsOutsideArea";
import GoodsTransitionAreaContainer from "./components/Goods/GoodsTransition";
import GoodsRejectedContainer from "./components/Goods/GoodsRejected";

import SelectorContainer from './components/Selector'

import AreaDetailsContainer from './components/Areas/AreaDetails'

import App from "./components/App";

export const base = '/StorehouseOwner';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SelectorContainer} />
        <Route path="area-edit" component={AreaDetailsContainer}/>
        <Route path="not-storing" component={GoodsOutsideAreaContainer}/>
        <Route path="transition" component={GoodsTransitionAreaContainer}/>
        <Route path="rejected" component={GoodsRejectedContainer}/>
    </Route>
)

