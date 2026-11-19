import { pool } from "@/lib/db";

export async function GET(_req, { params }) {
  const id = Number(params.id);
  const [orders] = await pool.execute(
    "SELECT * FROM orders WHERE id = ? AND business_id = ?",
    [id, 1]
  );
  if (!orders.length) return Response.json({ error: "not found" }, { status: 404 });
  const o = orders[0];
  const [items] = await pool.execute("SELECT * FROM order_items WHERE order_id = ?", [id]);
  const [payments] = await pool.execute("SELECT * FROM payments WHERE order_id = ?", [id]);
  const [history] = await pool.execute(
    "SELECT action, created_at FROM activity_log WHERE business_id = ? AND entity = 'order' AND entity_id = ? ORDER BY id",
    [1, id]
  );
  const [cust] = await pool.execute("SELECT name, phone, email FROM customers WHERE id = ?", [o.customer_id]);
  return Response.json({
    id: `ORD-${o.id + 1000}`,
    rawId: o.id,
    customer: cust[0]?.name ?? "Unknown",
    customerPhone: cust[0]?.phone,
    status: o.status,
    source: o.source,
    notes: o.notes,
    total: Number(o.total),
    paid: Number(o.paid),
    date: new Date(o.created_at).toISOString().slice(0, 10),
    items: items.map((i) => ({ name: i.name, qty: i.qty, price: Number(i.price) })),
    payments: payments.map((p) => ({ amount: Number(p.amount), method: p.method, date: new Date(p.created_at).toISOString().slice(0, 10) })),
    history: history.map((h) => `${h.action} (${new Date(h.created_at).toLocaleString()})`),
  });
}
