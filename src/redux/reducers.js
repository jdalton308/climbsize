
const initialState = {
  userData: null,
  userAuth: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        userData: action.userData
      });
    case 'SET_AUTH':
      return Object.assign({}, state, {
        userAuth: action.userAuth
      });
    default:
      return state;
  }
}