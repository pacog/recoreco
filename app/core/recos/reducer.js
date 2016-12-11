import {
  ADD_RECO_SUCCESS,
  EDIT_RECO,
  REMOVE_RECO,
  MARK_RECO_AS_SEEN,
  MARK_RECO_AS_NOT_SEEN,
  RATE_RECO,
  LOAD_RECOS_SUCCESS
} from './action-types';

const DEFAULT_RECO = {
  seen: false
};

const addReco = (state, action) => {
  const reco = action.reco || {};
  if(!reco.name) {
    return state;
  }
  const newReco = {
    ...DEFAULT_RECO,
    ...reco
  };
  return state.concat([newReco]);
};

const editReco = (state, action) => {
  if(!action.name) {
    return state;
  }
  if(typeof action.key === 'undefined') {
    return state;
  }
  return state.map((reco) => {
      if(reco.key === action.key) {
        return {
          ...reco,
          name: action.name,
          recommender: action.recommender || ''
        };
      }
      return reco;
    });
}

const removeReco = (state, action) => {
  return state.filter( (reco) => reco.key !== action.key );
};

const markRecoAsSeen = (state, action) => {
  return state.map((reco) => {
      if(reco.key === action.key) {
        return {
          ...reco,
          seen: true
        };
      }
      return reco;
    });
};

const markRecoAsNotSeen = (state, action) => {
  return state.map((reco) => {
      if(reco.key === action.key) {
        return {
          ...reco,
          seen: false
        };
      }
      return reco;
    });
};

const rateReco = (state, action) => {
  if (typeof action.rating === 'undefined') {
    return state;
  }
  return state.map((reco) => {
      if(reco.key === action.key) {
        return {
          ...reco,
          rating: action.rating
        };
      }
      return reco;
    });
};

const loadRecosSuccess = (state, action) => {
  return action.payload || [];
};

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_RECO_SUCCESS:
      return addReco(state, action);
    case EDIT_RECO:
      return editReco(state, action);
    case REMOVE_RECO:
      return removeReco(state, action);
    case MARK_RECO_AS_SEEN:
      return markRecoAsSeen(state, action);
    case MARK_RECO_AS_NOT_SEEN:
      return markRecoAsNotSeen(state, action);
    case RATE_RECO:
      return rateReco(state, action);
    case LOAD_RECOS_SUCCESS:
      return loadRecosSuccess(state, action);
    default:
      return state;
  }
};
