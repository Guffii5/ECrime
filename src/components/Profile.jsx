import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, Calendar, ShieldCheck, 
  MapPin, Image as ImageIcon, Lock 
} from "lucide-react";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "Ghufran",
    lastName: "Mohsin",
    email: "ghufranmohsin08@example.com",
    mobile: "0300-1234567",
    dob: "2002-11-15",
    cnic: "35202-1234567-8",
    city: "Lahore",
    province: "Punjab",
    address: "Street 12, Gulberg, Lahore",
    profilePic: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    alert("Profile Updated Successfully ✅");
  };

  const handlePasswordUpdate = () => {
    if (passwords.new !== passwords.confirm) {
      alert("⚠️ New password & confirm password do not match!");
      return;
    }
    alert("Password Updated Successfully 🔐");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8"
      >
        {/* Profile Header */}
        <div className="text-center mb-8">
          <User className="w-16 h-16 mx-auto text-red-500" />
          <h1 className="text-3xl font-bold mt-3">User Profile</h1>
        </div>

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              formData.profilePic ||
              "/Profile.jpg"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-md"
          />
          <label className="mt-4 flex items-center gap-2 cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium">
            <ImageIcon className="w-4 h-4" /> Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profilePic: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </label>
        </div>

        {/* Profile Info Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <InputField
            icon={<User className="w-5 h-5 text-red-400" />}
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            icon={<User className="w-5 h-5 text-red-400" />}
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputField
            icon={<Mail className="w-5 h-5 text-red-400" />}
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            icon={<Phone className="w-5 h-5 text-red-400" />}
            label="Mobile No"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          <InputField
            icon={<Calendar className="w-5 h-5 text-red-400" />}
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
          <InputField
            icon={<ShieldCheck className="w-5 h-5 text-red-400" />}
            label="CNIC"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
          />
          <InputField
            icon={<MapPin className="w-5 h-5 text-red-400" />}
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <InputField
            icon={<MapPin className="w-5 h-5 text-red-400" />}
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
        </div>

        <InputField
          icon={<MapPin className="w-5 h-5 text-red-400" />}
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        {/* Update Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleUpdate}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg shadow-md font-semibold transition"
          >
            Update Profile
          </button>
        </div>

        {/* Password Update Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-400" /> Update Password
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InputField
              icon={<Lock className="w-5 h-5 text-red-400" />}
              label="Current Password"
              name="current"
              type="password"
              value={passwords.current}
              onChange={handlePasswordChange}
            />
            <InputField
              icon={<Lock className="w-5 h-5 text-red-400" />}
              label="New Password"
              name="new"
              type="password"
              value={passwords.new}
              onChange={handlePasswordChange}
            />
            <InputField
              icon={<Lock className="w-5 h-5 text-red-400" />}
              label="Confirm Password"
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handlePasswordUpdate}
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg shadow-md font-semibold transition"
            >
              Update Password
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Reusable Input Component */
function InputField({ icon, label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-gray-300 text-sm mb-1">{label}</label>
      <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
        {icon}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="bg-transparent outline-none flex-1 ml-2 text-white placeholder-gray-400"
          placeholder={label}
        />
      </div>
    </div>
  );
}
