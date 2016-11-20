import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { fromJS } from 'immutable';
import { mainReducer } from './reducer';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const LOCAL_STORAGE_THROTTLE = 1000; //ms

const initialState = loadState() || {
  recos: [],
  auth: {}
};

export const configureStore = (state = initialState) => {
  const store = createStore(
    mainReducer,
    state,
    applyMiddleware(thunk)
  );

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, LOCAL_STORAGE_THROTTLE));

  return store;
}

//Util functions to get stuff from the store. Maybe find a better place for them?
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

export const getLoggedInUser = (state) => {
  if(!state.auth) {
    return null;
  }
  return state.auth.loggedInUser;
}
