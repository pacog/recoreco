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

export const mainReducer = (state, action = {}) => {
  switch (action.type) {
    case 'ADD_RECO':
      return addReco(state, action);
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
