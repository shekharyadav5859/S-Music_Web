
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function SingUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };
const handleSubmit = (e) => {
  e.preventDefault();

  if (formData.password.length < 8) {
    setError("Password must contain at least 8 characters.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  // New user object
  const newUser = {
    id: Date.now(),
    name: formData.name,
    email: formData.email,
    password: formData.password,

    // New user's personal music data
    likedSongs: [],
    playlists: [],
    library: [],
  };

  console.log("New User:", newUser);

  // Get existing users
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check email already exists
  const userExists = existingUsers.some(
    (user) => user.email === formData.email
  );

  if (userExists) {
    setError("Email is already registered.");
    return;
  }

  // Add new user
  existingUsers.push(newUser);

  // Save all users
  localStorage.setItem("users", JSON.stringify(existingUsers) );

  // Set currently logged-in user
  localStorage.setItem( "currentUser", JSON.stringify(newUser));

  alert("Account created successfully!");

  // Reset form
  setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
};

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-gray-200/70">

        <div className="grid min-h-[650px] md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-800 p-12 text-white md:flex">

            {/* Background Decoration */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-white/10" />

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <UserPlus size={25} />
              </div>

              <h1 className="text-2xl font-bold tracking-wide">
                CreateSpace
              </h1>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-md">

              <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm">
                Start your journey today
              </span>

              <h2 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
                Create your account and unlock new possibilities.
              </h2>

              <p className="mb-8 leading-7 text-indigo-100">
                Join our community and enjoy a seamless experience.
                Create your account in just a few simple steps.
              </p>

              <div className="space-y-4">

                {[
                  "Quick and easy registration",
                  "Personalized user experience",
                  "Access your account anytime",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-300" />

                    <span className="text-sm text-indigo-50">
                      {item}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* Footer */}
            <p className="relative z-10 text-sm text-indigo-200">
              © 2026 CreateSpace. All rights reserved.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 md:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <UserPlus size={24} />
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                  CreateSpace
                </h1>
              </div>

              {/* Heading */}
              <div className="mb-8">

                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                  Get started
                </p>

                <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                  Create Account
                </h2>

                <p className="text-sm leading-6 text-gray-500">
                  Enter your details below to create your new account.
                </p>

              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Full Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={19}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      autoComplete="name"
                      required
                    />

                  </div>
                </div>

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={19}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      autoComplete="email"
                      required
                    />

                  </div>
                </div>

                {/* Password */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className={inputClass}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>
                </div>

                {/* Confirm Password */}
                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={inputClass}
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                  >
                    {error}
                  </p>
                )}

                {/* Terms */}
                {/* <div className="flex items-start gap-3 pt-1">

                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 cursor-pointer accent-indigo-600"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm leading-5 text-gray-500"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>

                </div> */}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-[0.99]"
                >
                  Create Account

                  <ArrowRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

              </form>

              {/* Login Link */}
              <p className="mt-7 text-center text-sm text-gray-500">

                Already have an account?{" "}

                <a
                  href="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  Log in
                </a>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

