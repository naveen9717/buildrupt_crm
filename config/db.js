// import mysql from "mysql2/promise";

// // mysql.createConnection()
// export const db = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   database: process.env.MYSQL_DB,
//   user: process.env.MYSQL_USERNAME,
//   password: process.env.MYSQL_PASSWORD,
//   waitForConnections: true,
//   connectionLimit: 5, // small per-instance pool
//   queueLimit: 0,
// });

// try {
//   const connection = await db.getConnection();
//   //   console.log("✅ Database connected successfully.");
//   connection.release(); // important to release back to pool
// } catch (err) {
//   console.error("❌ Database connection failed:", err);
//   process.exit(1); // optional: stop server if DB is essential
// }
// lib/db.js
import mysql from "mysql2/promise";

const config = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: Number(process.env.MYSQL_POOL_LIMIT) || 2, // safe default
  queueLimit: 0,
  // connectTimeout: 10000, // optional
};

// Ensure single pool across hot reloads / multiple imports (Node.js)
if (!global.__mysqlPool) {
  global.__mysqlPool = mysql.createPool(config);
}

export const db = global.__mysqlPool;
