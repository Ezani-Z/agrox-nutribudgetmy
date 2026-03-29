import { useState } from "react";
import { Ingredient, IngredientCategory, StoreId, categoryLabels, stores, getPrice } from "@/data/ingredients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Edit2, Check, Store } from "lucide-react";

interface IngredientManagerProps {
  ingredients: Ingredient[];
  onUpdate: (ingredients: Ingredient[]) => void;
  selectedStore: StoreId;
  onStoreChange: (store: StoreId) => void;
}

const CATEGORIES: IngredientCategory[] = ["carb", "protein", "vegetable", "fruit"];

const categoryBadgeClasses: Record<IngredientCategory, string> = {
  carb: "bg-secondary/20 text-secondary border-secondary/30",
  protein: "bg-destructive/15 text-destructive border-destructive/30",
  vegetable: "bg-accent text-accent-foreground border-primary/30",
  fruit: "bg-primary/15 text-primary border-primary/30",
};

export function IngredientManager({ ingredients, onUpdate, selectedStore, onStoreChange }: IngredientManagerProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<IngredientCategory | "all">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const filtered = ingredients.filter(i => {
    const matchSearch = i.nameMY.toLowerCase().includes(search.toLowerCase()) || i.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || i.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleToggle = (id: string) => {
    onUpdate(ingredients.map(i => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
  };

  const handlePriceEdit = (id: string) => {
    const price = parseFloat(editPrice);
    if (!isNaN(price) && price > 0) {
      onUpdate(ingredients.map(i => i.id === id ? {
        ...i,
        storePrices: { ...i.storePrices, [selectedStore]: Math.round(price * 100) / 100 },
        pricePerServing: selectedStore === "default" ? Math.round(price * 100) / 100 : i.pricePerServing,
      } : i));
    }
    setEditingId(null);
    setEditPrice("");
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-lg">
          Ingredient Database
          <span className="text-sm font-normal text-muted-foreground ml-2">/ Pangkalan Data Bahan</span>
        </CardTitle>

        {/* Store Selector */}
        <div className="flex items-center gap-2">
          <Store className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Store / Kedai:</span>
          <Select value={selectedStore} onValueChange={(v) => onStoreChange(v as StoreId)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {stores.map(s => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name} {s.nameMY !== s.name ? `/ ${s.nameMY}` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients / Cari bahan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={activeCategory === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory("all")}
          >
            All / Semua
          </Badge>
          {CATEGORIES.map(cat => (
            <Badge
              key={cat}
              variant="outline"
              className={`cursor-pointer ${activeCategory === cat ? categoryBadgeClasses[cat] : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat].en} / {categoryLabels[cat].my}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {filtered.map(ingredient => {
            const price = getPrice(ingredient, selectedStore);
            return (
              <div
                key={ingredient.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  ingredient.isAvailable ? "bg-card" : "bg-muted/50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Switch
                    checked={ingredient.isAvailable}
                    onCheckedChange={() => handleToggle(ingredient.id)}
                  />
                  <div>
                    <p className="font-medium text-sm">{ingredient.nameMY}</p>
                    <p className="text-xs text-muted-foreground">{ingredient.name} · {ingredient.servingSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={categoryBadgeClasses[ingredient.category]}>
                    {categoryLabels[ingredient.category].en}
                  </Badge>
                  {editingId === ingredient.id ? (
                    <div className="flex items-center gap-1">
                      <Input
                        value={editPrice}
                        onChange={e => setEditPrice(e.target.value)}
                        className="w-20 h-8 text-sm"
                        type="number"
                        step="0.05"
                        autoFocus
                        onKeyDown={e => e.key === "Enter" && handlePriceEdit(ingredient.id)}
                      />
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handlePriceEdit(ingredient.id)}>
                        <Check className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      onClick={() => { setEditingId(ingredient.id); setEditPrice(price.toFixed(2)); }}
                    >
                      RM{price.toFixed(2)}
                      <Edit2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
