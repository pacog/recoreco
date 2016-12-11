import expect from 'expect';
import {
  getReco,
  getRecommenders,
  getRecosByRecommender,
  getUnseenRecos,
  getSeenRecos } from '../core/recos';
import deepFreeze from '../utils/deep-freeze';

describe('getReco method', () => {
  it('should be able to get a reco by id', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
    ] };
    const result =
      { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 };

    deepFreeze(initialState);

    expect(getReco(initialState, 2)).toEqual(result);
  });

  it('should return null when not found', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
    ] };
    const result = null;

    deepFreeze(initialState);

    expect(getReco(initialState, 3)).toEqual(result);
  });

  it('should return null when no recos yet', () => {
    const initialState = { recos: [] };
    const result = null;

    deepFreeze(initialState);

    expect(getReco(initialState, 3)).toEqual(result);
  });
});

describe('getRecommenders method', () => {
  it('should be able to get recommenders', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = ['Paco', 'Pepe'];

    deepFreeze(initialState);

    expect(getRecommenders(initialState)).toEqual(result);
  });

  it('should work with empty recommenders', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: '', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = ['Paco', 'Pepe'];

    deepFreeze(initialState);

    expect(getRecommenders(initialState)).toEqual(result);
  });

  it('should work with empty recommenders', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: '', added: 123, seen: true },
      { key: 2, name: 'test', recommender: '', added: 123, seen: true },
      { key: 3, name: 'test', recommender: '', added: 123, seen: true, rating: 3 }
    ] };
    const result = [];

    deepFreeze(initialState);

    expect(getRecommenders(initialState)).toEqual(result);
  });

  it('should work with empty recos', () => {
    const initialState = { recos: [] };
    const result = [];

    deepFreeze(initialState);

    expect(getRecommenders(initialState)).toEqual(result);
  });
});

describe('getRecosByRecommender method', () => {
  it('should be able to get recos', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true }
    ];

    deepFreeze(initialState);

    expect(getRecosByRecommender(initialState, 'Paco')).toEqual(result);
  });

  it('should be able to get recos when there is only one', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ];

    deepFreeze(initialState);

    expect(getRecosByRecommender(initialState, 'Pepe')).toEqual(result);
  });

  it('should be able to get no recos', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [];

    deepFreeze(initialState);

    expect(getRecosByRecommender(initialState, 'Julian')).toEqual(result);
  });

  it('should be able to get no recos when list is empty', () => {
    const initialState = { recos: [] };
    const result = [];

    deepFreeze(initialState);

    expect(getRecosByRecommender(initialState, 'Julian')).toEqual(result);
  });
});

describe('getUnseenRecos method', () => {
  it('should be able to get recos', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: false }
    ];

    deepFreeze(initialState);

    expect(getUnseenRecos(initialState)).toEqual(result);
  });

  it('should be able to get all recos', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: false, rating: 3 }
    ] };
    const result = [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: false, rating: 3 }
    ];

    deepFreeze(initialState);

    expect(getUnseenRecos(initialState)).toEqual(result);
  });

  it('should be able to get no recos', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [];

    deepFreeze(initialState);

    expect(getUnseenRecos(initialState)).toEqual(result);
  });

  it('should work with empty state', () => {
    const initialState = { recos: [] };
    const result = [];

    deepFreeze(initialState);

    expect(getUnseenRecos(initialState)).toEqual(result);
  });

  it('should work with undefined seen state', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123 },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { key: 2, name: 'test', recommender: 'Paco', added: 123 }
    ];

    deepFreeze(initialState);

    expect(getUnseenRecos(initialState)).toEqual(result);
  });

});

describe('getSeenRecos method', () => {
  it('should be able to get recos', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: false, rating: 3 }
    ] };
    const result = [
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true }
    ];

    deepFreeze(initialState);

    expect(getSeenRecos(initialState)).toEqual(result);
  });

  it('should be able to get all recos', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ];

    deepFreeze(initialState);

    expect(getSeenRecos(initialState)).toEqual(result);
  });

  it('should be able to get no recos', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123, seen: false, rating: 3 }
    ] };
    const result = [];

    deepFreeze(initialState);

    expect(getSeenRecos(initialState)).toEqual(result);
  });

  it('should work with empty state', () => {
    const initialState = { recos: [] };
    const result = [];

    deepFreeze(initialState);

    expect(getSeenRecos(initialState)).toEqual(result);
  });

  it('should work with undefined seen state', () => {
    const initialState = { recos: [
      { key: 1, name: 'test', recommender: 'Paco', added: 123 },
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { key: 3, name: 'test', recommender: 'Pepe', added: 123 }
    ] };
    const result = [
      { key: 2, name: 'test', recommender: 'Paco', added: 123, seen: true }
    ];

    deepFreeze(initialState);

    expect(getSeenRecos(initialState)).toEqual(result);
  });

});
