import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { RoleBasedGuard } from 'src/auth/guard/role-based-guard';
import { useAuth } from 'src/auth/context/auth-context';
import ReferralDashboard from 'src/pages/dashboard/referral';

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);


function ReferralDashboardRoute() {
  const { user } = useAuth();
  return (
    <RoleBasedGuard acceptRoles={['referral']} currentRole={user?.role} hasContent>
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <ReferralDashboard />
        </Suspense>
      </DashboardLayout>
    </RoleBasedGuard>
  );
}

export const dashboardRoutes = [
  {
    path: 'referral',
    element: <ReferralDashboardRoute />,
  },
];
