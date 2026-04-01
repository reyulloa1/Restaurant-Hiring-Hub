import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { LandingPage } from './pages/LandingPage';
import { RoleDetailsPage } from './pages/RoleDetailsPage';
import { ApplyPage } from './pages/ApplyPage';
import { SuccessPage } from './pages/SuccessPage';
import { AdminRouteGuard } from './admin/components/AdminRouteGuard';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';
import { AdminDashboardPage } from './admin/pages/AdminDashboardPage';
import { AdminApplicantDetailPage } from './admin/pages/AdminApplicantDetailPage';
import { AdminSettingsPage } from './admin/pages/AdminSettingsPage';

function AdminLayout() {
  return (
    <AdminRouteGuard>
      <Outlet />
    </AdminRouteGuard>
  );
}

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/roles/:roleId', element: <RoleDetailsPage /> },
  { path: '/apply/:roleId', element: <ApplyPage /> },
  { path: '/success', element: <SuccessPage /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'applicants/:id', element: <AdminApplicantDetailPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
