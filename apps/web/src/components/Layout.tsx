import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold">Restaurant Hiring Hub</Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/">Open Roles</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
