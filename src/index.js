'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import './css/app.scss';

import * as firebase from 'firebase';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './redux/reducers';


// Initialize Firebase and Firestore
//--------
const config = {
  apiKey: "AIzaSyCbOU5mVfOGvEf3XXIDr74CQgyKNcicjwY",
  authDomain: "climbsize.firebaseapp.com",
  databaseURL: "https://climbsize.firebaseio.com",
  projectId: "climbsize",
  storageBucket: "climbsize.appspot.com",
  messagingSenderId: "804095109535"
};
firebase.initializeApp(config);


// Initialize Redux
//-------
let store = createStore(reducer);


// Start React
//---------
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app') );