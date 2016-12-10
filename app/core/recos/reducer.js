import {
  ADD_RECO,
  EDIT_RECO,
  REMOVE_RECO,
  MARK_RECO_AS_SEEN,
  MARK_RECO_AS_NOT_SEEN,
  RATE_RECO
} from './action-types';

const DEFAULT_RECO = {
  seen: false
};

const addReco = (state, action) => {
  if(!action.name) {
    return state;
  }
  const newReco = {
    ...DEFAULT_RECO,
    id: action.id,
    name: action.name,
    recommender: action.recommender,
    added: action.added
  };
  return state.concat([newReco]);
};

const editReco = (state, action) => {
  if(!action.name) {
    return state;
  }
  if(typeof action.id === 'undefined') {
    return state;
  }
  return state.map((reco) => {
      if(reco.id === action.id) {
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
  return state.filter( (reco) => reco.id !== action.id );
};

const markRecoAsSeen = (state, action) => {
  return state.map((reco) => {
      if(reco.id === action.id) {
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
      if(reco.id === action.id) {
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
      if(reco.id === action.id) {
        return {
          ...reco,
          rating: action.rating
        };
      }
      return reco;
    });
};

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_RECO:
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
    default:
      return state;
  }
};
