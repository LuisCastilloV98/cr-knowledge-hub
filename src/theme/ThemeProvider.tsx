import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMedia } from "react-use";

type Theme = "light" | "dark";
interface ThemeCtx { theme: Theme; toggle: () => void; set: (t: Theme)=>void; }
const ThemeContext = createContext<ThemeCtx | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDark = useMedia("(prefers-color-scheme: dark)", false);
  const getInitial = (): Theme => {
    const saved = localStorage.getItem("crkh.theme") as Theme | null;
    if (saved) return saved;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("crkh.theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("crkh.theme");
    if (!saved) setTheme(prefersDark ? "dark" : "light");
  }, [prefersDark]);

  const value = useMemo<ThemeCtx>(() => ({
    theme,
    toggle: () => setTheme(t => (t === "dark" ? "light" : "dark")),
    set: setTheme
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
