import type { ReactNode } from 'react';

type Props = {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, required, error, hint, children }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-800">
        {label}
        {required && <span className="ml-1 text-blue-700">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
