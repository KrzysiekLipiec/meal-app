import type { Ingredient, Meal } from './schema';

export const SEED_INGREDIENTS: Ingredient[] = [
  { id: 'ing-eggs', name: 'Eggs size M', defaultMeasurement: { amount: 1, unit: 'quantity' } },
  { id: 'ing-chicken-ham', name: 'Chicken ham', defaultMeasurement: { amount: 100, unit: 'g' } },
  { id: 'ing-olive-oil', name: 'Olive oil', defaultMeasurement: { amount: 5, unit: 'ml' } },
  { id: 'ing-toast', name: 'Toast bread', defaultMeasurement: { amount: 1, unit: 'slice' } },
  { id: 'ing-chicken', name: 'Chicken breast', defaultMeasurement: { amount: 100, unit: 'g' } },
  { id: 'ing-rice', name: 'Rice', defaultMeasurement: { amount: 100, unit: 'g' } },
  { id: 'ing-vegetables', name: 'Mixed vegetables', defaultMeasurement: { amount: 100, unit: 'g' } },
  { id: 'ing-salt', name: 'Salt' },
];

export const SEED_MEALS: Meal[] = [
  {
    id: 'meal-eggs-chicken-ham',
    name: 'Eggs with chicken ham',
    ingredients: [
      { ingredientId: 'ing-eggs', measurement: { amount: 4, unit: 'quantity' } },
      { ingredientId: 'ing-chicken-ham', measurement: { amount: 50, unit: 'g' } },
      { ingredientId: 'ing-olive-oil', measurement: { amount: 10, unit: 'ml' } },
      { ingredientId: 'ing-toast', measurement: { amount: 4, unit: 'slice' } },
      { ingredientId: 'ing-salt', isSeasoning: true },
    ],
  },
  {
    id: 'meal-chicken-breast',
    name: 'Chicken breast with rice and vegetables',
    ingredients: [
      { ingredientId: 'ing-chicken', measurement: { amount: 300, unit: 'g' } },
      { ingredientId: 'ing-rice', measurement: { amount: 100, unit: 'g' } },
      { ingredientId: 'ing-vegetables', measurement: { amount: 200, unit: 'g' } },
      { ingredientId: 'ing-olive-oil', measurement: { amount: 5, unit: 'ml' } },
    ],
  },
];
