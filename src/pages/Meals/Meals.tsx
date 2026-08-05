import { useState } from 'react';
import { SEED_MEALS } from '@/db/seeds';
import { AddMealForm, IngredientItem } from '@/features/meals/components';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const Meals = () => {
  const [meals] = useState(SEED_MEALS);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ScrollArea className="relative h-11/12 rounded-md border p-4 whitespace-nowrap">
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

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" className="bg-primary absolute right-1 bottom-2 h-16 w-16 rounded-full">
            <Plus />
          </Button>
        </DrawerTrigger>
        <AddMealForm closeDrawer={() => setOpen(false)} />
      </Drawer>
    </>
  );
};
