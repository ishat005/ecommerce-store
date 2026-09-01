import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { registerUser } from "../features/auth/authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAuthError("");

    if (!validateForm()) {
      return;
    }

    const result = await dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      navigate("/");
    } else {
      setAuthError(result.payload || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Join ShopEase to start shopping
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {authError && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              fullWidth
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              autoComplete="name"
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              autoComplete="new-password"
            />

            <TextField
              fullWidth
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              size="large"
              disabled={authStatus === "loading"}
            >
              {authStatus === "loading" ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}