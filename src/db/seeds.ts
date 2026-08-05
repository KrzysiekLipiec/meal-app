import type { Ingredient, Meal } from './schema';

export const SEED_INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Eggs size M', defaultMeasurement: { amount: 1, unit: 'quantity' } },
  { id: 2, name: 'Chicken ham', defaultMeasurement: { amount: 100, unit: 'g' } },
  { id: 3, name: 'Olive oil', defaultMeasurement: { amount: 5, unit: 'ml' } },
  { id: 4, name: 'Toast bread', defaultMeasurement: { amount: 1, unit: 'slice' } },
  { id: 5, name: 'Chicken breast', defaultMeasurement: { amount: 100, unit: 'g' } },
  { id: 6, name: 'Rice', defaultMeasurement: { amount: 100, unit: 'g' } },
  { id: 7, name: 'Mixed vegetables', defaultMeasurement: { amount: 100, unit: 'g' } },
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
