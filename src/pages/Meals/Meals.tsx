import { useState } from 'react';
import { SEED_MEALS } from '@/db/seeds';
import { IngredientItem } from '@/features/meals/components';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Meals = () => {
  const [meals] = useState(SEED_MEALS);

  return (
    <ScrollArea className="h-11/12 rounded-md border p-4 whitespace-nowrap">
      <Accordion type="multiple">
        {meals.map((meal) => (
          <AccordionItem key={meal.id} value={meal.name}>
            <AccordionTrigger>{meal.name}</AccordionTrigger>
            <AccordionContent>
              {meal.ingredients.map((item) => (
                <IngredientItem key={item.ingredientId} item={item} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};
