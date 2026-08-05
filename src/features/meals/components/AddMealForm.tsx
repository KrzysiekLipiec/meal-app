import { db } from '@/db/db';
import type { MealIngredient } from '@/db/schema';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const AddMealForm = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const [name, setName] = useState('tmpName');
  const [ingredients, setIngredients] = useState<MealIngredient[]>([]);
  const [instructions, setInstructions] = useState('');
  const [status, setStatus] = useState('');

  async function addMeal() {
    if (!name.trim()) {
      setStatus('Meal name is required');
      return;
    }
    try {
      const id = await db.meals.add({
        name,
        ingredients,
        instructions,
      });

      setStatus(`Meal ${name} successfully added. Got id ${id}`);
      setName('');
      setIngredients([]);
      setInstructions('');
      closeDrawer();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Failed to add ${name}: ${message}`);
    }
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>New meal</DrawerTitle>
        <DrawerDescription>Add ingredients and instructions</DrawerDescription>
      </DrawerHeader>
      <div className="p-4">
        {/*form goes here*/}
        <p>{status}</p>
      </div>
      <DrawerFooter>
        <Button onClick={() => void addMeal()}>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
