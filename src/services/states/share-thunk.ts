import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setThreads } from './thread-slice';
import { setUsers } from './user-slice';
import threadApi from '@/services/apis/thread-api';
import userApi from '@/services/apis/user-api';
import { AppDispatch } from '@/app/store';

export const asyncPopulateUsersAndThreads =
  () => async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const users = await userApi.getAllUsers();
      const threads = await threadApi.getAllThreads();
      dispatch(setThreads(threads));
      dispatch(setUsers(users));
    } catch (error) {
      console.log((error as Error).message);
    }
    dispatch(hideLoading());
  };
