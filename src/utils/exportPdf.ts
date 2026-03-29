import jsPDF from "jspdf";
import { MealPlan, BUDGET_RANGE } from "./mealGenerator";

export function exportMealPlanPdf(meals: MealPlan[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("NutriBudget MY - Weekly Meal Plan", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: "center" });
  doc.text(`Budget Range: RM${BUDGET_RANGE.min.toFixed(2)} – RM${BUDGET_RANGE.max.toFixed(2)} per student`, pageWidth / 2, 34, { align: "center" });

  // Summary
  const avgCost = meals.reduce((s, m) => s + m.totalCost, 0) / meals.length;
  const totalWeekly = meals.reduce((s, m) => s + m.totalCost, 0);
  const avgScore = Math.round(meals.reduce((s, m) => s + m.nutritionScore, 0) / meals.length);

  doc.setDrawColor(200);
  doc.line(14, 40, pageWidth - 14, 40);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Summary", 14, 48);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Average Cost: RM${avgCost.toFixed(2)} / meal`, 14, 55);
  doc.text(`Weekly Total: RM${totalWeekly.toFixed(2)}`, 14, 61);
  doc.text(`Avg Nutrition Score: ${avgScore}%`, 14, 67);

  // Table header
  let y = 80;
  const cols = [14, 44, 80, 116, 148, 176];
  const headers = ["Day", "Carb", "Protein", "Vegetable", "Fruit", "Cost (RM)"];

  doc.setFillColor(34, 87, 122);
  doc.rect(14, y - 6, pageWidth - 28, 9, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  headers.forEach((h, i) => doc.text(h, cols[i], y));

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  y += 8;

  meals.forEach((meal, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      doc.rect(14, y - 5, pageWidth - 28, 8, "F");
    }
    doc.text(meal.day, cols[0], y);
    doc.text(meal.carb.name, cols[1], y);
    doc.text(meal.protein.name, cols[2], y);
    doc.text(meal.vegetable.name, cols[3], y);
    doc.text(meal.fruit.name, cols[4], y);
    doc.text(`RM${meal.totalCost.toFixed(2)}`, cols[5], y);
    y += 8;
  });

  // Footer
  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 130);
  doc.text("NutriBudget MY · PutraHack 2026 · Suku Suku Separuh Compliant", pageWidth / 2, y, { align: "center" });

  doc.save("NutriBudget_MealPlan.pdf");
}
