import express from "express";
import {
  getByIdUserController,
  loginUserController,
  userRegisterController,
} from "../controllers/userController.js";
import { jwtVerify } from "../middlewares/jwtVerify.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", loginUserController);

router.get("/get-current-user", jwtVerify, getByIdUserController);
export default router;
