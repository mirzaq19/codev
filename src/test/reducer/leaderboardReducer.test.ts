/**
 * test scenario for leaderboardReducer
 *
 * - leaderboardReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the leaderboard after fetching leaderboard when given by setLeaderboards action
 *
 */

import { describe, it, expect } from 'vitest';
import leaderboardReducer from '@/services/states/leaderboard-slice';
import { Leaderboard } from '@/types/leaderboard';

const initialState = {
  leaderboards: [],
};

const leaderboards: Leaderboard[] = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

describe('leaderboardReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const action = { type: 'unknown' };

    // action
    const result = leaderboardReducer(undefined, action);

    // assert
    expect(result).toEqual(initialState);
  });

  it('should return the leaderboard after fetching leaderboard when given by setLeaderboards action', () => {
    // arrange
    const action = {
      type: 'leaderboard/setLeaderboards',
      payload: leaderboards,
    };

    // action
    const result = leaderboardReducer(initialState, action);

    // assert
    expect(result).toEqual({ leaderboards });
    expect(result.leaderboards).toHaveLength(2);
    expect(result.leaderboards[0].user.name).toEqual('John Doe');
    expect(result.leaderboards[0].score).toEqual(10);
  });
});
