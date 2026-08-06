import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { AddMealForm, IngredientItem } from '@/features/meals/components';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { EllipsisVertical, Plus } from 'lucide-react';
import { db } from '@/db/db';

export const Meals = () => {
  const meals = useLiveQuery(() => db.meals.toArray());
  const [open, setOpen] = useState(false);

  return (
    <>
      <ScrollArea className="relative h-full rounded-md p-4 whitespace-nowrap">
        <div className="pb-20">
          <Accordion type="multiple" className="rounded-lg bg-white">
            {(meals ?? []).map((meal) => (
              <AccordionItem key={meal.id} value={String(meal.id)} className="border-b border-b-gray-100 px-4 last:border-b-0">
                <div className="flex items-center">
                  {/*TODO: logic for checkbox*/}
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
            ))}
          </Accordion>
        </div>
      </ScrollArea>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" className="bg-primary absolute right-3 bottom-4 h-16 w-16 rounded-full">
            <Plus />
          </Button>
        </DrawerTrigger>
        <AddMealForm closeDrawer={() => setOpen(false)} />
      </Drawer>
    </>
  );
};
