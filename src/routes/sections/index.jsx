import { Navigate, useRoutes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { ROLE_PATH } from 'src/auth/roles';
import { useAuth } from 'src/auth/context/auth-context';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';
import { adminRoutes } from './admin';
import { ownerRoutes } from './owner';
import { referralRoutes } from './referral';
import { staffRoutes } from './staff';
// ----------------------------------------------------------------------

export function Router() {
  const { user } = useAuth();

  const linkRole = ROLE_PATH[user?.role];

  return useRoutes([
    {
      path: '/',
      element: <Navigate to={linkRole} replace />,
    },

    // Auth
    ...authRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Admin
    ...adminRoutes,

    // Main
    ...mainRoutes,

    // Owner
    ...ownerRoutes,

    // Referral
    ...referralRoutes,

    // Staff
    ...staffRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
