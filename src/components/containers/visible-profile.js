
import { connect } from 'react-redux';
import Profile from '../views/profile';
import {
  setUser
} from '../../redux/actions';



const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.userData,
    userAuth: state.userAuth,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUser: (user) => {
      dispatch(setUser(user))
    }
  }
};

const VisibleProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);


export default VisibleProfile;