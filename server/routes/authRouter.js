import express from "express";
import { getUser, login, logout, register, verifyOTP } from "../controllers/authController.js";
import { isAuthenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/logout",isAuthenticate, logout);
router.get("/me",isAuthenticate, getUser);

export default router;