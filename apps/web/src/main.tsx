import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/index.css';
import { Layout } from './components/Layout';
import { PublicRolesPage } from './pages/PublicRolesPage';
import { ApplyPage } from './pages/ApplyPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PublicRolesPage /> },
      { path: 'roles/:slug/apply', element: <ApplyPage /> },
      { path: 'admin/login', element: <AdminLoginPage /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
