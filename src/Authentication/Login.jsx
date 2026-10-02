
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Music } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (item) =>
        item.email === formData.email &&
        item.password === formData.password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Go to home
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111113] shadow-2xl shadow-black/40">

        <div className="grid min-h-[650px] md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-pink-600 p-12 text-white md:flex flex-col justify-between">

            {/* Background circles */}
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />

            <div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-black/10" />

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Music size={23} />
              </div>

              <h1 className="text-2xl font-bold">
                S-Music
              </h1>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-md">

              <p className="mb-4 text-sm font-medium text-purple-100">
                WELCOME BACK
              </p>

              <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                Your music.
                <br />
                Your world.
              </h2>

              <p className="mt-6 leading-7 text-purple-100">
                Sign in to access your liked songs, playlists,
                library and continue listening to your favorite music.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <span className="text-sm">
                    Your personal music library
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <span className="text-sm">
                    Save your favorite songs
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <span className="text-sm">
                    Create your own playlists
                  </span>
                </div>

              </div>

            </div>

            <p className="relative z-10 text-sm text-purple-200">
              © 2026 S-Music
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 md:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 text-white">
                  <Music size={23} />
                </div>

                <h1 className="text-2xl font-bold text-white">
                  S-Music
                </h1>

              </div>

              {/* Heading */}
              <div className="mb-8">

                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-500">
                  Welcome back
                </p>

                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Sign in
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Enter your account details to continue listening.
                </p>

              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={19}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-white/[0.08] bg-[#18181b] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />

                  </div>

                </div>

                {/* Password */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-violet-500 hover:text-violet-400"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-white/[0.08] bg-[#18181b] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-500"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Remember */}
                {/* <div className="flex items-center gap-3">

                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-violet-600"
                  />

                  <label
                    htmlFor="remember"
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    Remember me
                  </label>

                </div> */}

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 py-3.5 font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:from-violet-500 hover:to-pink-400 focus:outline-none focus:ring-4 focus:ring-violet-500/20 active:scale-[0.99]"
                >
                  Sign In

                  <LogIn
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

              </form>

              {/* Signup */}
              <p className="mt-7 text-center text-sm text-gray-500">

                Don't have an account?{" "}

                <Link
                  to="/User/SingUp"
                  className="font-semibold text-violet-500 hover:text-violet-400 hover:underline"
                >
                  Create account
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
