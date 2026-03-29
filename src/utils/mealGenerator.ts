import { Ingredient } from "@/data/ingredients";

export interface MealPlan {
  id: string;
  day: string;
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
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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

  const mealPlans: MealPlan[] = [];
  const usedCombos = new Set<string>();

  for (const day of DAYS) {
    const candidates: MealPlan[] = [];

    const shuffledCarbs = shuffleArray(carbs);
    const shuffledProteins = shuffleArray(proteins);
    const shuffledVegs = shuffleArray(vegetables);
    const shuffledFruits = shuffleArray(fruits);

    for (const carb of shuffledCarbs) {
      for (const protein of shuffledProteins) {
        for (const veg of shuffledVegs) {
          for (const fruit of shuffledFruits) {
            const comboKey = `${carb.id}-${protein.id}-${veg.id}-${fruit.id}`;
            if (usedCombos.has(comboKey)) continue;

            const totalCost = carb.pricePerServing + protein.pricePerServing + veg.pricePerServing + fruit.pricePerServing;

            if (totalCost < BUDGET_MIN || totalCost > BUDGET_MAX) continue;

            const carbRatio = carb.pricePerServing / totalCost;
            const proteinRatio = protein.pricePerServing / totalCost;
            const vegFruitRatio = (veg.pricePerServing + fruit.pricePerServing) / totalCost;

            const score = calculateNutritionScore(carbRatio, proteinRatio, vegFruitRatio);

            candidates.push({
              id: `meal-${day}`,
              day,
              carb,
              protein,
              vegetable: veg,
              fruit,
              totalCost: Math.round(totalCost * 100) / 100,
              nutritionScore: score,
              carbRatio: Math.round(carbRatio * 100),
              proteinRatio: Math.round(proteinRatio * 100),
              vegFruitRatio: Math.round(vegFruitRatio * 100),
            });
          }
        }
      }
    }

    if (candidates.length > 0) {
      // Pick randomly from the top candidates (within 15 points of best score)
      candidates.sort((a, b) => b.nutritionScore - a.nutritionScore);
      const bestScore = candidates[0].nutritionScore;
      const topCandidates = candidates.filter(c => c.nutritionScore >= bestScore - 15);
      const chosen = topCandidates[Math.floor(Math.random() * topCandidates.length)];
      usedCombos.add(`${chosen.carb.id}-${chosen.protein.id}-${chosen.vegetable.id}-${chosen.fruit.id}`);
      mealPlans.push(chosen);
    }
  }

  return mealPlans;
}

export function getBudgetStatus(cost: number): "success" | "warning" | "danger" {
  if (cost >= BUDGET_MIN && cost <= BUDGET_MAX) return "success";
  if (cost > BUDGET_MAX && cost <= BUDGET_MAX + 0.30) return "warning";
  return "danger";
}

export const BUDGET_RANGE = { min: BUDGET_MIN, max: BUDGET_MAX };
