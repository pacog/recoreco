import { FirebaseList } from '../firebase/firebase-list';
import Reco from './reco';

export const recoList = new FirebaseList({
  onAdd: addRecoSuccess,
  onChange: editRecoSuccess,
  onLoad: loadRecosSuccess,
  onRemove: removeRecoSuccess
}, Reco);

import {
  ADD_RECO,
  ADD_RECO_ERROR,
  EDIT_RECO,
  // REMOVE_RECO,
  REMOVE_RECO_SUCCESS,
  MARK_RECO_AS_SEEN,
  MARK_RECO_AS_NOT_SEEN,
  RATE_RECO,
  LOAD_RECOS_SUCCESS,
  UNLOAD_RECOS_SUCCESS
} from './action-types';

export const addReco = (reco) => {
  return dispatch => {
    return recoList.push({
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

//TODO: This is not really used
export const addRecoSuccess = (reco) => {
  type: ADD_RECO,
  reco
};

export const editRecoSuccess = (reco) => ({
  type: EDIT_RECO,
  reco
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
    const id = auth.loggedInUser.uid;
    recoList.path = `recos/${id}`;
    recoList.subscribe(dispatch);
  };
};

export const unloadRecos = () => {
  recoList.unsubscribe();
  return {
    type: UNLOAD_RECOS_SUCCESS
  };
}









export const editReco = (id, recoName, recommender = '') => ({
  id: id,
  type: EDIT_RECO,
  name: recoName,
  recommender: recommender
});

export const removeReco = (key) => {
  return dispatch => {
    return recoList.remove(key)
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

export const markAsSeen = (id) => ({
  type: MARK_RECO_AS_SEEN,
  id
});

export const markAsUnSeen = (id) => ({
  type: MARK_RECO_AS_NOT_SEEN,
  id
});

export const rateReco = (id, rating) => ({
  type: RATE_RECO,
  id,
  rating
});
