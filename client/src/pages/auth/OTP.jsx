import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../../layout/AuthLayout";
import { otpVerification, resetAuthSlice } from "../../store/slices/authSlice";

function OTP() {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, isAuthenticated,loading } = useSelector(
    (state) => state.auth,
  );

  const [otpArray, setOtpArray] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Combine all digits into one string
  const otp = otpArray.join("");

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only single digit

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    // Move to next input
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back on backspace
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOTPVerification = (e) => {
    e.preventDefault();

    if (otp.length < 5) {
      return toast.error("Please enter complete OTP");
    }

    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch,loading]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE IMAGE */}
      <AuthLayout authInfo={"OTP Verification"} />

      {/* RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
            Enter OTP
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            We sent a 5-digit code to{" "}
            <span className="font-medium">{email}</span>
          </p>

          <form onSubmit={handleOTPVerification} className="space-y-6">
            {/* OTP BOXES */}
            <div className="flex justify-between gap-3">
              {otpArray.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              ))}
            </div>

            <button
              disabled={loading ? true : false}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Verify OTP
            </button>
          </form>

          {/* BACK TO LOGIN */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Didn’t receive code?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OTP;
