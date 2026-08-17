export type UnitType = 'g' | 'ml' | 'quantity' | 'to-taste' | 'pinch' | 'dash' | 'slice';

export interface Measurement {
  amount: number;
  unit: UnitType;
  displayValue?: string;
}

export interface Ingredient {
  id: number;
  name: string;
  // unit is stable per ingredient (eggs -> quantity, flour -> g); amount is
  // per-use and lives on the meal-ingredient link, never here.
  defaultUnit?: UnitType;
}

export interface MealIngredient {
  ingredientId: number;
  measurement?: Measurement;
  isOptional?: boolean;
  isSeasoning?: boolean;
}

export interface Meal {
  id: number;
  name: string;
  ingredients: MealIngredient[];
  instructions?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const MEAL_TIMES = ['Early Morning', 'Breakfast', 'Mid-Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner', 'Late Night Snack'] as const;

export type TimeOfDay = (typeof MEAL_TIMES)[number];

export interface ScheduledMeal {
  id: number;
  dayOfTheWeek: DayOfWeek;
  meal: Meal;
  timeOfDay: TimeOfDay;
}

export interface Diet {
  id: number;
  name: string;
  scheduledMeals: ScheduledMeal[];
}
