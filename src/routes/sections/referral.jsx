import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from 'src/components/loading-screen';
import { RoleBasedGuard } from 'src/auth/guard/role-based-guard';
import { useAuth } from 'src/auth/context/auth-context';
import { AuthGuard } from 'src/auth/guard';
import { ReferralLayout } from 'src/layouts/referral';
import { referralNavData } from '../dashboard-items/referral';

const IndexPage = lazy(() => import('src/pages/dashboard/referral/index'));
const Page2 = lazy(() => import('src/pages/dashboard/referral/page'));

// Role-based dashboard wrapper component
function ReferralDashboardRoute() {
  const { user } = useAuth();
  return (
    <AuthGuard>
      <RoleBasedGuard acceptRoles={['referral']} currentRole={user?.role} hasContent>
        <ReferralLayout data={{ nav: referralNavData }}>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </ReferralLayout>
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export const referralRoutes = [
  {
    path: 'referral',
    element: <ReferralDashboardRoute />,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'page', element: <Page2 /> },
    ],
  },
];
