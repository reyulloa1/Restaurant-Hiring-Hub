import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../lib/supabase';
import { submitApplication } from '../lib/api';
import type { HiringRole, ScreeningQuestion } from '../types';

const schema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
});

type FormData = z.infer<typeof schema>;

export function ApplyPage() {
  const { slug } = useParams();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { data } = useQuery({
    queryKey: ['role', slug],
    queryFn: async () => {
      const roleRes = await supabase.from('roles').select('*').eq('slug', slug).single();
      if (roleRes.error) throw roleRes.error;
      const qRes = await supabase.from('screening_questions').select('*').eq('role_id', roleRes.data.id).order('sort_order');
      if (qRes.error) throw qRes.error;
      return { role: roleRes.data as HiringRole, questions: qRes.data as ScreeningQuestion[] };
    },
    enabled: Boolean(slug),
  });

  const answerKeys = useMemo(() => (data?.questions ?? []).map((q) => q.id), [data]);

  const onSubmit = handleSubmit(async (values) => {
    if (!data?.role || !resumeFile) return;

    const path = `${data.role.id}/${Date.now()}-${resumeFile.name}`;
    const upload = await supabase.storage.from('resumes').upload(path, resumeFile, { upsert: false });
    if (upload.error) throw upload.error;

    const answers = answerKeys.map((id) => {
      const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name=question_${id}]`);
      return { question_id: id, value: el?.value ?? '' };
    });

    await submitApplication({ ...values, role_id: data.role.id, resume_path: path, answers });
    alert('Application submitted!');
  });

  if (!data) return <p>Loading application...</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-semibold">Apply for {data.role.title}</h1>
      <input className="w-full rounded border p-2" placeholder="First name" {...register('first_name')} />
      {errors.first_name && <p className="text-red-600">Required</p>}
      <input className="w-full rounded border p-2" placeholder="Last name" {...register('last_name')} />
      <input className="w-full rounded border p-2" placeholder="Email" {...register('email')} />
      <input className="w-full rounded border p-2" placeholder="Phone" {...register('phone')} />
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />

      {data.questions.map((q) => (
        <div key={q.id} className="space-y-1">
          <label className="text-sm font-medium">{q.prompt}</label>
          {q.response_type === 'long_text' ? (
            <textarea className="w-full rounded border p-2" name={`question_${q.id}`} />
          ) : (
            <input className="w-full rounded border p-2" name={`question_${q.id}`} />
          )}
        </div>
      ))}

      <button disabled={isSubmitting} className="rounded bg-slate-900 px-4 py-2 text-white">Submit application</button>
    </form>
  );
}
