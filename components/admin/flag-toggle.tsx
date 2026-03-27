"use client";

import { FeatureFlag } from "@/lib/feature-flags/types";
import { useFeatureFlagStore } from "@/lib/feature-flags/store";

const FLAG_ICONS: Record<string, string> = {
  dark_mode: "🌙",
  chat_widget: "💬",
  new_dashboard: "📊",
  analytics_base: "📈",
  premium_analytics: "⭐",
};

interface FlagToggleProps {
  flag: FeatureFlag;
  parentsMet: boolean;
  dependents: string[];
}

export function FlagToggle({ flag, parentsMet, dependents }: FlagToggleProps) {
  const toggleFlag = useFeatureFlagStore((s) => s.toggleFlag);
  const isDisabled = !flag.enabled && !parentsMet;
  const willCascade = dependents.length > 0 && flag.enabled;

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 ${
        flag.enabled
          ? "border-green-200 dark:border-green-800/60 bg-green-50/50 dark:bg-green-950/20 shadow-sm"
          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      } ${isDisabled ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-lg">
          {FLAG_ICONS[flag.name] ?? "🔲"}
        </span>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
              {flag.name}
            </span>
            {flag.depends_on.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                requires:{" "}
                {flag.depends_on.map((d) => (
                  <code key={d} className="text-amber-600 dark:text-amber-400">
                    {d}
                  </code>
                ))}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{flag.description}</p>

          {/* Warnings */}
          {isDisabled && (
            <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <span>⚠️</span> Enable{" "}
              <code className="font-mono">{flag.depends_on.join(", ")}</code> first
            </p>
          )}
          {willCascade && (
            <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <span>⚠️</span> Will also disable:{" "}
              <code className="font-mono">{dependents.join(", ")}</code>
            </p>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => toggleFlag(flag.name)}
          disabled={isDisabled}
          role="switch"
          aria-checked={flag.enabled}
          aria-label={`Toggle ${flag.name}`}
          className={`relative ml-2 inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            flag.enabled ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
          } ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              flag.enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
