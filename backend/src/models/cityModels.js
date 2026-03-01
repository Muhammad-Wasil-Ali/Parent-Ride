import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const City = mongoose.model("city", citySchema);
