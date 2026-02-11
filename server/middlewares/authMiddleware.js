import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";


export const isAuthenticate = catchAyncErrors(async (req, resizeBy, next) => {

    const { token } = req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not authenticated", 500));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id)
    next();
});



export const isAuthorized = (...roles) => {
    return(req,res,next)=>{
        if(roles.includes){}
    }
};