import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MealPlan } from "@/utils/mealGenerator";
import { useLang } from "@/hooks/useLang";

interface NutritionPieChartProps {
  meal: MealPlan;
}

const COLORS = ["hsl(36, 60%, 50%)", "hsl(0, 60%, 55%)", "hsl(152, 55%, 33%)"];

export function NutritionPieChart({ meal }: NutritionPieChartProps) {
  const { t } = useLang();

  const data = [
    { name: t("Carbohydrate", "Karbohidrat"), value: meal.carbRatio },
    { name: t("Protein", "Protein"), value: meal.proteinRatio },
    { name: t("Veg & Fruit", "Sayur & Buah"), value: meal.vegFruitRatio },
  ];

  const ideal = [25, 25, 50];

  return (
    <div className="flex items-center gap-4">
      <div className="w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={20} outerRadius={50} dataKey="value" strokeWidth={2}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-1 text-sm">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-muted-foreground">{item.name}: <span className="font-semibold text-foreground">{item.value}%</span></span>
            <span className="text-xs text-muted-foreground">({t("ideal", "ideal")}: {ideal[i]}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
