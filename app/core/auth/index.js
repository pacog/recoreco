import { firebaseAuth } from '../firebase';
import { initAuthAction } from './actions';
import { loadRecos } from '../recos/actions';

export const initAuth = (dispatch) => {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        dispatch(initAuthAction(user));
        dispatch(loadRecos()); // TODO maybe find a better place to do this
        unsub();
        resolve();
      },
      error => reject(error)
    );
  });
}

import * as authActions from './actions';
export { authActions };
export * from './action-types';
export authReducer from './reducer';
export * from './selectors';
