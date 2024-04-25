/**
 * test scenario for userReducer
 *
 * - userReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the users after fetching users when given by setUsers action
 *
 */

import { describe, it, expect } from 'vitest';
import userReducer, { UserState } from '@/services/states/user-slice';

const initialState: UserState = {
  users: [],
};

const users = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'fulan',
    name: 'Si Fulan',
    email: 'fulan@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

describe('userReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const action = { type: 'unknown' };

    // action
    const result = userReducer(initialState, action);

    // assert
    expect(result).toEqual(initialState);
  });

  it('should return the users after fetching users when given by setUsers action', () => {
    // arrange
    const action = {
      type: 'user/setUsers',
      payload: users,
    };

    // action
    const result = userReducer(initialState, action);

    // assert
    expect(result).toEqual({ users });
    expect(result.users).toHaveLength(3);
    expect(result.users[0].id).toEqual('john_doe');
    expect(result.users[1].id).toEqual('jane_doe');
  });
});
