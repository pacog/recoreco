import expect from 'expect';
import { configureStore, getReco, getRecommenders, getRecosByRecommender, getUnseenRecos, getSeenRecos } from '../store';
import { mainReducer } from '../store/reducer';
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

  const DEFAULT_EMPTY_STATE = { recos: [] };
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

describe('getReco method', () => {
  it('should be able to get a reco by id', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
    ] };
    const result =
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 };

    deepFreeze(initialState);

    expect(getReco(initialState, 2)).toEqual(result);
  });

  it('should return null when not found', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
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
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = ['Paco', 'Pepe'];

    deepFreeze(initialState);

    expect(getRecommenders(initialState)).toEqual(result);
  });

  it('should work with empty recommenders', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: '', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = ['Paco', 'Pepe'];

    deepFreeze(initialState);

    expect(getRecommenders(initialState)).toEqual(result);
  });

  it('should work with empty recommenders', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: '', added: 123, seen: true },
      { id: 2, name: 'test', recommender: '', added: 123, seen: true },
      { id: 3, name: 'test', recommender: '', added: 123, seen: true, rating: 3 }
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
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true }
    ];

    deepFreeze(initialState);

    expect(getRecosByRecommender(initialState, 'Paco')).toEqual(result);
  });

  it('should be able to get recos when there is only one', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ];

    deepFreeze(initialState);

    expect(getRecosByRecommender(initialState, 'Pepe')).toEqual(result);
  });

  it('should be able to get no recos', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
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
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: false }
    ];

    deepFreeze(initialState);

    expect(getUnseenRecos(initialState)).toEqual(result);
  });

  it('should be able to get all recos', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: false, rating: 3 }
    ] };
    const result = [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: false, rating: 3 }
    ];

    deepFreeze(initialState);

    expect(getUnseenRecos(initialState)).toEqual(result);
  });

  it('should be able to get no recos', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
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
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123 },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { id: 2, name: 'test', recommender: 'Paco', added: 123 }
    ];

    deepFreeze(initialState);

    expect(getUnseenRecos(initialState)).toEqual(result);
  });

});

describe('getSeenRecos method', () => {
  it('should be able to get recos', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: false, rating: 3 }
    ] };
    const result = [
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true }
    ];

    deepFreeze(initialState);

    expect(getSeenRecos(initialState)).toEqual(result);
  });

  it('should be able to get all recos', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ] };
    const result = [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: true, rating: 3 }
    ];

    deepFreeze(initialState);

    expect(getSeenRecos(initialState)).toEqual(result);
  });

  it('should be able to get no recos', () => {
    const initialState = { recos: [
      { id: 1, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: false },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123, seen: false, rating: 3 }
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
      { id: 1, name: 'test', recommender: 'Paco', added: 123 },
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true },
      { id: 3, name: 'test', recommender: 'Pepe', added: 123 }
    ] };
    const result = [
      { id: 2, name: 'test', recommender: 'Paco', added: 123, seen: true }
    ];

    deepFreeze(initialState);

    expect(getSeenRecos(initialState)).toEqual(result);
  });

});


describe('correct integration of combined reducers', () => {
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
});
