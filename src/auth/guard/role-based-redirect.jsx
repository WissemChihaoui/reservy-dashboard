import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/auth/context/auth-context';
import { LoadingScreen } from 'src/components/loading-screen';
import { getDashboardPath } from 'src/routes/utils';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export function RoleBasedRedirect() {
  const { status, user } = useAuth();

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status !== 'authenticated' || !user) {
    return <Navigate to={paths.auth.jwt.signIn} replace />;
  }

  const dashboardPath = getDashboardPath(user.role);

  return <Navigate to={dashboardPath} replace />;
}