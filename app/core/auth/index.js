import { firebaseAuth } from '../firebase';
import { initAuthAction } from './actions';

export const initAuth = (dispatch) => {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        dispatch(initAuthAction(user));
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
