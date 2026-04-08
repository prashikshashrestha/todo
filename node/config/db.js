import mysql from "mysql2/promise";
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2025@p#password",
  database: "tas",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

export default db;