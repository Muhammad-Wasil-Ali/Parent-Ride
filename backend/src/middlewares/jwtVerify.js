import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responseHandler.js";

export const jwtVerify = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Invalid or missing token",
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "UnAuthorised access",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    console.log(`Token verification error ${error}`);
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "UnAuthorised Access",
      error: error,
    });
  }
};
