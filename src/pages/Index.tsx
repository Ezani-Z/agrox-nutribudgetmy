import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MealCard } from "@/components/MealCard";
import { BudgetSummary } from "@/components/BudgetSummary";
import { IngredientManager } from "@/components/IngredientManager";
import { defaultIngredients, Ingredient } from "@/data/ingredients";
import { generateWeeklyMealPlan, MealPlan } from "@/utils/mealGenerator";
import { Sparkles, UtensilsCrossed, Database, BarChart3 } from "lucide-react";

const Index = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    // Clear old cached data to use updated prices
    localStorage.removeItem("nutribudget-ingredients");
    return defaultIngredients;
  });
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleUpdateIngredients = useCallback((updated: Ingredient[]) => {
    setIngredients(updated);
    localStorage.setItem("nutribudget-ingredients", JSON.stringify(updated));
  }, []);

  const handleGenerate = useCallback(() => {
    const plan = generateWeeklyMealPlan(ingredients);
    setMeals(plan);
    setActiveTab("dashboard");
  }, [ingredients]);

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
              <p className="text-xs text-muted-foreground">Perancang Hidangan Kantin Sekolah</p>
            </div>
          </div>
          <Button onClick={handleGenerate} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Jana Pelan Hidangan
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" /> Papan Pemuka
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="gap-2">
              <Database className="h-4 w-4" /> Bahan-bahan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {meals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Selamat Datang ke NutriBudget MY</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Jana pelan hidangan mingguan yang mematuhi garis panduan Suku-Suku Separuh MOH
                  dan kekal dalam bajet RMT RM3.50 – RM4.00 per pelajar.
                </p>
                <Button onClick={handleGenerate} size="lg" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Jana Pelan Hidangan Pertama
                </Button>
              </div>
            ) : (
              <>
                <BudgetSummary meals={meals} />
                <div>
                  <h2 className="text-xl font-bold mb-4">Pelan Hidangan Mingguan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {meals.map((meal, i) => (
                      <MealCard key={meal.id} meal={meal} index={i} />
                    ))}
                  </div>
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
          NutriBudget MY · PutraHack 2026 · Tema: Keselamatan Makanan
        </div>
      </footer>
    </div>
  );
};

export default Index;
