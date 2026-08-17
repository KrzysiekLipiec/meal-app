import { db } from '@/db/db';

/**
 * Resolve a typed ingredient name to an existing pantry id, or create the
 * ingredient and return its fresh id. Dedupes case-insensitively and by
 * collapsed whitespace, so " Chicken  breast " matches "Chicken breast".
 */
export async function findOrCreateIngredient(name: string): Promise<number> {
  const storedName = name.trim().replace(/\s+/g, ' ');
  const existing = await db.ingredients.where('name').equalsIgnoreCase(storedName).first();
  if (existing) return existing.id;
  return db.ingredients.add({ name: storedName });
}
