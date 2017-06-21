import expect from 'expect';
import { recosReducer } from '../core/recos';
import deepFreeze from '../utils/deep-freeze';

import {
  ADD_RECO_SUCCESS,
  // ADD_RECO_ERROR,
  EDIT_RECO,
  REMOVE_RECO,
  // MARK_RECO_AS_SEEN,
  // MARK_RECO_AS_NOT_SEEN,
  // RATE_RECO,
  LOAD_RECOS_SUCCESS,
  // UNLOAD_RECOS_SUCCESS
} from '../core/recos/action-types';

const DEFAULT_RECO = {
  key: 1,
  name: 'Test reco',
  recommender: 'Recommender1',
  added: 123,
  seen: false
};

describe('add reco action', () => {
  it('should be able to add a reco when there are none', () => {
    const initialState = [];
    const finalState = [
      { ...DEFAULT_RECO }
    ];
    let action = {
      type: ADD_RECO_SUCCESS,
      reco: {
        ...DEFAULT_RECO
      }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to add a reco when there are some', () => {
    const initialState = [
      { ...DEFAULT_RECO },
      { ...DEFAULT_RECO, key: 2, name: 'test2', recommender: 'someone2', added: 124 }
    ];
    const finalState = [
      { ...DEFAULT_RECO },
      { ...DEFAULT_RECO, key: 2, name: 'test2', recommender: 'someone2', added: 124 },
      { ...DEFAULT_RECO, key: 3, name: 'test3', recommender: 'someone3', added: 125 }
    ];

    let action = {
      type: ADD_RECO_SUCCESS,
      reco: {
        ...DEFAULT_RECO,
        key: 3,
        name: 'test3',
        recommender: 'someone3',
        added: 125
      }
    };

    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not add when name is empty', () => {
    const initialState = [
      { ...DEFAULT_RECO },
      { ...DEFAULT_RECO, key: 2, name: 'test2', recommender: 'someone2', added: 124 }
    ];
    const finalState = [
      { ...DEFAULT_RECO },
      { ...DEFAULT_RECO, key: 2, name: 'test2', recommender: 'someone2', added: 124 }
    ];

    let action = {
      type: ADD_RECO_SUCCESS,
      reco: { ...DEFAULT_RECO, key: 3, name: '', recommender: '', added: 124 }
    };

    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not add when name is empty even in recommender is set', () => {
    const initialState = [
      { ...DEFAULT_RECO },
      { ...DEFAULT_RECO, key: 2, name: 'test2', recommender: 'someone2', added: 124 }
    ];
    const finalState = [
      { ...DEFAULT_RECO },
      { ...DEFAULT_RECO, key: 2, name: 'test2', recommender: 'someone2', added: 124 }
    ];

    let action = {
      type: ADD_RECO_SUCCESS,
      reco: { ...DEFAULT_RECO, key: 3, name: '', recommender: 'Anyone', added: 124 }
    };

    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should add when name is correct but there is no recommender', () => {
    const initialState = [
      { ...DEFAULT_RECO },
      { ...DEFAULT_RECO, key: 2, name: 'test2', recommender: 'someone2', added: 124 }
    ];
    const finalState = [
      { ...DEFAULT_RECO },
      { ...DEFAULT_RECO, key: 2, name: 'test2', recommender: 'someone2', added: 124 },
      { ...DEFAULT_RECO, key: 3, name: 'test3', recommender: '', added: 124 }
    ];
    let action = {
      type: ADD_RECO_SUCCESS,
      reco: { ...DEFAULT_RECO, key: 3, name: 'test3', recommender: '', added: 124 }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

});

describe('edit reco action', () => {
  it('should be able to edit a reco', () => {
    const initialState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [
      { key: 1, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      key: 1,
      name: 'test2',
      recommender: 'someone2'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to edit a reco and not change others', () => {
    const initialState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test3', recommender: '', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      key: 2,
      name: 'test3'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change anything if id is not in store', () => {
    const initialState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      key: 3,
      name: 'test3'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change anything if id is no sent', () => {
    const initialState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
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
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: EDIT_RECO,
      key: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

});

describe('remove reco action', () => {
  it('should be able to remove a reco when there is one', () => {
    const initialState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [];
    let action = {
      type: REMOVE_RECO,
      key: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to remove a reco when there is more than one', () => {
    const initialState = [
      { key: 1, name: 'test', recommender: 'someone', added: 122, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    const finalState = [
      { key: 2, name: 'test2', recommender: 'someone2', added: 123, seen: false }
    ];
    let action = {
      type: REMOVE_RECO,
      key: 1
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to remove all recos', () => {
    const initialState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
      { key: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];
    const finalState = [];
    let action1 = {
      type: REMOVE_RECO,
      key: 1
    };
    let action2 = {
      type: REMOVE_RECO,
      key: 2
    };
    deepFreeze(initialState);
    deepFreeze(action1);
    deepFreeze(action2);

    let state = recosReducer(initialState, action1);
    expect(recosReducer(state, action2)).toEqual(finalState);
  });

  it('should not remove actions that do not exist', () => {
    const initialState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    const finalState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
    ];
    let action = {
      type: REMOVE_RECO,
      key: 2
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

});

// describe('mark as seen reco action', () => {
//   it('should be able mark as seen', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     let action = {
//       type: MARK_RECO_AS_SEEN,
//       key: 1
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should keep seen value', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     let action = {
//       type: MARK_RECO_AS_SEEN,
//       key: 1
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should not change other values', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
//     ];
//     let action = {
//       type: MARK_RECO_AS_SEEN,
//       key: 1
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should not change value when it is not present', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: false }
//     ];
//     let action = {
//       type: MARK_RECO_AS_SEEN,
//       key: 3
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
// });
//
// describe('mark as unseen reco action', () => {
//   it('should be able mark as unseen', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
//     ];
//     let action = {
//       type: MARK_RECO_AS_NOT_SEEN,
//       key: 1
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should keep seen value', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false }
//     ];
//     let action = {
//       type: MARK_RECO_AS_NOT_SEEN,
//       key: 1
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should not change other values', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: false },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     let action = {
//       type: MARK_RECO_AS_NOT_SEEN,
//       key: 1
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should not change value when it is not present', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     let action = {
//       type: MARK_RECO_AS_NOT_SEEN,
//       key: 3
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
// });
//
// describe('rate reco action', () => {
//   it('should be able to rate a previously unrated reco', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
//     ];
//     let action = {
//       type: RATE_RECO,
//       key: 1,
//       rating: 3
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should be able to rate a previously rated reco', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 1 }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
//     ];
//     let action = {
//       type: RATE_RECO,
//       key: 1,
//       rating: 3
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should not change other ratings', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 1 },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 1 },
//       { key: 3, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 1 },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 2 },
//       { key: 3, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
//     ];
//     let action1 = {
//       type: RATE_RECO,
//       key: 2,
//       rating: 2
//     };
//     let action2 = {
//       type: RATE_RECO,
//       key: 3,
//       rating: 3
//     };
//     deepFreeze(initialState);
//     deepFreeze(action1);
//     deepFreeze(action2);
//
//     let state = recosReducer(initialState, action1);
//     expect(recosReducer(state, action2)).toEqual(finalState);
//   });
//
//   it('should not change value when it is not present', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true },
//       { key: 2, name: 'test', recommender: 'someone', added: 123, seen: true }
//     ];
//     let action = {
//       type: RATE_RECO,
//       key: 3,
//       rating: 4
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
//
//   it('should not change value when no rating is specified', () => {
//     const initialState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
//     ];
//     const finalState = [
//       { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 }
//     ];
//     let action = {
//       type: RATE_RECO,
//       key: 1
//     };
//     deepFreeze(initialState);
//     deepFreeze(action);
//
//     expect(recosReducer(initialState, action)).toEqual(finalState);
//   });
// });

describe('Load recos success', () => {
  it('should load recos correctly', () => {
    const initialState = [];
    const finalState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 },
      { key: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];
    let action = {
      type: LOAD_RECOS_SUCCESS,
      payload: [
        { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 },
        { key: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ]
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should load recos correctly overwriting', () => {
    const initialState = [
      { key: 3, name: 'test3', recommender: 'someone3', added: 1, seen: false }
    ];
    const finalState = [
      { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 },
      { key: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
    ];
    let action = {
      type: LOAD_RECOS_SUCCESS,
      payload: [
        { key: 1, name: 'test', recommender: 'someone', added: 123, seen: true, rating: 3 },
        { key: 2, name: 'test2', recommender: 'someone2', added: 124, seen: false }
      ]
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

  it('should work when there are no recos', () => {
    const initialState = [];
    const finalState = [];
    let action = {
      type: LOAD_RECOS_SUCCESS,
      payload: []
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(recosReducer(initialState, action)).toEqual(finalState);
  });

});
