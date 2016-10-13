import { createStore, applyMiddleware, compose } from 'redux';
// import { fromJS } from 'immutable';
import { mainReducer } from './reducer';

const initialState = {
  recos: []
};

export default function configureStore(state = initialState) {

  const store = createStore(
    mainReducer,
    state
  );

  return store;
}
