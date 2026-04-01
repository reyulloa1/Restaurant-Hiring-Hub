export type AdminFilters = {
  search: string;
  role: string;
  status: string;
  experience: string;
  availability: string;
  sort: 'newest' | 'oldest' | 'highest_score' | 'lowest_score';
};

export const defaultFilters: AdminFilters = {
  search: '',
  role: '',
  status: '',
  experience: '',
  availability: '',
  sort: 'highest_score',
};
