import express from "express";
import dotenv, { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./configs/database.js";
import cors from "cors";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/v1/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error while starting server : ${e}`);
    process.exit(1);
  }
};

startServer();
