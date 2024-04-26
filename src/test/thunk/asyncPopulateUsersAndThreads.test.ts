/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and receive failed message when data fetching failed
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import userApi from '@/services/apis/user-api';
import threadApi from '@/services/apis/thread-api';
import { Thread } from '@/types/thread';
import { asyncPopulateUsersAndThreads } from '@/services/states/share-thunk';
import { setThreads } from '@/services/states/thread-slice';
import { setUsers } from '@/services/states/user-slice';
import { User } from '@/types/auth';

const fakeThreadsSuccessResponse: Thread[] = [
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

const fakeUsersSuccessResponse: User[] = [
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

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    // backup original implementation
    (userApi as any)._getAllUser = userApi.getAllUsers;
    (threadApi as any)._getAllThreads = threadApi.getAllThreads;
  });

  afterEach(() => {
    // restore original implementation
    userApi.getAllUsers = (userApi as any)._getAllUsers;
    threadApi.getAllThreads = (threadApi as any)._getAllThreads;

    // delete backup data
    delete (userApi as any)._getAllUsers;
    delete (threadApi as any)._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    userApi.getAllUsers = () => Promise.resolve(fakeUsersSuccessResponse);
    threadApi.getAllThreads = () => Promise.resolve(fakeThreadsSuccessResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setThreads(fakeThreadsSuccessResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(setUsers(fakeUsersSuccessResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and receive failed message when data fetching failed', async () => {
    // arrange
    // stub implementation
    userApi.getAllUsers = () => Promise.reject(fakeErrorResponse);
    threadApi.getAllThreads = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).not.toHaveBeenCalledWith(
      setThreads(fakeThreadsSuccessResponse),
    );
    expect(dispatch).not.toHaveBeenCalledWith(
      setUsers(fakeUsersSuccessResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
