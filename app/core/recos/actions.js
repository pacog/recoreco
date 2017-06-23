import { firebaseDb } from '../firebase';

import {
  ADD_RECO_ERROR,
  REMOVE_RECO_SUCCESS,
  LOAD_RECOS_SUCCESS,
  UNLOAD_RECOS_SUCCESS
} from './action-types';

export const addReco = (reco) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const id = auth.loggedInUser.uid;
    return firebaseDb
      .ref(`recos/${id}`)
      .push({
        added: (new Date().getTime()),
        ...reco
      })
      .catch(error => dispatch(addRecoError(error)));
  };
}

//TODO: do and test
export const addRecoError = (error) => ({
    type: ADD_RECO_ERROR,
    payload: error
});

export function loadRecosSuccess(recos) {
  return {
    type: LOAD_RECOS_SUCCESS,
    payload: recos
  };
};

export const loadRecos = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    if(!auth.loggedInUser) {
      return;
    }
    const id = auth.loggedInUser.uid;
    firebaseDb.ref(`recos/${id}`).on('value', (snapshot) => {
      dispatch(loadRecosSuccess(snapshot.val()));
    });
  };
};

export const unloadRecos = () => {
  return {
    type: UNLOAD_RECOS_SUCCESS
  };
}

export const editReco = (key, changes) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const id = auth.loggedInUser.uid;
    return firebaseDb.ref(`recos/${id}`).child(key).update(changes)
      .catch(error => dispatch(editRecoError(error)));
  };
};

export const removeReco = (key) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const id = auth.loggedInUser.uid;
    return firebaseDb.ref(`recos/${id}`).child(key).remove()
      .catch(error => dispatch(removeRecoError(error)));
  };
};


//TODO: also not used
export function removeRecoSuccess(key) {
  return {
    type: REMOVE_RECO_SUCCESS,
    key
  }
};

export function removeRecoError() {
  // return {
  //   type: REMOVE_RECO_SUCCESS,
  //   key
  // }
};

export function editRecoError() {

};
