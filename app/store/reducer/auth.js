const DEFAULT_STATE = {
  loggedInUser: null,
  logInProgress: false
};

const login = (state, action) => {
  if(!action.user) {
    return state;
  }
  return {
    ...DEFAULT_STATE,
    loggedInUser: action.user
  };
};

const logout = (state, action) => {
  return {
    ...DEFAULT_STATE,
    loggedInUser: null
  };
};

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return login(state, action);
    case 'LOGOUT':
      return logout(state, action);
    default:
      return state;
  }
};
