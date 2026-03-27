import { FlagPanel } from "@/components/admin/flag-panel";
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              ← Home
            </Link>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Admin Panel</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feature Flags</h1>
          <p className="mt-1.5 text-gray-500 dark:text-gray-400">
            Toggle flags at runtime — changes apply instantly without a page reload.
          </p>
        </div>
        <FlagPanel />
      </div>
    </main>
  );
}
