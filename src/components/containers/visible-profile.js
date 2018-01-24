
import { connect } from 'react-redux';
import Profile from '../views/profile';



const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.userData,
  }
};


const VisibleProfile = connect(
  mapStateToProps,
)(Profile);


export default VisibleProfile;