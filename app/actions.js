import { v4 } from 'node-uuid';
import { db } from './db';

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

export const login = (email, password) => ({
  type: 'LOGIN',
  email,
  password
});

export const loginDB = (email, password) => {
  return (dispatch) => {
    return db.login(email, password).then(
      () => dispatch(login(email, password))
      // ,
      // error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});
