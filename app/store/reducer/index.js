
import { combineReducers } from 'redux';
import recos from './recos';
import auth from './auth';

export const mainReducer = combineReducers({
  recos,
  auth
});
