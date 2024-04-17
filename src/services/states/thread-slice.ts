import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import { Thread, VoteRequest } from '@/types/thread';
import { AppDispatch } from '@/app/store';
import threadApi from '@/services/apis/thread-api';

export interface ThreadState {
  threads: Thread[];
}

const initialState: ThreadState = {
  threads: [],
};

export const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    setThreads: (state, action: PayloadAction<Thread[]>) => {
      state.threads = action.payload;
    },
    upVote: (state, action: PayloadAction<VoteRequest>) => {
      const thread = state.threads.find(
        (t) => t.id === action.payload.threadId,
      );
      if (thread) {
        thread.upVotesBy.push(action.payload.userId);
      }
    },
    downVote: (state, action: PayloadAction<VoteRequest>) => {
      const thread = state.threads.find(
        (t) => t.id === action.payload.threadId,
      );
      if (thread) {
        thread.downVotesBy.push(action.payload.userId);
      }
    },
    neutralizeVote: (state, action: PayloadAction<VoteRequest>) => {
      const thread = state.threads.find(
        (t) => t.id === action.payload.threadId,
      );
      if (thread) {
        thread.upVotesBy = thread.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        );
        thread.downVotesBy = thread.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        );
      }
    },
  },
});

// prettier-ignore
export const asyncUpVotes = ({ threadId, userId }: VoteRequest) => async (dispatch: AppDispatch) => {
  const { upVote } = threadSlice.actions;
  let status = true;
  dispatch(showLoading());
  try {
    dispatch(upVote({ threadId, userId }));
    await threadApi.upVoteThread( threadId );
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Upvote failed: ${(error as Error).message}`);
    status = false
  }
  dispatch(hideLoading());
  return status;
};

// prettier-ignore
export const asyncDownVotes = ({ threadId, userId }: VoteRequest) => async (dispatch: AppDispatch) => {
  const { downVote } = threadSlice.actions;
  let status = true;
  dispatch(showLoading());
  try {
    dispatch(downVote({ threadId, userId }));
    await threadApi.downVoteThread( threadId );
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Downvote failed: ${(error as Error).message}`);
    status = false
  }
  dispatch(hideLoading());
  return status;
};

// prettier-ignore
export const asyncNeutralizeVotes = ({ threadId, userId }: VoteRequest) => async (dispatch: AppDispatch) => {
  const { neutralizeVote } = threadSlice.actions;
  let status = true;
  dispatch(showLoading());
  try {
    dispatch(neutralizeVote({ threadId, userId }));
    await threadApi.neutralizeVote( threadId );
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Neutralize vote failed: ${(error as Error).message}`);
    status = false
  }
  dispatch(hideLoading());
  return status;
};

export const { setThreads, upVote, downVote, neutralizeVote } =
  threadSlice.actions;

export default threadSlice.reducer;
