import fs from "node:fs";
import path from "node:path";
import { pool } from "../src/lib/db.js";

const sql = fs.readFileSync(path.join(process.cwd(), "db", "schema.sql"), "utf8");
const statements = sql.split(";").map((s) => s.trim()).filter(Boolean);
for (const stmt of statements) {
  await pool.execute(stmt);
}
console.log("Schema migrated.");
await pool.end();
