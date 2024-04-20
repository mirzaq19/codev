import { useEffect } from 'react';
import toast from 'react-hot-toast';
import withRouter, { RouterProps } from '@/routes/withRouter';
import { asyncLogoutUser } from '@/services/states/auth-slice';
import authApi from '@/services/apis/auth-api';
import { useAppDispatch } from '@/app/hooks';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

type AuthVerifyProps = {
  children: React.ReactNode;
  router: RouterProps;
};

function AuthVerify({ router, children }: AuthVerifyProps) {
  const { location } = router;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = authApi.getAccessToken();
    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(asyncLogoutUser());
        authApi.removeAccessToken();
        toast.error('Your session has expired, please login again.');
      }
    }
  }, [location]);

  return <div>{children}</div>;
}

export default withRouter(AuthVerify);
