import { Copy, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Meal } from '@/db/schema';
import { db } from '@/db/db';
import { IngredientItem } from './IngredientItem';

export const MealItem = ({ meal }: { meal: Meal }) => {
  return (
    <AccordionItem value={String(meal.id)} className="border-b border-b-gray-100 px-4 last:border-b-0">
      <div className="flex items-center">
        {/* TODO: wire checkbox to selection state (Set<mealId>) */}
        <Checkbox className="mr-2 hidden pointer-fine:inline-block" aria-label={`Select ${meal.name}`} />
        <AccordionTrigger className="font-heading flex-1 font-semibold" showChevron={false}>
          <span className="line-clamp-2 whitespace-normal">{meal.name}</span>
        </AccordionTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" title="More actions">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent collisionPadding={{ right: 12 }} onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuItem className="py-2.5">
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2.5">
              <Copy />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem variant="destructive" className="py-2.5" onSelect={(e) => e.preventDefault()}>
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this meal?</AlertDialogTitle>
                  <AlertDialogDescription>This will permanently delete "{meal.name}" and its ingredients. This can't be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => void db.meals.delete(meal.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AccordionContent>
        {meal.ingredients.map((item) => (
          <IngredientItem key={item.ingredientId} item={item} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
