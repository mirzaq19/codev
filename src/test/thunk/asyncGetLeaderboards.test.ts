/**
 * skenario test
 *
 * - asyncGetLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and receive failed message when data fetching failed
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import threadApi from '@/services/apis/thread-api';
import leaderboardApi from '@/services/apis/leaderboard-api';
import { Leaderboard } from '@/types/leaderboard';
import {
  asyncGetLeaderboards,
  setLeaderboards,
} from '@/services/states/leaderboard-slice';

const fakeGetLeaderboardsSuccessResponse: Leaderboard[] = [
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

const fakeFailedUpVotesResponse = new Error('Ups, something went wrong!');

describe('asyncGetLeaderboards thunk', () => {
  beforeEach(() => {
    // backup original implementation
    (leaderboardApi as any)._getLeaderboard = leaderboardApi.getLeaderboard;
  });

  afterEach(() => {
    // restore original implementation
    leaderboardApi.getLeaderboard = (leaderboardApi as any)._getLeaderboard;

    // delete backup data
    delete (leaderboardApi as any)._getLeaderboard;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    leaderboardApi.getLeaderboard = () =>
      Promise.resolve(fakeGetLeaderboardsSuccessResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncGetLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setLeaderboards(fakeGetLeaderboardsSuccessResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and receive failed message when data fetching failed', async () => {
    // arrange
    // stub implementation
    threadApi.upVoteThread = () => Promise.reject(fakeFailedUpVotesResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncGetLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).not.toHaveBeenCalledWith(
      setLeaderboards(fakeGetLeaderboardsSuccessResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
