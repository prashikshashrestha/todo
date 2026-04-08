import bcrypt from "bcrypt";
import db from "../config/db.js";
export const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "password length is less than eight",
        success: false,
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashed],
    );
    if (!result) {
      return res.status(400).json({
        message: "unable to insert user in db",
        success: false,
      });
    }
    return res.status(200).json({
      message: "sucessfully created user",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "error occured while signin",
      success: false,
    });
  }
};
// CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255) NOT NULL UNIQUE,password VARCHAR(255) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
