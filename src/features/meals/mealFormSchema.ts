import { z } from 'zod';

/**
 * Units users can pick in the measurement row of the meal form.
 * Mirrors UnitType in @/db/schema (kept here so z.enum has a runtime source).
 */
export const UNITS = ['g', 'ml', 'quantity', 'to-taste', 'pinch', 'dash', 'slice'] as const;

/**
 * Validation for the AddMealForm (and future Edit form).
 *
 * Lives at the form boundary on purpose: the domain types in @/db/schema are the
 * database contract, this schema is the user-input contract. The shapes differ
 * (coerced amounts, draft ingredient rows), so they stay separate.
 *
 * The inferred MealFormValues is structurally assignable to the Meal shape
 * (minus id), so on submit you can pass it straight to db.meals.add().
 */
export const mealFormSchema = z.object({
  name: z.string().trim().min(1, 'Meal name is required'),

  ingredients: z
    .array(
      z.object({
        // Radix Select hands us strings, so coerce ids and amounts from inputs.
        ingredientId: z.coerce.number().int().positive('Select an ingredient'),

        measurement: z
          .object({
            amount: z.coerce.number().positive('Amount must be a positive number'),
            unit: z.enum(UNITS),
          })
          .optional(),

        isOptional: z.boolean().optional(),
        isSeasoning: z.boolean().optional(),
      }),
    )
    .min(1, 'Add at least one ingredient'),

  instructions: z
    .string()
    .trim()
    .optional()
    .transform((v) => v ?? undefined),
});

export type MealFormValues = z.infer<typeof mealFormSchema>;

export const mealFormDefaults: MealFormValues = {
  name: '',
  ingredients: [],
  instructions: '',
};
