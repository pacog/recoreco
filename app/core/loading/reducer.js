import {
  START_LOADING,
  END_LOADING,
  START_ADDING,
  END_ADDING,
  START_EDITING,
  END_EDITING
} from './action-types';

const DEFAULT_STATE = {
  loading: false,
  adding: false,
  editing: false
};

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case END_LOADING:
      return {
        ...state,
        loading: false
      };
    case START_ADDING:
      return {
        ...state,
        adding: true
      };
    case END_ADDING:
      return {
        ...state,
        adding: false
      };
    case START_EDITING:
      return {
        ...state,
        editing: true
      };
    case END_EDITING:
      return {
        ...state,
        editing: false
      };
    default:
      return state;
  }
};
