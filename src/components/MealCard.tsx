import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MealPlan, getBudgetStatus } from "@/utils/mealGenerator";
import { NutritionPieChart } from "./NutritionPieChart";
import { UtensilsCrossed, Leaf, Apple, Wheat } from "lucide-react";

interface MealCardProps {
  meal: MealPlan;
  index: number;
}

const statusConfig = {
  success: { label: "Within Budget", className: "bg-accent text-accent-foreground" },
  warning: { label: "Near Limit", className: "bg-secondary/20 text-secondary" },
  danger: { label: "Over Budget", className: "bg-destructive/15 text-destructive" },
};

export function MealCard({ meal, index }: MealCardProps) {
  const status = getBudgetStatus(meal.totalCost);
  const config = statusConfig[status];

  return (
    <Card className="overflow-hidden animate-fade-in border-border/60 hover:shadow-md transition-shadow" style={{ animationDelay: `${index * 80}ms` }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{meal.day}</CardTitle>
          <Badge variant="outline" className={config.className}>
            {config.label}
          </Badge>
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
          <p className="text-xs font-medium text-muted-foreground mb-2">Quarter-Quarter-Half</p>
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
