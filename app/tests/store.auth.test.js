import expect from 'expect';
import authReducer from '../store/reducer/auth';
import deepFreeze from '../utils/deep-freeze';

const DEFAULT_STATE = {
  loggedInUser: null,
  logInProgress: false,
  initialized: false
};

const DEFAULT_INITIALIZED_STATE = {
  ...DEFAULT_STATE,
  initialized: true
};

describe('Init auth', () => {
  it('should be able to initialize auth with a user', () => {
    const initialState = {
      ...DEFAULT_STATE
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      }
    };
    let action = {
      type: 'INIT_AUTH',
      user: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to initialize auth with no user', () => {
    const initialState = {
      ...DEFAULT_STATE
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE
    };
    let action = {
      type: 'INIT_AUTH',
      user: null
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });
});

describe('Login', () => {
  it('should be able to set user as logged in when there is not logged in user', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      }
    };
    let action = {
      type: 'LOGIN',
      user: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

  it('should not change anything if we dont set an user', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE,
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
    };
    let action = {
      type: 'LOGIN'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

  it('should be able to set user as logged in when there is already a logged in user', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        id: 2,
        username: 'JaneDoe',
        email: 'jane@doe.com'
      }
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      }
    };
    let action = {
      type: 'LOGIN',
      user: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

});

describe('Logout', () => {
  it('should be able to log out', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      }
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE
    };
    let action = {
      type: 'LOGOUT'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

  it('should do nothing if not logged in', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE
    };
    let action = {
      type: 'LOGOUT'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

});
