import mysql from "mysql2/promise";
import "dotenv/config";

const url = new URL(process.env.DATABASE_URL);
export const pool = mysql.createPool({
  host: url.hostname,
  port: Number(url.port || 3306),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  waitForConnections: true,
  connectionLimit: 10,
});
