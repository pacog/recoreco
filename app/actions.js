import { v4 } from 'node-uuid';
import { db } from './db';
import { firebaseAuth } from './core/firebase';

export const addReco = (recoName, recommender = '') => ({
  type: 'ADD_RECO',
  name: recoName,
  recommender: recommender,
  id: v4(),
  added: (new Date().getTime())
});

export const addRecoToDB = (recoName, recommender = '') => {
  return (dispatch) => {
    return db.addReco().then(
      () => dispatch(addReco(recoName, recommender))
      // ,
      // error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
};

export const editReco = (id, recoName, recommender = '') => ({
  id: id,
  type: 'EDIT_RECO',
  name: recoName,
  recommender: recommender
});


export const removeReco = (id) => ({
  type: 'REMOVE_RECO',
  id
});

export const markAsSeen = (id) => ({
  type: 'MARK_RECO_AS_SEEN',
  id
});

export const markAsUnSeen = (id) => ({
  type: 'MARK_RECO_AS_NOT_SEEN',
  id
});

export const rateReco = (id, rating) => ({
  type: 'RATE_RECO',
  id,
  rating
});

export const initAuthAction = (user) => ({
  type: 'INIT_AUTH',
  user
});

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

export const logoutFromDatabase = (email, password) => {
  return (dispatch) => {
    return firebaseAuth.signOut()
      .then(result => dispatch(logout(result)))
      .catch(error => dispatch(logoutError(error)));
  };
};

export const login = (user) => ({
  type: 'LOGIN',
  user
});

export const loginError = (error) => ({
  type: 'LOGIN_ERROR',
  error
});

export const signupError = (error) => ({
  type: 'SIGNUP_ERROR',
  error
});

export const logoutError = (error) => ({
  type: 'LOGOUT_ERROR',
  error
});

export const logout = () => ({
  type: 'LOGOUT'
});
