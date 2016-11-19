const DEFAULT_STATE = {
  loggedInUser: null,
  logInProgress: false
};

const logInUser = (state, action) => {
  if(!action.user) {
    return state;
  }
  return Object.assign({}, DEFAULT_STATE, { loggedInUser: action.user });
};

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case 'LOG_IN_USER':
      return logInUser(state, action);
    default:
      return state;
  }
};
