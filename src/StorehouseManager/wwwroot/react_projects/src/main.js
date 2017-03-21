import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {SelectorContainer} from './components/Selector'
import draw, {START_DRAWING, MOUSE_MOVE} from './reducers/draw'

const store = createStore(draw);

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>
      <SelectorContainer />
    </Provider>,
    document.getElementById('mount')
  )
})
