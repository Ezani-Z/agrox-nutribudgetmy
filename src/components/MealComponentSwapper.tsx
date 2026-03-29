import { useState } from "react";
import { Ingredient, IngredientCategory, categoryLabels } from "@/data/ingredients";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronDown } from "lucide-react";
import { useLang } from "@/hooks/useLang";

interface MealComponentSwapperProps {
  current: Ingredient;
  category: IngredientCategory;
  allIngredients: Ingredient[];
  icon: React.ReactNode;
  onSwap: (newIngredient: Ingredient) => void;
}

export function MealComponentSwapper({
  current,
  category,
  allIngredients,
  icon,
  onSwap,
}: MealComponentSwapperProps) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);

  const options = allIngredients
    .filter(i => i.category === category && i.isAvailable)
    .sort((a, b) => a.pricePerServing - b.pricePerServing);

  const getName = (i: Ingredient) => lang === "en" ? i.name : i.nameMY;
  const catLabel = lang === "en" ? categoryLabels[category].en : categoryLabels[category].my;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-md bg-muted p-2 w-full text-left hover:bg-muted/80 hover:ring-1 hover:ring-primary/30 transition-all group cursor-pointer">
          {icon}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">{catLabel}</p>
            <p className="text-sm font-medium truncate">{getName(current)}</p>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 z-[100]" align="start" side="bottom" sideOffset={4}>
        <div className="p-2 border-b">
          <p className="text-xs font-medium text-muted-foreground">
            {t(`Swap ${catLabel}`, `Tukar ${catLabel}`)}
          </p>
        </div>
        <ScrollArea className="max-h-48">
          <div className="p-1">
            {options.map(item => {
              const isSelected = item.id === current.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-between h-auto py-2 px-2 ${isSelected ? "bg-primary/10" : ""}`}
                  onClick={() => {
                    if (!isSelected) onSwap(item);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{getName(item)}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.proteinG}g protein · {item.calories} kcal
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge variant="outline" className="text-xs px-1.5">
                      RM{item.pricePerServing.toFixed(2)}
                    </Badge>
                    {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
