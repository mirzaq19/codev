import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread } from '@/types/thread';

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
  },
});

export const { setThreads } = threadSlice.actions;

export default threadSlice.reducer;
