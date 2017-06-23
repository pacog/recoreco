import { firebaseAuth } from '../firebase';
import { loadRecos, importRecosFromLocalStorage } from '../recos/actions';

import {
  INIT_AUTH,
  LOGIN,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  LOGOUT_ERROR,
  LOGOUT
} from './action-types';

const _initAuthAction = (user) => ({
  type: INIT_AUTH,
  user
});

export const initAuthAction = (user) => {
  return (dispatch) => {
    dispatch(_initAuthAction(user));
    if(user) {
      dispatch(loadRecos());
      dispatch(importRecosFromLocalStorage());
    }
  };
};

export const signInWithEmailAndPassword = (email, password) => {
  return (dispatch) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(result => dispatch(login(result)))
      .catch(error => dispatch(loginError(error)));
  };
};

export const signUpWithEmailAndPassword = (email, password) => {
  return (dispatch) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(result => dispatch(login(result)))
      .catch(error => dispatch(signupError(error)));
  };
};

export const logoutFromDatabase = () => {
  return (dispatch) => {
    return firebaseAuth.signOut()
      .then(result => dispatch(logout(result)))
      .catch(error => dispatch(logoutError(error)));
  };
};

export const login = (user) => ({
  type: LOGIN,
  user
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error
});

export const signupError = (error) => ({
  type: SIGNUP_ERROR,
  error
});

export const logoutError = (error) => ({
  type: LOGOUT_ERROR,
  error
});

export const logout = () => ({
  type: LOGOUT
});
