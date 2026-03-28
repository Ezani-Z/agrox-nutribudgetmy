import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { MealPlan } from "@/utils/mealGenerator";

interface NutritionPieChartProps {
  meal: MealPlan;
}

const COLORS = ["hsl(36, 60%, 50%)", "hsl(0, 60%, 55%)", "hsl(152, 55%, 33%)"];
const IDEAL = [
  { name: "Karbohidrat (25%)", value: 25 },
  { name: "Protein (25%)", value: 25 },
  { name: "Sayur & Buah (50%)", value: 50 },
];

export function NutritionPieChart({ meal }: NutritionPieChartProps) {
  const data = [
    { name: "Karbohidrat", value: meal.carbRatio },
    { name: "Protein", value: meal.proteinRatio },
    { name: "Sayur & Buah", value: meal.vegFruitRatio },
  ];

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
            <span className="text-xs text-muted-foreground">(ideal: {IDEAL[i].value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
