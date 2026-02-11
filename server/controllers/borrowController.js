import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";

import { Book } from "../models/bookModel.js";
import { Borrow } from "../models/borrowModel.js";

export const borrowedBooks = catchAyncErrors(async (req, res, next) => {

    const { bookId } = req.body;

    if (!bookId) {
        return next(new ErrorHandler("Book ID is required", 400));
    }

    const book = await Book.findById(bookId);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    if (book.quantity <= 0) {
        return next(new ErrorHandler("Book is out of stock", 400));
    }

    const alreadyBorrowed = await Borrow.findOne({
        "user.id": req.user._id,
        book: bookId,
        returnDate: { $exists: false }
    });

    if (alreadyBorrowed) {
        return next(new ErrorHandler("You already borrowed this book", 400));
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    book.quantity -= 1;
    book.availability = book.quantity > 0;
    await book.save();

    const borrow = await Borrow.create({
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        },
        price: book.price,
        book: book._id,
        dueDate
    });

    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        borrow
    });

});



export const recordBorrowedBooks = catchAyncErrors(async (req, res, next) => {

});



export const getBorrowedBooksForAdmin = catchAyncErrors(async (req, res, next) => {

});


export const returnedBorrowdBook = catchAyncErrors(async (req, res, next) => {

});