type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
};

export function ResumeUpload({ file, onChange }: Props) {
  return (
    <div className="space-y-2">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className="block w-full rounded-xl border border-slate-300 p-3 text-sm"
      />
      <p className="text-xs text-slate-500">Accepted: PDF, DOC, DOCX. Optional.</p>
      {file && <p className="text-sm text-slate-700">Selected: {file.name}</p>}
    </div>
  );
}
