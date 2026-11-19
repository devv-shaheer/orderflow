"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

const STATUSES = ["New", "Confirmed", "In Progress", "Ready", "Completed"];
const statusTone = { New: "info", Confirmed: "info", "In Progress": "warning", Ready: "success", Completed: "success" };
const fmt = (n) => `PKR ${Number(n).toLocaleString()}`;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("table");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => (r.ok ? r.json() : []))
      .then(setOrders);
  }, []);

  const openDetail = async (o) => {
    const res = await fetch(`/api/orders/${o.rawId}`);
    if (!res.ok) {
      setSelected(null);
      return;
    }
    const data = await res.json();
    setSelected({
      ...data,
      items: data.items ?? [],
      payments: data.payments ?? [],
      history: data.history ?? [],
    });
  };

  const filtered = orders.filter((o) => {
    const q = query.toLowerCase();
    const matchesQuery = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Orders</h1>
          <p className="mt-1 text-sm text-muted">Manage and track all business orders.</p>
        </div>
        <Button>Create Order (preview)</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input placeholder="Search orders or customers" value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-xs" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-md border border-line bg-surface px-3 text-sm">
          <option>All</option>
          {STATUSES.map((s) => (<option key={s}>{s}</option>))}
        </select>
        <div className="ml-auto flex rounded-md border border-line bg-surface">
          <button onClick={() => setView("table")} className={`px-3 py-1.5 text-sm ${view === "table" ? "bg-brand-soft text-brand" : "text-muted"}`}>Table</button>
          <button onClick={() => setView("board")} className={`px-3 py-1.5 text-sm ${view === "board" ? "bg-brand-soft text-brand" : "text-muted"}`}>Board</button>
        </div>
      </div>

      {view === "table" ? (
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="pb-2">Order #</th><th className="pb-2">Customer</th><th className="pb-2">Date</th><th className="pb-2">Status</th>
                <th className="pb-2">Total</th><th className="pb-2">Paid</th><th className="pb-2">Remaining</th><th className="pb-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} onClick={() => openDetail(o)} className="cursor-pointer border-b border-line last:border-0 hover:bg-canvas">
                  <td className="py-2 font-medium text-ink">{o.id}</td>
                  <td className="py-2 text-muted">{o.customer}</td>
                  <td className="py-2 text-muted">{o.date}</td>
                  <td className="py-2"><Badge tone={statusTone[o.status]}>{o.status}</Badge></td>
                  <td className="py-2 text-ink">{fmt(o.total)}</td>
                  <td className="py-2 text-ink">{fmt(o.paid)}</td>
                  <td className="py-2 text-ink">{fmt(o.total - o.paid)}</td>
                  <td className="py-2 text-muted">{o.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {STATUSES.map((s) => (
            <Card key={s} title={s}>
              <div className="space-y-2">
                {filtered.filter((o) => o.status === s).map((o) => (
                  <button key={o.id} onClick={() => openDetail(o)} className="w-full rounded-md border border-line bg-canvas p-3 text-left text-sm hover:bg-surface">
                    <p className="font-medium text-ink">{o.id}</p>
                    <p className="text-muted">{o.customer}</p>
                    <p className="mt-1 text-ink">{fmt(o.total)}</p>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setSelected(null)} aria-hidden="true" />
          <div className="relative h-full w-full max-w-md overflow-y-auto border-l border-line bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">{selected.id}</h2>
              <button onClick={() => setSelected(null)} className="text-muted hover:text-ink">Close</button>
            </div>
            <div className="mt-4 space-y-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-muted">Status</p><Badge tone={statusTone[selected.status]}>{selected.status}</Badge></div>
              <div><p className="text-xs uppercase tracking-wide text-muted">Customer</p><p className="text-ink">{selected.customer} {selected.customerPhone && `(${selected.customerPhone})`}</p></div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Line items</p>
                <ul className="mt-1 space-y-1">
                  {(selected.items ?? []).map((it, i) => (
                    <li key={i} className="flex justify-between text-ink">
                      <span>{it.name} x{it.qty}</span><span>{fmt(it.qty * it.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Financial summary</p>
                <div className="mt-1 space-y-1 text-ink">
                  <div className="flex justify-between"><span>Total</span><span>{fmt(selected.total)}</span></div>
                  <div className="flex justify-between"><span>Paid</span><span>{fmt(selected.paid)}</span></div>
                  <div className="flex justify-between font-medium"><span>Remaining</span><span>{fmt(selected.total - selected.paid)}</span></div>
                </div>
              </div>
              <div><p className="text-xs uppercase tracking-wide text-muted">Source</p><p className="text-ink">{selected.source}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-muted">Notes</p><p className="text-ink">{selected.notes || "None"}</p></div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Activity</p>
                <ul className="mt-1 space-y-1 text-muted">
                  {selected.history.map((h, i) => (<li key={i}>{h}</li>))}
                </ul>
              </div>
              {selected.payments.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">Payments</p>
                  <ul className="mt-1 space-y-1 text-ink">
                    {selected.payments.map((p, i) => (<li key={i}>{fmt(p.amount)} via {p.method} on {p.date}</li>))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="secondary">Update Status (preview)</Button>
                <Button variant="secondary">Record Payment (preview)</Button>
                <Button variant="secondary">Edit (preview)</Button>
                <Button variant="destructive">Cancel (preview)</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
