"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded border bg-gray-200 dark:bg-gray-700"
    >
      {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
}
