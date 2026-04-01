export function StepProgress({ step, total }: { step: number; total: number }) {
  const width = `${(step / total) * 100}%`;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
        <span>Step {step} of {total}</span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width }} />
      </div>
    </div>
  );
}
