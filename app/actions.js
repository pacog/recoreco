let nextRecoId = 0;

export const addReco = (recoName, recommender = '') => {
  return {
    type: 'ADD_RECO',
    name: recoName,
    recommender: recommender,
    id: nextRecoId++
  };
};
