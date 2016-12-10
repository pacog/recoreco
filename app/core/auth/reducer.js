import {
  INIT_AUTH,
  LOGIN,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  LOGOUT_ERROR,
  LOGOUT
} from './action-types';

const DEFAULT_STATE = {
  loggedInUser: null,
  logInProgress: false,
  initialized: false,
  loginError: null,
  signupError: null,
  logoutError: null
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

const loginError = (state, action) => {
  return {
    ...DEFAULT_INITIALIZED_STATE,
    loginError: action.error
  };
};

const signupError = (state, action) => {
  return {
    ...DEFAULT_INITIALIZED_STATE,
    signupError: action.error
  };
};

const logoutError = (state, action) => {
  return {
    ...state,
    logoutError: action.error
  };
};

const logout = (state) => {
  return {
    ...DEFAULT_INITIALIZED_STATE,
    ...state,
    loggedInUser: null
  };
};

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case INIT_AUTH:
      return initAuth(state, action);
    case LOGIN:
      return login(state, action);
    case LOGIN_ERROR:
      return loginError(state, action);
    case SIGNUP_ERROR:
      return signupError(state, action);
    case LOGOUT_ERROR:
      return logoutError(state, action);
    case LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};
