'use strict';

import React, {Component} from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import * as firebase from 'firebase';

import { connect } from 'react-redux';
import {
  setUser,
  setAuth
} from '../redux/actions';

import Header from './shared/header';
import VisibleHeader from './containers/VisibleHeader';
import ProfileCreate from './views/profile-create';
import Home from './views/home';



const App = ({dispatch}) => {


  // Watch for auth state change
  //--------
  firebase.auth().onAuthStateChanged((user) => {
    console.log('auth state changed. User: ', user);
    dispatch(setUser(user));
  });


	return (
		<BrowserRouter>
      <div>
        <VisibleHeader />

        <Route exact path='/' component={Home} />
        <Route path='/profile-create' component={ProfileCreate} />
      </div>
    </BrowserRouter>
	);
}


export default connect()(App);