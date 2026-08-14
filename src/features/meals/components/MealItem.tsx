import { Copy, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { Meal } from '@/db/schema';
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
          <DropdownMenuContent collisionPadding={{ "right": 4 }} onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuItem>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Delete
            </DropdownMenuItem>
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
