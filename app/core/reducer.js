import { combineReducers } from 'redux';
import { recosReducer } from './recos';
import { authReducer } from './auth';

export const mainReducer = combineReducers({
  recos: recosReducer,
  auth: authReducer
});
