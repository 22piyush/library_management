import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {

    // Run daily at 9 AM
    cron.schedule("0 9 * * *", async () => {
        console.log("Running daily notification job...");

        try {

            const today = new Date();

            // Get tomorrow's date
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            // Start of tomorrow (00:00:00)
            tomorrow.setHours(0, 0, 0, 0);

            // End of tomorrow (23:59:59)
            const endOfTomorrow = new Date(tomorrow);
            endOfTomorrow.setHours(23, 59, 59, 999);

            const dueBorrows = await Borrow.find({
                dueDate: {
                    $gte: tomorrow,
                    $lte: endOfTomorrow
                },
                returnDate: null,
                notified: false
            }).populate("user");

            for (const borrow of dueBorrows) {
                if (borrow.user && borrow.user.email) {
                    const user = await User.findById(borrow.user.id);
                    sendEmail(
                        email,
                        "Book Return Reminder",
                        `Hello ${borrow.user.name},\n\nThis is reminder that the book you borrowed is due for`
                    );
                }
            }

        } catch (error) {
            console.log("Cron Job Error:", error);
        }

    });

};
