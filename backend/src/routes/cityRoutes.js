import express from "express";
import { authorizedRole } from "../middlewares/roleVerify.js";

const router = express.Router();

// router.post("/create",authorizedRole("admin"),createCityController)
// router.get("/getCity",authorizedRole("admin"),getCityController)

// router.put("/update-city/:id",authorizedRole("admin"),updateCityController)
// router.post("/delete-city/:id",authorizedRole("admin"),deleteCityController)

export default router;
