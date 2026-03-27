"use client";

import { useFeatureFlagStore } from "../../store/feature-flag-store";
import {
  useFeatureFlags,
  useFeatureFlagLoading,
  useFeatureFlagError,
  useIsFallback,
} from "../../hooks/use-feature-flags";
import { DEFAULT_FLAGS } from "../../constants";
import { FlagToggle } from "./flag-toggle";

export function FlagPanel() {
  const flags = useFeatureFlags();
  const isLoading = useFeatureFlagLoading();
  const error = useFeatureFlagError();
  const isFallback = useIsFallback();
  const fetchFlags = useFeatureFlagStore((s) => s.fetchFlags);
  const setFlags = useFeatureFlagStore((s) => s.setFlags);
  const getDependents = useFeatureFlagStore((s) => s.getDependents);
  const lastFetched = useFeatureFlagStore((s) => s.lastFetched);

  const flagList = Object.values(flags);
  const enabledCount = flagList.filter((f) => f.enabled).length;

  const allParentsMet = (deps: string[]) => deps.every((d) => flags[d]?.enabled);

  const rootFlags = flagList.filter((f) => f.depends_on.length === 0);
  const dependentFlags = flagList.filter((f) => f.depends_on.length > 0);

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total flags" value={isLoading && flagList.length === 0 ? "—" : String(flagList.length)} color="gray" />
        <StatCard label="Enabled" value={isLoading && flagList.length === 0 ? "—" : String(enabledCount)} color="green" />
        <StatCard label="Disabled" value={isLoading && flagList.length === 0 ? "—" : String(flagList.length - enabledCount)} color="gray" />
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {lastFetched && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Last sync: {new Date(lastFetched).toLocaleTimeString()}
                </span>
              )}
              {isFallback && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                  ⚠️ Fallback flags
                </span>
              )}
              {error && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:text-red-400">
                  ✕ {error}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fetchFlags()}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? <><span className="animate-spin">⟳</span> Refreshing…</> : <>⟳ Refresh</>}
              </button>
              <button
                onClick={() => setFlags(DEFAULT_FLAGS)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ↺ Reset defaults
              </button>
            </div>
          </div>
        </div>

        {/* Flag lists */}
        <div className="p-5 space-y-6">
          {isLoading && flagList.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800 h-[72px]" />
              ))}
            </div>
          ) : (
            <>
              <div>
                <SectionLabel label="Independent" count={rootFlags.length} />
                <div className="mt-3 space-y-2">
                  {rootFlags.map((flag) => (
                    <FlagToggle key={flag.name} flag={flag} parentsMet={true} dependents={getDependents(flag.name)} />
                  ))}
                </div>
              </div>

              {dependentFlags.length > 0 && (
                <div>
                  <SectionLabel label="Dependent" count={dependentFlags.length} />
                  <div className="mt-3 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 ml-3 pl-4">
                    {dependentFlags.map((flag) => (
                      <FlagToggle
                        key={flag.name}
                        flag={flag}
                        parentsMet={allParentsMet(flag.depends_on)}
                        dependents={getDependents(flag.name)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: "green" | "gray" }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 shadow-sm">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-0.5 ${color === "green" ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function SectionLabel({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{label}</span>
      <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">{count}</span>
    </div>
  );
}
