import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, CheckCircle, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // step 1 = email, step 2 = otp + reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Step 1 → Send OTP with email validation
  const handleSendOtp = () => {
    setError("");

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setGeneratedOtp(randomOtp);
    alert(`OTP sent to ${email}: ${randomOtp}`); // simulate OTP send
    setStep(2);
  };

  // Step 2 → Verify OTP & Reset Password
  const handleResetPassword = () => {
    setError("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    if (otp !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }
    if (!password || !confirmPassword) {
      setError("Please fill all password fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Success
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700/50 relative"
      >
        {/* STEP 1 → EMAIL */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-red-400">
              Forgot Password
            </h2>
            <div className="space-y-4">
              <label className="text-sm text-gray-300">Enter your email</label>
              <div
                className={`flex items-center bg-gray-900/50 border rounded-lg ${
                  error
                    ? "border-red-500 focus-within:ring-red-500/30"
                    : "border-gray-700 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/30"
                }`}
              >
                <span className="px-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full py-3 px-2 bg-transparent text-white focus:outline-none placeholder-gray-500"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleSendOtp}
                className="w-full py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-red-500/20 transition-all"
              >
                Send OTP
              </button>
            </div>
          </>
        )}

        {/* STEP 2 → OTP + NEW PASSWORD */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-red-400">
              Verify OTP & Reset Password
            </h2>
            <div className="space-y-4">
              <label className="text-sm text-gray-300">Enter OTP</label>
              <div className="flex items-center bg-gray-900/50 border border-gray-700 rounded-lg focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/30">
                <span className="px-3 text-gray-400">
                  <KeyRound className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full py-3 px-2 bg-transparent text-white focus:outline-none placeholder-gray-500"
                />
              </div>

              <label className="text-sm text-gray-300">New Password</label>
              <div className="flex items-center bg-gray-900/50 border border-gray-700 rounded-lg focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/30">
                <span className="px-3 text-gray-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full py-3 px-2 bg-transparent text-white focus:outline-none placeholder-gray-500"
                />
              </div>

              <label className="text-sm text-gray-300">Confirm Password</label>
              <div className="flex items-center bg-gray-900/50 border border-gray-700 rounded-lg focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/30">
                <span className="px-3 text-gray-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full py-3 px-2 bg-transparent text-white focus:outline-none placeholder-gray-500"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              <button
                onClick={handleResetPassword}
                className="w-full py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-red-500/20 transition-all"
              >
                Verify & Change Password
              </button>
            </div>
          </>
        )}

        {/* SUCCESS POPUP */}
        {popup && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-2xl"
          >
            <div className="bg-gray-900 border border-green-600 p-6 rounded-xl text-center">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white">
                OTP Verified 🎉
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Password changed successfully. Redirecting...
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
