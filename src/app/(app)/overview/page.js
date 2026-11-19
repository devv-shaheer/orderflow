import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const metrics = [
  { label: "Today's orders", value: "12" },
  { label: "Today's sales", value: "PKR 48,500" },
  { label: "Pending orders", value: "5" },
  { label: "Outstanding payments", value: "PKR 23,200" },
];

const recentOrders = [
  { id: "ORD-1042", customer: "Ali Traders", total: "PKR 12,500", status: "Pending", tone: "warning" },
  { id: "ORD-1041", customer: "Fatima Boutique", total: "PKR 8,200", status: "Completed", tone: "success" },
  { id: "ORD-1040", customer: "Hassan Electronics", total: "PKR 31,000", status: "In progress", tone: "info" },
];

const alerts = [
  { text: "3 orders pending confirmation", tone: "warning" },
  { text: "Low stock: Thermal paper (2 left)", tone: "danger" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Overview</h1>
        <p className="mt-1 text-sm text-muted">Welcome back. Here is your business at a glance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{m.value}</p>
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
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0">
                  <td className="py-2 font-medium text-ink">{o.id}</td>
                  <td className="py-2 text-muted">{o.customer}</td>
                  <td className="py-2 text-ink">{o.total}</td>
                  <td className="py-2">
                    <Badge tone={o.tone}>{o.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Alerts">
          <ul className="space-y-2">
            {alerts.map((a, i) => (
              <li key={i} className="flex items-center gap-2">
                <Badge tone={a.tone}>!</Badge>
                <span className="text-sm text-ink">{a.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
