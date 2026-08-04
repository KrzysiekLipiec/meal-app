export type UnitType = 'g' | 'ml' | 'quantity' | 'to-taste' | 'pinch' | 'dash' | 'slice';

export interface Measurement {
  amount: number;
  unit: UnitType;
  displayValue?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  defaultMeasurement?: Measurement;
}

export interface MealIngredient {
  ingredientId: string;
  measurement?: Measurement;
  isOptional?: boolean;
  isSeasoning?: boolean;
}

export interface Meal {
  id: string;
  name: string;
  ingredients: MealIngredient[];
  instructions?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const MEAL_TIMES = ['Early Morning', 'Breakfast', 'Mid-Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner', 'Late Night Snack'] as const;

export type TimeOfDay = (typeof MEAL_TIMES)[number];

export interface ScheduledMeal {
  id: string;
  dayOfTheWeek: DayOfWeek;
  meal: Meal;
  timeOfDay: TimeOfDay;
}

export interface Diet {
  id: string;
  name: string;
  scheduledMeals: ScheduledMeal[];
}
