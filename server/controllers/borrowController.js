import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";

import { User } from "../models/userModel.js";
import { Book } from "../models/bookModel.js";
import { Borrow } from "../models/borrowModel.js";

export const borrowedBooks = catchAyncErrors(async (req, res, next) => {

    const { borrowedBooks } = req.user;

    res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        borrowedBooks
    });

});


export const recordBorrowedBooks = catchAyncErrors(async (req, res, next) => {

    const { id } = req.params;
    const { email } = req.user;

    if (!id || !email) {
        return next(new ErrorHandler("Book ID and Email are required", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const book = await Book.findById(id);
    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    if (book.quantity <= 0) {
        return next(new ErrorHandler("Book is out of stock", 400));
    }

    const isAlreadyBorrowed = user.borrowedBooks.find(
        (b) => b.bookId.toString() === id && b.returned === false
    );

    if (isAlreadyBorrowed) {
        return next(new ErrorHandler("Book already borrowed", 400));
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    book.quantity -= 1;
    book.availability = book.quantity > 0;
    await book.save();

    user.borrowedBooks.push({
        bookId: book._id,
        bookTitle: book.title,
        borrowedDate: new Date(),
        dueDate: dueDate,
        returned: false
    });

    await user.save(); 

    const borrow = await Borrow.create({
        user: {
            id: user._id,
            name: user.name,
            email: user.email
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

export const returnedBorrowdBook = catchAyncErrors(async (req, res, next) => {

    const { bookId } = req.params;
    const { email } = req.body;

    if (!bookId || !email) {
        return next(new ErrorHandler("Book ID and Email are required", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // 2️⃣ Find book
    const book = await Book.findById(bookId);
    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    const borrowRecord = await Borrow.findOne({
        "user.id": user._id,
        book: bookId,
        returnDate: { $exists: false }
    });

    if (!borrowRecord) {
        return next(new ErrorHandler("No active borrow record found", 404));
    }

    const today = new Date();
    let fine = 0;

    if (today > borrowRecord.dueDate) {
        const lateDays = Math.ceil(
            (today - borrowRecord.dueDate) / (1000 * 60 * 60 * 24)
        );
        fine = lateDays * 10;
    }

    borrowRecord.returnDate = today;
    borrowRecord.fine = fine;
    await borrowRecord.save();

    book.quantity += 1;
    book.availability = true;
    await book.save();

    const userBorrow = user.borrowedBooks.find(
        (b) => b.bookId.toString() === bookId && b.returned === false
    );

    if (userBorrow) {
        userBorrow.returned = true;
        userBorrow.returnDate = today;
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "Book returned successfully",
        fine
    });

});


export const getBorrowedBooksForAdmin = catchAyncErrors(async (req, res, next) => {

    const borrowedBooks = await Borrow.find();

    res.status(200).json({
        success: true,
        borrowedBooks
    });

});


