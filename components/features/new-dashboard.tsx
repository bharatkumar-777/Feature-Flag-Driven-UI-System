"use client";

export default function NewDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
        <h3 className="text-sm font-medium opacity-80">Total Users</h3>
        <p className="mt-2 text-3xl font-bold">12,847</p>
        <p className="mt-1 text-sm opacity-70">+12% from last month</p>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg">
        <h3 className="text-sm font-medium opacity-80">Revenue</h3>
        <p className="mt-2 text-3xl font-bold">$48,290</p>
        <p className="mt-1 text-sm opacity-70">+8% from last month</p>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
        <h3 className="text-sm font-medium opacity-80">Active Sessions</h3>
        <p className="mt-2 text-3xl font-bold">1,429</p>
        <p className="mt-1 text-sm opacity-70">Live right now</p>
      </div>
    </div>
  );
}
