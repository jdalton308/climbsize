
import { connect } from 'react-redux';
import Header from '../shared/header';



const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.userData,
    userAuth: state.userAuth
  }
};


// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onLogIn: () => {
//       dispatch(setUser())
//     }
//   }
// }


const VisibleHeader = connect(
  mapStateToProps,
  // mapDispatchToProps
)(Header);


export default VisibleHeader;