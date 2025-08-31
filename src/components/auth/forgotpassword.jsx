import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, KeyRound, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // STEP 1: Send OTP
    const handleSendOtp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setError("Please enter your email");
            return;
        }
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address (e.g. user@example.com)");
            return;
        }

        setError("");
        alert(`OTP has been sent to ${email}`);
        setStep(2);
    };

    // STEP 2: Verify OTP
    const handleVerifyOtp = () => {
        if (otp === "1234") {
            setError("");
            alert("OTP Verified ✅");
            setStep(3);
        } else {
            setError("Invalid OTP");
        }
    };

    // STEP 3: Update Password
    const handleUpdatePassword = () => {
        if (!newPass || !confirmPass) {
            setError("Please fill all fields");
            return;
        }
        if (newPass !== confirmPass) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        alert("Your password has been updated successfully 🎉");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-gray-900/80 rounded-2xl shadow-2xl p-8 border border-gray-700"
            >
                <h2 className="text-2xl font-bold text-center text-red-400 mb-6">
                    Forgot Password
                </h2>

                {/* Error / Message */}
                {error && (
                    <div className="mb-4 p-3 text-sm bg-red-800/30 border border-red-600 rounded-lg text-red-300">
                        {error}
                    </div>
                )}

                {/* STEP 1: Enter Email */}
                <AnimatePresence>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <label className="block text-sm">Enter your Email</label>
                            <div
                                className={`flex items-center border rounded-lg ${error ? "border-red-500" : "border-gray-600"
                                    }`}
                            >
                                <span className="px-3 text-gray-400">
                                    <Mail />
                                </span>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"  
                                    className="w-full bg-gray-800 px-2 py-3 focus:outline-none text-white rounded-r-lg autofill:bg-gray-800 autofill:text-white"
                                />

                            </div>

                            <button
                                onClick={handleSendOtp}
                                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold"
                            >
                                Send OTP
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* STEP 2: Enter OTP */}
                <AnimatePresence>
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <label className="block text-sm">Enter OTP</label>
                            <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg">
                                <span className="px-3 text-gray-400">
                                    <KeyRound />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-transparent px-2 py-3 focus:outline-none text-white"
                                />
                            </div>
                            <button
                                onClick={handleVerifyOtp}
                                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold"
                            >
                                Verify OTP
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* STEP 3: New Password */}
                <AnimatePresence>
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <label className="block text-sm">New Password</label>
                            <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg">
                                <span className="px-3 text-gray-400">
                                    <Lock />
                                </span>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                    className="w-full bg-transparent px-2 py-3 focus:outline-none text-white"
                                />
                            </div>

                            <label className="block text-sm">Confirm Password</label>
                            <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg">
                                <span className="px-3 text-gray-400">
                                    <CheckCircle />
                                </span>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    className="w-full bg-transparent px-2 py-3 focus:outline-none text-white"
                                />
                            </div>

                            <button
                                onClick={handleUpdatePassword}
                                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold"
                            >
                                Update Password
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
