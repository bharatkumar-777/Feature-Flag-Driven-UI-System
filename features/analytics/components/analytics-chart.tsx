"use client";

export default function AnalyticsChart() {
  const data = [
    { label: "Mon", value: 65 },
    { label: "Tue", value: 45 },
    { label: "Wed", value: 78 },
    { label: "Thu", value: 52 },
    { label: "Fri", value: 90 },
    { label: "Sat", value: 35 },
    { label: "Sun", value: 60 },
  ];

  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Analytics</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Page views over the last 7 days</p>
      <div className="flex items-end gap-2 h-40">
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-blue-500 transition-all duration-300"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
