import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { LandingPage } from './pages/LandingPage';
import { RoleDetailsPage } from './pages/RoleDetailsPage';
import { ApplyPage } from './pages/ApplyPage';
import { SuccessPage } from './pages/SuccessPage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/roles/:roleId', element: <RoleDetailsPage /> },
  { path: '/apply/:roleId', element: <ApplyPage /> },
  { path: '/success', element: <SuccessPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
