'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShoeSizes from '../../utils/shoe-sizes';
import { userDb } from '../../utils/firebase';


export default class Profile extends Component {

  static propTypes = {
    userData: PropTypes.object, // TODO: either object or null
    userAuth: PropTypes.object,
    updateUser: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      showAddNewShoe: false,
      newBrand: '',
      newModel: '',
      newSize: '',
      dbUserRef: null,
    };

    this.updateInput = this.updateInput.bind(this);
    this.saveShoe = this.saveShoe.bind(this);
    this.setUserShoes = this.setUserShoes.bind(this);
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

  // Returns promise
  setUserShoes(shoeArr) {
    const {
      userAuth,
      updateUser,
    } = this.props;

    const doc = userDb.doc(userAuth.uid);
    return doc.set({shoes: shoeArr}, {merge: true}).then(() => {
      console.log('new shoes saved');
      this.setState({showAddNewShoe: false});

      // Update store with new userData
      return doc.get().then((doc) => {
        updateUser( doc.data() );
      });
    });
  }

  saveShoe() {
    // Add shoe to array of shoes in user's db document
    const {
      userAuth,
      userData,
      updateUser,
    } = this.props;

    const {
      newBrand,
      newModel,
      newSize
    } = this.state;

    const newShoe = {
      // shoeId: ; // TODO: From shoe db, chosen from drop-down
      manufacturer: newBrand,
      model: newModel,
      size: newSize,
      dateAdded: new Date(),
    };

    // Create new shoe array object
    //---------
    const newShoes = [newShoe];
    if (userData.shoes) {
      // if already shoes present, create new array with new shoe
      console.log('shoes already present');

      newShoes.push(...userData.shoes);
    }

    console.log('newshoes: ', newShoes);

    // Save shoes to user doc
    //---------
    this.setUserShoes(newShoes).then(() => {
      this.setState({showAddNewShoe: false});
    });
  }

  deleteShoe(i) {
    const {
      userData,
    } = this.props;

    // console.log('old shoes: ', userData.shoes);

    const newShoes = JSON.parse(JSON.stringify(userData.shoes));
    newShoes.splice(i, 1);
    // console.log('new shoes: ', newShoes);

    this.setUserShoes(newShoes); // TODO: Shoe confirmation msg/toast
  }

  render() {
    if (this.props.userData) {
      const {
        email,
        username,
        city,
        streetShoe,
        shoes,
      } = this.props.userData;

      const {
        showAddNewShoe,
        newBrand,
        newModel,
        newSize
      } = this.state;

      return (
        <div className="view-profile">
          <h1>Your Profile</h1>
          <div className="profile-data">
            <p>Email: {email}</p>
            <p>Username: {username}</p>
            <p>City: {city}</p>
            <p>Street Shoe Size: {streetShoe}</p>

            <h3>Your Shoes</h3>
            { (shoes) ?
                <div className="shoe-list">
                  {
                    shoes.map((shoe, i) => {
                      return (
                        <div className="shoe" key={i}>
                          <p>{shoe.manufacturer} {shoe.model}</p>
                          <p>Size {shoe.size}</p>
                          <button
                            onClick={(i) => this.deleteShoe(i)}
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })
                  }
                </div>
                :
                <p>No Shoes Added</p>
            }

            <button
              onClick={ () => this.setState({showAddNewShoe: true}) }
            >
              Add Shoes
            </button>

            { (showAddNewShoe) &&
              <div className="add-shoe">

                <label htmlFor="newBrand">
                  <div className="label-copy">Manufacturer</div>
                  <select
                    name="newBrand"
                    id="newBrand"
                    value={newBrand}
                    onChange={this.updateInput}
                  >
                    <option value=""></option>
                    <option value="la-sportiva">La Sportiva</option>
                    <option value="evolv">Evolv</option>
                    <option value="five-ten">Five Ten</option>
                    <option value="butora">Butora</option>
                    <option value="black-diamond">Black Diamond</option>
                  </select>
                </label>

                <label htmlFor="newModel">
                  <div className="label-copy">Model</div>
                  <select
                    name="newModel"
                    id="newModel"
                    value={newModel}
                    onChange={this.updateInput}
                  >
                    <option value=""></option>
                    <option value="solution">Solution</option>
                    <option value="solution-lv">Solution (Low Volume)</option>
                    <option value="futura">Futura</option>
                    <option value="katana-lace">Katana Lace</option>
                    <option value="katana-vc">Katana Velcro</option>
                  </select>
                </label>

                <label htmlFor="newSize">
                  <div className="label-copy">Size</div>
                  <select
                    name="newSize"
                    id="newSize"
                    value={newSize}
                    onChange={this.updateInput}
                  >
                    {
                      ShoeSizes.map((size) => (
                        <option key={size.eu} value={size.eu}>
                          {`${size.eu} (${size.us}US)`}
                        </option>
                      ))
                    }
                  </select>
                </label>

                <button
                  onClick={ this.saveShoe }
                >
                  Save Shoe
                </button>

              </div>
            }

          </div>
        </div>
      );
    } else {
      return (
        <div className="view-profile">
          <h3>Not Logged in</h3>
        </div>
      );
    }
  }

}