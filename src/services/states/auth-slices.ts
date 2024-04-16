import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { createSlice } from '@reduxjs/toolkit';
import authApi from '@/services/apis/auth-api';
import { RegisterRequest } from '@/types/auth';
import { AppDispatch } from '@/app/store';

export interface AuthState {
  loading: boolean;
  user: any;
  authenticated: boolean;
}

const initialState: AuthState = {
  loading: true,
  user: null,
  authenticated: !!authApi.getAccessToken(),
};

// prettier-ignore
export const asyncRegisterUser = ({ name, email, password }: RegisterRequest) => async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      await authApi.register({ name, email, password });
    } catch (error) {
      console.log((error as Error).message);
    }
    dispatch(hideLoading());
  };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
      state.authenticated = true;
    },
    populate: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { login, populate, logout, stopLoading } = authSlice.actions;

export default authSlice.reducer;
