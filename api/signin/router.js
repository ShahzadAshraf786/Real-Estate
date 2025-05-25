import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modules/user.modules.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return res.status(401).json({ success: false, message: "User not found" });

    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword)
      return res.status(401).json({ success: false, message: "Wrong Credentials" });

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: validUser._id,
          username: validUser.username,
          email: validUser.email
          // anything else you'd like to send (excluding password)
        }
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default signin;
