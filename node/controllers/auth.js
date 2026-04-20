import bcrypt from "bcrypt";// hashes the pw
import db from "../config/db.js";
import jwt from "jsonwebtoken" //
export const signUpHandler = async (req, res) => {
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

export const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("All fields are required");
    const [result] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
console.log(result);


    const user = result[0];
    console.log(user);

    const hashedPassword = user.password; //passwrord is in hashed ->singup hashed
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      "process.env.JWT_SECRET",             // secret key
      { expiresIn: "1h" }                 // expiry
    );


    res.status(200).json({ message: "Login successful", user,token });
  } catch (error) {
    return res.status(500).json({
      success:false,
      error:error,
      message:`unable to sigin ${error}`
    })
  }
};
