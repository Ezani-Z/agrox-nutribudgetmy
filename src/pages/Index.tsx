import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MealCard } from "@/components/MealCard";
import { BudgetSummary } from "@/components/BudgetSummary";
import { IngredientManager } from "@/components/IngredientManager";
import { defaultIngredients, Ingredient } from "@/data/ingredients";
import { generateWeeklyMealPlan, MealPlan } from "@/utils/mealGenerator";
import { Sparkles, UtensilsCrossed, Database, BarChart3, Download } from "lucide-react";
import { exportMealPlanPdf } from "@/utils/exportPdf";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    localStorage.removeItem("nutribudget-ingredients");
    return defaultIngredients;
  });
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [lockedMealIds, setLockedMealIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdateIngredients = useCallback((updated: Ingredient[]) => {
    setIngredients(updated);
    localStorage.setItem("nutribudget-ingredients", JSON.stringify(updated));
  }, []);

  const handleGenerate = useCallback(() => {
    const lockedMeals = meals.filter(m => lockedMealIds.has(m.id));
    const lockedDays = new Set(lockedMeals.map(m => m.day));
    const newPlan = generateWeeklyMealPlan(ingredients, lockedDays);
    const combined = [
      ...lockedMeals,
      ...newPlan,
    ].sort((a, b) => {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      return days.indexOf(a.day) - days.indexOf(b.day);
    });
    setMeals(combined);
    setActiveTab("dashboard");
    if (combined.length > 0) {
      const regenerated = newPlan.length;
      toast({ title: "Meal Plan Generated", description: `${regenerated} meal(s) regenerated, ${lockedMeals.length} locked.` });
    } else {
      toast({ title: "No Valid Combinations", description: "Try adjusting ingredient prices or availability.", variant: "destructive" });
    }
  }, [ingredients, meals, lockedMealIds]);

  const handleToggleLock = useCallback((mealId: string) => {
    setLockedMealIds(prev => {
      const next = new Set(prev);
      if (next.has(mealId)) {
        next.delete(mealId);
      } else {
        next.add(mealId);
      }
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">NutriBudget MY</h1>
              <p className="text-xs text-muted-foreground">School Canteen Meal Planner</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {meals.length > 0 && (
              <Button variant="outline" size="sm" className="gap-2" onClick={() => exportMealPlanPdf(meals)}>
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            )}
            <Button onClick={() => meals.length > 0 ? setShowConfirm(true) : handleGenerate()} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Meal Plan
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="gap-2">
              <Database className="h-4 w-4" /> Ingredients
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {meals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to NutriBudget MY</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Generate weekly meal plans that follow the MOH Quarter-Quarter-Half guidelines
                  and stay within the RMT budget of RM3.50 – RM4.00 per student.
                </p>
                <Button onClick={handleGenerate} size="lg" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate First Meal Plan
                </Button>
              </div>
            ) : (
              <>
                <BudgetSummary meals={meals} />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Weekly Meal Plan</h2>
                    {lockedMealIds.size > 0 && (
                      <p className="text-sm text-muted-foreground">
                        🔒 {lockedMealIds.size} meal(s) locked
                      </p>
                    )}
                  </div>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={meals.map(m => m.id)} strategy={rectSortingStrategy}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {meals.map((meal, i) => (
                          <MealCard
                            key={meal.id}
                            meal={meal}
                            index={i}
                            isLocked={lockedMealIds.has(meal.id)}
                            onToggleLock={() => handleToggleLock(meal.id)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="ingredients">
            <IngredientManager ingredients={ingredients} onUpdate={handleUpdateIngredients} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 mt-8">
        <div className="container text-center text-xs text-muted-foreground">
          NutriBudget MY · PutraHack 2026 · Theme: Food Safety
        </div>
      </footer>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate New Meal Plan?</AlertDialogTitle>
            <AlertDialogDescription>
              {lockedMealIds.size > 0
                ? `This will regenerate ${5 - lockedMealIds.size} unlocked meal(s). ${lockedMealIds.size} locked meal(s) will be kept.`
                : "This will replace your current meal plan with a new one. This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { handleGenerate(); setShowConfirm(false); }}>
              Generate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
