import expect from 'expect';
import configureStore from '../store'; // eslint-disable-line
import { mainReducer } from '../reducer';
import deepFreeze from '../utils/deep-freeze';

describe('configureStore', () => {
  let store;

  before(() => {
    store = configureStore();
  });

  describe('state', () => {
    it('should have recos list after creation', () => {
      expect(store.getState().recos).toEqual([]);
    });
  });

});

describe('main reducer', () => {

  describe('empty actions', () => {
    it('should return state when no action is provided', () => {
      const testState = { 'test': 1 };
      expect(mainReducer(testState)).toEqual(testState);
    });

    it('should return state when action is unknown', () => {
      const testState = { 'test': 1 };
      expect(
        mainReducer(
          testState,
          { action: 'UNKNOWN' }
        )).toEqual(testState);
    });

  });

  describe('add reco action', () => {
    it('should be able to add a reco when there are none', () => {
      const initialState = { recos: [] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      let action = {
        type: 'ADD_RECO',
        id: 1,
        name: 'test',
        recommender: 'someone',
        added: 123
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should be able to add a reco when there are some', () => {
      const initialState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false },
        { id: 3, name: 'test3', recommender: 'someone3', added: 125, seen: false }
      ] };

      let action = {
        type: 'ADD_RECO',
        id: 3,
        name: 'test3',
        recommender: 'someone3',
        added: 125
      };

      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should not add when name is empty', () => {
      const initialState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ] };

      let action = {
        type: 'ADD_RECO',
        id: 3,
        name: '',
        recommender: ''
      };

      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should not add when name is empty even in recommender is set', () => {
      const initialState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ] };

      let action = {
        type: 'ADD_RECO',
        id: 3,
        name: '',
        recommender: 'somebody'
      };

      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should add when name is correct but there is no recommender', () => {
      const initialState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false },
        { id: 3, name: 'test3', recommender: '', added: 125, seen: false }
      ] };
      let action = {
        type: 'ADD_RECO',
        id: 3,
        name: 'test3',
        recommender: '',
        added: 125
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

  });

  describe('remove reco action', () => {
    it('should be able to remove a reco when there is one', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      const finalState = { recos: [] };
      let action = {
        type: 'REMOVE_RECO',
        id: 1
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should be able to remove a reco when there is more than one', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 122, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
      ] };
      const finalState = { recos: [
        { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
      ] };
      let action = {
        type: 'REMOVE_RECO',
        id: 1
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should be able to remove all recos', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
        { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ] };
      const finalState = { recos: [
      ] };
      let action1 = {
        type: 'REMOVE_RECO',
        id: 1
      };
      let action2 = {
        type: 'REMOVE_RECO',
        id: 2
      };
      deepFreeze(initialState);
      deepFreeze(action1);
      deepFreeze(action2);

      let state = mainReducer(initialState, action1);
      expect(mainReducer(state, action2)).toEqual(finalState);
    });

    it('should not remove actions that do not exist', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      let action = {
        type: 'REMOVE_RECO',
        id: 2
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

  });

  describe('mark as seen reco action', () => {
    it('should be able mark as seen', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
      ] };
      let action = {
        type: 'MARK_RECO_AS_SEEN',
        id: 1
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should keep seen value', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
      ] };
      let action = {
        type: 'MARK_RECO_AS_SEEN',
        id: 1
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should not change other values', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
        { id: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
        { id: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      let action = {
        type: 'MARK_RECO_AS_SEEN',
        id: 1
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should not change value when it is not present', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
        { id: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
        { id: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      let action = {
        type: 'MARK_RECO_AS_SEEN',
        id: 3
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });
  });

  describe('mark as unseen reco action', () => {
    it('should be able mark as unseen', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      let action = {
        type: 'MARK_RECO_AS_NOT_SEEN',
        id: 1
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should keep seen value', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
      ] };
      let action = {
        type: 'MARK_RECO_AS_NOT_SEEN',
        id: 1
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should not change other values', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
        { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
        { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
      ] };
      let action = {
        type: 'MARK_RECO_AS_NOT_SEEN',
        id: 1
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should not change value when it is not present', () => {
      const initialState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
        { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
        { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
      ] };
      let action = {
        type: 'MARK_RECO_AS_NOT_SEEN',
        id: 3
      };
      deepFreeze(initialState);
      deepFreeze(action);

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });
  });
});
