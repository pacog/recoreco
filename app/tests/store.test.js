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
        { id: 1, name: 'test', recommender: 'someone' }
      ] };
      deepFreeze(initialState);
      let action = {
        type: 'ADD_RECO',
        id: 1,
        name: 'test',
        recommender: 'someone'
      };

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should be able to add a reco when there are some', () => {
      const initialState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1' },
        { id: 2, name: 'test2', recommender: 'someone2' }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1' },
        { id: 2, name: 'test2', recommender: 'someone2' },
        { id: 3, name: 'test3', recommender: 'someone3' }
      ] };
      deepFreeze(initialState);
      let action = {
        type: 'ADD_RECO',
        id: 3,
        name: 'test3',
        recommender: 'someone3'
      };

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should not add when name is empty', () => {
      const initialState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1' },
        { id: 2, name: 'test2', recommender: 'someone2' }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1' },
        { id: 2, name: 'test2', recommender: 'someone2' }
      ] };
      deepFreeze(initialState);
      let action = {
        type: 'ADD_RECO',
        id: 3,
        name: '',
        recommender: ''
      };

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should not add when name is empty even in recommender is set', () => {
      const initialState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1' },
        { id: 2, name: 'test2', recommender: 'someone2' }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1' },
        { id: 2, name: 'test2', recommender: 'someone2' }
      ] };
      deepFreeze(initialState);
      let action = {
        type: 'ADD_RECO',
        id: 3,
        name: '',
        recommender: 'somebody'
      };

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

    it('should add when name is correct but there is no recommender', () => {
      const initialState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1' },
        { id: 2, name: 'test2', recommender: 'someone2' }
      ] };
      const finalState = { recos: [
        { id: 1, name: 'test1', recommender: 'someone1' },
        { id: 2, name: 'test2', recommender: 'someone2' },
        { id: 3, name: 'test3', recommender: '' }
      ] };
      deepFreeze(initialState);
      let action = {
        type: 'ADD_RECO',
        id: 3,
        name: 'test3',
        recommender: ''
      };

      expect(mainReducer(initialState, action)).toEqual(finalState);
    });

  });

});

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};
