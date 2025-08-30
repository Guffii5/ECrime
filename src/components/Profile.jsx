import React from "react";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, LogOut } from "lucide-react";

export default function Profile() {
  const userData = {
    name: "Guffii",
    email: "ghufranmohsin08@example.com",
    role: "User",
    joined: "Nov 2002",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-6">
          <User className="w-16 h-16 mx-auto text-red-500" />
          <h1 className="text-3xl font-bold mt-3">Profile</h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="text-red-400" />
            <p><span className="text-gray-400">Name:</span> {userData.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-red-400" />
            <p><span className="text-gray-400">Email:</span> {userData.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-red-400" />
            <p><span className="text-gray-400">Role:</span> {userData.role}</p>
          </div>
          <div className="flex items-center gap-3">
            <i className="fas fa-calendar-alt text-red-400"></i>
            <p><span className="text-gray-400">Joined:</span> {userData.joined}</p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1610564558580-f4fce7f896b1?auto=format&fit=crop&w=900&q=80"
          alt="Profile Cover"
          className="rounded-lg shadow-md mt-8 mx-auto"
        />
      </motion.div>
    </div>
  );
}
