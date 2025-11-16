import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
  
import { LoadingScreen } from 'src/components/loading-screen';
import { RoleBasedGuard } from 'src/auth/guard/role-based-guard';
import { useAuth } from 'src/auth/context/auth-context';
import { adminNavData } from 'src/routes/dashboard-items/admin';
import { AdminLayout } from 'src/layouts/admin';

const IndexPage = lazy(() => import('src/pages/dashboard/admin/index'));
const Page2 = lazy(() => import('src/pages/dashboard/admin/page'));

// Role-based dashboard wrapper component
function AdminDashboardRoute() {
  const { user } = useAuth();
  return (
    <RoleBasedGuard acceptRoles={['admin']} currentRole={user?.role} hasContent>
      <AdminLayout data={{nav: adminNavData}}>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </AdminLayout>
    </RoleBasedGuard>
  );
}

export const adminRoutes = [
  {
    path: 'admin',
    element: <AdminDashboardRoute />,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'page', element: <Page2 /> },
    ],
  },
];