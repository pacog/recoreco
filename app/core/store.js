import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainReducer } from './reducer';

const initialState = {
  recos: [],
  auth: {},
  loading: true
};

export const configureStore = (state = initialState) => {
  const store = createStore(
    mainReducer,
    state,
    applyMiddleware(thunk)
  );

  return store;
}
