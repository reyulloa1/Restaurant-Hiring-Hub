import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminSession } from '../hooks/useAdminSession';

export function AdminRouteGuard({ children }: { children: ReactNode }) {
  const { loading, session } = useAdminSession();
  if (loading) return <div className="p-6 text-sm text-slate-600">Checking admin session...</div>;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
