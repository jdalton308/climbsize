
const initialState = {
  user: null,
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        user: action.userData
      });
    default:
      return state;
  }
}