import expect from 'expect';
import authReducer from '../store/reducer/auth';
import deepFreeze from '../utils/deep-freeze';

const DEFAULT_STATE = {
  loggedInUser: null,
  logInProgress: false,
  initialized: false,
  loginError: null,
  signupError: null,
  logoutError: null
};

const DEFAULT_INITIALIZED_STATE = {
  ...DEFAULT_STATE,
  initialized: true
};

const DEFAULT_USER = {
  id: 1,
  username: 'JohnDoe',
  email: 'john@doe.com'
};

const DEFAULT_ERROR = {
  code: 500,
  message: 'There was an error.'
};

describe('Init auth', () => {
  it('should be able to initialize auth with a user', () => {
    const initialState = {
      ...DEFAULT_STATE
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        ...DEFAULT_USER
      }
    };
    let action = {
      type: 'INIT_AUTH',
      user: {
        ...DEFAULT_USER
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
        ...DEFAULT_USER
      }
    };
    let action = {
      type: 'LOGIN',
      user: {
        ...DEFAULT_USER
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
        ...DEFAULT_USER,
        id: 2,
        username: 'JaneDoe',
        email: 'jane@doe.com'
      }
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        ...DEFAULT_USER
      }
    };
    let action = {
      type: 'LOGIN',
      user: {
        ...DEFAULT_USER
      }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

  it('should remove error after successful login', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE,
      loginError: {
        ...DEFAULT_ERROR
      }
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        ...DEFAULT_USER
      }
    };
    let action = {
      type: 'LOGIN',
      user: {
        ...DEFAULT_USER
      }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

});

describe('Login error', () => {
  it('should show error if it occurs', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      loginError: {
        ...DEFAULT_ERROR
      }
    };
    let action = {
      type: 'LOGIN_ERROR',
      error: {
        ...DEFAULT_ERROR
      }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });
});

describe('Signup error', () => {
  it('should show error if it occurs', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      signupError: {
        ...DEFAULT_ERROR
      }
    };
    let action = {
      type: 'SIGNUP_ERROR',
      error: {
        ...DEFAULT_ERROR
      }
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });
});

describe('Logout error', () => {
  it('should show error if it occurs', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        ...DEFAULT_USER
      }
    };
    const finalState = {
      ...DEFAULT_INITIALIZED_STATE,
      loggedInUser: {
        ...DEFAULT_USER
      },
      logoutError: {
        ...DEFAULT_ERROR
      }
    };
    let action = {
      type: 'LOGOUT_ERROR',
      error: {
        ...DEFAULT_ERROR
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
        ...DEFAULT_USER
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

  it('should remove error if any', () => {
    const initialState = {
      ...DEFAULT_INITIALIZED_STATE,
      logoutError: {
        ...DEFAULT_ERROR
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

});
