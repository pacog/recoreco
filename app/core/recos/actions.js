import { firebaseDb } from '../firebase';
import { loadState, saveState } from '../localStorage';
import { startLoading, startAdding, endAdding, endLoading, startEditing, endEditing } from '../loading/actions';

import {
  ADD_RECO_ERROR,
  LOAD_RECOS_SUCCESS,
  UNLOAD_RECOS_SUCCESS
} from './action-types';

export const addReco = (reco) => {
  return (dispatch, getState) => {
    dispatch(startLoading());
    dispatch(startAdding());
    const { auth } = getState();
    const id = auth.loggedInUser.uid;
    return firebaseDb
      .ref(`recos/${id}`)
      .push({
        added: (new Date().getTime()),
        ...reco
      })
      .then((result) => {
        dispatch(endAdding());
        return result;
      })
      .catch(error => dispatch(addRecoError(error)));
  };
}

export const importRecosFromLocalStorage = () => {
  return (dispatch) => {
    const state = loadState() || {};
    if(state.recos) {
      state.recos.forEach((reco) => {
        const recoToSave = {...reco};
        delete recoToSave.id;
        dispatch(addReco(recoToSave));
      });
      console.log(`Saved ${state.recos.length} old recos`);
      saveState(null);
    }
  };

};

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
    dispatch(startLoading());
    const id = auth.loggedInUser.uid;
    firebaseDb.ref(`recos/${id}`).on('value', (snapshot) => {
      dispatch(loadRecosSuccess(snapshot.val()));
      dispatch(endLoading());
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
    dispatch(startLoading());
    dispatch(startEditing());
    const { auth } = getState();
    const id = auth.loggedInUser.uid;
    return firebaseDb.ref(`recos/${id}`).child(key).update(changes)
      .then((result) => {
        dispatch(endEditing());
        return result;
      })
      .catch(error => dispatch(editRecoError(error)));
  };
};

export const removeReco = (key) => {
  return (dispatch, getState) => {
    dispatch(startLoading());
    dispatch(startEditing());
    const { auth } = getState();
    const id = auth.loggedInUser.uid;
    return firebaseDb.ref(`recos/${id}`).child(key).remove()
      .then((result) => {
        dispatch(endEditing());
        return result;
      })
      .catch(error => dispatch(removeRecoError(error)));
  };
};

export function removeRecoError() {

};

export function editRecoError() {

};
