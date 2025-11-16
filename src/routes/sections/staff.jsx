import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from 'src/components/loading-screen';
import { RoleBasedGuard } from 'src/auth/guard/role-based-guard';
import { useAuth } from 'src/auth/context/auth-context';
import { staffNavData } from 'src/routes/dashboard-items/staff';
import { AuthGuard } from 'src/auth/guard';
import { StaffLayout } from 'src/layouts/staff';

const IndexPage = lazy(() => import('src/pages/dashboard/staff/index'));
const Page2 = lazy(() => import('src/pages/dashboard/staff/page'));

// Role-based dashboard wrapper component
function StaffDashboardRoute() {
  const { user } = useAuth();
  return (
    <AuthGuard>
      <RoleBasedGuard acceptRoles={['staff']} currentRole={user?.role} hasContent>
        <StaffLayout data={{ nav: staffNavData }}>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </StaffLayout>
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export const staffRoutes = [
  {
    path: 'staff',
    element: <StaffDashboardRoute />,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'page', element: <Page2 /> },
    ],
  },
];
