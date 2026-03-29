import { useState, useEffect } from "react";
import { UtensilsCrossed } from "lucide-react";

const tips = [
  { en: "Buying seasonal fruits saves up to 40% — check what's in season!", my: "Beli buah mengikut musim jimat sehingga 40% — semak apa yang sedang musim!" },
  { en: "Eggs are one of the cheapest complete protein sources at ~RM0.65 each.", my: "Telur adalah salah satu sumber protein lengkap termurah pada ~RM0.65 sebiji." },
  { en: "Tempeh has 3× more protein per RM than chicken breast.", my: "Tempeh mempunyai 3× lebih protein per RM berbanding dada ayam." },
  { en: "Frozen vegetables are just as nutritious and often 30% cheaper.", my: "Sayur sejuk beku sama berkhasiat dan selalunya 30% lebih murah." },
  { en: "A balanced Suku Suku Separuh plate helps children concentrate better in class.", my: "Pinggan seimbang Suku Suku Separuh membantu kanak-kanak lebih fokus di kelas." },
  { en: "Cooking rice with a lid saves 20% energy and keeps nutrients intact.", my: "Masak nasi bertutup jimat 20% tenaga dan kekalkan nutrien." },
  { en: "Bananas are the best budget fruit — high energy at under RM0.50 each.", my: "Pisang adalah buah bajet terbaik — tenaga tinggi di bawah RM0.50 sebiji." },
  { en: "Kangkung is a superfood — rich in iron and one of the cheapest greens.", my: "Kangkung adalah makanan super — kaya zat besi dan sayur termurah." },
  { en: "Plan your weekly menu to reduce food waste by up to 25%.", my: "Rancang menu mingguan untuk kurangkan pembaziran makanan sehingga 25%." },
  { en: "Sardines in a can give you omega-3 and protein at under RM1.00/serving.", my: "Sardin tin beri anda omega-3 dan protein di bawah RM1.00/hidangan." },
];

interface LoadingScreenProps {
  lang: "en" | "my";
}

export function LoadingScreen({ lang }: LoadingScreenProps) {
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * tips.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const tip = tips[tipIndex];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 max-w-md text-center animate-fade-in">
        <div className="h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center">
          <UtensilsCrossed className="h-8 w-8 text-primary animate-pulse" />
        </div>

        <div>
          <h1 className="text-xl font-bold mb-1">NutriBudget MY</h1>
          <p className="text-sm text-muted-foreground">
            {lang === "en" ? "Loading your meal planner..." : "Memuatkan perancang hidangan anda..."}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-loading-bar" />
        </div>

        {/* Tip */}
        <div className="bg-card border rounded-lg p-4 w-full transition-all duration-500">
          <p className="text-xs font-medium text-primary mb-1">
            💡 {lang === "en" ? "Did you know?" : "Tahukah anda?"}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {lang === "en" ? tip.en : tip.my}
          </p>
        </div>
      </div>
    </div>
  );
}
