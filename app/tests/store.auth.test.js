import expect from 'expect';
import authReducer from '../store/reducer/auth';
import deepFreeze from '../utils/deep-freeze';

describe('Login', () => {
  it('should be able to set user as logged in when there is not logged in user', () => {
    const initialState = {
      loggedInUser: null,
      logInProgress: false
    };
    const finalState = {
      loggedInUser: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      },
      logInProgress: false
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
      loggedInUser: null,
      logInProgress: false
    };
    const finalState = {
      loggedInUser: null,
      logInProgress: false
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
      loggedInUser: {
        id: 2,
        username: 'JaneDoe',
        email: 'jane@doe.com'
      },
      logInProgress: false
    };
    const finalState = {
      loggedInUser: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      },
      logInProgress: false
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
      loggedInUser: {
        id: 1,
        username: 'JohnDoe',
        email: 'john@doe.com'
      },
      logInProgress: false
    };
    const finalState = {
      loggedInUser: null,
      logInProgress: false
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
      loggedInUser: null,
      logInProgress: false
    };
    const finalState = {
      loggedInUser: null,
      logInProgress: false
    };
    let action = {
      type: 'LOGOUT'
    };
    deepFreeze(initialState);
    deepFreeze(action);

    expect(authReducer(initialState, action)).toEqual(finalState);
  });

});
