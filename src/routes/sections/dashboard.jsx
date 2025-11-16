import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';
import { RoleBasedGuard } from 'src/auth/guard/role-based-guard';
import { useAuth } from 'src/auth/context/auth-context';
import StaffDashboard from 'src/pages/dashboard/staff';
import ReferralDashboard from 'src/pages/dashboard/referral';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);



function StaffDashboardRoute() {
  const { user } = useAuth();
  return (
    <RoleBasedGuard acceptRoles={['staff']} currentRole={user?.role} hasContent>
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <StaffDashboard />
        </Suspense>
      </DashboardLayout>
    </RoleBasedGuard>
  );
}

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
  // Original dashboard routes
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
  
  {
    path: 'staff',
    element: <StaffDashboardRoute />,
  },
  {
    path: 'referral',
    element: <ReferralDashboardRoute />,
  },
];
