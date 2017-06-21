import { forIn } from 'lodash';

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

  const result = [];
  forIn(state.recos, (value, key) => {
    if(value.recommender === recommender) {
      result.push({
        ...value,
        key
      });
    }
  });
  return result;
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
  return result;
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
  return result;
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
