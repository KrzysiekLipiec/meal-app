import { Dexie, type EntityTable } from 'dexie';
import type { Meal } from './schema';

const db = new Dexie('MealAppDB') as Dexie & {
  meals: EntityTable<
    Meal,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  meals: '++id, name, ingredients, instructions', // primary key "id" (for the runtime!)
});

export { db };
