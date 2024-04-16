import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { useAppDispatch } from '@/app/hooks';
import authApi from '@/services/apis/auth-api';
import {
  login,
  populate,
  logout,
  stopLoading,
} from '@/services/states/auth-slices';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const loginDispatch = async ({
    initialAction = () => {},
    sucessAction = () => {},
    errorAction = (error: Error) => {
      console.log(error?.message);
    },
    finalAction = () => {},
  }) => {
    try {
      dispatch(showLoading());
      if (initialAction) initialAction();

      const token = authApi.getAccessToken();
      if (token === null || token === undefined) {
        throw new Error('No token');
      }
      dispatch(login());

      const response = await authApi.getOwnProfile();
      dispatch(populate(response));

      if (sucessAction) sucessAction();
    } catch (error) {
      if (errorAction) errorAction(error as Error);

      authApi.removeAccessToken();
      dispatch(logout());
    } finally {
      dispatch(stopLoading());
      if (finalAction) finalAction();

      dispatch(hideLoading());
    }
  };

  return { loginDispatch };
};

export default useLogin;
