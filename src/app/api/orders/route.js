import { pool } from "@/lib/db";

export async function GET() {
  const [rows] = await pool.execute(
    "SELECT id, customer_id, status, source, total, paid, created_at FROM orders WHERE business_id = ? ORDER BY id DESC",
    [1]
  );
  const [customers] = await pool.execute("SELECT id, name FROM customers WHERE business_id = ?", [1]);
  const cmap = Object.fromEntries(customers.map((c) => [c.id, c.name]));
  const orders = rows.map((r) => ({
    id: `ORD-${r.id + 1000}`,
    rawId: r.id,
    customer: cmap[r.customer_id] ?? "Unknown",
    date: new Date(r.created_at).toISOString().slice(0, 10),
    status: r.status,
    total: Number(r.total),
    paid: Number(r.paid),
    source: r.source,
  }));
  return Response.json(orders);
}
