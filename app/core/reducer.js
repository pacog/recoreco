import { combineReducers } from 'redux';
import { recosReducer } from './recos';
import { authReducer } from './auth';
import { loadingReducer } from './loading';

export const mainReducer = combineReducers({
  recos: recosReducer,
  auth: authReducer,
  loading: loadingReducer
});
