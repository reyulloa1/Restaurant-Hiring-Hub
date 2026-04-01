import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setMessage('');
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) throw error;
      setMessage('Magic link sent. Check your email to continue.');
    } catch {
      setMessage('Unable to send login link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to review applicants.</p>
        <input className="field mt-4" placeholder="admin@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleLogin} disabled={loading || !email} className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white disabled:opacity-50">
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
        {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
        <button onClick={() => navigate('/')} className="mt-2 text-sm text-blue-600 underline">Back to public site</button>
      </div>
    </div>
  );
}
