import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from 'src/components/loading-screen';
import { RoleBasedGuard } from 'src/auth/guard/role-based-guard';
import { useAuth } from 'src/auth/context/auth-context';
import { adminNavData } from 'src/routes/dashboard-items/admin';
import { AdminLayout } from 'src/layouts/admin';
import { AuthGuard } from 'src/auth/guard';

const IndexPage = lazy(() => import('src/pages/dashboard/admin/index'));
const Page2 = lazy(() => import('src/pages/dashboard/admin/page'));

const Etablissements = lazy(() => import('src/pages/dashboard/admin/etablissements'));
const Categries = lazy(() => import('src/pages/dashboard/admin/categories/index'));

// Role-based dashboard wrapper component
function AdminDashboardRoute() {
  const { user } = useAuth();
  return (
    <AuthGuard>
      <RoleBasedGuard acceptRoles={['admin']} currentRole={user?.role} hasContent>
        <AdminLayout data={{ nav: adminNavData }}>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </AdminLayout>
      </RoleBasedGuard>
    </AuthGuard>
  );
}

export const adminRoutes = [
  {
    path: 'admin',
    element: <AdminDashboardRoute />,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'page', element: <Page2 /> },
      { path: 'etablissements', children: [{ element: <Etablissements />, index: true }] },
      { path: 'categories', children: [{ element: <Categries />, index: true }] },
    ],
  },
];
