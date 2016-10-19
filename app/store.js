import { createStore, applyMiddleware, compose } from 'redux';
// import { fromJS } from 'immutable';
import { mainReducer } from './reducer';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const LOCAL_STORAGE_THROTTLE = 1000; //ms

const initialState = loadState() || {
  recos: []
};

export default function configureStore(state = initialState) {
  const store = createStore(
    mainReducer,
    state
  );

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, LOCAL_STORAGE_THROTTLE));

  return store;
}
