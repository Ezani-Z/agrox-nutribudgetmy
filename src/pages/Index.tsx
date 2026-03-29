import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MealCard, MealCardOverlay } from "@/components/MealCard";
import { BudgetSummary } from "@/components/BudgetSummary";
import { IngredientManager } from "@/components/IngredientManager";
import { defaultIngredients, Ingredient, StoreId, stores } from "@/data/ingredients";
import { generateWeeklyMealPlan, MealPlan } from "@/utils/mealGenerator";
import { Sparkles, UtensilsCrossed, Database, BarChart3, Download, Store, Globe } from "lucide-react";
import { exportMealPlanPdf } from "@/utils/exportPdf";
import { useLang } from "@/hooks/useLang";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
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
  const { lang, toggle, t } = useLang();
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    localStorage.removeItem("nutribudget-ingredients");
    return defaultIngredients;
  });
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [lockedMealIds, setLockedMealIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeMealId, setActiveMealId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreId>("default");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setMeals(prev => {
      const oldIndex = prev.findIndex(m => m.id === active.id);
      const newIndex = prev.findIndex(m => m.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const updated = [...prev];
      const dayA = updated[oldIndex].day;
      const dayAMY = updated[oldIndex].dayMY;
      const dayB = updated[newIndex].day;
      const dayBMY = updated[newIndex].dayMY;
      updated[oldIndex] = { ...updated[oldIndex], day: dayB, dayMY: dayBMY, id: `meal-${dayB}` };
      updated[newIndex] = { ...updated[newIndex], day: dayA, dayMY: dayAMY, id: `meal-${dayA}` };
      [updated[oldIndex], updated[newIndex]] = [updated[newIndex], updated[oldIndex]];
      return updated;
    });
    setLockedMealIds(new Set());
  }, []);

  const handleUpdateIngredients = useCallback((updated: Ingredient[]) => {
    setIngredients(updated);
  }, []);

  const handleGenerate = useCallback(() => {
    const lockedMeals = meals.filter(m => lockedMealIds.has(m.id));
    const lockedDays = new Set(lockedMeals.map(m => m.day));
    const newPlan = generateWeeklyMealPlan(ingredients, lockedDays, selectedStore);
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
      const storeName = stores.find(s => s.id === selectedStore)?.name ?? selectedStore;
      toast({
        title: t("Meal Plan Generated", "Pelan Hidangan Dijana"),
        description: t(
          `${regenerated} meal(s) regenerated, ${lockedMeals.length} locked. Store: ${storeName}`,
          `${regenerated} hidangan dijana semula, ${lockedMeals.length} dikunci. Kedai: ${storeName}`
        ),
      });
    } else {
      toast({
        title: t("No Valid Combinations", "Tiada Kombinasi Sah"),
        description: t(
          "Try adjusting ingredient prices or availability.",
          "Cuba laraskan harga atau ketersediaan bahan."
        ),
        variant: "destructive",
      });
    }
  }, [ingredients, meals, lockedMealIds, selectedStore, t]);

  const handleToggleLock = useCallback((mealId: string) => {
    setLockedMealIds(prev => {
      const next = new Set(prev);
      if (next.has(mealId)) next.delete(mealId);
      else next.add(mealId);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">NutriBudget MY</h1>
              <p className="text-xs text-muted-foreground">
                {t("School Canteen Meal Planner", "Perancang Hidangan Kantin Sekolah")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <Button variant="outline" size="sm" className="gap-1.5" onClick={toggle}>
              <Globe className="h-4 w-4" />
              {lang === "en" ? "MY" : "EN"}
            </Button>

            {/* Store selector */}
            <div className="hidden md:flex items-center gap-1">
              <Store className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedStore} onValueChange={(v) => setSelectedStore(v as StoreId)}>
                <SelectTrigger className="w-40 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stores.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {lang === "en" ? s.name : s.nameMY}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {meals.length > 0 && (
              <Button variant="outline" size="sm" className="gap-2" onClick={() => exportMealPlanPdf(meals)}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </Button>
            )}
            <Button onClick={() => meals.length > 0 ? setShowConfirm(true) : handleGenerate()} className="gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Generate", "Jana")}</span>
              <span className="sm:hidden">{t("Generate", "Jana")}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" /> {t("Dashboard", "Papan Pemuka")}
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="gap-2">
              <Database className="h-4 w-4" /> {t("Ingredients", "Bahan")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {meals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {t("Welcome to NutriBudget MY", "Selamat Datang ke NutriBudget MY")}
                </h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  {t(
                    "Generate weekly meal plans that follow the MOH Suku Suku Separuh guidelines and stay within the RMT budget of RM3.50 – RM4.00 per student.",
                    "Jana pelan hidangan mingguan yang mengikuti garis panduan Suku Suku Separuh KKM dan kekal dalam bajet RMT RM3.50 – RM4.00 setiap pelajar."
                  )}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t("Select store:", "Pilih kedai:")}</span>
                  <Select value={selectedStore} onValueChange={(v) => setSelectedStore(v as StoreId)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stores.map(s => (
                        <SelectItem key={s.id} value={s.id}>
                          {lang === "en" ? s.name : s.nameMY}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleGenerate} size="lg" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  {t("Generate First Meal Plan", "Jana Pelan Pertama")}
                </Button>
              </div>
            ) : (
              <>
                <BudgetSummary meals={meals} />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">
                      {t("Weekly Meal Plan", "Pelan Hidangan Mingguan")}
                    </h2>
                    {lockedMealIds.size > 0 && (
                      <p className="text-sm text-muted-foreground">
                        🔒 {lockedMealIds.size} {t("meal(s) locked", "hidangan dikunci")}
                      </p>
                    )}
                  </div>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={(e: DragStartEvent) => setActiveMealId(e.active.id as string)}
                    onDragEnd={(e: DragEndEvent) => { handleDragEnd(e); setActiveMealId(null); }}
                    onDragCancel={() => setActiveMealId(null)}
                  >
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
                    <DragOverlay>
                      {activeMealId ? (
                        <MealCardOverlay meal={meals.find(m => m.id === activeMealId)!} />
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="ingredients">
            <IngredientManager
              ingredients={ingredients}
              onUpdate={handleUpdateIngredients}
              selectedStore={selectedStore}
              onStoreChange={setSelectedStore}
            />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-4 mt-8">
        <div className="container text-center text-xs text-muted-foreground">
          {t(
            "NutriBudget MY · PutraHack 2026 · Theme: Food Safety",
            "NutriBudget MY · PutraHack 2026 · Tema: Keselamatan Makanan"
          )}
        </div>
      </footer>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Generate New Meal Plan?", "Jana Pelan Baharu?")}</AlertDialogTitle>
            <AlertDialogDescription>
              {lockedMealIds.size > 0
                ? t(
                    `This will regenerate ${5 - lockedMealIds.size} unlocked meal(s). ${lockedMealIds.size} locked meal(s) will be kept.`,
                    `Ini akan jana semula ${5 - lockedMealIds.size} hidangan tidak dikunci. ${lockedMealIds.size} hidangan dikunci akan dikekalkan.`
                  )
                : t(
                    "This will replace your current meal plan with a new one.",
                    "Ini akan menggantikan pelan hidangan semasa dengan yang baharu."
                  )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel", "Batal")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => { handleGenerate(); setShowConfirm(false); }}>
              {t("Generate", "Jana")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
