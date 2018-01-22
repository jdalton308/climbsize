
import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';


export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canShowSignIn: false,
      username: '',
      password: '',
    };

    this.updateInput = this.updateInput.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
  }

  logIn() {
    const {
      username,
      password
    } = this.state;

    console.log('signing in');
    firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((error) => {
        console.log('error signing in: ', error);
      });
  }

  logOut() {
    firebase.auth().signOut();
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
      username,
      password,
    } = this.state;

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


        <div className="log-in-dropdown">
          <h3>Log In</h3>
          <form id="log-in">
            <label htmlFor="username">
              <div className="label-copy">Username</div>
              <input
                type="email"
                id="username"
                name="username"
                value={username}
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
              onClick={this.logIn}
            >
              Submit
            </button>
          </form>
        </div>
      </header>
    )
  }
}