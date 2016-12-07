import { firebaseAuth } from '../firebase';

export const initAuth = (dispatch) => {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        // TODO dispatch init user action
        // dispatch(authActions.initAuth(user));
        unsub();
        resolve();
      },
      error => reject(error)
    );
  });
}
