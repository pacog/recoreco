const DEFAULT_ACTION = {
  seen: false
};

const addReco = (state, action) => {
  if(!action.name) {
    return state;
  }
  const newReco = {
    ...DEFAULT_ACTION,
    id: action.id,
    name: action.name,
    recommender: action.recommender,
    added: action.added
  };
  return {
    ...state,
    recos: state.recos.concat([newReco])
  };
};

const removeReco = (state, action) => {
  return {
    ...state,
    recos: state.recos.filter( (reco) => reco.id !== action.id )
  };
};

const markRecoAsSeen = (state, action) => {
  return {
    ...state,
    recos: state.recos.map((reco) => {
      if(reco.id === action.id) {
        return {
          ...reco,
          seen: true
        };
      }
      return reco;
    })
  };
};

const markRecoAsNotSeen = (state, action) => {
  return {
    ...state,
    recos: state.recos.map((reco) => {
      if(reco.id === action.id) {
        return {
          ...reco,
          seen: false
        };
      }
      return reco;
    })
  };
};

const rateReco = (state, action) => {
  if (typeof action.rating === 'undefined') {
    return state;
  }
  return {
    ...state,
    recos: state.recos.map((reco) => {
      if(reco.id === action.id) {
        return {
          ...reco,
          rating: action.rating
        };
      }
      return reco;
    })
  };
};

export const mainReducer = (state, action = {}) => {
  switch (action.type) {
    case 'ADD_RECO':
      return addReco(state, action);
    case 'REMOVE_RECO':
      return removeReco(state, action);
    case 'MARK_RECO_AS_SEEN':
      return markRecoAsSeen(state, action);
    case 'MARK_RECO_AS_NOT_SEEN':
      return markRecoAsNotSeen(state, action);
    case 'RATE_RECO':
      return rateReco(state, action);
    default:
      return state;
  }
};

export const getReco = (state, recoId) => {
  if(!state.recos) {
    return null;
  }
  return state.recos.find( reco => reco.id === recoId);
}
