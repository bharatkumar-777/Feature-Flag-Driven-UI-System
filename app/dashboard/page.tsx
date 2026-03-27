"use client";

import Link from "next/link";
import { LazyFeatureGate } from "@/lib/feature-flags/components";
import { Skeleton } from "@/components/ui/skeleton";
import Fallback from "@/components/fallback";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              ← Home
            </Link>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Dashboard</span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Bundles load only when flags are on
          </span>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1.5 text-gray-500 dark:text-gray-400">
            Each section is lazy-loaded — its JavaScript chunk only downloads when the flag is on.
          </p>
        </div>

        <div className="space-y-8">
          {/* New Dashboard */}
          <section>
            <SectionHeader
              title="New Dashboard"
              flag="new_dashboard"
            />
            <LazyFeatureGate
              flag="new_dashboard"
              loader={() => import("@/components/features/new-dashboard")}
              loadingFallback={<Skeleton className="h-32 w-full" />}
              fallback={<Fallback feature="new_dashboard" />}
            />
          </section>

          {/* Analytics */}
          <section>
            <SectionHeader
              title="Analytics"
              flag="analytics_base"
            />
            <LazyFeatureGate
              flag="analytics_base"
              loader={() => import("@/components/features/analytics")}
              loadingFallback={<Skeleton className="h-48 w-full" />}
              fallback={<Fallback feature="analytics_base" />}
            />
          </section>

          {/* Premium Analytics */}
          <section>
            <SectionHeader
              title="Premium Analytics"
              flag="premium_analytics"
              dependency="analytics_base"
            />
            <LazyFeatureGate
              flag="premium_analytics"
              loader={() => import("@/components/features/premium-analytics")}
              loadingFallback={<Skeleton className="h-48 w-full" />}
              fallback={<Fallback feature="premium_analytics" />}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

function SectionHeader({
  title,
  flag,
  dependency,
}: {
  title: string;
  flag: string;
  dependency?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
      <code className="rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[11px] font-mono text-gray-500 dark:text-gray-400">
        {flag}
      </code>
      {dependency && (
        <span className="text-[11px] text-gray-400 dark:text-gray-500">
          requires <code className="font-mono text-amber-600 dark:text-amber-400">{dependency}</code>
        </span>
      )}
    </div>
  );
}
