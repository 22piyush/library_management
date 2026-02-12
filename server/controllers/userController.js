import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";

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
