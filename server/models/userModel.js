import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    accountVerified: { type: Boolean, default: false },
    borrowedBooks: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Borrow"
            },
            returned: {
                type: Boolean,
                default: false
            },
            bookTitle: String,
            borrowedDate: Date,
            dueDate: Date,
        }
    ],
    avatar: {
        public_id: String,
        url: String
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true
});


userSchema.methods.generateVerificationCode = function () {
    const firstDigit = Math.floor(Math.random() * 9) + 1; // 1–9
    const remainingDigits = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");

    const verificationCode = parseInt(`${firstDigit}${remainingDigits}`);

    this.verificationCode = verificationCode;
    this.verificationCodeExpire = Date.now() + 5 * 60 * 1000;

    return verificationCode;
};


userSchema.methods.generateToken = function () {

    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });

};



export const User = mongoose.model("User", userSchema);