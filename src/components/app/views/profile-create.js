
import React, {Component} from 'react';


export default class ProfileCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newusername: '',
      newpassword: '',
    };

    this.updateInput = this.updateInput.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  createUser() {
    const {
      newusername,
      newpassword
    } = this.state;

    console.log('creating user...');
    firebase.auth()
      .createUserWithEmailAndPassword(newusername, newpassword)
      .catch((error) => {
        console.log('Error creating user: ', error);
      });
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
      newUsername,
      newPassword,
    } = this.state;

    return (
      <div className="log-in">
        <h3>Create Profile</h3>

        <form id="new-user">
          <label htmlFor="newusername">
            <div className="label-copy">Username</div>
            <input
              type="email"
              id="newusername"
              name="newusername"
              value={newUsername}
              onChange={this.updateInput}
            />
          </label>
          <label htmlFor="newpassword">
            <span className="label-copy">Password</span>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              value={newPassword}
              onChange={this.updateInput}
            />
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