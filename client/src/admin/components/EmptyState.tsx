export function EmptyState({ message }: { message: string }) {
  return <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">{message}</div>;
}
