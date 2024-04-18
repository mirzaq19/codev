import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '@/app/store';
import { Leaderboard } from '@/types/leaderboard';
import leaderboardApi from '@/services/apis/leaderboard-api';

export interface LeaderboardState {
  leaderboards: Leaderboard[];
}

const initialState: LeaderboardState = {
  leaderboards: [],
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboards: (state, action: PayloadAction<Leaderboard[]>) => {
      state.leaderboards = action.payload;
    },
  },
});

// prettier-ignore
export const asyncGetLeaderboards = () => async (dispatch: AppDispatch) => {
    const { setLeaderboards } = leaderboardSlice.actions;
    let status = true;
    dispatch(showLoading());
    try {
        const leaderboards = await leaderboardApi.getLeaderboard()
      dispatch(setLeaderboards(leaderboards));
    } catch (error) {
      console.log((error as Error).message);
      toast.error(`Failed to get leaderboards: ${(error as Error).message}`);
      status = false
    }
    dispatch(hideLoading());
    return status;
  }
export const { setLeaderboards } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
