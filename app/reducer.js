const addReco = (state, action) => {
  if(!action.name) {
    return state;
  }
  return {
    ...state,
    recos: state.recos.concat([{
      id: action.id,
      name: action.name,
      recommender: action.recommender
    }])
  };
};

const removeReco = (state, action) => {
  return {
    ...state,
    recos: state.recos.filter( (reco) => reco.id !== action.id )
  };
};

export const mainReducer = (state, action = {}) => {
  switch (action.type) {
    case 'ADD_RECO':
      return addReco(state, action);
    case 'REMOVE_RECO':
      return removeReco(state, action);
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
