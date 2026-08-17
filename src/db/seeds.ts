import type { Ingredient, Meal } from './schema';

export const SEED_INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Eggs size M', defaultUnit: 'quantity' },
  { id: 2, name: 'Chicken ham', defaultUnit: 'g' },
  { id: 3, name: 'Olive oil', defaultUnit: 'ml' },
  { id: 4, name: 'Toast bread', defaultUnit: 'slice' },
  { id: 5, name: 'Chicken breast', defaultUnit: 'g' },
  { id: 6, name: 'Rice', defaultUnit: 'g' },
  { id: 7, name: 'Mixed vegetables', defaultUnit: 'g' },
  { id: 8, name: 'Salt' },
];

export const SEED_MEALS: Meal[] = [
  {
    id: 1,
    name: 'Eggs with chicken ham',
    ingredients: [
      { ingredientId: 1, measurement: { amount: 4, unit: 'quantity' } },
      { ingredientId: 2, measurement: { amount: 50, unit: 'g' } },
      { ingredientId: 3, measurement: { amount: 10, unit: 'ml' } },
      { ingredientId: 4, measurement: { amount: 4, unit: 'slice' } },
      { ingredientId: 8, isSeasoning: true },
    ],
  },
  {
    id: 2,
    name: 'Chicken breast with rice and vegetables',
    ingredients: [
      { ingredientId: 5, measurement: { amount: 300, unit: 'g' } },
      { ingredientId: 6, measurement: { amount: 100, unit: 'g' } },
      { ingredientId: 7, measurement: { amount: 200, unit: 'g' } },
      { ingredientId: 3, measurement: { amount: 5, unit: 'ml' } },
    ],
  },
];
