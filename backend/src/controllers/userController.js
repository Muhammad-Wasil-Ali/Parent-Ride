import User from "../models/userModel.js";
import { userLoginShema, userRegisterSchema } from "../services/userSchema.js";
import { hashedPassword } from "../utils/passwordHashing.js";
import { sendResponse } from "../utils/responseHandler.js";

export const userRegisterController = async (req, res) => {
  try {
    // manual validation for beginners
    // if (!name || !email || !password || !phone || !role) {
    //   return sendResponse(res, 400, false, "All fields are required", null);
    // }

    // zod validation for scalable apps

    const result = userRegisterSchema.safeParse(req.body);
    if (!result.success) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Zod error",
        error: result.error,
      });
    }
    const { name, email, phone, password, role } = result.data;
    const normalizeEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizeEmail });

    if (existingUser) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "User already exists",
      });
    }
    const securePassword = await hashedPassword(password);

    const user = await User.create({
      name,
      email: normalizeEmail,
      password: securePassword,
      role,
      phone,
    });

    if (!user) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "User not created",
      });
    }
    const userResponse = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Register Error:", error); // important for debugging
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

//login route

export const loginUserController = async (req, res) => {
  try {
    const result = userLoginShema.safeParse(req.body);

    if (!result.success) {
      return sendResponse(res, 400, false, "Invalid fields", error);
    }
  } catch (error) {
    console.error("Login error", error);

    return sendResponse(res, 500, false, "Internal Server Error", error);
  }
};
