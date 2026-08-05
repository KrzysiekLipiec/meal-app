import { Dexie, type EntityTable } from 'dexie';
import type { Ingredient, Meal } from './schema';
import { SEED_INGREDIENTS, SEED_MEALS } from './seeds';

const db = new Dexie('MealAppDB') as Dexie & {
  ingredients: EntityTable<
    Ingredient,
    'id' // primary key "id" (for the typings only)
  >;
  meals: EntityTable<
    Meal,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  ingredients: '++id, name', // primary key "id" (for the runtime!)
  meals: '++id, name', // primary key "id" (for the runtime!)
});

db.on('populate', async () => {
  await db.ingredients.bulkAdd(SEED_INGREDIENTS);
  await db.meals.bulkAdd(SEED_MEALS);
});

export { db };
