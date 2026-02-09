export async function sendVerificationCode(verificationCode, email, res) {

    try {

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Verification code failed to send"
        });
    }

}