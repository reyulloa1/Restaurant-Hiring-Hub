import { Link } from 'react-router-dom';

export function SuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Application submitted 🎉</h1>
        <p className="mt-3 text-slate-600">Thanks for applying. Our team will review your application and follow up soon.</p>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">Back to openings</Link>
      </div>
    </div>
  );
}
