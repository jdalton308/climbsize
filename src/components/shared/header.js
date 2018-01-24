'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';

import { auth } from '../../utils/firebase';


// TODO: 
// - Move sign-in form to own component, and make this state-less


export default class Header extends Component {

  static propTypes = {
    userAuth: PropTypes.object,
    userData: PropTypes.object, // TODO: either object or null
    history: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      canShowSignIn: false,
      email: '',
      password: '',
    };

    this.updateInput = this.updateInput.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
  }

  signIn() {
    const {
      email,
      password
    } = this.state;

    console.log('signing in');
    auth.signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        // go to profile
        this.props.history.push('/profile');
        this.setState({canShowSignIn: false});
      })
      .catch((error) => {
        console.log('error signing in: ', error);
      });
    // picked up in store by watcher in app.js
  }

  signOut() {
    auth.signOut();
    this.props.history.push('/');
    // picked up in store by watcher in app.js
  }

  updateInput(e) {
    console.log('updating input');
    const {target} = e;
    const {
      value,
      name
    } = target;

    this.setState({
      [name]: value,
    });
  }

  toggleSignIn(e) {
    this.setState({canShowSignIn: !this.state.canShowSignIn});
  }

  render() {
    const {
      email,
      password,
      canShowSignIn,
    } = this.state;

    const {
      userAuth,
      userData
    } = this.props;

    return (
      <header>
        <Link to='/'>
          <div className="logo">
            ClimbSize
          </div>
        </Link>
        { // UNAUTH
          // create profile link
          // sign-in link -> opens dropdown with form
        }
        { // AUTH
          // view profile
          // sign-out
        }
        
        { (userAuth) ?
          <div className="links">
            <button
              type='button'
              onClick={this.signOut}
            >
              Sign Out
            </button>
            <Link to='/profile'>
              View Profile
            </Link>
          </div>
          :
          <div className="links">
            <Link to='/profile-create'>
              Create Profile
            </Link>
            <button
              type='button'
              onClick={this.toggleSignIn}
            >
              Sign In
            </button>
          </div>
        }



        <div className={['log-in-dropdown', (canShowSignIn) ? 'show' : ''].join(' ')}>
          <h3>Sign In</h3>
          <form id="log-in">
            <label htmlFor="email">
              <div className="label-copy">Email</div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="password">
              <span className="label-copy">Password</span>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.updateInput}
              />
            </label>
            <button
              type="button"
              onClick={this.signIn}
            >
              Submit
            </button>
          </form>
        </div>
      </header>
    )
  }
}