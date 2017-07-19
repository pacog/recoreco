import { forIn } from 'lodash';

export const getRecommenders = (state) => {
  const uniqueRecommenders = {};
  if(state.recos) {
    forIn(state.recos, (reco) => {
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

  const result = [];
  forIn(state.recos, (value, key) => {
    if(value.recommender === recommender) {
      result.push({
        ...value,
        key
      });
    }
  });
  return sortByAdded(result);
}

export const getUnseenRecos = (state) => {
  if(!state.recos) {
    return [];
  }
  const result = [];
  forIn(state.recos, (value, key) => {
    if(!value.seen) {
      result.push({
        ...value,
        key
      });
    }
  });
  return sortByAdded(result);
}

export const getSeenRecos = (state) => {
  if(!state.recos) {
    return [];
  }
  const result = [];
  forIn(state.recos, (value, key) => {
    if(value.seen) {
      result.push({
        ...value,
        key
      });
    }
  });
  return sortByAdded(result);
}

export const getReco = (state, key) => {
  if(!state.recos) {
    return null;
  }
  if(state.recos[key]) {
    return {
      ...state.recos[key],
      key
    };
  }
}

function sortByAdded(array) {
  return array.splice(0).sort((itemA, itemB) => {
    if(itemA.added > itemB.added) {
      return -1;
    }
    return 1;
  });
}
