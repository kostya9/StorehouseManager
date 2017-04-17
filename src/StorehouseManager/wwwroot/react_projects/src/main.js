import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reduce from './reducers/reducer'
import thunk from 'redux-thunk'
import {loadAreas} from "./actions/areas";
import {loadGoodsItemsRegistered, loadGoodsItemsArrived, loadGoodsItemsRejected} from "./actions/goods";

import routes from './routes'
import {Router, useRouterHistory, browserHistory } from 'react-router'
import { createHistory } from 'history'

const store = createStore(reduce,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk));

store.dispatch(loadAreas());
store.dispatch(loadGoodsItemsRegistered());
store.dispatch(loadGoodsItemsArrived());
store.dispatch(loadGoodsItemsRejected());

const base = '/StorehouseOwner';

const history = useRouterHistory(createHistory)({ basename: base });

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('mount')
  )
});
