"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Toggle button that switches the document theme between light and dark.
 *
 * Renders a circular button that updates the `dark` class on the root document element and persists the chosen theme to `localStorage`.
 *
 * @param variant - Visual variant of the button; `"desktop"` (default) applies desktop styling, `"mobile"` applies mobile styling.
 * @returns The theme toggle button element.
 */
export default function ThemeToggle({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved === "dark") { //|| (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
        variant === "mobile"
          ? "text-red hover:bg-red/10"
          : "text-white hover:bg-white/10"
      }`}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
