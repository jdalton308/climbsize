'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import './css/app.scss';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './redux/reducers';


// Initialize Redux, and DevTools
//-------
let store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


// Start React
//---------
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app')
);