
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShoeSizes from '../../utils/shoe-sizes';

import {
  auth,
  db
} from '../../utils/firebase';



export default class ProfileCreate extends Component {

  static propTypes = {
    userData: PropTypes.object,
    userAuth: PropTypes.object,
    onNewProfile: PropTypes.func,
    onLogin: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      newemail: '',
      newpassword: '',
      newusername: '',
      newcity: '',
      newgender: '',
      newstreetSize: '',
    };

    this.updateInput = this.updateInput.bind(this);
    this.createUser = this.createUser.bind(this);
    this.createProfile = this.createProfile.bind(this);
  }

  createUser() {
    const {
      newemail,
      newpassword,
    } = this.state;

    console.log('creating user...');
    auth.createUserWithEmailAndPassword(newemail, newpassword)
      .then((user) => {
        console.log('user created: ', user);
        this.props.onLogin(user);
        this.createProfile(user);
      })
      .catch((error) => {
        console.log('Error creating user: ', error);
      });
  }

  createProfile(userAuth) {
    const {
      newusername,
      newemail,
      newcity,
      newgender,
      newstreetSize,
    } = this.state;

    const newDoc = db.collection('users').doc(userAuth.uid);

    newDoc.set({
      username: newusername,
      email: userAuth.email,
      city: newcity,
      sex: newgender,
      streetShoe: newstreetSize,
    })
    .then((docRef) => {
      console.log('setting profile: ', newDoc.get());
      this.props.onNewProfile(newDoc.get());
      console.log('Profile created. Docref: ', docRef);
    })
    .catch((error) => {
      console.log('error creating profile: ', error);
    })
  }

  updateInput(e) {
    const {target} = e;
    const {
      value,
      name
    } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      newemail,
      newpassword,
      newusername,
      newcity,
      newgender,
      newstreetSize
    } = this.state;

    return (
      <div className="log-in">
        <h3>Create a Profile</h3>

        <form id="new-user">
          <label htmlFor="newemail">
            <div className="label-copy">Email</div>
            <input
              type="email"
              id="newemail"
              name="newemail"
              value={newemail}
              onChange={this.updateInput}
            />
          </label>
          <label htmlFor="newpassword">
            <span className="label-copy">Password</span>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              value={newpassword}
              onChange={this.updateInput}
            />
          </label>
          <label htmlFor="newusername">
            <span className="label-copy">Username</span>
            <input
              type="text"
              id="unewsername"
              name="newusername"
              value={newusername}
              onChange={this.updateInput}
            />
          </label>
          <label htmlFor="newcity">
            <span className="label-copy">City (Optional)</span>
            <input
              type="text"
              id="newcity"
              name="newcity"
              value={newcity}
              onChange={this.updateInput}
            />
          </label>
          <label htmlFor="newgender">
            <span className="label-copy">Sex</span>
            <select
              name="newgender"
              id="newgender"
              value={newgender}
              onChange={this.updateInput}
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label htmlFor="newstreetSize">
            <span className="label-copy">Street Shoe Size</span>
            <select
              name="newstreetSize"
              id="newstreetSize"
              value={newstreetSize}
              onChange={this.updateInput}
            >
              {
                ShoeSizes.map((size) => (
                  <option key={size.eu} value={size.eu}>{`${size.eu} (${size.us}US)`}</option>
                ))
              }
            </select>
          </label>
          <button
            type="button"
            onClick={this.createUser}
          >
            Submit
          </button>
        </form>

      </div>
    )
  }
}