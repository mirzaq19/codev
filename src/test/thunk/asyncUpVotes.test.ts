/**
 * skenario test
 *
 * - asyncUpVotes thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and receive failed message when data fetching failed
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { asyncUpVotes, upVote } from '@/services/states/thread-slice';
import threadApi from '@/services/apis/thread-api';
import leaderboardApi from '@/services/apis/leaderboard-api';

const fakeUpVotesSuccessResponse = {
  id: 'vote-1',
  userId: 'users-1',
  threadId: 'thread-1',
  voteType: 1,
};

const fakeLeaderboardSuccessResponse = [
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

const fakeFailedUpVotesResponse = new Error('Not Found');

describe('asyncUpVotes thunk', () => {
  beforeEach(() => {
    // backup original implementation
    (threadApi as any)._upVoteThread = threadApi.upVoteThread;
    (leaderboardApi as any)._getLeaderboard = leaderboardApi.getLeaderboard;
  });

  afterEach(() => {
    // restore original implementation
    threadApi.upVoteThread = (threadApi as any)._upVoteThread;
    leaderboardApi.getLeaderboard = (leaderboardApi as any)._getLeaderboard;

    // delete backup data
    delete (threadApi as any)._upVoteThread;
    delete (leaderboardApi as any)._getLeaderboard;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    threadApi.upVoteThread = () => Promise.resolve(fakeUpVotesSuccessResponse);
    leaderboardApi.getLeaderboard = () =>
      Promise.resolve(fakeLeaderboardSuccessResponse);
    // mock dispatch
    const dispatch = vi.fn();
    const voteRequest = {
      threadId: 'thread-1',
      userId: 'users-1',
    };

    // action
    await asyncUpVotes(voteRequest)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(upVote(voteRequest));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and receive failed message when data fetching failed', async () => {
    // arrange
    // stub implementation
    threadApi.upVoteThread = () => Promise.reject(fakeFailedUpVotesResponse);
    // mock dispatch
    const dispatch = vi.fn();
    const voteRequest = {
      threadId: 'thread-1',
      userId: 'users-1',
    };

    // action
    await asyncUpVotes(voteRequest)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
