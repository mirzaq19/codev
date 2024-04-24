/**
 * test scenario for threadReducer
 *
 * - threadReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads after fetching threads when given by setThreads action
 *  - should return the threads with the upvote thread when given by upVote action
 *  - should return the threads with the downvote thread when given by downVote action
 *  - should return the threads with the neutralvote thread when given by neutralizeVote action
 *  - should return the detail thread when given by setDetailThread action
 *  - should return the detail thread with the new comment when given by addComment action
 *
 */

import { describe, it, expect } from 'vitest';
import threadReducer from '@/services/states/thread-slice';
import { DetailThread, Thread, VoteRequest } from '@/types/thread';
import { CommentRequest } from '@/types/comment';

const threads: Thread[] = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const threadsWithVote: Thread[] = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: ['users-1'],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: ['users-1'],
    totalComments: 0,
  },
];

const detailThread: DetailThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const action = { type: 'unknown' };

    // action
    const result = threadReducer(undefined, action);

    // assert
    expect(result).toEqual({
      threads: [],
      detailThread: null,
    });
  });

  it('should return the threads after fetching threads when given by setThreads action', () => {
    // arrange
    const action = {
      type: 'thread/setThreads',
      payload: threads,
    };

    // action
    const result = threadReducer(undefined, action);

    // assert
    expect(result).toEqual({ threads, detailThread: null });
    expect(result.threads).toHaveLength(2);
  });

  it('should return the threads with the upvote thread when given by upVote action', () => {
    // arrange
    const initialState = { threads, detailThread: null };
    const voteRequest: VoteRequest = {
      threadId: 'thread-1',
      userId: 'users-1',
    };
    const action = { type: 'thread/upVote', payload: voteRequest };

    // action
    const result = threadReducer(initialState, action);

    // assert
    expect(result.threads[0].upVotesBy).toEqual(['users-1']);
    expect(result.threads[0].upVotesBy).toHaveLength(1);
    expect(result.threads[1].upVotesBy).toEqual([]);
  });

  it('should return the threads with the downvote thread when given by downVote action', () => {
    // arrange
    const initialState = { threads, detailThread: null };
    const voteRequest: VoteRequest = {
      threadId: 'thread-1',
      userId: 'users-1',
    };
    const action = { type: 'thread/downVote', payload: voteRequest };

    // action
    const result = threadReducer(initialState, action);

    // assert
    expect(result.threads[0].downVotesBy).toEqual(['users-1']);
    expect(result.threads[0].downVotesBy).toHaveLength(1);
    expect(result.threads[1].downVotesBy).toEqual([]);
  });

  it('should return the threads with the neutralvote thread when given by neutralizeVote action', () => {
    // arrange
    const initialState = {
      threads: threadsWithVote,
      detailThread: null,
    };
    const voteRequest1: VoteRequest = {
      threadId: 'thread-1',
      userId: 'users-1',
    };
    const voteRequest2: VoteRequest = {
      threadId: 'thread-2',
      userId: 'users-1',
    };

    const action1 = { type: 'thread/neutralizeVote', payload: voteRequest1 };
    const action2 = { type: 'thread/neutralizeVote', payload: voteRequest2 };

    // action
    const result1 = threadReducer(initialState, action1);
    const result2 = threadReducer(initialState, action2);

    // assert
    expect(result1.threads[0].upVotesBy).toEqual([]);
    expect(result2.threads[1].upVotesBy).toEqual([]);
    expect(result1.threads[0].downVotesBy).toEqual([]);
    expect(result2.threads[1].downVotesBy).toEqual([]);
    expect(result1.threads[0].downVotesBy).toHaveLength(0);
    expect(result2.threads[1].downVotesBy).toHaveLength(0);
  });

  it('should return the detail thread when given by setDetailThread action', () => {
    // arrange
    const initialState = { threads, detailThread: null };
    const action = {
      type: 'thread/setDetailThread',
      payload: detailThread,
    };

    // action
    const result = threadReducer(initialState, action);

    // assert
    expect(result.detailThread).toEqual(action.payload);
    expect(result.detailThread!.comments).toHaveLength(1);
    expect(result.detailThread!.comments).toEqual(detailThread.comments);
    expect(result.detailThread!.category).toEqual('General');
  });

  it('should return the detail thread with new comment when given by addComment action', () => {
    // arrange
    const initialState = { threads, detailThread };
    const newComment = {
      id: 'comment-2',
      content: 'Ini adalah komentar kedua',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    const commentRequest: CommentRequest = {
      comment: newComment,
      threadId: 'thread-1',
    };
    const action = { type: 'thread/addComment', payload: commentRequest };

    // action
    const result = threadReducer(initialState, action);

    // assert
    expect(result.detailThread!.comments).toEqual([
      newComment,
      ...detailThread.comments,
    ]);
    expect(result.detailThread!.comments).toHaveLength(2);
  });
});
