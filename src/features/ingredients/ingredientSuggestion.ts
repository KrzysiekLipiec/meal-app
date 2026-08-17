import type { Ingredient } from '@/db/schema';
import { DL_distance, normalizeString, wordsOfString } from '@/utils/utils';

type SuggestionTier = 'exact' | 'prefix' | 'contains' | 'fuzzy';
interface Suggestion {
  id: number;
  name: string;
  tier: SuggestionTier;
}

export function suggestIngredients(query: string, allIngredients: Ingredient[], limit = 8): Suggestion[] {
  const suggestions: Suggestion[] = [];

  const normalizedQuery = normalizeString(query);
  const queryWords = wordsOfString(query);

  // 0. exact match first, unconditionally: the most important result must not be
  //    lost when the contains tier fills the limit before the exact ingredient
  //    appears in DB order (e.g. plain "egg" after 13 exotic egg variants).
  const exact = allIngredients.find((ingredient) => normalizeString(ingredient.name) === normalizedQuery);
  if (exact) suggestions.push({ id: exact.id, name: exact.name, tier: 'exact' });

  for (const ingredient of allIngredients) {
    if (suggestions.length >= limit) break;

    const normalizedName = normalizeString(ingredient.name);
    const nameWords = wordsOfString(ingredient.name);

    // the exact ingredient is already in the list; don't classify it again
    if (normalizedName === normalizedQuery) continue;

    // 1. startsWith per word: each query word prefixes the matching name word
    //    ("chicken bre" matches "Chicken breast")
    const startsWithPerWord = queryWords.every((word, i) => nameWords[i]?.startsWith(word) ?? false);
    if (startsWithPerWord) {
      suggestions.push({ id: ingredient.id, name: ingredient.name, tier: 'prefix' });
      continue;
    }

    // 2. all words contained, AND semantics, order-insensitive
    //    ("breast chicken" matches "Chicken breast", "chicken" matches "Grilled chicken")
    if (queryWords.every((word) => nameWords.includes(word))) {
      suggestions.push({ id: ingredient.id, name: ingredient.name, tier: 'contains' });
      continue;
    }
  }

  // 3. fuzzy ("did you mean"), only when the word tiers found nothing.
  //    AND semantics per query word: EVERY query word must be within distance
  //    <= 2 of some name word, so "chikcen" matches "Chicken breast" but
  //    "chicken thing" matches nothing ("thing" has no close word). Ranked by
  //    summed closeness so the best "did you mean" candidate comes first.
  if (suggestions.length === 0 && normalizedQuery.length >= 4) {
    const scored: { ingredient: Ingredient; distance: number }[] = [];
    for (const ingredient of allIngredients) {
      const nameWords = wordsOfString(ingredient.name);
      let total = 0;
      let allWithin = true;
      for (const queryWord of queryWords) {
        let best = Infinity;
        for (const nameWord of nameWords) {
          best = Math.min(best, DL_distance(nameWord, queryWord));
        }
        if (best > 2) {
          allWithin = false;
          break;
        }
        total += best;
      }
      if (allWithin) scored.push({ ingredient, distance: total });
    }
    scored.sort((a, b) => a.distance - b.distance);
    for (const { ingredient } of scored.slice(0, limit)) {
      suggestions.push({ id: ingredient.id, name: ingredient.name, tier: 'fuzzy' });
    }
  }

  return suggestions;
}
