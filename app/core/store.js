import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './reducer';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const LOCAL_STORAGE_THROTTLE = 1000; //ms

const initialState = loadState() || {
  recos: [],
  auth: {}
};

export const configureStore = (state = initialState) => {
  const store = createStore(
    mainReducer,
    state,
    applyMiddleware(thunk)
  );

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, LOCAL_STORAGE_THROTTLE));

  return store;
}
