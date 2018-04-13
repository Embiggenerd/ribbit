import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'
import axios from 'axios'

// const loggerMiddleWare = store => next => action => {
//   console.log('dispatching... ', action)
//   next()
// }

// const confirmationMiddleWare = store => next => action => {
//   if(action.shouldConfirm){
//     if(window.confirm("Are you sure?")){
//       next(action)
//     }
//
//   } else {
//     next(action)
//   }
// }
//
// const store = createStore(reducers, {}, applyMiddleware(confirmationMiddleWare, reduxThunk))
//

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
export default store
window.store = store.getState()
ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.querySelector('#root')
)
