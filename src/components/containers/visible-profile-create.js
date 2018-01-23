
import { connect } from 'react-redux';
import ProfileCreate from '../views/profile-create';
import {
  setAuth,
  setUser
} from '../../redux/actions';



const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.userData,
    userAuth: state.userAuth
  }
};


const mapDispatchToProps = (dispatch, ownProps) => ({
  onNewProfile: (user) => {
    dispatch(setUser(user));
  },
  onLogin: (auth) => {
    dispatch(setAuth(auth));
  }
})


const VisibileProfileCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCreate);


export default VisibileProfileCreate;