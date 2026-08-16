import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/db/db';
import type { MealIngredient } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useFieldArray, useForm, type Resolver } from 'react-hook-form';
import { UNITS, mealFormDefaults, mealFormSchema, type MealFormValues } from '../mealFormSchema';
import { XIcon } from 'lucide-react';

export const AddMealForm = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const [status, setStatus] = useState('');

  // TEMPORARY: allIngredients (useLiveQuery) removed with the Select; the combobox (plan step 4) restores it for suggestions.
  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealFormSchema) as Resolver<MealFormValues>,
    defaultValues: mealFormDefaults,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  async function onSubmit(data: MealFormValues) {
    try {
      // TEMPORARY: inline name→id resolution until findOrCreateIngredient lands (plan step 3, features/ingredients).
      const ingredients: MealIngredient[] = [];
      for (const row of data.ingredients) {
        const existing = await db.ingredients.where('name').equalsIgnoreCase(row.ingredientName).first();
        const ingredientId = existing?.id ?? (await db.ingredients.add({ name: row.ingredientName }));
        ingredients.push({ ingredientId, measurement: row.measurement, isOptional: row.isOptional, isSeasoning: row.isSeasoning });
      }
      await db.meals.add({
        name: data.name,
        ingredients,
        instructions: data.instructions,
      });
      closeDrawer();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Failed to add meal: ${message}`);
    }
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>New meal</DrawerTitle>
        <DrawerDescription>Add ingredients and instructions</DrawerDescription>
      </DrawerHeader>
      <form id="add-meal-form" className="p-4" onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <FieldGroup className="gap-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-meal-name">Meal name</FieldLabel>
                <Input {...field} id="form-rhf-meal-name" aria-invalid={fieldState.invalid} placeholder="Carrot soup or something" autoComplete="off" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {fields.map((field, index) => {
            const rowErrors = form.formState.errors.ingredients?.[index];
            const rowErrorMessage = rowErrors?.ingredientName?.message ?? rowErrors?.measurement?.amount?.message ?? rowErrors?.measurement?.unit?.message;
            return (
              <div key={field.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Controller
                    name={`ingredients.${index}.ingredientName`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => (
                      <Input
                        {...controllerField}
                        id={`form-rhf-array-ingredient-${index}`}
                        aria-invalid={fieldState.invalid}
                        placeholder="Ingredient"
                        autoComplete="off"
                        className="min-w-0 flex-1"
                      />
                    )}
                  />
                  <Controller
                    name={`ingredients.${index}.measurement.amount`}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <Input
                        {...controllerField}
                        type="text"
                        inputMode="decimal"
                        placeholder="Amount"
                        className="w-16 shrink-0 text-center"
                        aria-label={`Amount for ingredient ${index + 1}`}
                      />
                    )}
                  />
                  <Controller
                    name={`ingredients.${index}.measurement.unit`}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <Select value={controllerField.value ?? ''} onValueChange={controllerField.onChange}>
                        <SelectTrigger className="w-24 shrink-0" aria-label={`Unit for ingredient ${index + 1}`}>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNITS.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => remove(index)}
                      aria-label={`Remove ingredient ${index + 1}`}
                      className="shrink-0"
                    >
                      <XIcon />
                    </Button>
                  )}
                </div>
                {rowErrorMessage && <p className="text-destructive text-sm">{rowErrorMessage}</p>}
              </div>
            );
          })}

          {form.formState.errors.ingredients?.message && <p className="text-destructive text-sm">{form.formState.errors.ingredients.message}</p>}

          <Button type="button" variant="outline" size="sm" onClick={() => append({ ingredientName: '' })}>
            Add Ingredient
          </Button>

          <Controller
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="form-rhf-meal-instructions">Instructions</FieldLabel>
                <Textarea {...field} id="form-rhf-meal-instructions" rows={3} placeholder="How to make it..." />
              </Field>
            )}
          />

          {status && <p className="text-destructive text-sm">{status}</p>}
        </FieldGroup>
      </form>
      <DrawerFooter>
        <Button type="submit" form="add-meal-form">
          Submit
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
