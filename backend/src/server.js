import express from "express";
import dotenv, { config } from "dotenv";
import { connectDB } from "./configs/database.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
console.log("start");

await connectDB();

console.log("end");
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});
app.listen(PORT, () => {
  console.log(`Listening on port  ${PORT}`);
});
