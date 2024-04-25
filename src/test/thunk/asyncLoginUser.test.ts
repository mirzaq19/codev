/**
 * skenario test
 *
 * - asyncLoginUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and receive failed message when data fetching failed
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  asyncLoginUser,
  login,
  populate,
  stopLoading,
} from '@/services/states/auth-slice';
import authApi from '@/services/apis/auth-api';

const cred = {
  email: 'john@example.com',
  password: 'password123',
};

const fakeLoginResponse = 'token-123';
const fakeGetOwnProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};
const fakeErrorResponse = new Error('email or password is wrong');

describe('asyncPopulateUsersAndTalks thunk', () => {
  beforeEach(() => {
    // backup original implementation
    (authApi as any)._login = authApi.login;
    (authApi as any)._getOwnProfile = authApi.getOwnProfile;
  });

  afterEach(() => {
    // restore original implementation
    authApi.login = (authApi as any)._login;
    authApi.getOwnProfile = (authApi as any)._getOwnProfile;

    // delete backup data
    delete (authApi as any)._login;
    delete (authApi as any)._getOwnProfile;

    // clear localStorage
    localStorage.clear();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    authApi.login = () => Promise.resolve(fakeLoginResponse);
    authApi.getOwnProfile = () => Promise.resolve(fakeGetOwnProfileResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncLoginUser(cred)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(login());
    expect(dispatch).toHaveBeenCalledWith(populate(fakeGetOwnProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(stopLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(authApi.getAccessToken()).toBe(fakeLoginResponse);
  });

  it('should dispatch action and receive failed message when data fetching failed', async () => {
    // arrange
    // stub implementation
    authApi.login = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncLoginUser(cred)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(login());
    expect(dispatch).not.toHaveBeenCalledWith(
      populate(fakeGetOwnProfileResponse),
    );
    expect(dispatch).not.toHaveBeenCalledWith(stopLoading());
    expect(authApi.getAccessToken()).toBe(null);
  });
});
