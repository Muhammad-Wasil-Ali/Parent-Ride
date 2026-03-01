import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    areaName: {
      type: String,
      unique: true,
      required: true,
    },
    cityName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
  },
  { timestamps: true },
);

export const Area = mongoose.model("area", areaSchema);
