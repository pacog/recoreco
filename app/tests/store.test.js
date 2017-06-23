import expect from 'expect';
import { configureStore } from '../core/store';
import { mainReducer } from '../core/reducer';
import deepFreeze from '../utils/deep-freeze';

describe('configureStore', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  describe('state', () => {
    it('should have recos list after creation', () => {
      expect(store.getState().recos).toEqual([]);
    });
  });

});

describe('main reducer', () => {

  const DEFAULT_EMPTY_STATE = {
    recos: [],
    auth: {
      loggedInUser: null,
      logInProgress: false
    },
    loading: true
  };
  deepFreeze(DEFAULT_EMPTY_STATE);

  describe('empty actions', () => {
    it('should return state when no action is provided', () => {
      const testState = DEFAULT_EMPTY_STATE;
      expect(mainReducer(testState)).toEqual(DEFAULT_EMPTY_STATE);
    });

    it('should return state when action is unknown', () => {
      const testState = DEFAULT_EMPTY_STATE;
      expect(
        mainReducer(
          testState,
          { action: 'UNKNOWN' }
        )).toEqual(DEFAULT_EMPTY_STATE);
    });

  });

});
