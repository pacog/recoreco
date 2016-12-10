export const getLoggedInUser = (state) => {
  if(!state.auth) {
    return null;
  }
  return state.auth.loggedInUser;
}

export const getLoginError = (state) => {
  if(!state.auth) {
    return null;
  }
  return state.auth.loginError;
};

export const getSignupError = (state) => {
  if(!state.auth) {
    return null;
  }
  return state.auth.signupError;
};
