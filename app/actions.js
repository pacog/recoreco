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

export const markAsSeen = (id) => ({
  type: 'MARK_RECO_AS_SEEN',
  id
});

export const markAsUnSeen = (id) => ({
  type: 'MARK_RECO_AS_NOT_SEEN',
  id
});

export const rateReco = (id, rating) => ({
  type: 'RATE_RECO',
  id,
  rating
});
