"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dark-mode";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored === "true" || document.documentElement.classList.contains("dark");
    setIsDark(initial);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // localStorage unavailable
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group inline-flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-lg transition-colors group-hover:bg-gray-200 dark:group-hover:bg-gray-600">
        {isDark ? "🌙" : "☀️"}
      </span>
      <span>
        {isDark ? "Dark mode" : "Light mode"}
        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 font-normal">
          — click to switch
        </span>
      </span>
      {/* Visual indicator dot */}
      <span className={`ml-auto h-2 w-2 rounded-full ${isDark ? "bg-indigo-500" : "bg-amber-400"}`} />
    </button>
  );
}
