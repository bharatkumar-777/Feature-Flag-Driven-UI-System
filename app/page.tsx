"use client";

import Link from "next/link";
import { FeatureGate } from "@/lib/feature-flags/components";
import { useFeatureFlagLoading, useFeatureFlags } from "@/lib/feature-flags/hooks";
import DarkModeToggle from "@/components/features/dark-mode";
import ChatWidget from "@/components/features/chat-widget";
import Fallback from "@/components/fallback";

const FLAG_ICONS: Record<string, string> = {
  dark_mode: "🌙",
  chat_widget: "💬",
  new_dashboard: "📊",
  analytics_base: "📈",
  premium_analytics: "⭐",
};

export default function HomePage() {
  const isLoading = useFeatureFlagLoading();
  const flags = useFeatureFlags();
  const flagList = Object.values(flags);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top nav bar */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">🚩 FlagKit</span>
            {isLoading ? (
              <span className="rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400 animate-pulse">
                loading flags…
              </span>
            ) : (
              <span className="rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400">
                {flagList.filter((f) => f.enabled).length}/{flagList.length} active
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-lg bg-gray-900 dark:bg-white px-3.5 py-1.5 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              Admin Panel
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3.5 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-5xl px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
            Feature Flag Demo
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            A runtime feature flag system — toggle features without deploys, with dependency management and graceful fallbacks.
          </p>
        </div>

        {/* Live flag status strip */}
        {!isLoading && flagList.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {flagList.map((flag) => (
              <span
                key={flag.name}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  flag.enabled
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500"
                }`}
              >
                <span>{FLAG_ICONS[flag.name] ?? "🔲"}</span>
                <span className="font-mono">{flag.name}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${flag.enabled ? "bg-green-500" : "bg-gray-400"}`} />
              </span>
            ))}
          </div>
        )}

        {/* Feature demos */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Dark Mode */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🌙</span>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h2>
                <code className="text-[11px] text-gray-400 font-mono">flag: dark_mode</code>
              </div>
              <FlagBadge enabled={flags["dark_mode"]?.enabled} />
            </div>
            <FeatureGate flag="dark_mode" fallback={<Fallback feature="dark_mode" />}>
              <DarkModeToggle />
            </FeatureGate>
          </div>

          {/* Chat Widget */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💬</span>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">Chat Widget</h2>
                <code className="text-[11px] text-gray-400 font-mono">flag: chat_widget</code>
              </div>
              <FlagBadge enabled={flags["chat_widget"]?.enabled} />
            </div>
            <FeatureGate flag="chat_widget" fallback={<Fallback feature="chat_widget" />}>
              <ChatWidget />
            </FeatureGate>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">How it works</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "⚡", title: "Runtime toggling", desc: "Toggle flags in the Admin Panel — no page reload" },
              { icon: "🔗", title: "Dependent flags", desc: "premium_analytics requires analytics_base to be on" },
              { icon: "🛡️", title: "Rollback", desc: "Falls back to cached or default flags if the API fails" },
              { icon: "📦", title: "Lazy loading", desc: "Feature bundles only load when their flag is on" },
              { icon: "💾", title: "Persistence", desc: "Flags cached in localStorage for offline resilience" },
              { icon: "🔄", title: "Auto-refresh", desc: "Flags polled from the API every 60 seconds" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <span className="text-lg mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function FlagBadge({ enabled }: { enabled?: boolean }) {
  return (
    <span
      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        enabled
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
          : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
      }`}
    >
      {enabled ? "ON" : "OFF"}
    </span>
  );
}
