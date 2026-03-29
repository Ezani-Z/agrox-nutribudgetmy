import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ingredient, IngredientCategory, getProteinPerRM, getCaloriesPerRM, categoryLabels } from "@/data/ingredients";
import { TrendingUp, Zap, Award, ArrowRight, Lightbulb, BarChart3, Calendar } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { MealPlan } from "@/utils/mealGenerator";

interface BestValueInsightsProps {
  ingredients: Ingredient[];
  meals?: MealPlan[];
}

interface SwapSuggestion {
  from: Ingredient;
  to: Ingredient;
  savingsRM: number;
  proteinGain: number;
  calorieChange: number;
  reason: string;
  reasonMY: string;
  days: string[];   // e.g. ["Monday", "Wednesday"]
  daysMY: string[];
}

export function BestValueInsights({ ingredients, meals = [] }: BestValueInsightsProps) {
  const { lang, t } = useLang();
  const available = ingredients.filter(i => i.isAvailable);

  const getName = (i: Ingredient) => lang === "en" ? i.name : i.nameMY;
  const getCatLabel = (cat: IngredientCategory) => lang === "en" ? categoryLabels[cat].en : categoryLabels[cat].my;

  // ── Top 5 protein-per-RM ──
  const proteinRanked = [...available]
    .filter(i => i.proteinG > 0)
    .map(i => ({ ...i, pprm: getProteinPerRM(i), cprm: getCaloriesPerRM(i) }))
    .sort((a, b) => b.pprm - a.pprm)
    .slice(0, 5);

  // ── Top 5 calories-per-RM ──
  const calorieRanked = [...available]
    .map(i => ({ ...i, cprm: getCaloriesPerRM(i) }))
    .sort((a, b) => b.cprm - a.cprm)
    .slice(0, 5);

  // ── Smart Swap Suggestions ──
  const swaps: SwapSuggestion[] = [];
  const categories: IngredientCategory[] = ["protein", "carb", "vegetable", "fruit"];

  for (const cat of categories) {
    const catItems = available.filter(i => i.category === cat);
    if (catItems.length < 2) continue;

    const sorted = [...catItems].sort((a, b) => a.pricePerServing - b.pricePerServing);

    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const cheap = sorted[i];
        const expensive = sorted[j];
        const savings = expensive.pricePerServing - cheap.pricePerServing;
        const proteinGain = cheap.proteinG - expensive.proteinG;

        if (savings >= 0.10 && proteinGain >= 0) {
          const proteinPerRMCheap = getProteinPerRM(cheap);
          const proteinPerRMExpensive = getProteinPerRM(expensive);
          const ratio = proteinPerRMExpensive > 0 ? (proteinPerRMCheap / proteinPerRMExpensive).toFixed(1) : "∞";

          swaps.push({
            from: expensive,
            to: cheap,
            savingsRM: savings,
            proteinGain,
            calorieChange: cheap.calories - expensive.calories,
            reason: `Swap ${getName(expensive)} → ${getName(cheap)}: Save RM${savings.toFixed(2)}/serving${proteinGain > 0 ? ` and gain ${proteinGain}g protein` : ""}. ${ratio}× better protein/RM.`,
            reasonMY: `Tukar ${getName(expensive)} → ${getName(cheap)}: Jimat RM${savings.toFixed(2)}/hidangan${proteinGain > 0 ? ` dan dapat ${proteinGain}g lebih protein` : ""}. ${ratio}× lebih baik protein/RM.`,
          });
        }
      }
    }
  }

  swaps.sort((a, b) => b.savingsRM - a.savingsRM || b.proteinGain - a.proteinGain);
  const topSwaps = swaps.slice(0, 5);

  // ── Category spending analysis ──
  const categoryStats = categories.map(cat => {
    const items = available.filter(i => i.category === cat);
    if (items.length === 0) return null;
    const avgPrice = items.reduce((s, i) => s + i.pricePerServing, 0) / items.length;
    const avgProtein = items.reduce((s, i) => s + i.proteinG, 0) / items.length;
    const avgCalories = items.reduce((s, i) => s + i.calories, 0) / items.length;
    const bestValue = items.reduce((best, cur) =>
      getProteinPerRM(cur) + getCaloriesPerRM(cur) >
      getProteinPerRM(best) + getCaloriesPerRM(best) ? cur : best
    );
    return { cat, count: items.length, avgPrice, avgProtein, avgCalories, bestValue };
  }).filter(Boolean) as { cat: IngredientCategory; count: number; avgPrice: number; avgProtein: number; avgCalories: number; bestValue: Ingredient }[];

  // ── Headline insight ──
  const proteins = available.filter(i => i.category === "protein" && i.proteinG > 0);
  const bestProtein = proteins.length > 0
    ? proteins.reduce((best, cur) => getProteinPerRM(cur) > getProteinPerRM(best) ? cur : best)
    : null;
  const worstProtein = proteins.length > 1
    ? proteins.reduce((worst, cur) => getProteinPerRM(cur) < getProteinPerRM(worst) ? cur : worst)
    : null;
  const ratio = bestProtein && worstProtein
    ? (getProteinPerRM(bestProtein) / getProteinPerRM(worstProtein)).toFixed(1)
    : null;

  const weeklySavings = topSwaps.length > 0
    ? (topSwaps.reduce((s, sw) => s + sw.savingsRM, 0) * 5).toFixed(2)
    : null;

  return (
    <div className="space-y-4">
      {bestProtein && worstProtein && ratio && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-start gap-3 pt-5 pb-4">
            <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">
                💡 {t("Best Value Insight", "Maklumat Nilai Terbaik")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t(
                  `At your current prices, ${getName(bestProtein)} gives you ${ratio}× the protein per RM compared to ${getName(worstProtein)}.`,
                  `Pada harga semasa anda, ${getName(bestProtein)} memberi anda ${ratio}× protein setiap RM berbanding ${getName(worstProtein)}.`
                )}
              </p>
              {weeklySavings && (
                <p className="text-sm font-medium text-primary mt-1">
                  {t(
                    `💰 Potential weekly savings: RM${weeklySavings} by applying top swaps below.`,
                    `💰 Potensi jimat mingguan: RM${weeklySavings} dengan menerapkan pertukaran di bawah.`
                  )}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {topSwaps.length > 0 && (
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              {t("Smart Swap Suggestions", "Cadangan Pertukaran Pintar")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topSwaps.map((swap, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/40 border border-border/40 space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Badge variant="outline" className="text-xs shrink-0">
                    {getCatLabel(swap.from.category)}
                  </Badge>
                  <span className="text-destructive line-through">{getName(swap.from)}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="text-primary font-semibold">{getName(swap.to)}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
                    {t("Save", "Jimat")} RM{swap.savingsRM.toFixed(2)}
                  </Badge>
                  {swap.proteinGain > 0 && (
                    <Badge className="bg-accent text-accent-foreground border-primary/20 hover:bg-accent/80">
                      +{swap.proteinGain}g protein
                    </Badge>
                  )}
                  {swap.calorieChange !== 0 && (
                    <Badge variant="outline" className="text-xs">
                      {swap.calorieChange > 0 ? "+" : ""}{swap.calorieChange} kcal
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t("Top Protein per RM", "Protein Tertinggi per RM")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {proteinRanked.map((item, i) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground w-4">#{i + 1}</span>
                  <span className="font-medium">{getName(item)}</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    RM{item.pricePerServing.toFixed(2)}
                  </Badge>
                </div>
                <span className="font-semibold text-primary">
                  {item.pprm.toFixed(1)}g/RM
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {t("Top Energy per RM", "Tenaga Tertinggi per RM")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {calorieRanked.map((item, i) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground w-4">#{i + 1}</span>
                  <span className="font-medium">{getName(item)}</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    RM{item.pricePerServing.toFixed(2)}
                  </Badge>
                </div>
                <span className="font-semibold text-primary">
                  {Math.round(item.cprm)} kcal/RM
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t("Category Breakdown", "Pecahan Kategori")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categoryStats.map(stat => (
              <div key={stat.cat} className="p-3 rounded-lg border border-border/40 bg-muted/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{getCatLabel(stat.cat)}</span>
                  <span className="text-xs text-muted-foreground">{stat.count} {t("items", "item")}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-primary">RM{stat.avgPrice.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground">{t("Avg Price", "Harga Purata")}</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{stat.avgProtein.toFixed(0)}g</p>
                    <p className="text-[10px] text-muted-foreground">{t("Avg Protein", "Protein Purata")}</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{stat.avgCalories.toFixed(0)}</p>
                    <p className="text-[10px] text-muted-foreground">{t("Avg kcal", "Purata kcal")}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  ⭐ {t("Best value:", "Nilai terbaik:")} <span className="font-medium text-foreground">{getName(stat.bestValue)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
