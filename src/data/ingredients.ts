export type IngredientCategory = "carb" | "protein" | "vegetable" | "fruit";

export type StoreId = "default" | "lotus" | "speedmart" | "wellmart" | "mydin";

export interface StoreInfo {
  id: StoreId;
  name: string;
  nameMY: string;
}

export const stores: StoreInfo[] = [
  { id: "default", name: "Default Estimate", nameMY: "Anggaran Asal" },
  { id: "lotus", name: "Lotus's", nameMY: "Lotus's" },
  { id: "speedmart", name: "99 Speedmart", nameMY: "99 Speedmart" },
  { id: "wellmart", name: "Wellmart", nameMY: "Wellmart" },
  { id: "mydin", name: "Mydin", nameMY: "Mydin" },
];

export interface Ingredient {
  id: string;
  name: string;
  nameMY: string;
  category: IngredientCategory;
  pricePerServing: number; // RM per serving (default)
  storePrices: Record<StoreId, number>;
  servingSize: string;
  isAvailable: boolean;
}

function sp(def: number, lotus: number, speedmart: number, wellmart: number, mydin: number): Record<StoreId, number> {
  return { default: def, lotus, speedmart, wellmart, mydin };
}

export const defaultIngredients: Ingredient[] = [
  // Carbohydrates
  { id: "c1", name: "White Rice", nameMY: "Nasi Putih", category: "carb", pricePerServing: 0.60, storePrices: sp(0.60, 0.55, 0.50, 0.55, 0.48), servingSize: "200g", isAvailable: true },
  { id: "c2", name: "Yellow Noodles", nameMY: "Mi Kuning", category: "carb", pricePerServing: 0.70, storePrices: sp(0.70, 0.65, 0.60, 0.65, 0.58), servingSize: "200g", isAvailable: true },
  { id: "c3", name: "Rice Vermicelli", nameMY: "Bihun", category: "carb", pricePerServing: 0.65, storePrices: sp(0.65, 0.60, 0.55, 0.60, 0.52), servingSize: "200g", isAvailable: true },
  { id: "c4", name: "Bread", nameMY: "Roti", category: "carb", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "2 slices", isAvailable: true },
  { id: "c5", name: "Fried Rice", nameMY: "Nasi Goreng", category: "carb", pricePerServing: 0.80, storePrices: sp(0.80, 0.75, 0.70, 0.75, 0.68), servingSize: "200g", isAvailable: true },
  { id: "c6", name: "Glutinous Rice", nameMY: "Pulut", category: "carb", pricePerServing: 0.75, storePrices: sp(0.75, 0.70, 0.65, 0.70, 0.62), servingSize: "200g", isAvailable: true },
  { id: "c7", name: "Spaghetti", nameMY: "Spageti", category: "carb", pricePerServing: 0.70, storePrices: sp(0.70, 0.68, 0.65, 0.68, 0.60), servingSize: "200g", isAvailable: true },
  { id: "c8", name: "Porridge", nameMY: "Bubur", category: "carb", pricePerServing: 0.55, storePrices: sp(0.55, 0.50, 0.48, 0.50, 0.45), servingSize: "250ml", isAvailable: true },

  // Proteins
  { id: "p1", name: "Fried Chicken", nameMY: "Ayam Goreng", category: "protein", pricePerServing: 1.50, storePrices: sp(1.50, 1.45, 1.40, 1.42, 1.35), servingSize: "100g", isAvailable: true },
  { id: "p2", name: "Chicken Curry", nameMY: "Kari Ayam", category: "protein", pricePerServing: 1.30, storePrices: sp(1.30, 1.25, 1.20, 1.22, 1.15), servingSize: "100g", isAvailable: true },
  { id: "p3", name: "Fried Fish", nameMY: "Ikan Goreng", category: "protein", pricePerServing: 1.40, storePrices: sp(1.40, 1.35, 1.30, 1.32, 1.28), servingSize: "100g", isAvailable: true },
  { id: "p4", name: "Fish Curry", nameMY: "Kari Ikan", category: "protein", pricePerServing: 1.25, storePrices: sp(1.25, 1.20, 1.15, 1.18, 1.10), servingSize: "100g", isAvailable: true },
  { id: "p5", name: "Fried Egg", nameMY: "Telur Goreng", category: "protein", pricePerServing: 0.80, storePrices: sp(0.80, 0.75, 0.70, 0.72, 0.68), servingSize: "1 egg", isAvailable: true },
  { id: "p6", name: "Tofu", nameMY: "Tauhu", category: "protein", pricePerServing: 0.70, storePrices: sp(0.70, 0.65, 0.60, 0.62, 0.58), servingSize: "100g", isAvailable: true },
  { id: "p7", name: "Tempeh", nameMY: "Tempeh", category: "protein", pricePerServing: 0.75, storePrices: sp(0.75, 0.70, 0.68, 0.70, 0.65), servingSize: "100g", isAvailable: true },
  { id: "p8", name: "Sardines", nameMY: "Sardin", category: "protein", pricePerServing: 1.10, storePrices: sp(1.10, 1.05, 0.99, 1.02, 0.95), servingSize: "100g", isAvailable: true },
  { id: "p9", name: "Beef Rendang", nameMY: "Rendang Daging", category: "protein", pricePerServing: 1.80, storePrices: sp(1.80, 1.75, 1.70, 1.72, 1.65), servingSize: "100g", isAvailable: true },
  { id: "p10", name: "Chicken Soup", nameMY: "Sup Ayam", category: "protein", pricePerServing: 1.20, storePrices: sp(1.20, 1.15, 1.10, 1.12, 1.05), servingSize: "150ml", isAvailable: true },

  // Vegetables
  { id: "v1", name: "Stir-fried Kangkung", nameMY: "Kangkung Goreng", category: "vegetable", pricePerServing: 0.55, storePrices: sp(0.55, 0.50, 0.48, 0.50, 0.45), servingSize: "100g", isAvailable: true },
  { id: "v2", name: "Mixed Vegetables", nameMY: "Sayur Campur", category: "vegetable", pricePerServing: 0.65, storePrices: sp(0.65, 0.60, 0.58, 0.60, 0.55), servingSize: "100g", isAvailable: true },
  { id: "v3", name: "Spinach Soup", nameMY: "Sup Bayam", category: "vegetable", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "100g", isAvailable: true },
  { id: "v4", name: "Stir-fried Mustard Greens", nameMY: "Sawi Goreng", category: "vegetable", pricePerServing: 0.55, storePrices: sp(0.55, 0.52, 0.48, 0.50, 0.45), servingSize: "100g", isAvailable: true },
  { id: "v5", name: "Long Beans", nameMY: "Kacang Panjang", category: "vegetable", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "100g", isAvailable: true },
  { id: "v6", name: "Cabbage", nameMY: "Kobis", category: "vegetable", pricePerServing: 0.45, storePrices: sp(0.45, 0.42, 0.40, 0.42, 0.38), servingSize: "100g", isAvailable: true },
  { id: "v7", name: "Bean Sprouts", nameMY: "Taugeh", category: "vegetable", pricePerServing: 0.40, storePrices: sp(0.40, 0.38, 0.35, 0.38, 0.32), servingSize: "100g", isAvailable: true },
  { id: "v8", name: "Cucumber", nameMY: "Timun", category: "vegetable", pricePerServing: 0.35, storePrices: sp(0.35, 0.32, 0.30, 0.32, 0.28), servingSize: "50g", isAvailable: true },
  { id: "v9", name: "Tomato", nameMY: "Tomato", category: "vegetable", pricePerServing: 0.40, storePrices: sp(0.40, 0.38, 0.35, 0.38, 0.32), servingSize: "50g", isAvailable: true },
  { id: "v10", name: "Carrot", nameMY: "Lobak Merah", category: "vegetable", pricePerServing: 0.45, storePrices: sp(0.45, 0.42, 0.40, 0.42, 0.38), servingSize: "50g", isAvailable: true },

  // Fruits
  { id: "f1", name: "Banana", nameMY: "Pisang", category: "fruit", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "1 piece", isAvailable: true },
  { id: "f2", name: "Watermelon", nameMY: "Tembikai", category: "fruit", pricePerServing: 0.55, storePrices: sp(0.55, 0.52, 0.50, 0.52, 0.48), servingSize: "100g", isAvailable: true },
  { id: "f3", name: "Papaya", nameMY: "Betik", category: "fruit", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "100g", isAvailable: true },
  { id: "f4", name: "Orange", nameMY: "Oren", category: "fruit", pricePerServing: 0.70, storePrices: sp(0.70, 0.68, 0.65, 0.68, 0.62), servingSize: "1 piece", isAvailable: true },
  { id: "f5", name: "Guava", nameMY: "Jambu Batu", category: "fruit", pricePerServing: 0.60, storePrices: sp(0.60, 0.58, 0.55, 0.58, 0.52), servingSize: "1 piece", isAvailable: true },
];

export const categoryLabels: Record<IngredientCategory, { en: string; my: string }> = {
  carb: { en: "Carbohydrates", my: "Karbohidrat" },
  protein: { en: "Protein", my: "Protein" },
  vegetable: { en: "Vegetables", my: "Sayur-sayuran" },
  fruit: { en: "Fruits", my: "Buah-buahan" },
};

export const categoryColors: Record<IngredientCategory, string> = {
  carb: "hsl(36, 60%, 50%)",
  protein: "hsl(0, 60%, 55%)",
  vegetable: "hsl(152, 55%, 33%)",
  fruit: "hsl(280, 50%, 55%)",
};

export function getPrice(ingredient: Ingredient, store: StoreId): number {
  return ingredient.storePrices[store] ?? ingredient.pricePerServing;
}
