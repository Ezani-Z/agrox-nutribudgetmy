import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MealPlan, getBudgetStatus } from "@/utils/mealGenerator";
import { NutritionPieChart } from "./NutritionPieChart";
import { UtensilsCrossed, Leaf, Apple, Wheat, Lock, Unlock, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useLang } from "@/hooks/useLang";

interface MealCardProps {
  meal: MealPlan;
  index: number;
  isLocked?: boolean;
  onToggleLock?: () => void;
}

const statusConfig = {
  success: { en: "Within Budget", my: "Dalam Bajet", className: "bg-accent text-accent-foreground" },
  warning: { en: "Near Limit", my: "Hampir Had", className: "bg-secondary/20 text-secondary" },
  danger: { en: "Over Budget", my: "Melebihi Bajet", className: "bg-destructive/15 text-destructive" },
};

export function MealCard({ meal, index, isLocked = false, onToggleLock }: MealCardProps) {
  const { lang, t } = useLang();
  const status = getBudgetStatus(meal.totalCost);
  const config = statusConfig[status];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: meal.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    animationDelay: `${index * 80}ms`,
  };

  const dayLabel = lang === "en" ? meal.day : (meal.dayMY || meal.day);
  const getName = (ing: { name: string; nameMY: string }) => lang === "en" ? ing.name : ing.nameMY;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden animate-fade-in border-border/60 hover:shadow-md transition-all duration-200 ${isLocked ? "ring-2 ring-primary/40" : ""} ${isDragging ? "opacity-30 scale-95 border-dashed border-2 border-primary/50 shadow-none" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <CardTitle className="text-lg">{dayLabel}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {isLocked && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
                {t("Locked", "Dikunci")}
              </Badge>
            )}
            <Badge variant="outline" className={config.className}>
              {lang === "en" ? config.en : config.my}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onToggleLock}
              title={t("Lock/Unlock meal", "Kunci/Buka kunci hidangan")}
            >
              {isLocked ? <Lock className="h-4 w-4 text-primary" /> : <Unlock className="h-4 w-4 text-muted-foreground" />}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">RM{meal.totalCost.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">/ {t("student", "pelajar")}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Wheat className="h-4 w-4 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">{t("Carb", "Karbohidrat")}</p>
              <p className="text-sm font-medium">{getName(meal.carb)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <UtensilsCrossed className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-xs text-muted-foreground">{t("Protein", "Protein")}</p>
              <p className="text-sm font-medium">{getName(meal.protein)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Leaf className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{t("Vegetable", "Sayuran")}</p>
              <p className="text-sm font-medium">{getName(meal.vegetable)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted p-2">
            <Apple className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{t("Fruit", "Buah")}</p>
              <p className="text-sm font-medium">{getName(meal.fruit)}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Suku Suku Separuh</p>
          <NutritionPieChart meal={meal} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("Nutrition Score", "Skor Pemakanan")}</span>
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

export function MealCardOverlay({ meal }: { meal: MealPlan }) {
  const { lang } = useLang();
  const status = getBudgetStatus(meal.totalCost);
  const config = statusConfig[status];
  const dayLabel = lang === "en" ? meal.day : (meal.dayMY || meal.day);
  const getName = (ing: { name: string; nameMY: string }) => lang === "en" ? ing.name : ing.nameMY;

  return (
    <Card className="overflow-hidden border-primary/50 shadow-2xl ring-2 ring-primary/30 rotate-2 scale-105 w-full max-w-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{dayLabel}</CardTitle>
          <Badge variant="outline" className={config.className}>
            {lang === "en" ? config.en : config.my}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">RM{meal.totalCost.toFixed(2)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">🌾 {getName(meal.carb)}</span>
          <span className="text-muted-foreground">🍗 {getName(meal.protein)}</span>
          <span className="text-muted-foreground">🥬 {getName(meal.vegetable)}</span>
          <span className="text-muted-foreground">🍎 {getName(meal.fruit)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
