import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login, resetAuthSlice } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import AuthLayout from "../../layout/AuthLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );

  const handleLogin = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    dispatch(login(data));
  };

  useEffect(() => {
    if (message) {
      // toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch, navigate, email]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE IMAGE */}
      <AuthLayout authInfo={"Login your"} />

      {/* RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <p className="my-6 text-end text-sm text-gray-600">
              <span
                onClick={() => navigate("/password/forgot")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </p>

            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Register here!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
