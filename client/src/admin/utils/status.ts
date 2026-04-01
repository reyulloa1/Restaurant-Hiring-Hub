export const statusOptions = [
  { value: 'new', label: 'Applied' },
  { value: 'interview', label: 'Interview Scheduled' },
  { value: 'hired', label: 'Hired' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'reviewing', label: 'Reviewing' },
] as const;

export function statusLabel(status: string) {
  return statusOptions.find((item) => item.value === status)?.label ?? status;
}
