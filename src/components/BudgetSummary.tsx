import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MealPlan, BUDGET_RANGE } from "@/utils/mealGenerator";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip, Cell } from "recharts";
import { TrendingUp, DollarSign, Target } from "lucide-react";
import { useLang } from "@/hooks/useLang";

interface BudgetSummaryProps {
  meals: MealPlan[];
}

export function BudgetSummary({ meals }: BudgetSummaryProps) {
  const { lang, t } = useLang();

  if (meals.length === 0) return null;

  const avgCost = meals.reduce((s, m) => s + m.totalCost, 0) / meals.length;
  const totalWeekly = meals.reduce((s, m) => s + m.totalCost, 0);
  const avgScore = Math.round(meals.reduce((s, m) => s + m.nutritionScore, 0) / meals.length);
  const allWithinBudget = meals.every(m => m.totalCost >= BUDGET_RANGE.min && m.totalCost <= BUDGET_RANGE.max);

  const chartData = meals.map(m => ({
    day: lang === "en" ? m.day.slice(0, 3) : (m.dayMY || m.day).slice(0, 3),
    cost: m.totalCost,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> {t("Average Cost", "Kos Purata")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-primary">RM{avgCost.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">{t("per meal / student", "setiap hidangan / pelajar")}</p>
          <p className="text-xs mt-1 text-muted-foreground">{t("Weekly Total", "Jumlah Mingguan")}: RM{totalWeekly.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Target className="h-4 w-4" /> {t("Nutrition Score", "Skor Pemakanan")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-primary">{avgScore}%</p>
          <p className="text-sm text-muted-foreground">
            {t("average Suku Suku Separuh compliance", "purata pematuhan Suku Suku Separuh")}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> {t("Budget Status", "Status Bajet")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-3xl font-bold ${allWithinBudget ? "text-primary" : "text-destructive"}`}>
            {allWithinBudget ? `✅ ${t("Compliant", "Patuh")}` : `⚠️ ${t("Review", "Semak")}`}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("RMT Limit", "Had RMT")}: RM{BUDGET_RANGE.min.toFixed(2)} – RM{BUDGET_RANGE.max.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-3 border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{t("Daily Cost", "Kos Harian")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis domain={[3, 4.5]} tick={{ fontSize: 12 }} tickFormatter={(v) => `RM${v}`} />
                <Tooltip formatter={(v: number) => `RM${v.toFixed(2)}`} />
                <ReferenceLine y={BUDGET_RANGE.min} stroke="hsl(152, 55%, 33%)" strokeDasharray="4 4" label={{ value: "Min", fontSize: 10 }} />
                <ReferenceLine y={BUDGET_RANGE.max} stroke="hsl(0, 72%, 51%)" strokeDasharray="4 4" label={{ value: "Max", fontSize: 10 }} />
                <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.cost >= BUDGET_RANGE.min && entry.cost <= BUDGET_RANGE.max ? "hsl(152, 55%, 33%)" : "hsl(0, 72%, 51%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
