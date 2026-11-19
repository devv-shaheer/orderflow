import { pool } from "@/lib/db";

export async function GET() {
  const [orders] = await pool.execute(
    "SELECT status, total, paid, created_at FROM orders WHERE business_id = ?",
    [1]
  );
  const today = new Date().toISOString().slice(0, 10);
  const todayOrders = orders.filter((o) => new Date(o.created_at).toISOString().slice(0, 10) === today);
  const metrics = {
    todaysOrders: todayOrders.length,
    todaysSales: todayOrders.reduce((s, o) => s + Number(o.total), 0),
    pendingOrders: orders.filter((o) => o.status !== "Completed").length,
    outstanding: orders.reduce((s, o) => s + (Number(o.total) - Number(o.paid)), 0),
  };
  const [recent] = await pool.execute(
    "SELECT o.id, o.status, o.total, o.paid, o.created_at, c.name FROM orders o LEFT JOIN customers c ON c.id=o.customer_id WHERE o.business_id=? ORDER BY o.id DESC LIMIT 5",
    [1]
  );
  const recentOrders = recent.map((r) => ({
    id: `ORD-${r.id + 1000}`,
    rawId: r.id,
    customer: r.name ?? "Unknown",
    total: Number(r.total),
    status: r.status,
  }));
  const [lowStock] = await pool.execute(
    "SELECT name, stock FROM products WHERE business_id=? AND stock <= low_stock_threshold",
    [1]
  );
  const alerts = lowStock.map((p) => `Low stock: ${p.name} (${p.stock} left)`);
  if (orders.filter((o) => o.status === "New").length) alerts.push(`${orders.filter((o) => o.status === "New").length} new orders pending`);
  return Response.json({ metrics, recentOrders, alerts });
}
