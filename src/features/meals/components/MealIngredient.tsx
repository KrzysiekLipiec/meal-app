import type { MealIngredient } from '@/db/schema';
import { SEED_INGREDIENTS } from '@/db/seeds';

export const IngredientItem = ({ item }: { item: MealIngredient }) => {
  const ingredientData = SEED_INGREDIENTS.find((i) => i.id === item.ingredientId);

  return (
    <div className="flex items-center justify-between">
      <span>{ingredientData?.name ?? 'Unknown Ingredient'}</span>
      <div className="flex items-baseline text-gray-600">
        {!item.isSeasoning && item.measurement && (
          <>
            <span className="text-gray-700">{item.measurement?.amount}</span>
            {item.measurement.unit !== 'quantity' && <span className="ml-1 text-gray-700">{item.measurement?.unit}</span>}
          </>
        )}
      </div>
    </div>
  );
};
