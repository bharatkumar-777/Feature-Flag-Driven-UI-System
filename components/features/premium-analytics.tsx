"use client";

export default function PremiumAnalytics() {
  return (
    <div className="rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-amber-500 text-xl">★</span>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Premium Analytics
        </h3>
        <span className="rounded-full bg-amber-100 dark:bg-amber-900 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
          PRO
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Bounce Rate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">24.3%</p>
          <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 rounded-full bg-green-500" style={{ width: "75.7%" }} />
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Session</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">4m 32s</p>
          <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 rounded-full bg-blue-500" style={{ width: "62%" }} />
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Conversion</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">3.8%</p>
          <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 rounded-full bg-purple-500" style={{ width: "38%" }} />
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue/User</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$12.40</p>
          <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 rounded-full bg-amber-500" style={{ width: "55%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
