import User from "../models/userModel.js";
import { hashedPassword } from "../utils/passwordHashing.js";

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone || !role) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists Please login" });
    }

    const securePassword = await hashedPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "user not created" });
    }

    return res
      .status(200)
      .send({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.error("Register Error:", error); // important for debugging
    return res.status(500).send({
      success: false,
      message: "Internal server erro",
      error: error.message,
    });
  }
};
