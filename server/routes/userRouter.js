import { getAllUsers, registerNewAdmin } from "../controllers/userController.js";
import { isAuthenticate, isAuthorized } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();


router.get("/all", isAuthenticate, isAuthorized("Admin"), getAllUsers);
router.get("/add/new-admin", isAuthenticate, isAuthorized("Admin"), registerNewAdmin);


export default router;