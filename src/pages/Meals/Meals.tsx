import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { AddMealForm, MealItem } from '@/features/meals/components';
import { Accordion } from '@/components/ui/accordion';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { db } from '@/db/db';

export const Meals = () => {
  const meals = useLiveQuery(() => db.meals.toArray());
  const [open, setOpen] = useState(false);

  return (
    <>
      <ScrollArea className="relative h-full rounded-md p-2 whitespace-nowrap">
        <div className="pb-20">
          <Accordion type="multiple" className="rounded-lg bg-white">
            {(meals ?? []).map((meal) => (
              <MealItem key={meal.id} meal={meal}/>
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
