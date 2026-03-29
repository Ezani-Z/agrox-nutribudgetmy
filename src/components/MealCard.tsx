import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MealPlan, getBudgetStatus } from "@/utils/mealGenerator";
import { NutritionPieChart } from "./NutritionPieChart";
import { UtensilsCrossed, Leaf, Apple, Wheat, Lock, Unlock, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface MealCardProps {
  meal: MealPlan;
  index: number;
  isLocked?: boolean;
  onToggleLock?: () => void;
}

const statusConfig = {
  success: { label: "Within Budget", className: "bg-accent text-accent-foreground" },
  warning: { label: "Near Limit", className: "bg-secondary/20 text-secondary" },
  danger: { label: "Over Budget", className: "bg-destructive/15 text-destructive" },
};

export function MealCard({ meal, index, isLocked = false, onToggleLock }: MealCardProps) {
  const status = getBudgetStatus(meal.totalCost);
  const config = statusConfig[status];

  return (
    <Card
      className={`overflow-hidden animate-fade-in border-border/60 hover:shadow-md transition-shadow ${isLocked ? "ring-2 ring-primary/40" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{meal.day}</CardTitle>
          <div className="flex items-center gap-2">
            {isLocked && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
                Locked
              </Badge>
            )}
            <Badge variant="outline" className={config.className}>
              {config.label}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onToggleLock}
              title={isLocked ? "Unlock meal" : "Lock meal"}
            >
              {isLocked ? <Lock className="h-4 w-4 text-primary" /> : <Unlock className="h-4 w-4 text-muted-foreground" />}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">RM{meal.totalCost.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">/ student</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Wheat className="h-4 w-4 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Carbohydrate</p>
              <p className="text-sm font-medium">{meal.carb.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <UtensilsCrossed className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-xs text-muted-foreground">Protein</p>
              <p className="text-sm font-medium">{meal.protein.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Leaf className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Vegetable</p>
              <p className="text-sm font-medium">{meal.vegetable.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Apple className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Fruit</p>
              <p className="text-sm font-medium">{meal.fruit.name}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Suku Suku Separuh</p>
          <NutritionPieChart meal={meal} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Nutrition Score</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${meal.nutritionScore}%` }}
              />
            </div>
            <span className="font-semibold text-primary">{meal.nutritionScore}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
