export function generateVerificationOtpEmailTemplate(otpCode) {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Verify Your Email</title>
    </head>
    <body style="
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f4f6f8;
    ">
      <div style="
        max-width: 500px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
      ">
        <div style="
          background-color: #2563eb;
          padding: 20px;
          text-align: center;
          color: #ffffff;
        ">
          <h1 style="margin: 0; font-size: 22px;">BookWare</h1>
          <p style="margin: 5px 0 0; font-size: 14px;">
            Email Verification
          </p>
        </div>

        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #111827; margin-bottom: 10px;">
            Verify Your Email
          </h2>

          <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
            Use the OTP below to verify your email address.
            This OTP is valid for <strong>5 minutes</strong>.
          </p>

          <div style="
            margin: 25px auto;
            padding: 15px 0;
            width: 200px;
            background-color: #f1f5f9;
            border-radius: 8px;
            font-size: 28px;
            letter-spacing: 6px;
            font-weight: bold;
            color: #2563eb;
          ">
            ${otpCode}
          </div>

          <p style="color: #6b7280; font-size: 13px;">
            If you did not request this, please ignore this email.
          </p>
        </div>

        <div style="
          background-color: #f9fafb;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
        ">
          © ${new Date().getFullYear()} BookWare Team. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}
