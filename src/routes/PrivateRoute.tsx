import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

function PrivateRoute() {
  const authState = useAppSelector((state) => state.auth);
  return authState.authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
