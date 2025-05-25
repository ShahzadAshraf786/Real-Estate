import express from "express";
import User from "../modules/user.modules.js";
import bcryptjs from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create and save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ success: true, message: "User created successfully!" });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
