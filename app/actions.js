import { v4 } from 'node-uuid';

export const addReco = (recoName, recommender = '') => ({
  type: 'ADD_RECO',
  name: recoName,
  recommender: recommender,
  id: v4(),
  added: (new Date().getTime())
});

export const removeReco = (id) => ({
  type: 'REMOVE_RECO',
  id
});
