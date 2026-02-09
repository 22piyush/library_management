import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";


export const register = catchAyncErrors(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new ErrorHandler("Please enter all fields", 400));
        }
        const isRegistered = await User.findOne({ email, accountVerified: true });
        if (isRegistered) {
            return next(new ErrorHandler("User already exists", 400));
        }
    } catch (error) {

    }
});