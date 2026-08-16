import { MEAL_TIMES, type ScheduledMeal } from '@/db/schema';

export const sortMeals = (meals: ScheduledMeal[]) => {
  return [...meals].sort((a, b) => {
    return MEAL_TIMES.indexOf(a.timeOfDay) - MEAL_TIMES.indexOf(b.timeOfDay);
  });
};

/**
 * Canonical form for comparison: trim, lowercase, collapse inner whitespace.
 * "  Chicken  BREAST " -> "chicken breast". Used for matching/deduping;
 * the stored display name is NOT replaced by this.
 */
export const normalizeString = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

/** Words of a name, derived from the normalized form: "chicken breast" -> ["chicken", "breast"]. */
export const wordsOfString = (s: string) => normalizeString(s).split(' ');

/**
 * Optimal string alignment (restricted Damerau-Levenshtein): edit distance with
 * insertions, deletions, substitutions, and adjacent transpositions.
 * "chikcen" -> "chicken" is distance 1 (the k/c swap).
 */
export const DL_distance = (a: string, b: string): number => {
  const m = a.length;
  const n = b.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost, // substitution
      );
      // adjacent transposition
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }

  return dp[m][n];
};
