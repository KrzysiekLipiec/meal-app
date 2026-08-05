import { db } from '@/db/db';
import type { MealIngredient } from '@/db/schema';
import { useState } from 'react';

export const AddMealForm = () => {
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
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      <button className="border hover:bg-red-600" onClick={() => void addMeal()}>
        CLICK
      </button>
    </>
  );
};
