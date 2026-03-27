"use client";

export default function PremiumAnalyticsChart() {
  return (
    <div className="rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-amber-500 text-xl">★</span>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Analytics</h3>
        <span className="rounded-full bg-amber-100 dark:bg-amber-900 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
          PRO
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Bounce Rate", value: "24.3%", pct: 75.7, color: "bg-green-500" },
          { label: "Avg. Session", value: "4m 32s", pct: 62, color: "bg-blue-500" },
          { label: "Conversion", value: "3.8%", pct: 38, color: "bg-purple-500" },
          { label: "Revenue/User", value: "$12.40", pct: 55, color: "bg-amber-500" },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
            <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
              <div className={`h-2 rounded-full ${metric.color}`} style={{ width: `${metric.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
