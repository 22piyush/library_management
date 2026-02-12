import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { decrypt } from "dotenv";

export const getAllUsers = catchAyncErrors(async (req, res, next) => {

    const users = await User.find({ accountVerified: true }).select("-password");

    if (!users || users.length === 0) {
        return next(new ErrorHandler("No users found", 404));
    }

    res.status(200).json({
        success: true,
        count: users.length,
        users
    });

});


export const registerNewAdmin = catchAyncErrors(async (req, res, next) => {

    if (!req.files || !req.files.avatar) {
        return next(new ErrorHandler("Admin avatar is required", 400));
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return next(new ErrorHandler("User already exists with this email", 400));
    }

    if (password.length < 8 || password.length > 16) {
        return next(new ErrorHandler("Password must be 8 to 16 characters", 400));
    }

    const avatar = req.files.avatar;

    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedFormats.includes(avatar.mimetype)) {
        return next(
            new ErrorHandler("Only PNG and JPEG images are allowed", 400)
        );
    }

    const hashedPassword = await decrypt.hash(password, 10);

    const result = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {
            folder: "LIBRARY_MANAGEMENT_ADMINS",
            width: 300,
            crop: "scale",
        }
    );

    fs.unlinkSync(avatar.tempFilePath);

    const admin = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "admin",
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });

    res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        admin
    });

});

