import express from "express"
import { isAuthenticate, isAuthorized } from "../middlewares/authMiddleware.js";
import { recordBorrowedBooks, borrowedBooks, getBorrowedBooksForAdmin, returnedBorrowdBook } from "../controllers/borrowController.js";

const router = express.Router();

router.post("/record-borrow-book/:id", isAuthenticate, isAuthorized("Admin"), recordBorrowedBooks);
router.get("/borrowed-books-by-users", isAuthenticate, isAuthorized("Admin"), getBorrowedBooksForAdmin);
router.get("/my-borrowed-books", isAuthenticate, borrowedBooks);
router.put("/return-borrowed-book/:bookId", isAuthenticate,isAuthorized("Admin"), returnedBorrowdBook);


export default router;