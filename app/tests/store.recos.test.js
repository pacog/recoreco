import expect from 'expect';
import { recosReducer } from '../core/recos';
import deepFreeze from '../utils/deep-freeze';

import {
  ADD_RECO,
  // ADD_RECO_ERROR,
  EDIT_RECO,
  REMOVE_RECO,
  MARK_RECO_AS_SEEN,
  MARK_RECO_AS_NOT_SEEN,
  RATE_RECO,
  // LOAD_RECOS_SUCCESS,
  // UNLOAD_RECOS_SUCCESS
} from '../core/recos/action-types';

describe('add reco action', () => {
  it('should be able to add a reco when there are none', () => {
    const initialState = [];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    let action = {
      type: ADD_RECO,
      id: 1,
      name: 'test',
      recommender: 'someone',
      added: 123
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to add a reco when there are some', () => {
    const initialState = [
      { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false },
      { id: 3, name: 'test3', recommender: 'someone3', added: 125, seen: false }
    ];

    let action = {
      type: ADD_RECO,
      id: 3,
      name: 'test3',
      recommender: 'someone3',
      added: 125
    };

    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not add when name is empty', () => {
    const initialState = [
      { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];

    let action = {
      type: ADD_RECO,
      id: 3,
      name: '',
      recommender: ''
    };

    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not add when name is empty even in recommender is set', () => {
    const initialState = [
      { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];

    let action = {
      type: ADD_RECO,
      id: 3,
      name: '',
      recommender: 'somebody'
    };

    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should add when name is correct but there is no recommender', () => {
    const initialState = [
      { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test1', recommender: 'someone1', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false },
      { id: 3, name: 'test3', recommender: '', added: 125, seen: false }
    ];
    let action = {
      type: ADD_RECO,
      id: 3,
      name: 'test3',
      recommender: '',
      added: 125
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

});

describe('edit reco action', () => {
  it('should be able to edit a reco', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      id: 1,
      name: 'test2',
      recommender: 'someone2'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to edit a reco and not change others', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test3', recommender: '', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      id: 2,
      name: 'test3'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change anything if id is not in store', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      id: 3,
      name: 'test3'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change anything if id is no sent', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      name: 'test3'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change anything if name is no sent', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

});

describe('remove reco action', () => {
  it('should be able to remove a reco when there is one', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [];
    let action = {
      type: REMOVE_RECO,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to remove a reco when there is more than one', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 122, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { id: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: REMOVE_RECO,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to remove all recos', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];
    const finalState = [];
    let action1 = {
      type: REMOVE_RECO,
      id: 1
    };
    let action2 = {
      type: REMOVE_RECO,
      id: 2
    };
    deepFreeze(initialState);
    deepFreeze(action1);
    deepFreeze(action2);

    let state = recosReducer(initialState, action1);
    expect(recosReducer(state, action2)).toEqual(finalState);
  });

  it('should not remove actions that do not exist', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    let action = {
      type: REMOVE_RECO,
      id: 2
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

});

describe('mark as seen reco action', () => {
  it('should be able mark as seen', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    let action = {
      type: MARK_RECO_AS_SEEN,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should keep seen value', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    let action = {
      type: MARK_RECO_AS_SEEN,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change other values', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    let action = {
      type: MARK_RECO_AS_SEEN,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change value when it is not present', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    let action = {
      type: MARK_RECO_AS_SEEN,
      id: 3
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });
});

describe('mark as unseen reco action', () => {
  it('should be able mark as unseen', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    let action = {
      type: MARK_RECO_AS_NOT_SEEN,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should keep seen value', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    let action = {
      type: MARK_RECO_AS_NOT_SEEN,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change other values', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    let action = {
      type: MARK_RECO_AS_NOT_SEEN,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change value when it is not present', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    let action = {
      type: MARK_RECO_AS_NOT_SEEN,
      id: 3
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });
});

describe('rate reco action', () => {
  it('should be able to rate a previously unrated reco', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
    ];
    let action = {
      type: RATE_RECO,
      id: 1,
      rating: 3
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to rate a previously rated reco', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 1 }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
    ];
    let action = {
      type: RATE_RECO,
      id: 1,
      rating: 3
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change other ratings', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 1 },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 1 },
      { id: 3, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 1 },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 2 },
      { id: 3, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
    ];
    let action1 = {
      type: RATE_RECO,
      id: 2,
      rating: 2
    };
    let action2 = {
      type: RATE_RECO,
      id: 3,
      rating: 3
    };
    deepFreeze(initialState);
    deepFreeze(action1);
    deepFreeze(action2);

    let state = recosReducer(initialState, action1);
    expect(recosReducer(state, action2)).toEqual(finalState);
  });

  it('should not change value when it is not present', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
      { id: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
    ];
    let action = {
      type: RATE_RECO,
      id: 3,
      rating: 4
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change value when no rating is specified', () => {
    const initialState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
    ];
    const finalState = [
      { id: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
    ];
    let action = {
      type: RATE_RECO,
      id: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });
});
