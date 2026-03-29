import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "my";

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  t: (en: string, my: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggle: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = () => setLang(prev => (prev === "en" ? "my" : "en"));
  const t = (en: string, my: string) => (lang === "en" ? en : my);

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
