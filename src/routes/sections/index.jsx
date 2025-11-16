import { Navigate, useRoutes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';
import { adminRoutes } from './admin';
import { ownerRoutes } from './owner';
// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={CONFIG.auth.redirectPath} replace />,
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

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
