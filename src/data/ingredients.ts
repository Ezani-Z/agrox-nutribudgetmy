export type IngredientCategory = "carb" | "protein" | "vegetable" | "fruit";

export interface Ingredient {
  id: string;
  name: string;
  nameMY: string;
  category: IngredientCategory;
  pricePerServing: number; // RM per serving
  servingSize: string;
  isAvailable: boolean;
}

export const defaultIngredients: Ingredient[] = [
  // Carbohydrates
  { id: "c1", name: "White Rice", nameMY: "Nasi Putih", category: "carb", pricePerServing: 0.30, servingSize: "200g", isAvailable: true },
  { id: "c2", name: "Yellow Noodles", nameMY: "Mi Kuning", category: "carb", pricePerServing: 0.40, servingSize: "200g", isAvailable: true },
  { id: "c3", name: "Rice Vermicelli", nameMY: "Bihun", category: "carb", pricePerServing: 0.35, servingSize: "200g", isAvailable: true },
  { id: "c4", name: "Bread", nameMY: "Roti", category: "carb", pricePerServing: 0.25, servingSize: "2 slices", isAvailable: true },
  { id: "c5", name: "Fried Rice", nameMY: "Nasi Goreng", category: "carb", pricePerServing: 0.45, servingSize: "200g", isAvailable: true },
  { id: "c6", name: "Glutinous Rice", nameMY: "Pulut", category: "carb", pricePerServing: 0.50, servingSize: "200g", isAvailable: true },
  { id: "c7", name: "Spaghetti", nameMY: "Spageti", category: "carb", pricePerServing: 0.45, servingSize: "200g", isAvailable: true },
  { id: "c8", name: "Porridge", nameMY: "Bubur", category: "carb", pricePerServing: 0.25, servingSize: "250ml", isAvailable: true },

  // Proteins
  { id: "p1", name: "Fried Chicken", nameMY: "Ayam Goreng", category: "protein", pricePerServing: 1.20, servingSize: "100g", isAvailable: true },
  { id: "p2", name: "Chicken Curry", nameMY: "Kari Ayam", category: "protein", pricePerServing: 1.00, servingSize: "100g", isAvailable: true },
  { id: "p3", name: "Fried Fish", nameMY: "Ikan Goreng", category: "protein", pricePerServing: 1.10, servingSize: "100g", isAvailable: true },
  { id: "p4", name: "Fish Curry", nameMY: "Kari Ikan", category: "protein", pricePerServing: 1.00, servingSize: "100g", isAvailable: true },
  { id: "p5", name: "Fried Egg", nameMY: "Telur Goreng", category: "protein", pricePerServing: 0.50, servingSize: "1 egg", isAvailable: true },
  { id: "p6", name: "Tofu", nameMY: "Tauhu", category: "protein", pricePerServing: 0.40, servingSize: "100g", isAvailable: true },
  { id: "p7", name: "Tempeh", nameMY: "Tempeh", category: "protein", pricePerServing: 0.45, servingSize: "100g", isAvailable: true },
  { id: "p8", name: "Sardines", nameMY: "Sardin", category: "protein", pricePerServing: 0.80, servingSize: "100g", isAvailable: true },
  { id: "p9", name: "Beef Rendang", nameMY: "Rendang Daging", category: "protein", pricePerServing: 1.50, servingSize: "100g", isAvailable: true },
  { id: "p10", name: "Chicken Soup", nameMY: "Sup Ayam", category: "protein", pricePerServing: 0.90, servingSize: "150ml", isAvailable: true },

  // Vegetables
  { id: "v1", name: "Stir-fried Kangkung", nameMY: "Kangkung Goreng", category: "vegetable", pricePerServing: 0.40, servingSize: "100g", isAvailable: true },
  { id: "v2", name: "Mixed Vegetables", nameMY: "Sayur Campur", category: "vegetable", pricePerServing: 0.50, servingSize: "100g", isAvailable: true },
  { id: "v3", name: "Spinach Soup", nameMY: "Sup Bayam", category: "vegetable", pricePerServing: 0.35, servingSize: "100g", isAvailable: true },
  { id: "v4", name: "Stir-fried Mustard Greens", nameMY: "Sawi Goreng", category: "vegetable", pricePerServing: 0.40, servingSize: "100g", isAvailable: true },
  { id: "v5", name: "Long Beans", nameMY: "Kacang Panjang", category: "vegetable", pricePerServing: 0.35, servingSize: "100g", isAvailable: true },
  { id: "v6", name: "Cabbage", nameMY: "Kobis", category: "vegetable", pricePerServing: 0.30, servingSize: "100g", isAvailable: true },
  { id: "v7", name: "Bean Sprouts", nameMY: "Taugeh", category: "vegetable", pricePerServing: 0.25, servingSize: "100g", isAvailable: true },
  { id: "v8", name: "Cucumber", nameMY: "Timun", category: "vegetable", pricePerServing: 0.20, servingSize: "50g", isAvailable: true },
  { id: "v9", name: "Tomato", nameMY: "Tomato", category: "vegetable", pricePerServing: 0.25, servingSize: "50g", isAvailable: true },
  { id: "v10", name: "Carrot", nameMY: "Lobak Merah", category: "vegetable", pricePerServing: 0.30, servingSize: "50g", isAvailable: true },

  // Fruits
  { id: "f1", name: "Banana", nameMY: "Pisang", category: "fruit", pricePerServing: 0.30, servingSize: "1 piece", isAvailable: true },
  { id: "f2", name: "Watermelon", nameMY: "Tembikai", category: "fruit", pricePerServing: 0.35, servingSize: "100g", isAvailable: true },
  { id: "f3", name: "Papaya", nameMY: "Betik", category: "fruit", pricePerServing: 0.30, servingSize: "100g", isAvailable: true },
  { id: "f4", name: "Orange", nameMY: "Oren", category: "fruit", pricePerServing: 0.50, servingSize: "1 piece", isAvailable: true },
  { id: "f5", name: "Guava", nameMY: "Jambu Batu", category: "fruit", pricePerServing: 0.40, servingSize: "1 piece", isAvailable: true },
];

export const categoryLabels: Record<IngredientCategory, string> = {
  carb: "Karbohidrat",
  protein: "Protein",
  vegetable: "Sayur-sayuran",
  fruit: "Buah-buahan",
};

export const categoryColors: Record<IngredientCategory, string> = {
  carb: "hsl(36, 60%, 50%)",
  protein: "hsl(0, 60%, 55%)",
  vegetable: "hsl(152, 55%, 33%)",
  fruit: "hsl(280, 50%, 55%)",
};
