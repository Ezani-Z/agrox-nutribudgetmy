import { Ingredient } from "@/data/ingredients";

export interface MealPlan {
  id: string;
  day: string;
  dayMY: string;
  carb: Ingredient;
  protein: Ingredient;
  vegetable: Ingredient;
  fruit: Ingredient;
  totalCost: number;
  nutritionScore: number;
  carbRatio: number;
  proteinRatio: number;
  vegFruitRatio: number;
}

const BUDGET_MIN = 3.50;
const BUDGET_MAX = 4.00;

const DAYS: { en: string; my: string }[] = [
  { en: "Monday", my: "Isnin" },
  { en: "Tuesday", my: "Selasa" },
  { en: "Wednesday", my: "Rabu" },
  { en: "Thursday", my: "Khamis" },
  { en: "Friday", my: "Jumaat" },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function calculateNutritionScore(carbRatio: number, proteinRatio: number, vegFruitRatio: number): number {
  const score = 100 - (
    Math.abs(carbRatio - 0.25) * 100 +
    Math.abs(proteinRatio - 0.25) * 100 +
    Math.abs(vegFruitRatio - 0.50) * 100
  );
  return Math.max(0, Math.round(score));
}

export function generateWeeklyMealPlan(ingredients: Ingredient[], skipDays?: Set<string>): MealPlan[] {
  const available = ingredients.filter(i => i.isAvailable);
  const carbs = available.filter(i => i.category === "carb");
  const proteins = available.filter(i => i.category === "protein");
  const vegetables = available.filter(i => i.category === "vegetable");
  const fruits = available.filter(i => i.category === "fruit");

  if (carbs.length === 0 || proteins.length === 0 || vegetables.length === 0 || fruits.length === 0) {
    return [];
  }

  // Track ingredient usage across the week for variety
  const ingredientUsage: Record<string, number> = {};
  const trackUsage = (meal: MealPlan) => {
    [meal.carb, meal.protein, meal.vegetable, meal.fruit].forEach(ing => {
      ingredientUsage[ing.id] = (ingredientUsage[ing.id] || 0) + 1;
    });
  };

  for (const day of DAYS) {
    if (skipDays?.has(day.en)) continue;

    const shuffledCarbs = shuffleArray(carbs);
    const shuffledProteins = shuffleArray(proteins);
    const shuffledVegs = shuffleArray(vegetables);
    const shuffledFruits = shuffleArray(fruits);

    const candidates: (MealPlan & { varietyScore: number })[] = [];

    for (const carb of shuffledCarbs) {
      for (const protein of shuffledProteins) {
        for (const veg of shuffledVegs) {
          for (const fruit of shuffledFruits) {
            const comboKey = `${carb.id}-${protein.id}-${veg.id}-${fruit.id}`;
            if (usedCombos.has(comboKey)) continue;

            const totalCost = carb.pricePerServing + protein.pricePerServing + veg.pricePerServing + fruit.pricePerServing;
            if (totalCost < BUDGET_MIN || totalCost > BUDGET_MAX) continue;

            const totalWeight = carb.servingSize + protein.servingSize + veg.servingSize + fruit.servingSize;
            const carbRatio = carb.servingSize / totalWeight;
            const proteinRatio = protein.servingSize / totalWeight;
            const vegFruitRatio = (veg.servingSize + fruit.servingSize) / totalWeight;
            const score = calculateNutritionScore(carbRatio, proteinRatio, vegFruitRatio);

            if (score < 70) continue;

            // Penalize reuse of same ingredients across the week
            const reusePenalty = [carb, protein, veg, fruit].reduce(
              (pen, ing) => pen + (ingredientUsage[ing.id] || 0) * 15, 0
            );
            const varietyScore = score - reusePenalty;

            candidates.push({
              id: `meal-${day.en}`,
              day: day.en,
              dayMY: day.my,
              carb,
              protein,
              vegetable: veg,
              fruit,
              totalCost: Math.round(totalCost * 100) / 100,
              nutritionScore: score,
              carbRatio: Math.round(carbRatio * 100),
              proteinRatio: Math.round(proteinRatio * 100),
              vegFruitRatio: Math.round(vegFruitRatio * 100),
              varietyScore,
            });
          }
        }
      }
    }

    if (candidates.length > 0) {
      // Sort by variety score (nutrition - reuse penalty), pick from top tier
      candidates.sort((a, b) => b.varietyScore - a.varietyScore);
      const bestVariety = candidates[0].varietyScore;
      const topCandidates = candidates.filter(c => c.varietyScore >= bestVariety - 10);
      const chosen = topCandidates[Math.floor(Math.random() * topCandidates.length)];
      usedCombos.add(`${chosen.carb.id}-${chosen.protein.id}-${chosen.vegetable.id}-${chosen.fruit.id}`);
      trackUsage(chosen);
      mealPlans.push(chosen);
    }
  }

  return mealPlans;
}

export function getBudgetStatus(cost: number): "success" | "warning" | "danger" | "under" {
  if (cost >= BUDGET_MIN && cost <= BUDGET_MAX) return "success";
  if (cost > BUDGET_MAX && cost <= BUDGET_MAX + 0.30) return "warning";
  if (cost > BUDGET_MAX + 0.30) return "danger";
  return "under";
}

export const BUDGET_RANGE = { min: BUDGET_MIN, max: BUDGET_MAX };
