import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {SelectorContainer} from './components/Selector'
import reduce from './reducers/reducer'

const store = createStore(reduce, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
      <SelectorContainer />
    </Provider>,
    document.getElementById('mount')
  )
})
