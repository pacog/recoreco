export const getRecommenders = (state) => {
  const uniqueRecommenders = {};
  if(state.recos) {
    state.recos.forEach( reco => {
      if(reco.recommender) {
        uniqueRecommenders[reco.recommender] = true;
      }
    });
  }

  return Object.keys(uniqueRecommenders);
}

export const getRecosByRecommender = (state, recommender) => {
  if(!state.recos) {
    return [];
  }
  return state.recos.filter( reco => reco.recommender === recommender);
}

export const getUnseenRecos = (state) => {
  if(!state.recos) {
    return [];
  }
  return state.recos.filter( reco => !reco.seen);
}

export const getSeenRecos = (state) => {
  if(!state.recos) {
    return [];
  }
  return state.recos.filter( reco => reco.seen);
}

export const getReco = (state, recoId) => {
  if(!state.recos) {
    return null;
  }
  return state.recos.find( reco => reco.id === recoId);
}
