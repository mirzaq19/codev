import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@/app/store';
import ThreadList from '@/components/layout/ThreadList';
// import { ThreadWithOwner } from '@/types/thread';
import threadApi from '@/services/apis/thread-api';
import leaderboardApi from '@/services/apis/leaderboard-api';

expect.extend(matchers);

const threads = [
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
    owner: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
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
    owner: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
];

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

describe('ThreadList Component', () => {
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

    // cleanup
    cleanup();
  });

  it('should render all threads correctly ', async () => {
    // arrange
    render(
      <Provider store={store}>
        <Router>
          <ThreadList threads={threads} />
        </Router>
      </Provider>,
    );
    const threadList = await screen.findAllByRole('listitem');

    // assert
    expect(threadList).toHaveLength(2);
    expect(threadList[0]).toHaveTextContent('Thread Pertama');
    expect(threadList[1]).toHaveTextContent('Thread Kedua');
    expect(threadList[0]).toHaveTextContent('John Doe');
    expect(threadList[1]).toHaveTextContent('Jane Doe');
  });

  it('should correctly render upvote and downvote buttton', async () => {
    // arrange
    // stub implementation
    threadApi.upVoteThread = () => Promise.resolve(fakeUpVotesSuccessResponse);
    leaderboardApi.getLeaderboard = () =>
      Promise.resolve(fakeLeaderboardSuccessResponse);
    render(
      <Provider store={store}>
        <Router>
          <ThreadList threads={threads} />
        </Router>
      </Provider>,
    );
    const threadList = await screen.findAllByRole('listitem');
    const { getAllByRole } = within(threadList[0]);
    const buttons = getAllByRole('button');
    const upVoteButton = buttons[0];
    const downVoteButton = buttons[1];

    // assert
    expect(upVoteButton).toBeInTheDocument();
    expect(upVoteButton).toHaveTextContent('Upvotes');
    expect(downVoteButton).toBeInTheDocument();
    expect(downVoteButton).toHaveTextContent('Downvotes');
  });
});
