import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ingredient, StoreId, getPrice, getProteinPerRM, getCaloriesPerRM } from "@/data/ingredients";
import { TrendingUp, Zap, Award } from "lucide-react";
import { useLang } from "@/hooks/useLang";

interface BestValueInsightsProps {
  ingredients: Ingredient[];
  store: StoreId;
}

export function BestValueInsights({ ingredients, store }: BestValueInsightsProps) {
  const { lang, t } = useLang();
  const available = ingredients.filter(i => i.isAvailable);

  // Top 5 protein-per-RM across all categories
  const proteinRanked = [...available]
    .filter(i => i.proteinG > 0)
    .map(i => ({ ...i, pprm: getProteinPerRM(i, store), cprm: getCaloriesPerRM(i, store) }))
    .sort((a, b) => b.pprm - a.pprm)
    .slice(0, 5);

  // Top 5 calories-per-RM
  const calorieRanked = [...available]
    .map(i => ({ ...i, cprm: getCaloriesPerRM(i, store) }))
    .sort((a, b) => b.cprm - a.cprm)
    .slice(0, 5);

  // Generate comparison insights
  const proteins = available.filter(i => i.category === "protein" && i.proteinG > 0);
  const bestProtein = proteins.length > 0
    ? proteins.reduce((best, cur) => getProteinPerRM(cur, store) > getProteinPerRM(best, store) ? cur : best)
    : null;
  const worstProtein = proteins.length > 1
    ? proteins.reduce((worst, cur) => getProteinPerRM(cur, store) < getProteinPerRM(worst, store) ? cur : worst)
    : null;

  const getName = (i: Ingredient) => lang === "en" ? i.name : i.nameMY;

  const ratio = bestProtein && worstProtein
    ? (getProteinPerRM(bestProtein, store) / getProteinPerRM(worstProtein, store)).toFixed(1)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Insight callout */}
      {bestProtein && worstProtein && ratio && (
        <Card className="md:col-span-2 border-primary/30 bg-primary/5">
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
                  `At current ${store === "default" ? "estimated" : store} prices, ${getName(bestProtein)} gives you ${ratio}× the protein per RM compared to ${getName(worstProtein)}.`,
                  `Pada harga ${store === "default" ? "anggaran" : store} semasa, ${getName(bestProtein)} memberi anda ${ratio}× protein setiap RM berbanding ${getName(worstProtein)}.`
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Protein per RM ranking */}
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
                  RM{getPrice(item, store).toFixed(2)}
                </Badge>
              </div>
              <span className="font-semibold text-primary">
                {item.pprm.toFixed(1)}g/RM
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calories per RM ranking */}
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
                  RM{getPrice(item, store).toFixed(2)}
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
  );
}
