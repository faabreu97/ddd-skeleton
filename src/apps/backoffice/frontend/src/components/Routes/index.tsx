import { Navigate } from 'react-router-dom';
import LocalServices from '../../services/local_services';

type RouteProps = { Component: any };

export function PublicRoute({ Component }: RouteProps) {
  const token = LocalServices.getAccessToken();

  return token ? <Navigate to="/dashboard" replace /> : <Component />;
}

export function PrivateRoute({ Component }: RouteProps) {
  const token = LocalServices.getAccessToken();

  return token ? <Component /> : <Navigate to="/login" replace />;
}
