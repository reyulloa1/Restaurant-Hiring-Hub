import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { session, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!session) return <Navigate to="/admin/login" replace />;
  return children;
}
