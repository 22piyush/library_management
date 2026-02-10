export function generateVerificationOtpEmailTemplate(otpCode) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Verify Your Email</title>
    </head>
    <body style="
      margin:0;
      padding:0;
      font-family: Arial, Helvetica, sans-serif;
      background-color:#0f172a;
    ">
      <div style="
        max-width:520px;
        margin:40px auto;
        background-color:#020617;
        border-radius:12px;
        box-shadow:0 10px 30px rgba(0,0,0,0.6);
        overflow:hidden;
      ">
        <div style="
          background:linear-gradient(135deg,#2563eb,#1e40af);
          padding:22px;
          text-align:center;
          color:#ffffff;
        ">
          <h1 style="margin:0;font-size:22px;">📚 BookWare</h1>
          <p style="margin-top:6px;font-size:13px;opacity:0.9;">
            Email Verification
          </p>
        </div>

        <div style="padding:32px;text-align:center;">
          <h2 style="color:#e5e7eb;margin-bottom:12px;">
            Verify Your Email
          </h2>

          <p style="color:#9ca3af;font-size:14px;line-height:1.6;">
            Use the OTP below to verify your email address.
            This code is valid for <strong>5 minutes</strong>.
          </p>

          <div style="
            margin:28px auto;
            padding:16px 0;
            width:220px;
            background-color:#020617;
            border:1px dashed #2563eb;
            border-radius:10px;
            font-size:30px;
            letter-spacing:6px;
            font-weight:bold;
            color:#60a5fa;
          ">
            ${otpCode}
          </div>

          <p style="color:#6b7280;font-size:13px;">
            If you didn’t request this, you can safely ignore this email.
          </p>
        </div>

        <div style="
          background-color:#020617;
          padding:16px;
          text-align:center;
          font-size:12px;
          color:#6b7280;
          border-top:1px solid #1e293b;
        ">
          © ${new Date().getFullYear()} BookWare Team. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}


export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Reset Your Password</title>
    </head>
    <body style="
      margin:0;
      padding:0;
      font-family: Arial, Helvetica, sans-serif;
      background-color:#0f172a;
    ">
      <div style="
        max-width:520px;
        margin:40px auto;
        background-color:#020617;
        border-radius:12px;
        box-shadow:0 10px 30px rgba(0,0,0,0.6);
        overflow:hidden;
      ">
        <div style="
          background:linear-gradient(135deg,#7c3aed,#4c1d95);
          padding:22px;
          text-align:center;
          color:#ffffff;
        ">
          <h1 style="margin:0;font-size:22px;">📚 BookWare</h1>
          <p style="margin-top:6px;font-size:13px;opacity:0.9;">
            Password Recovery
          </p>
        </div>

        <div style="padding:32px;text-align:center;">
          <h2 style="color:#e5e7eb;margin-bottom:12px;">
            Reset Your Password
          </h2>

          <p style="color:#9ca3af;font-size:14px;line-height:1.6;">
            We received a request to reset your BookWare account password.
            Click the button below to proceed.
          </p>

          <a href="${resetPasswordUrl}"
            style="
              display:inline-block;
              margin:26px auto;
              padding:14px 32px;
              background:linear-gradient(135deg,#7c3aed,#6366f1);
              color:#ffffff;
              text-decoration:none;
              font-size:15px;
              font-weight:bold;
              border-radius:10px;
            ">
            Reset Password
          </a>

          <p style="color:#6b7280;font-size:13px;margin-top:20px;">
            This link is valid for <strong>15 minutes</strong>.
          </p>

          <p style="color:#6b7280;font-size:13px;">
            If you didn’t request a password reset, please ignore this email.
          </p>

          <p style="color:#6b7280;font-size:12px;word-break:break-all;">
            Or copy & paste this URL:<br/>
            <span style="color:#60a5fa;">${resetPasswordUrl}</span>
          </p>
        </div>

        <div style="
          background-color:#020617;
          padding:16px;
          text-align:center;
          font-size:12px;
          color:#6b7280;
          border-top:1px solid #1e293b;
        ">
          © ${new Date().getFullYear()} BookWare Team. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}

