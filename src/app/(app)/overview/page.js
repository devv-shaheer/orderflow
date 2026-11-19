"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const statusTone = { New: "info", Confirmed: "info", "In Progress": "warning", Ready: "success", Completed: "success" };

export default function OverviewPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/overview")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d));
  }, []);
  if (!data) return <p className="text-muted">Loading...</p>;
  const m = data.metrics;
  const metrics = [
    { label: "Today's orders", value: m.todaysOrders },
    { label: "Today's sales", value: `PKR ${m.todaysSales.toLocaleString()}` },
    { label: "Pending orders", value: m.pendingOrders },
    { label: "Outstanding payments", value: `PKR ${m.outstanding.toLocaleString()}` },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Overview</h1>
        <p className="mt-1 text-sm text-muted">Welcome back. Here is your business at a glance.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((x) => (
          <Card key={x.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">{x.label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{x.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Recent orders" className="lg:col-span-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="pb-2">Order</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0">
                  <td className="py-2 font-medium text-ink">{o.id}</td>
                  <td className="py-2 text-muted">{o.customer}</td>
                  <td className="py-2 text-ink">PKR {o.total.toLocaleString()}</td>
                  <td className="py-2">
                    <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card title="Alerts">
          <ul className="space-y-2">
            {data.alerts.map((a, i) => (
              <li key={i} className="text-sm text-ink">{a}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
