import { useTheme } from "../theme/ThemeProvider";

export default function ThemeToggle(){
  const { theme, toggle } = useTheme();
  return (
    <button className="btn" aria-label="Toggle theme" onClick={toggle}>
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
