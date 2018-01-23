
// Store firebase Auth object
export function setAuth(userAuth) {
  return { type: 'SET_AUTH', userAuth }
}

// Store user profile data
export function setUser(userData) {
  return { type: 'SET_USER', userData };
}