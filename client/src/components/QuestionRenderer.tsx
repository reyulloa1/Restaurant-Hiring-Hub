import type { RoleQuestion } from '@rh/shared';
import { FormField } from './FormField';

type Props = {
  questions: RoleQuestion[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  errors: Record<string, string>;
};

export function QuestionRenderer({ questions, values, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <FormField
          key={question.id}
          label={question.label}
          required={question.required}
          hint={question.type === 'textarea' ? 'Keep it short — 2–4 sentences is perfect.' : undefined}
          error={errors[question.id]}
        >
          {question.type === 'single_select' ? (
            <select
              className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              value={values[question.id] ?? ''}
              onChange={(e) => onChange(question.id, e.target.value)}
            >
              <option value="">Select an option</option>
              {question.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <textarea
              className="w-full rounded-xl border border-slate-300 p-3 text-sm"
              rows={4}
              value={values[question.id] ?? ''}
              onChange={(e) => onChange(question.id, e.target.value)}
            />
          )}
        </FormField>
      ))}
    </div>
  );
}
