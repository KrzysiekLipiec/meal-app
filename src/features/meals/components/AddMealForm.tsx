import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/db/db';
import type { MealIngredient } from '@/db/schema';
import { findOrCreateIngredient, suggestIngredients } from '@/features/ingredients';
import { normalizeString } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Controller, useFieldArray, useForm, type Resolver } from 'react-hook-form';
import { UNITS, createBlankIngredientRow, mealFormDefaults, mealFormSchema, type MealFormValues } from '../mealFormSchema';
import { XIcon } from 'lucide-react';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { useLiveQuery } from 'dexie-react-hooks';

export const AddMealForm = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const [status, setStatus] = useState('');
  const allIngredients = useLiveQuery(() => db.ingredients.toArray(), []);

  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealFormSchema) as Resolver<MealFormValues>,
    defaultValues: mealFormDefaults,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  // one ref slot per ingredient row, indexed to match `fields`
  const ingredientInputs = useRef<(HTMLInputElement | null)[]>([]);
  const amountInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAddIngredient = () => {
    const newRowIndex = fields.length;
    append(createBlankIngredientRow());
    // focus the new row's ingredient input once it's mounted
    requestAnimationFrame(() => {
      ingredientInputs.current[newRowIndex]?.focus();
    });
  };

  async function onSubmit(data: MealFormValues) {
    try {
      const ingredients: MealIngredient[] = [];
      for (const row of data.ingredients) {
        const ingredientId = await findOrCreateIngredient(row.ingredientName);
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
      <form
        id="add-meal-form"
        className="min-h-0 flex-1 overflow-y-auto p-4"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
      >
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
                    render={({ field: controllerField }) => {
                      const suggestions = suggestIngredients(controllerField.value ?? '', allIngredients ?? []);
                      return (
                        <Combobox
                          items={suggestions.map((suggestion) => suggestion.name)}
                          inputValue={controllerField.value ?? ''}
                          onInputValueChange={controllerField.onChange}
                          value={controllerField.value ?? ''}
                          onValueChange={controllerField.onChange}
                        >
                          <ComboboxInput
                            ref={(el) => {
                              ingredientInputs.current[index] = el;
                            }}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                // Enter confirms the ingredient (Base UI commits the highlighted
                                // item); don't let it submit the meal form before amount/unit
                                // are filled. Move on to the amount field instead.
                                event.preventDefault();
                                // If nothing was highlighted, snap the typed text to the stored
                                // casing of the matching ingredient ("olive oil" -> "Olive oil"),
                                // so the form shows the same name that will be saved.
                                const typed = (controllerField.value ?? '').trim();
                                if (typed) {
                                  const canonical = allIngredients?.find(
                                    (ingredient) => normalizeString(ingredient.name) === normalizeString(typed),
                                  )?.name;
                                  if (canonical && canonical !== typed) {
                                    controllerField.onChange(canonical);
                                  }
                                }
                                amountInputs.current[index]?.focus();
                              }
                            }}
                            showTrigger={false}
                            placeholder="Ingredient"
                            className="min-w-0 flex-1"
                          />
                          <ComboboxContent>
                            <ComboboxEmpty>No match. It'll be added as a new ingredient.</ComboboxEmpty>
                            <ComboboxList>
                              {suggestions.map((suggestion) => (
                                <ComboboxItem key={suggestion.id} value={suggestion.name}>
                                  {suggestion.name}
                                </ComboboxItem>
                              ))}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      );
                    }}
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
                <div className="flex items-center gap-2">
                  <Controller
                    name={`ingredients.${index}.measurement.amount`}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <Input
                        {...controllerField}
                        ref={(el) => {
                          amountInputs.current[index] = el;
                        }}
                        type="text"
                        inputMode="decimal"
                        placeholder="Amount"
                        className="flex-1 text-center"
                        aria-label={`Amount for ingredient ${index + 1}`}
                      />
                    )}
                  />
                  <Controller
                    name={`ingredients.${index}.measurement.unit`}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <Select value={controllerField.value ?? ''} onValueChange={controllerField.onChange}>
                        <SelectTrigger className="flex-1" aria-label={`Unit for ingredient ${index + 1}`}>
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
                </div>
                {rowErrorMessage && <p className="text-destructive text-sm">{rowErrorMessage}</p>}
              </div>
            );
          })}

          {form.formState.errors.ingredients?.message && <p className="text-destructive text-sm">{form.formState.errors.ingredients.message}</p>}

          <Button type="button" variant="outline" size="sm" onClick={handleAddIngredient}>
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
