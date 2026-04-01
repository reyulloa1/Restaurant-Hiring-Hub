type Input = Array<{ answer: string; idealAnswer: string | null; weight: number }>;

export function calculateScore(items: Input) {
  if (!items.length) return 0;
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  if (!totalWeight) return 0;

  const weighted = items.reduce((acc, item) => {
    const normalizedAnswer = item.answer.trim().toLowerCase();
    const normalizedIdeal = (item.idealAnswer ?? '').trim().toLowerCase();
    const ratio = normalizedIdeal && normalizedAnswer.includes(normalizedIdeal) ? 1 : normalizedAnswer.length > 20 ? 0.5 : 0.2;
    return acc + ratio * item.weight;
  }, 0);

  return Math.round((weighted / totalWeight) * 100);
}
