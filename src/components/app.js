'use strict';

import React, {Component} from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import {
  auth,
  db,
  userDb
} from '../utils/firebase';

import { connect } from 'react-redux';
import {
  setUser,
  setAuth
} from '../redux/actions';

import VisibleHeader from './containers/visible-header';
import VisibleProfileCreate from './containers/visible-profile-create';
import VisibleProfile from './containers/visible-profile';
import Home from './views/home';



const App = ({dispatch}) => {


  // Watch for auth state change
  //--------
  auth.onAuthStateChanged((userAuth) => {
    // Set Auth state in store
    dispatch(setAuth(userAuth));

    // Set profile state in store
    if (userAuth) {
      userDb.doc(userAuth.uid).get().then((doc) => {
        dispatch(setUser( doc.data() ));
      });
    } else {
      dispatch(setUser(null));
    }
  });


	return (
		<BrowserRouter>
      <div>
        <Route path='/' component={VisibleHeader} />

        <Route exact path='/' component={Home} />
        <Route path='/profile-create' component={VisibleProfileCreate} />
        <Route path='/profile' component={VisibleProfile} />
      </div>
    </BrowserRouter>
	);
}


export default connect()(App);