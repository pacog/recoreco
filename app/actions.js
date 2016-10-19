let nextRecoId = 0;

export const addReco = (recoName, recommender = '') => ({
  type: 'ADD_RECO',
  name: recoName,
  recommender: recommender,
  id: nextRecoId++
});
