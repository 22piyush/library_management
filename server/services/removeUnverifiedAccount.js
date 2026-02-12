import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const removeUnverifiedAccounts = () => {

    // Run daily at 9 AM
    cron.schedule("0 9 * * *", async () => {

        try {

            const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

            await User.deleteMany({
                accountVerified: false,
                createdAt: { $lt: thirtyMinutesAgo }
            })

        } catch (error) {
            console.log("Cron Job Error:", error);
        }

    });

}