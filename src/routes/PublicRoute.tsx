import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

type PublicRouteProps = {
  restricted: boolean;
};

function PublicRoute({ restricted }: PublicRouteProps) {
  const authState = useAppSelector((state) => state.auth);
  return restricted && authState.authenticated ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
}

export default PublicRoute;
