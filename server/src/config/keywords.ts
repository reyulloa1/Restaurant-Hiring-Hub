export type KeywordGroups = Record<string, string[]>;

export const roleKeywordGroups: Record<string, KeywordGroups> = {
  'line-cook': {
    communication: ['tell', 'notify', 'communicate', 'inform', 'call out'],
    team: ['chef', 'expo', 'manager', 'team', 'lead'],
    standards: ['refire', 'quality', 'remake', '86', 'temp', 'safe'],
  },
  server: {
    communication: ['apologize', 'explain', 'update', 'communicate', 'listen'],
    team: ['manager', 'host', 'expo', 'runner', 'team'],
    standards: ['guest', 'accuracy', 'quality', 'service', 'follow up'],
  },
  dishwasher: {
    communication: ['tell', 'ask', 'notify', 'manager'],
    team: ['prep', 'line', 'chef', 'team'],
    standards: ['sanitize', 'clean', 'safety', 'slip', 'organized'],
  },
};
