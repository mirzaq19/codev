/**
 * test scenario for authReducer
 *
 * - authReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the authenticated true when given by login action
 *  - should return the user after fetching user when given by populate action
 *  - should return the authenticated false and user null when given by logout action
 *  - should return the loading false when given by stopLoading action
 *
 */

import { describe, it, expect } from 'vitest';
import authReducer, { AuthState } from '@/services/states/auth-slice';

const initialState: AuthState = {
  loading: true,
  user: null,
  authenticated: false,
};

const user = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('authReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const action = { type: 'unknown' };

    // action
    const result = authReducer(undefined, action);

    // assert
    expect(result).toEqual(initialState);
  });

  it('should return the authenticated true when given by login action', () => {
    // arrange
    const action = {
      type: 'auth/login',
    };

    // action
    const result = authReducer(initialState, action);

    // assert
    expect(result).toEqual({
      loading: true,
      user: null,
      authenticated: true,
    });
    expect(result.authenticated).toBeTruthy();
  });

  it('should return the user after fetching user when given by populate action', () => {
    // arrange
    const action = {
      type: 'auth/populate',
      payload: user,
    };

    // action
    const result = authReducer(undefined, action);

    // assert
    expect(result).toEqual({
      loading: true,
      user,
      authenticated: false,
    });
    expect(result.user).toEqual(user);
    expect(result.user).toHaveProperty('id');
    expect(result.user).toHaveProperty('name');
    expect(result.user).toHaveProperty('email');
    expect(result.user).toHaveProperty('avatar');
  });

  it('should return the authenticated false and user null when given by logout action', () => {
    // arrange
    const action = {
      type: 'auth/logout',
    };
    const stateLogin = { ...initialState };
    stateLogin.authenticated = true;
    stateLogin.user = user;

    // action
    const result = authReducer(initialState, action);

    // assert
    expect(result).toEqual({
      loading: true,
      user: null,
      authenticated: false,
    });
    expect(result.authenticated).toBeFalsy();
    expect(result.user).toBeNull();
  });

  it('should return the loading false when given by stopLoading action', () => {
    // arrange
    const action = {
      type: 'auth/stopLoading',
    };
    const stateLoading = { ...initialState };
    stateLoading.loading = true;

    // action
    const result = authReducer(stateLoading, action);

    // assert
    expect(result).toEqual({
      loading: false,
      user: null,
      authenticated: false,
    });
    expect(result.loading).toBeFalsy();
  });
});
