import { EllipsisVertical } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Meal } from '@/db/schema';
import { IngredientItem } from './IngredientItem';

export const MealItem = ({ meal }: { meal: Meal }) => {

  return (
    <AccordionItem value={String(meal.id)} className="border-b border-b-gray-100 px-4 last:border-b-0">
      <div className="flex items-center">
        {/* TODO: wire checkbox to selection state (Set<mealId>) */}
        <Checkbox className="mr-2 hidden md:inline-block" aria-label={`Select ${meal.name}`} />
        <AccordionTrigger className="font-heading flex-1 font-semibold" showChevron={false}>
          <span className="line-clamp-2 whitespace-normal">{meal.name}</span>
        </AccordionTrigger>
        <Button variant="ghost" size="icon" title="More actions">
          <EllipsisVertical />
        </Button>
      </div>
      <AccordionContent>
        {meal.ingredients.map((item) => (
          <IngredientItem key={item.ingredientId} item={item} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
