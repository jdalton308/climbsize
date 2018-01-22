
import React, {Component} from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import * as firebase from 'firebase';

import Header from './shared/header';
import ProfileCreate from './views/profile-create';
import Home from './views/home';


export default class App extends Component {
  constructor(props) {
    super(props);

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
  }

  componentDidMount() {
    // Watch for auth state change
    //--------
    firebase.auth().onAuthStateChanged((user) => {
      console.log('auth state changed: ', user);
      if (user) {
        // logged in
        this.setState({user: user});
      } else {
        // logged out
        this.setState({user: null});
      }
    });
  }


	render() {

		return (
			<BrowserRouter>
        <div>
          <Header />

          <Route exact path='/' component={Home} />
          <Route path='/profile-create' component={ProfileCreate} />
        </div>
      </BrowserRouter>
		)
	}
}