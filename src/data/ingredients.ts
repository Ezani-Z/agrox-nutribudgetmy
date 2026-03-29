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
  pricePerServing: number;
  storePrices: Record<StoreId, number>;
  servingSize: string;
  isAvailable: boolean;
  /** Protein in grams per serving */
  proteinG: number;
  /** Calories per serving */
  calories: number;
}

function sp(def: number, lotus: number, speedmart: number, wellmart: number, mydin: number): Record<StoreId, number> {
  return { default: def, lotus, speedmart, wellmart, mydin };
}

export const defaultIngredients: Ingredient[] = [
  // ── Carbohydrates ──
  { id: "c1",  name: "White Rice",          nameMY: "Nasi Putih",        category: "carb", pricePerServing: 0.60, storePrices: sp(0.60, 0.55, 0.50, 0.55, 0.48), servingSize: "200g", isAvailable: true,  proteinG: 4,  calories: 260 },
  { id: "c2",  name: "Yellow Noodles",      nameMY: "Mi Kuning",         category: "carb", pricePerServing: 0.70, storePrices: sp(0.70, 0.65, 0.60, 0.65, 0.58), servingSize: "200g", isAvailable: true,  proteinG: 5,  calories: 280 },
  { id: "c3",  name: "Rice Vermicelli",     nameMY: "Bihun",             category: "carb", pricePerServing: 0.65, storePrices: sp(0.65, 0.60, 0.55, 0.60, 0.52), servingSize: "200g", isAvailable: true,  proteinG: 3,  calories: 250 },
  { id: "c4",  name: "Bread",               nameMY: "Roti",              category: "carb", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "2 slices", isAvailable: true, proteinG: 5, calories: 160 },
  { id: "c5",  name: "Fried Rice",          nameMY: "Nasi Goreng",       category: "carb", pricePerServing: 0.80, storePrices: sp(0.80, 0.75, 0.70, 0.75, 0.68), servingSize: "200g", isAvailable: true,  proteinG: 5,  calories: 310 },
  { id: "c6",  name: "Glutinous Rice",      nameMY: "Pulut",             category: "carb", pricePerServing: 0.75, storePrices: sp(0.75, 0.70, 0.65, 0.70, 0.62), servingSize: "200g", isAvailable: true,  proteinG: 3,  calories: 280 },
  { id: "c7",  name: "Spaghetti",           nameMY: "Spageti",           category: "carb", pricePerServing: 0.70, storePrices: sp(0.70, 0.68, 0.65, 0.68, 0.60), servingSize: "200g", isAvailable: true,  proteinG: 7,  calories: 290 },
  { id: "c8",  name: "Porridge",            nameMY: "Bubur",             category: "carb", pricePerServing: 0.55, storePrices: sp(0.55, 0.50, 0.48, 0.50, 0.45), servingSize: "250ml", isAvailable: true, proteinG: 3,  calories: 150 },
  { id: "c9",  name: "Roti Canai",          nameMY: "Roti Canai",        category: "carb", pricePerServing: 0.60, storePrices: sp(0.60, 0.58, 0.55, 0.58, 0.50), servingSize: "1 piece", isAvailable: true, proteinG: 4, calories: 240 },
  { id: "c10", name: "Nasi Lemak Rice",     nameMY: "Nasi Lemak",        category: "carb", pricePerServing: 0.75, storePrices: sp(0.75, 0.72, 0.68, 0.70, 0.65), servingSize: "200g", isAvailable: true,  proteinG: 5,  calories: 320 },
  { id: "c11", name: "Kuih Lapis",          nameMY: "Kuih Lapis",        category: "carb", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "2 pieces", isAvailable: true, proteinG: 2, calories: 180 },
  { id: "c12", name: "Oats",                nameMY: "Oat",               category: "carb", pricePerServing: 0.55, storePrices: sp(0.55, 0.52, 0.48, 0.50, 0.45), servingSize: "40g dry", isAvailable: true, proteinG: 5, calories: 150 },
  { id: "c13", name: "Sweet Potato",        nameMY: "Keledek",           category: "carb", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.40), servingSize: "150g", isAvailable: true,  proteinG: 2,  calories: 130 },
  { id: "c14", name: "Lontong Rice Cake",   nameMY: "Lontong",           category: "carb", pricePerServing: 0.65, storePrices: sp(0.65, 0.62, 0.58, 0.60, 0.55), servingSize: "200g", isAvailable: true,  proteinG: 3,  calories: 240 },

  // ── Proteins ──
  { id: "p1",  name: "Fried Chicken",       nameMY: "Ayam Goreng",       category: "protein", pricePerServing: 1.50, storePrices: sp(1.50, 1.45, 1.40, 1.42, 1.35), servingSize: "100g", isAvailable: true,  proteinG: 25, calories: 250 },
  { id: "p2",  name: "Chicken Curry",       nameMY: "Kari Ayam",         category: "protein", pricePerServing: 1.30, storePrices: sp(1.30, 1.25, 1.20, 1.22, 1.15), servingSize: "100g", isAvailable: true,  proteinG: 22, calories: 220 },
  { id: "p3",  name: "Fried Fish",          nameMY: "Ikan Goreng",       category: "protein", pricePerServing: 1.40, storePrices: sp(1.40, 1.35, 1.30, 1.32, 1.28), servingSize: "100g", isAvailable: true,  proteinG: 20, calories: 200 },
  { id: "p4",  name: "Fish Curry",          nameMY: "Kari Ikan",         category: "protein", pricePerServing: 1.25, storePrices: sp(1.25, 1.20, 1.15, 1.18, 1.10), servingSize: "100g", isAvailable: true,  proteinG: 18, calories: 190 },
  { id: "p5",  name: "Fried Egg",           nameMY: "Telur Goreng",      category: "protein", pricePerServing: 0.80, storePrices: sp(0.80, 0.75, 0.70, 0.72, 0.68), servingSize: "1 egg", isAvailable: true,  proteinG: 6,  calories: 90  },
  { id: "p6",  name: "Tofu",                nameMY: "Tauhu",             category: "protein", pricePerServing: 0.70, storePrices: sp(0.70, 0.65, 0.60, 0.62, 0.58), servingSize: "100g", isAvailable: true,  proteinG: 8,  calories: 76  },
  { id: "p7",  name: "Tempeh",              nameMY: "Tempeh",            category: "protein", pricePerServing: 0.75, storePrices: sp(0.75, 0.70, 0.68, 0.70, 0.65), servingSize: "100g", isAvailable: true,  proteinG: 19, calories: 195 },
  { id: "p8",  name: "Sardines",            nameMY: "Sardin",            category: "protein", pricePerServing: 1.10, storePrices: sp(1.10, 1.05, 0.99, 1.02, 0.95), servingSize: "100g", isAvailable: true,  proteinG: 21, calories: 208 },
  { id: "p9",  name: "Beef Rendang",        nameMY: "Rendang Daging",    category: "protein", pricePerServing: 1.80, storePrices: sp(1.80, 1.75, 1.70, 1.72, 1.65), servingSize: "100g", isAvailable: true,  proteinG: 26, calories: 280 },
  { id: "p10", name: "Chicken Soup",        nameMY: "Sup Ayam",          category: "protein", pricePerServing: 1.20, storePrices: sp(1.20, 1.15, 1.10, 1.12, 1.05), servingSize: "150ml", isAvailable: true, proteinG: 15, calories: 120 },
  { id: "p11", name: "Sambal Prawn",        nameMY: "Sambal Udang",      category: "protein", pricePerServing: 1.60, storePrices: sp(1.60, 1.55, 1.50, 1.52, 1.45), servingSize: "100g", isAvailable: true,  proteinG: 20, calories: 180 },
  { id: "p12", name: "Anchovy",             nameMY: "Ikan Bilis",        category: "protein", pricePerServing: 0.90, storePrices: sp(0.90, 0.85, 0.80, 0.82, 0.78), servingSize: "30g", isAvailable: true,   proteinG: 12, calories: 100 },
  { id: "p13", name: "Dhal Curry",          nameMY: "Kari Dal",          category: "protein", pricePerServing: 0.70, storePrices: sp(0.70, 0.65, 0.60, 0.62, 0.55), servingSize: "100ml", isAvailable: true, proteinG: 9,  calories: 120 },
  { id: "p14", name: "Chicken Rendang",     nameMY: "Rendang Ayam",      category: "protein", pricePerServing: 1.40, storePrices: sp(1.40, 1.35, 1.30, 1.32, 1.25), servingSize: "100g", isAvailable: true,  proteinG: 24, calories: 240 },
  { id: "p15", name: "Boiled Egg",          nameMY: "Telur Rebus",       category: "protein", pricePerServing: 0.65, storePrices: sp(0.65, 0.60, 0.55, 0.58, 0.52), servingSize: "1 egg", isAvailable: true,  proteinG: 6,  calories: 78  },

  // ── Vegetables ──
  { id: "v1",  name: "Stir-fried Kangkung", nameMY: "Kangkung Goreng",   category: "vegetable", pricePerServing: 0.55, storePrices: sp(0.55, 0.50, 0.48, 0.50, 0.45), servingSize: "100g", isAvailable: true,  proteinG: 3, calories: 40  },
  { id: "v2",  name: "Mixed Vegetables",    nameMY: "Sayur Campur",      category: "vegetable", pricePerServing: 0.65, storePrices: sp(0.65, 0.60, 0.58, 0.60, 0.55), servingSize: "100g", isAvailable: true,  proteinG: 3, calories: 50  },
  { id: "v3",  name: "Spinach Soup",        nameMY: "Sup Bayam",         category: "vegetable", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "100g", isAvailable: true,  proteinG: 3, calories: 30  },
  { id: "v4",  name: "Stir-fried Mustard Greens", nameMY: "Sawi Goreng", category: "vegetable", pricePerServing: 0.55, storePrices: sp(0.55, 0.52, 0.48, 0.50, 0.45), servingSize: "100g", isAvailable: true, proteinG: 2, calories: 35 },
  { id: "v5",  name: "Long Beans",          nameMY: "Kacang Panjang",    category: "vegetable", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "100g", isAvailable: true,  proteinG: 3, calories: 45  },
  { id: "v6",  name: "Cabbage",             nameMY: "Kobis",             category: "vegetable", pricePerServing: 0.45, storePrices: sp(0.45, 0.42, 0.40, 0.42, 0.38), servingSize: "100g", isAvailable: true,  proteinG: 1, calories: 25  },
  { id: "v7",  name: "Bean Sprouts",        nameMY: "Taugeh",            category: "vegetable", pricePerServing: 0.40, storePrices: sp(0.40, 0.38, 0.35, 0.38, 0.32), servingSize: "100g", isAvailable: true,  proteinG: 3, calories: 31  },
  { id: "v8",  name: "Cucumber",            nameMY: "Timun",             category: "vegetable", pricePerServing: 0.35, storePrices: sp(0.35, 0.32, 0.30, 0.32, 0.28), servingSize: "50g",  isAvailable: true,  proteinG: 0, calories: 8   },
  { id: "v9",  name: "Tomato",              nameMY: "Tomato",            category: "vegetable", pricePerServing: 0.40, storePrices: sp(0.40, 0.38, 0.35, 0.38, 0.32), servingSize: "50g",  isAvailable: true,  proteinG: 0, calories: 9   },
  { id: "v10", name: "Carrot",              nameMY: "Lobak Merah",       category: "vegetable", pricePerServing: 0.45, storePrices: sp(0.45, 0.42, 0.40, 0.42, 0.38), servingSize: "50g",  isAvailable: true,  proteinG: 0, calories: 20  },
  { id: "v11", name: "Ulam (Raw Herbs)",    nameMY: "Ulam",              category: "vegetable", pricePerServing: 0.30, storePrices: sp(0.30, 0.28, 0.25, 0.28, 0.22), servingSize: "50g",  isAvailable: true,  proteinG: 2, calories: 20  },
  { id: "v12", name: "Pumpkin",             nameMY: "Labu",              category: "vegetable", pricePerServing: 0.40, storePrices: sp(0.40, 0.38, 0.35, 0.38, 0.32), servingSize: "100g", isAvailable: true,  proteinG: 1, calories: 26  },

  // ── Fruits ──
  { id: "f1", name: "Banana",               nameMY: "Pisang",            category: "fruit", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "1 piece", isAvailable: true, proteinG: 1, calories: 89  },
  { id: "f2", name: "Watermelon",           nameMY: "Tembikai",          category: "fruit", pricePerServing: 0.55, storePrices: sp(0.55, 0.52, 0.50, 0.52, 0.48), servingSize: "100g",   isAvailable: true, proteinG: 1, calories: 30  },
  { id: "f3", name: "Papaya",               nameMY: "Betik",             category: "fruit", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "100g",   isAvailable: true, proteinG: 1, calories: 43  },
  { id: "f4", name: "Orange",               nameMY: "Oren",              category: "fruit", pricePerServing: 0.70, storePrices: sp(0.70, 0.68, 0.65, 0.68, 0.62), servingSize: "1 piece", isAvailable: true, proteinG: 1, calories: 62  },
  { id: "f5", name: "Guava",                nameMY: "Jambu Batu",        category: "fruit", pricePerServing: 0.60, storePrices: sp(0.60, 0.58, 0.55, 0.58, 0.52), servingSize: "1 piece", isAvailable: true, proteinG: 3, calories: 68  },
  { id: "f6", name: "Jackfruit",            nameMY: "Nangka",            category: "fruit", pricePerServing: 0.55, storePrices: sp(0.55, 0.52, 0.48, 0.50, 0.45), servingSize: "100g",   isAvailable: true, proteinG: 1, calories: 95  },
  { id: "f7", name: "Rambutan",             nameMY: "Rambutan",          category: "fruit", pricePerServing: 0.50, storePrices: sp(0.50, 0.48, 0.45, 0.48, 0.42), servingSize: "5 pieces", isAvailable: true, proteinG: 1, calories: 68 },
  { id: "f8", name: "Starfruit",            nameMY: "Belimbing",         category: "fruit", pricePerServing: 0.45, storePrices: sp(0.45, 0.42, 0.40, 0.42, 0.38), servingSize: "1 piece", isAvailable: true, proteinG: 1, calories: 31  },
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

/** Protein per RM at a given store */
export function getProteinPerRM(ingredient: Ingredient, store: StoreId): number {
  const price = getPrice(ingredient, store);
  return price > 0 ? ingredient.proteinG / price : 0;
}

/** Calories per RM at a given store */
export function getCaloriesPerRM(ingredient: Ingredient, store: StoreId): number {
  const price = getPrice(ingredient, store);
  return price > 0 ? ingredient.calories / price : 0;
}
