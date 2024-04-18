import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import {
  DetailThread,
  Thread,
  VoteCommentRequest,
  VoteRequest,
} from '@/types/thread';
import { AppDispatch } from '@/app/store';
import threadApi from '@/services/apis/thread-api';

export interface ThreadState {
  threads: Thread[];
  detailThread: DetailThread | null;
}

const initialState: ThreadState = {
  threads: [],
  detailThread: null,
};

export const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    setThreads: (state, action: PayloadAction<Thread[]>) => {
      state.threads = action.payload;
    },
    setDetailThread: (state, action: PayloadAction<DetailThread>) => {
      state.detailThread = action.payload;
    },
    upVote: (state, action: PayloadAction<VoteRequest>) => {
      const thread = state.threads.find(
        (t) => t.id === action.payload.threadId,
      );
      if (thread) {
        thread.upVotesBy.push(action.payload.userId);
      }

      const { detailThread } = state;
      if (detailThread && detailThread.id === action.payload.threadId) {
        detailThread.upVotesBy.push(action.payload.userId);
      }
    },
    downVote: (state, action: PayloadAction<VoteRequest>) => {
      const thread = state.threads.find(
        (t) => t.id === action.payload.threadId,
      );
      if (thread) {
        thread.downVotesBy.push(action.payload.userId);
      }

      const { detailThread } = state;
      if (detailThread && detailThread.id === action.payload.threadId) {
        detailThread.downVotesBy.push(action.payload.userId);
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

      const { detailThread } = state;
      if (detailThread && detailThread.id === action.payload.threadId) {
        detailThread.upVotesBy = detailThread.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        );
        detailThread.downVotesBy = detailThread.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        );
      }
    },
    upVoteComment: (state, action: PayloadAction<VoteCommentRequest>) => {
      const { detailThread } = state;
      if (detailThread) {
        const comment = detailThread.comments.find(
          (c) => c.id === action.payload.commentId,
        );
        if (comment) {
          comment.upVotesBy.push(action.payload.userId);
        }
      }
    },
    downVoteComment: (state, action: PayloadAction<VoteCommentRequest>) => {
      const { detailThread } = state;
      if (detailThread) {
        const comment = detailThread.comments.find(
          (c) => c.id === action.payload.commentId,
        );
        if (comment) {
          comment.downVotesBy.push(action.payload.userId);
        }
      }
    },
    neutralizeVoteComment: (
      state,
      action: PayloadAction<VoteCommentRequest>,
    ) => {
      const { detailThread } = state;
      if (detailThread) {
        const comment = detailThread.comments.find(
          (c) => c.id === action.payload.commentId,
        );
        if (comment) {
          comment.upVotesBy = comment.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          );
          comment.downVotesBy = comment.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          );
        }
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

// prettier-ignore
export const asyncGetDetailThread = (threadId: string) => async (dispatch: AppDispatch) => {
  const { setDetailThread } = threadSlice.actions;
  let status = true;
  dispatch(showLoading());
  try {
    const thread = await threadApi.getDetailThread( threadId );
    dispatch(setDetailThread(thread));
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Get detail thread failed: ${(error as Error).message}`);
    status = false
  }
  dispatch(hideLoading());
  return status;
}

// prettier-ignore
export const asyncUpVotesComment = ({ threadId, commentId, userId }: VoteCommentRequest) => async (dispatch: AppDispatch) => {
  const { upVoteComment } = threadSlice.actions;
  let status = true;
  dispatch(showLoading());
  try {
    dispatch(upVoteComment({ threadId, commentId, userId }));
    await threadApi.upVoteComment( threadId, commentId );
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Upvote comment failed: ${(error as Error).message}`);
    status = false
  }
  dispatch(hideLoading());
  return status;
}

// prettier-ignore
export const asyncDownVotesComment = ({ threadId, commentId, userId }: VoteCommentRequest) => async (dispatch: AppDispatch) => {
  const { downVoteComment } = threadSlice.actions;
  let status = true;
  dispatch(showLoading());
  try {
    dispatch(downVoteComment({ threadId, commentId, userId }));
    await threadApi.downVoteComment( threadId, commentId );
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Downvote comment failed: ${(error as Error).message}`);
    status = false
  }
  dispatch(hideLoading());
  return status;
}

// prettier-ignore
export const asyncNeutralizeVotesComment = ({ threadId, commentId, userId }: VoteCommentRequest) => async (dispatch: AppDispatch) => {
  const { neutralizeVoteComment } = threadSlice.actions;
  let status = true;
  dispatch(showLoading());
  try {
    dispatch(neutralizeVoteComment({ threadId, commentId, userId }));
    await threadApi.neutralizeVoteComment( threadId, commentId );
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Neutralize comment vote failed: ${(error as Error).message}`);
    status = false
  }
  dispatch(hideLoading());
  return status;
}

export const { setThreads, upVote, downVote, neutralizeVote } =
  threadSlice.actions;

export default threadSlice.reducer;
