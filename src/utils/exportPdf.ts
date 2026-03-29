import jsPDF from "jspdf";
import { MealPlan, BUDGET_RANGE } from "./mealGenerator";

export function exportMealPlanPdf(meals: MealPlan[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("NutriBudget MY - Weekly Meal Plan", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Pelan Hidangan Mingguan", pageWidth / 2, 27, { align: "center" });
  doc.text(`Generated / Dijana: ${new Date().toLocaleDateString()}`, pageWidth / 2, 33, { align: "center" });
  doc.text(`Budget Range / Julat Bajet: RM${BUDGET_RANGE.min.toFixed(2)} - RM${BUDGET_RANGE.max.toFixed(2)} per student / setiap pelajar`, pageWidth / 2, 39, { align: "center" });

  const avgCost = meals.reduce((s, m) => s + m.totalCost, 0) / meals.length;
  const totalWeekly = meals.reduce((s, m) => s + m.totalCost, 0);
  const avgScore = Math.round(meals.reduce((s, m) => s + m.nutritionScore, 0) / meals.length);

  doc.setDrawColor(200);
  doc.line(14, 44, pageWidth - 14, 44);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Summary / Ringkasan", 14, 52);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Average Cost / Kos Purata: RM${avgCost.toFixed(2)} / meal`, 14, 59);
  doc.text(`Weekly Total / Jumlah Mingguan: RM${totalWeekly.toFixed(2)}`, 14, 65);
  doc.text(`Avg Nutrition Score / Skor Purata: ${avgScore}%`, 14, 71);

  let y = 84;
  const cols = [14, 44, 80, 116, 148, 176];
  const headers = ["Day/Hari", "Carb", "Protein", "Vegetable", "Fruit", "Cost (RM)"];

  doc.setFillColor(34, 87, 122);
  doc.rect(14, y - 6, pageWidth - 28, 9, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  headers.forEach((h, i) => doc.text(h, cols[i], y));

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  y += 10;

  meals.forEach((meal, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      doc.rect(14, y - 5, pageWidth - 28, 14, "F");
    }
    doc.setFontSize(8);
    doc.text(`${meal.day}`, cols[0], y);
    doc.text(`(${meal.dayMY})`, cols[0], y + 5);
    doc.text(meal.carb.nameMY, cols[1], y);
    doc.text(meal.protein.nameMY, cols[2], y);
    doc.text(meal.vegetable.nameMY, cols[3], y);
    doc.text(meal.fruit.nameMY, cols[4], y);
    doc.text(`RM${meal.totalCost.toFixed(2)}`, cols[5], y);
    y += 14;
  });

  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 130);
  doc.text("NutriBudget MY · PutraHack 2026 · Suku Suku Separuh Compliant / Patuh", pageWidth / 2, y, { align: "center" });

  doc.save("NutriBudget_MealPlan.pdf");
}
