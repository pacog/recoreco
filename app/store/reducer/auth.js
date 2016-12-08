const DEFAULT_STATE = {
  loggedInUser: null,
  logInProgress: false,
  initialized: false
};

const DEFAULT_INITIALIZED_STATE = {
  ...DEFAULT_STATE,
  initialized: true
};

const initAuth = (state, action) => {
  return {
    ...DEFAULT_INITIALIZED_STATE,
    loggedInUser: action.user
  };
};

const login = (state, action) => {
  if(!action.user) {
    return state;
  }
  return {
    ...DEFAULT_INITIALIZED_STATE,
    loggedInUser: action.user
  };
};

const logout = (state, action) => {
  return {
    ...DEFAULT_INITIALIZED_STATE,
    loggedInUser: null
  };
};

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case 'INIT_AUTH':
      return initAuth(state, action);
    case 'LOGIN':
      return login(state, action);
    case 'LOGOUT':
      return logout(state, action);
    default:
      return state;
  }
};
