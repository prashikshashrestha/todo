import express from 'express';
import mysql from 'mysql2/promise'; // Use promise wrapper for async/await
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create an connection pool to the database
// We use a pool because it manages multiple connections efficiently
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Basic route to test server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Database connection test route
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({
      success: true,
      message: 'Successfully connected to the MySQL database!',
      data: rows
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to connect to the database',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
