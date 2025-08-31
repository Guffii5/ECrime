import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    setErrors({});
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "123") {
        localStorage.setItem("role", "admin");
        navigate("/admin/dashboard");
      }  
      else {
        setError("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4 overflow-hidden">
      {/* Animated background icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [0, Math.random() * 100 + 50],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            className="absolute text-red-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            <Shield />
          </motion.div>
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Header Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src="/login.jpg"
              alt="Security Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-8 h-8 text-red-400" />
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
                    Secure Portal
                  </h2>
                </div>
                <p className="mt-2 text-gray-300 text-sm">
                  Authorized access only
                </p>
              </motion.div>
            </div>
          </div>

          {/* Login Form */}
          <div className="px-8 py-8">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold mb-6 text-center text-gray-100"
            >
              Sign in to continue
            </motion.h3>

            <div className="space-y-5">
              {/* Username */}
              {/* Username */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-1"
              >
                <label className="text-sm font-medium text-gray-300">
                  Username
                </label>
                <div
                  className={`flex items-center border rounded-lg transition-all focus-within:ring-2 ${errors.username
                    ? "border-red-500 focus-within:ring-red-500/30"
                    : "border-gray-700 focus-within:border-red-500 focus-within:ring-red-500/30"
                    }`}
                >
                  <span className="px-3 text-gray-400">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errors.username) {
                        setErrors({ ...errors, username: "" });
                      }
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter username"
                    className="w-full py-3 px-2 text-white focus:outline-none placeholder-gray-500 bg-white/10 focus:bg-white/20"
                    autoComplete="new-username"   // ✅ disable browser auto-fill
                  />
                </div>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" /> {errors.username}
                  </motion.p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-1"
              >
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Link
                          to="/forgotpassword"
                          className="text-xs text-red-400 hover:text-red-300 transition-colors underline underline-offset-2"
                        >
                          Forgot password?
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className={`flex items-center border rounded-lg transition-all focus-within:ring-2 ${errors.password
                    ? "border-red-500 focus-within:ring-red-500/30"
                    : "border-gray-700 focus-within:border-red-500 focus-within:ring-red-500/30"
                    }`}
                >
                  <span className="px-3 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors({ ...errors, password: "" });
                      }
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter password"
                    className="w-full py-3 px-2 text-white focus:outline-none placeholder-gray-500 bg-white/10 focus:bg-white/20"
                    autoComplete="new-password" 
                  />

                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </motion.p>
                )}
              </motion.div>


              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-800/50 rounded-lg text-sm text-red-300"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${isLoading
                    ? "bg-red-800/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-red-500/20"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Login
                    </>
                  )}
                </button>
              </motion.div>

              {/* Footer text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-sm text-gray-400 pt-2"
              >
                <p className="mt-3">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
                  >
                    Register here
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}