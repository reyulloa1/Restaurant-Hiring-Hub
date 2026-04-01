import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  async function requestMagicLink() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    alert('Check your email for login link.');
    navigate('/admin');
  }

  return (
    <section className="max-w-md space-y-4 rounded-xl border bg-white p-6">
      <h1 className="text-xl font-semibold">Admin sign in</h1>
      <input className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="manager@restaurant.com" />
      <button onClick={requestMagicLink} className="rounded bg-slate-900 px-4 py-2 text-white">Send magic link</button>
    </section>
  );
}
