import express from "express";
import { forgotPassword, getUser, login, logout, register, resetPassword, updatePassword, verifyOTP } from "../controllers/authController.js";
import { isAuthenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticate, logout);
router.get("/me", isAuthenticate, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update",isAuthenticate, updatePassword);

export default router;