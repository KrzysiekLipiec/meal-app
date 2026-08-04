import { MEAL_TIMES, type ScheduledMeal } from '@/db/schema';

export const sortMeals = (meals: ScheduledMeal[]) => {
  return [...meals].sort((a, b) => {
    return MEAL_TIMES.indexOf(a.timeOfDay) - MEAL_TIMES.indexOf(b.timeOfDay);
  });
};
