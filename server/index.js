import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import axios from "axios";

import connectDB from "./config/db.js";

import postRoutes from "./src/routes/postRoutes.js";
import replyRoutes from "./src/routes/replyRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

console.log("Loaded URI:", process.env.MONGO_URI);

const app = express();  

await connectDB(); 

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); 

const PORT = process.env.PORT || 5000;

app.post("/api/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      { text }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "ML server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});