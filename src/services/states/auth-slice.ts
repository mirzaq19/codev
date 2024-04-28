import { showLoading, hideLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import { createSlice } from '@reduxjs/toolkit';
import authApi from '@/services/apis/auth-api';
import { LoginRequest, RegisterRequest, User } from '@/types/auth';
import { AppDispatch } from '@/app/store';

export interface AuthState {
  loading: boolean;
  user: User | null;
  authenticated: boolean;
}

const initialState: AuthState = {
  loading: true,
  user: null,
  authenticated: !!authApi.getAccessToken(),
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
      state.loading = true;
    },
  },
});

// prettier-ignore
export const asyncRegisterUser = ({ name, email, password }: RegisterRequest) => async (dispatch: AppDispatch) => {
    let status = true;
    const toastId = toast.loading('Registering...');
    dispatch(showLoading());
    try {
      await authApi.register({ name, email, password });
      toast.success('Registration successful', { id: toastId });
    } catch (error) {
      console.log((error as Error).message);
      toast.error(`Registration failed: ${(error as Error).message}`, { id: toastId});
      status = false
    }
    dispatch(hideLoading());
    return status;
  };

// prettier-ignore
export const asyncLoginUser = ({ email, password }: LoginRequest) => async (dispatch: AppDispatch) => {
  const { login, populate, stopLoading } = authSlice.actions;
  let status = true;
  const toastId = toast.loading('Loggin in...');
  dispatch(showLoading());
  try {
    const token = await authApi.login({ email, password });
    authApi.putAccessToken(token);
    dispatch(login());
    const user = await authApi.getOwnProfile();
    dispatch(populate(user));
    dispatch(stopLoading());
    toast.success('Login successful', { id: toastId });
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Login failed: ${(error as Error).message}`, { id: toastId});
    status = false
  }
  dispatch(hideLoading());
  return status;
};

export const asyncLogoutUser = () => async (dispatch: AppDispatch) => {
  const { logout } = authSlice.actions;
  dispatch(showLoading());
  try {
    authApi.removeAccessToken();
    dispatch(logout());
    toast.success('Logout successful');
  } catch (error) {
    console.log((error as Error).message);
    toast.error(`Logout failed: ${(error as Error).message}`);
  }
  dispatch(hideLoading());
};

export const { login, populate, logout, stopLoading } = authSlice.actions;

export default authSlice.reducer;
