import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { cultureFitQuestions, getRoleById } from '../config/roles';
import type { ApplicationFormState, StepId } from '../types/application';
import { initialFormState } from '../types/application';
import { FormField } from '../components/FormField';
import { StepProgress } from '../components/StepProgress';
import { ResumeUpload } from '../components/ResumeUpload';
import { QuestionRenderer } from '../components/QuestionRenderer';
import { apiBaseUrl } from '../config/api';

const TOTAL_STEPS = 5;

export function ApplyPage() {
  const { roleId } = useParams();
  const role = getRoleById(roleId);
  const navigate = useNavigate();

  const [step, setStep] = useState<StepId>(1);
  const [state, setState] = useState<ApplicationFormState>({ ...initialFormState, role: roleId ?? '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const allScreeningQuestions = useMemo(() => role?.screeningQuestions ?? [], [role]);

  if (!role) return <Navigate to="/" replace />;

  const setField = (key: keyof ApplicationFormState, value: string | File | null | Record<string, string>) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = (currentStep: StepId) => {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!state.name.trim()) nextErrors.name = 'Name is required.';
      if (!state.phone.trim()) nextErrors.phone = 'Phone is required.';
      if (!state.email.match(/^\S+@\S+\.\S+$/)) nextErrors.email = 'Enter a valid email.';
    }

    if (currentStep === 3) {
      if (!state.can_work_40_60) nextErrors.can_work_40_60 = 'Please select an option.';
      if (!state.start_date) nextErrors.start_date = 'Start date is required.';
      if (!state.nights_weekends) nextErrors.nights_weekends = 'Please select an option.';
    }

    if (currentStep === 4) {
      for (const q of [...allScreeningQuestions, ...cultureFitQuestions]) {
        const source = q.id.startsWith('culture_') ? state.culture_answers : state.screening_answers;
        if (q.required && !source[q.id]) {
          nextErrors[q.id] = 'This response is required.';
        }
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(TOTAL_STEPS, prev + 1) as StepId);
  };

  const prev = () => setStep((current) => Math.max(1, current - 1) as StepId);

  const submit = async () => {
    if (!validateStep(4)) {
      setStep(4);
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError('');

      const formData = new FormData();
      formData.append('name', state.name);
      formData.append('phone', state.phone);
      formData.append('email', state.email);
      formData.append('role', state.role);
      formData.append('experience_years', state.experience_years || '0');
      formData.append('work_history', `Most recent employer: ${state.most_recent_employer}\n${state.work_history}`.trim());
      formData.append('can_work_40_60', state.can_work_40_60);
      formData.append('start_date', state.start_date);
      formData.append('nights_weekends', state.nights_weekends);
      formData.append('interview_time_1', state.interview_time_1);
      formData.append('interview_time_2', state.interview_time_2);
      formData.append('interview_time_3', state.interview_time_3);
      formData.append('screening_answers', JSON.stringify(state.screening_answers));
      formData.append('culture_answers', JSON.stringify(state.culture_answers));
      if (state.resumeFile) formData.append('resume', state.resumeFile);

      const response = await fetch(`${apiBaseUrl}/api/applicants`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Could not submit application. Please try again.');
      navigate('/success');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unexpected error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-slate-900">Apply for {role.title}</h1>
        <p className="mt-1 text-sm text-slate-600">Simple 5-step application. Mobile friendly and quick.</p>

        <StepProgress step={step} total={TOTAL_STEPS} />

        {step === 1 && (
          <div className="space-y-4">
            <FormField label="Full name" required error={errors.name}>
              <input className="field" value={state.name} onChange={(e) => setField('name', e.target.value)} />
            </FormField>
            <FormField label="Phone number" required error={errors.phone}>
              <input className="field" value={state.phone} onChange={(e) => setField('phone', e.target.value)} />
            </FormField>
            <FormField label="Email" required error={errors.email}>
              <input className="field" value={state.email} onChange={(e) => setField('email', e.target.value)} />
            </FormField>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <FormField label="Years of experience">
              <input className="field" type="number" min={0} value={state.experience_years} onChange={(e) => setField('experience_years', e.target.value)} />
            </FormField>
            <FormField label="Most recent employer">
              <input className="field" value={state.most_recent_employer} onChange={(e) => setField('most_recent_employer', e.target.value)} />
            </FormField>
            <FormField label="Short work history">
              <textarea className="field" rows={4} value={state.work_history} onChange={(e) => setField('work_history', e.target.value)} />
            </FormField>
            <FormField label="Resume upload (optional)">
              <ResumeUpload file={state.resumeFile} onChange={(file) => setField('resumeFile', file)} />
            </FormField>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <FormField label="Can you work 40–60 hours per week?" required error={errors.can_work_40_60}>
              <select className="field" value={state.can_work_40_60} onChange={(e) => setField('can_work_40_60', e.target.value)}>
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </FormField>
            <FormField label="How soon can you start?" required error={errors.start_date}>
              <input className="field" value={state.start_date} onChange={(e) => setField('start_date', e.target.value)} placeholder="e.g. Immediately" />
            </FormField>
            <FormField label="Available nights/weekends?" required error={errors.nights_weekends}>
              <select className="field" value={state.nights_weekends} onChange={(e) => setField('nights_weekends', e.target.value)}>
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </FormField>
            <FormField label="Preferred interview window #1">
              <input className="field" value={state.interview_time_1} onChange={(e) => setField('interview_time_1', e.target.value)} />
            </FormField>
            <FormField label="Preferred interview window #2">
              <input className="field" value={state.interview_time_2} onChange={(e) => setField('interview_time_2', e.target.value)} />
            </FormField>
            <FormField label="Preferred interview window #3">
              <input className="field" value={state.interview_time_3} onChange={(e) => setField('interview_time_3', e.target.value)} />
            </FormField>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Role screening</h2>
              <QuestionRenderer
                questions={allScreeningQuestions}
                values={state.screening_answers}
                onChange={(id, value) => setField('screening_answers', { ...state.screening_answers, [id]: value })}
                errors={errors}
              />
            </section>
            <section>
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Culture fit</h2>
              <QuestionRenderer
                questions={cultureFitQuestions}
                values={state.culture_answers}
                onChange={(id, value) => setField('culture_answers', { ...state.culture_answers, [id]: value })}
                errors={errors}
              />
            </section>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm">
            <SummaryRow label="Role" value={role.title} />
            <SummaryRow label="Name" value={state.name} />
            <SummaryRow label="Phone" value={state.phone} />
            <SummaryRow label="Email" value={state.email} />
            <SummaryRow label="Experience (years)" value={state.experience_years || '0'} />
            <SummaryRow label="Can work 40–60" value={state.can_work_40_60 === 'true' ? 'Yes' : 'No'} />
            <SummaryRow label="Start date" value={state.start_date} />
            <SummaryRow label="Nights/weekends" value={state.nights_weekends === 'true' ? 'Yes' : 'No'} />
            <SummaryRow label="Resume" value={state.resumeFile?.name ?? 'Not provided'} />
            {submitError && <p className="pt-2 text-red-600">{submitError}</p>}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button onClick={prev} disabled={step === 1 || submitting} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium disabled:opacity-50">
            Previous
          </button>
          {step < 5 ? (
            <button onClick={next} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">Next</button>
          ) : (
            <button onClick={submit} disabled={submitting} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Submit application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-slate-200 pb-2">
      <span className="font-medium text-slate-700">{label}</span>
      <span className="text-right text-slate-900">{value || '—'}</span>
    </div>
  );
}
