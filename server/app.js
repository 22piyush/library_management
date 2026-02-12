import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js"
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js"
import bookRouter from "./routes/bookRouter.js"
import userRouter from "./routes/userRouter.js"
import borrowRouter from "./routes/borrowRouter.js"
import {connectionCloudinary} from "./config/cloudinary.js";
import fileUpload from "express-fileupload";
import { notifyUsers } from "./services/notifyUsers.js";

config();
export const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/users", userRouter);

notifyUsers()
connectDB();
connectionCloudinary();


app.use(errorMiddleware);