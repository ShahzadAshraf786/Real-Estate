import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./signup/route.js"; // Adjust path as needed

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error("DB Connection Error:", error));

const app = express();

app.use(express.json()); // Required to parse JSON request bodies
app.use("/api/signup", router); // This makes POST to /api/signup/signup work

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
