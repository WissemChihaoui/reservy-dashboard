import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
  
import { LoadingScreen } from 'src/components/loading-screen';
import { RoleBasedGuard } from 'src/auth/guard/role-based-guard';
import { useAuth } from 'src/auth/context/auth-context';
import { ownerNavData } from 'src/routes/dashboard-items/owner';
import { OwnerLayout } from 'src/layouts/owner';

const IndexPage = lazy(() => import('src/pages/dashboard/owner/index'));
const Page2 = lazy(() => import('src/pages/dashboard/owner/page'));

// Role-based dashboard wrapper component
function OwnerDashboardRoute() {
  const { user } = useAuth();
  return (
    <RoleBasedGuard acceptRoles={['owner']} currentRole={user?.role} hasContent>
      <OwnerLayout data={{nav: ownerNavData}}>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </OwnerLayout>
    </RoleBasedGuard>
  );
}

export const ownerRoutes = [
  {
    path: 'owner',
    element: <OwnerDashboardRoute />,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'page', element: <Page2 /> },
    ],
  },
];