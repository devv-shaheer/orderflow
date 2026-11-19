import { pool } from "../src/lib/db.js";

async function seed() {
  const [u] = await pool.execute(
    "INSERT INTO users (email, password_hash, name) VALUES (?,?,?)",
    ["owner@orderflow.pk", "hashed", "Ahmed Khan"]
  );
  const userId = u.insertId;
  const [b] = await pool.execute(
    "INSERT INTO businesses (name, category, currency) VALUES (?,?,?)",
    ["Ahmed Traders", "Retail", "PKR"]
  );
  const businessId = b.insertId;
  await pool.execute(
    "INSERT INTO business_memberships (user_id, business_id, role) VALUES (?,?,?)",
    [userId, businessId, "OWNER"]
  );

  const customers = [
    ["Ali Traders", "0300-1234567", "ali@example.com"],
    ["Fatima Boutique", "0321-7654321", "fatima@example.com"],
  ];
  const customerIds = [];
  for (const c of customers) {
    const [r] = await pool.execute(
      "INSERT INTO customers (business_id, name, phone, email) VALUES (?,?,?,?)",
      [businessId, ...c]
    );
    customerIds.push(r.insertId);
  }

  const products = [
    ["Business cards", "product", 25.0, 1000, 50],
    ["Gift boxes", "product", 205.0, 200, 20],
  ];
  const productIds = [];
  for (const p of products) {
    const [r] = await pool.execute(
      "INSERT INTO products (business_id, name, type, price, stock, low_stock_threshold) VALUES (?,?,?,?,?,?)",
      [businessId, ...p]
    );
    productIds.push(r.insertId);
  }

  const [o] = await pool.execute(
    "INSERT INTO orders (business_id, customer_id, status, source, notes, total, paid) VALUES (?,?,?,?,?,?,?)",
    [businessId, customerIds[0], "New", "WhatsApp", "Urgent delivery", 12500, 0]
  );
  const orderId = o.insertId;
  await pool.execute(
    "INSERT INTO order_items (order_id, product_id, name, qty, price) VALUES (?,?,?,?,?)",
    [orderId, productIds[0], "Business cards", 500, 25]
  );
  await pool.execute(
    "INSERT INTO activity_log (business_id, action, entity, entity_id) VALUES (?,?,?,?)",
    [businessId, "Order created", "order", orderId]
  );

  console.log("Seed complete.");
  await pool.end();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
