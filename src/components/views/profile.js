'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';


const Profile = ({userData}) => {

  if (userData) {
    const {
      email,
      username,
      city,
      streetShoe,
    } = userData;

    return (
      <div className="view-profile">
        <h1>Your Profile</h1>
        <div className="profile-data">
          <p>Email: {email}</p>
          <p>Username: {username}</p>
          <p>City: {city}</p>
          <p>Street Shoe Size: {streetShoe}</p>
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


Profile.propTypes = {
  userData: PropTypes.object, // TODO: either object or null
};


export default Profile;