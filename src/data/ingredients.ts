export type IngredientCategory = "carb" | "protein" | "vegetable" | "fruit";

export interface Ingredient {
  id: string;
  name: string;
  nameMY: string;
  category: IngredientCategory;
  pricePerServing: number;
  servingSize: number; // in grams
  servingUnit: string; // typically "g"
  isAvailable: boolean;
  /** Protein in grams per serving */
  proteinG: number;
  /** Calories per serving */
  calories: number;
}

export const defaultIngredients: Ingredient[] = [
  // ── Carbohydrates ──
  { id: "c1",  name: "White Rice",          nameMY: "Nasi Putih",        category: "carb", pricePerServing: 0.60, servingSize: 200, isAvailable: true,  proteinG: 4,  calories: 260 },
  { id: "c2",  name: "Yellow Noodles",      nameMY: "Mi Kuning",         category: "carb", pricePerServing: 0.70, servingSize: 200, isAvailable: true,  proteinG: 5,  calories: 280 },
  { id: "c3",  name: "Rice Vermicelli",     nameMY: "Bihun",             category: "carb", pricePerServing: 0.65, servingSize: 200, isAvailable: true,  proteinG: 3,  calories: 250 },
  { id: "c4",  name: "Bread",               nameMY: "Roti",              category: "carb", pricePerServing: 0.50, servingSize: 60, isAvailable: true, proteinG: 5, calories: 160 },
  { id: "c5",  name: "Fried Rice",          nameMY: "Nasi Goreng",       category: "carb", pricePerServing: 0.80, servingSize: 200, isAvailable: true,  proteinG: 5,  calories: 310 },
  { id: "c6",  name: "Glutinous Rice",      nameMY: "Pulut",             category: "carb", pricePerServing: 0.75, servingSize: 200, isAvailable: true,  proteinG: 3,  calories: 280 },
  { id: "c7",  name: "Spaghetti",           nameMY: "Spageti",           category: "carb", pricePerServing: 0.70, servingSize: 200, isAvailable: true,  proteinG: 7,  calories: 290 },
  { id: "c8",  name: "Porridge",            nameMY: "Bubur",             category: "carb", pricePerServing: 0.55, servingSize: 250, isAvailable: true, proteinG: 3,  calories: 150 },
  { id: "c9",  name: "Roti Canai",          nameMY: "Roti Canai",        category: "carb", pricePerServing: 0.60, servingSize: 60, isAvailable: true, proteinG: 4, calories: 240 },
  { id: "c10", name: "Nasi Lemak Rice",     nameMY: "Nasi Lemak",        category: "carb", pricePerServing: 0.75, servingSize: 200, isAvailable: true,  proteinG: 5,  calories: 320 },
  { id: "c11", name: "Kuih Lapis",          nameMY: "Kuih Lapis",        category: "carb", pricePerServing: 0.50, servingSize: 40, isAvailable: true, proteinG: 2, calories: 180 },
  { id: "c12", name: "Oats",                nameMY: "Oat",               category: "carb", pricePerServing: 0.55, servingSize: 40, isAvailable: true, proteinG: 5, calories: 150 },
  { id: "c13", name: "Sweet Potato",        nameMY: "Keledek",           category: "carb", pricePerServing: 0.50, servingSize: 150, isAvailable: true,  proteinG: 2,  calories: 130 },
  { id: "c14", name: "Lontong Rice Cake",   nameMY: "Lontong",           category: "carb", pricePerServing: 0.65, servingSize: 200, isAvailable: true,  proteinG: 3,  calories: 240 },

  // ── Proteins ──
  { id: "p1",  name: "Fried Chicken",       nameMY: "Ayam Goreng",       category: "protein", pricePerServing: 1.50, servingSize: 100, isAvailable: true,  proteinG: 25, calories: 250 },
  { id: "p2",  name: "Chicken Curry",       nameMY: "Kari Ayam",         category: "protein", pricePerServing: 1.30, servingSize: 100, isAvailable: true,  proteinG: 22, calories: 220 },
  { id: "p3",  name: "Fried Fish",          nameMY: "Ikan Goreng",       category: "protein", pricePerServing: 1.40, servingSize: 100, isAvailable: true,  proteinG: 20, calories: 200 },
  { id: "p4",  name: "Fish Curry",          nameMY: "Kari Ikan",         category: "protein", pricePerServing: 1.25, servingSize: 100, isAvailable: true,  proteinG: 18, calories: 190 },
  { id: "p5",  name: "Fried Egg",           nameMY: "Telur Goreng",      category: "protein", pricePerServing: 0.80, servingSize: 50, isAvailable: true,  proteinG: 6,  calories: 90  },
  { id: "p6",  name: "Tofu",                nameMY: "Tauhu",             category: "protein", pricePerServing: 0.70, servingSize: 100, isAvailable: true,  proteinG: 8,  calories: 76  },
  { id: "p7",  name: "Tempeh",              nameMY: "Tempeh",            category: "protein", pricePerServing: 0.75, servingSize: 100, isAvailable: true,  proteinG: 19, calories: 195 },
  { id: "p8",  name: "Sardines",            nameMY: "Sardin",            category: "protein", pricePerServing: 1.10, servingSize: 100, isAvailable: true,  proteinG: 21, calories: 208 },
  { id: "p9",  name: "Beef Rendang",        nameMY: "Rendang Daging",    category: "protein", pricePerServing: 1.80, servingSize: 100, isAvailable: true,  proteinG: 26, calories: 280 },
  { id: "p10", name: "Chicken Soup",        nameMY: "Sup Ayam",          category: "protein", pricePerServing: 1.20, servingSize: 150, isAvailable: true, proteinG: 15, calories: 120 },
  { id: "p11", name: "Sambal Prawn",        nameMY: "Sambal Udang",      category: "protein", pricePerServing: 1.60, servingSize: 100, isAvailable: true,  proteinG: 20, calories: 180 },
  { id: "p12", name: "Anchovy",             nameMY: "Ikan Bilis",        category: "protein", pricePerServing: 0.90, servingSize: 30, isAvailable: true,   proteinG: 12, calories: 100 },
  { id: "p13", name: "Dhal Curry",          nameMY: "Kari Dal",          category: "protein", pricePerServing: 0.70, servingSize: 100, isAvailable: true, proteinG: 9,  calories: 120 },
  { id: "p14", name: "Chicken Rendang",     nameMY: "Rendang Ayam",      category: "protein", pricePerServing: 1.40, servingSize: 100, isAvailable: true,  proteinG: 24, calories: 240 },
  { id: "p15", name: "Boiled Egg",          nameMY: "Telur Rebus",       category: "protein", pricePerServing: 0.65, servingSize: 50, isAvailable: true,  proteinG: 6,  calories: 78  },

  // ── Vegetables ──
  { id: "v1",  name: "Stir-fried Kangkung", nameMY: "Kangkung Goreng",   category: "vegetable", pricePerServing: 0.55, servingSize: 100, isAvailable: true,  proteinG: 3, calories: 40  },
  { id: "v2",  name: "Mixed Vegetables",    nameMY: "Sayur Campur",      category: "vegetable", pricePerServing: 0.65, servingSize: 100, isAvailable: true,  proteinG: 3, calories: 50  },
  { id: "v3",  name: "Spinach Soup",        nameMY: "Sup Bayam",         category: "vegetable", pricePerServing: 0.50, servingSize: 100, isAvailable: true,  proteinG: 3, calories: 30  },
  { id: "v4",  name: "Stir-fried Mustard Greens", nameMY: "Sawi Goreng", category: "vegetable", pricePerServing: 0.55, servingSize: 100, isAvailable: true, proteinG: 2, calories: 35 },
  { id: "v5",  name: "Long Beans",          nameMY: "Kacang Panjang",    category: "vegetable", pricePerServing: 0.50, servingSize: 100, isAvailable: true,  proteinG: 3, calories: 45  },
  { id: "v6",  name: "Cabbage",             nameMY: "Kobis",             category: "vegetable", pricePerServing: 0.45, servingSize: 100, isAvailable: true,  proteinG: 1, calories: 25  },
  { id: "v7",  name: "Bean Sprouts",        nameMY: "Taugeh",            category: "vegetable", pricePerServing: 0.40, servingSize: 100, isAvailable: true,  proteinG: 3, calories: 31  },
  { id: "v8",  name: "Cucumber",            nameMY: "Timun",             category: "vegetable", pricePerServing: 0.35, servingSize: 50,  isAvailable: true,  proteinG: 0, calories: 8   },
  { id: "v9",  name: "Tomato",              nameMY: "Tomato",            category: "vegetable", pricePerServing: 0.40, servingSize: 50,  isAvailable: true,  proteinG: 0, calories: 9   },
  { id: "v10", name: "Carrot",              nameMY: "Lobak Merah",       category: "vegetable", pricePerServing: 0.45, servingSize: 50,  isAvailable: true,  proteinG: 0, calories: 20  },
  { id: "v11", name: "Ulam (Raw Herbs)",    nameMY: "Ulam",              category: "vegetable", pricePerServing: 0.30, servingSize: 50,  isAvailable: true,  proteinG: 2, calories: 20  },
  { id: "v12", name: "Pumpkin",             nameMY: "Labu",              category: "vegetable", pricePerServing: 0.40, servingSize: 100, isAvailable: true,  proteinG: 1, calories: 26  },

  // ── Fruits ──
  { id: "f1", name: "Banana",               nameMY: "Pisang",            category: "fruit", pricePerServing: 0.50, servingSize: 120, isAvailable: true, proteinG: 1, calories: 89  },
  { id: "f2", name: "Watermelon",           nameMY: "Tembikai",          category: "fruit", pricePerServing: 0.55, servingSize: 100,   isAvailable: true, proteinG: 1, calories: 30  },
  { id: "f3", name: "Papaya",               nameMY: "Betik",             category: "fruit", pricePerServing: 0.50, servingSize: 100,   isAvailable: true, proteinG: 1, calories: 43  },
  { id: "f4", name: "Orange",               nameMY: "Oren",              category: "fruit", pricePerServing: 0.70, servingSize: 130, isAvailable: true, proteinG: 1, calories: 62  },
  { id: "f5", name: "Guava",                nameMY: "Jambu Batu",        category: "fruit", pricePerServing: 0.60, servingSize: 150, isAvailable: true, proteinG: 3, calories: 68  },
  { id: "f6", name: "Jackfruit",            nameMY: "Nangka",            category: "fruit", pricePerServing: 0.55, servingSize: 100,   isAvailable: true, proteinG: 1, calories: 95  },
  { id: "f7", name: "Rambutan",             nameMY: "Rambutan",          category: "fruit", pricePerServing: 0.50, servingSize: 150, isAvailable: true, proteinG: 1, calories: 68 },
  { id: "f8", name: "Starfruit",            nameMY: "Belimbing",         category: "fruit", pricePerServing: 0.45, servingSize: 30, isAvailable: true, proteinG: 1, calories: 31  },
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

/** Protein per RM */
export function getProteinPerRM(ingredient: Ingredient): number {
  return ingredient.pricePerServing > 0 ? ingredient.proteinG / ingredient.pricePerServing : 0;
}

/** Calories per RM */
export function getCaloriesPerRM(ingredient: Ingredient): number {
  return ingredient.pricePerServing > 0 ? ingredient.calories / ingredient.pricePerServing : 0;
}
