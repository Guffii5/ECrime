import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Mail,
  Phone,
  Shield,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  CreditCard,
  Key,
  Instagram,
  Twitter,
  Facebook,
  X
} from 'lucide-react';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'citizen',
    address: '',
    cnic: '',
    otp: '',
    city: '',
    province: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const roles = [
    { value: 'citizen', label: 'Citizen' },
    { value: 'officer', label: 'Law Enforcement Officer' },
    { value: 'admin', label: 'Administrator' }
  ];

  const provinces = [
    { value: 'punjab', label: 'Punjab' },
    { value: 'sindh', label: 'Sindh' },
    { value: 'khyber_pakhtunkhwa', label: 'Khyber Pakhtunkhwa' },
    { value: 'balochistan', label: 'Balochistan' },
    { value: 'gilgit_baltistan', label: 'Gilgit-Baltistan' },
    { value: 'azad_kashmir', label: 'Azad Kashmir' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.cnic.trim()) {
      newErrors.cnic = 'CNIC is required';
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      newErrors.cnic = 'Invalid CNIC format (XXXXX-XXXXXXX-X)';
    }
    if (showOtpField && !formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    }
    if (showOtpField && !isOtpVerified) {
      newErrors.otp = 'Please verify OTP';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSendOtp = () => {
    if (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setShowOtpField(true);
      alert('OTP sent to your email!');
    } else {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email first'
      }));
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp.trim().length === 6) { // Mock OTP length check
      setIsOtpVerified(true);
      alert('OTP verified successfully!');
    } else {
      setErrors(prev => ({
        ...prev,
        otp: 'Invalid OTP, must be 6 digits'
      }));
    }
  };

  const handleGoogleSignup = () => {
    alert('Google Signup initiated! (Mock implementation)');
    // Actual Google OAuth would require backend integration
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      if (onRegister) {
        onRegister(formData);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'citizen',
        address: '',
        cnic: '',
        otp: '',
        city: '',
        province: ''
      });
      setShowOtpField(false);
      setIsOtpVerified(false);
    }, 1500);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  const inputClass = "w-full px-4 py-3 bg-gray-900/90 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300 hover:bg-gray-800/90 shadow-sm";
  const labelClass = "block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2";
  const errorClass = "text-red-400 text-xs mt-1 flex items-center gap-1 animate-pulse";
  const iconClass = "w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors";
  const buttonClass = "px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white";
  const googleButtonClass = "px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="relative bg-gray-900/95 rounded-3xl border border-red-600/30 p-8 md:p-10 w-full max-w-4xl mx-auto backdrop-blur-xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))'
        }}
      >
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-600 via-red-500 to-transparent rounded-t-3xl" />
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-red-400 flex items-center gap-3">
            <Shield className="w-10 h-10 text-red-500" />
            Join CrimePortal
          </h2>
          <motion.button
            onClick={() => navigate('/login')}
            className="text-gray-300 hover:text-red-400 transition-colors"
            aria-label="Close"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <XCircle className="w-8 h-8" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Type */}
          <div className="group">
            <label htmlFor="role" className={labelClass}>
              <Shield className={iconClass} /> Account Type *
            </label>
            <motion.select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputClass}
              whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </motion.select>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label htmlFor="firstName" className={labelClass}>
                <User className={iconClass} /> First Name *
              </label>
              <motion.input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`${inputClass} ${errors.firstName ? 'border-red-600' : ''}`}
                placeholder="John"
                whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
              />
              {errors.firstName && (
                <p className={errorClass}>
                  <XCircle className="w-4 h-4" /> {errors.firstName}
                </p>
              )}
            </div>
            <div className="group">
              <label htmlFor="lastName" className={labelClass}>
                <User className={iconClass} /> Last Name *
              </label>
              <motion.input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`${inputClass} ${errors.lastName ? 'border-red-600' : ''}`}
                placeholder="Doe"
                whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
              />
              {errors.lastName && (
                <p className={errorClass}>
                  <XCircle className="w-4 h-4" /> {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email & OTP */}
          <div className="bg-gray-950/50 p-5 rounded-2xl border border-gray-700/30 shadow-inner">
            <div className="group">
              <label htmlFor="email" className={labelClass}>
                <Mail className={iconClass} /> Email *
              </label>
              <div className="flex items-center gap-3">
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputClass} flex-grow ${errors.email ? 'border-red-600' : ''}`}
                  placeholder="your@email.com"
                  disabled={isOtpVerified}
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
                />
                {!showOtpField && !isOtpVerified && (
                  <motion.button
                    type="button"
                    onClick={handleSendOtp}
                    className={buttonClass}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send OTP
                  </motion.button>
                )}
              </div>
              {errors.email && (
                <p className={errorClass}>
                  <XCircle className="w-4 h-4" /> {errors.email}
                </p>
              )}
            </div>
            {showOtpField && !isOtpVerified && (
              <div className="group mt-4">
                <label htmlFor="otp" className={labelClass}>
                  <Key className={iconClass} /> Verify OTP *
                </label>
                <div className="flex items-center gap-3">
                  <motion.input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className={`${inputClass} flex-grow ${errors.otp ? 'border-red-600' : ''}`}
                    placeholder="Enter 6-digit OTP"
                    whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
                  />
                  <motion.button
                    type="button"
                    onClick={handleVerifyOtp}
                    className={buttonClass}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Verify OTP
                  </motion.button>
                </div>
                {errors.otp && (
                  <p className={errorClass}>
                    <XCircle className="w-4 h-4" /> {errors.otp}
                  </p>
                )}
              </div>
            )}
            {isOtpVerified && (
              <div className="mt-2 text-green-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Email Verified
              </div>
            )}
          </div>

          {/* Phone Number & CNIC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label htmlFor="phone" className={labelClass}>
                <Phone className={iconClass} /> Phone Number
              </label>
              <motion.input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+92 123 456 7890"
                whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
              />
            </div>
            <div className="group">
              <label htmlFor="cnic" className={labelClass}>
                <CreditCard className={iconClass} /> CNIC *
              </label>
              <motion.input
                type="text"
                id="cnic"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                className={`${inputClass} ${errors.cnic ? 'border-red-600' : ''}`}
                placeholder="XXXXX-XXXXXXX-X"
                whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
              />
              {errors.cnic && (
                <p className={errorClass}>
                  <XCircle className="w-4 h-4" /> {errors.cnic}
                </p>
              )}
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label htmlFor="password" className={labelClass}>
                <Lock className={iconClass} /> Password *
              </label>
              <div className="relative">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.password ? 'border-red-600' : ''}`}
                  placeholder="At least 8 characters"
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className={errorClass}>
                  <XCircle className="w-4 h-4" /> {errors.password}
                </p>
              )}
            </div>
            <div className="group">
              <label htmlFor="confirmPassword" className={labelClass}>
                <Lock className={iconClass} /> Confirm Password *
              </label>
              <div className="relative">
                <motion.input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.confirmPassword ? 'border-red-600' : ''}`}
                  placeholder="Confirm your password"
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={errorClass}>
                  <XCircle className="w-4 h-4" /> {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Province, City & Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group">
              <label htmlFor="province" className={labelClass}>
                <MapPin className={iconClass} /> Province
              </label>
              <motion.select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className={inputClass}
                whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
              >
                <option value="">Select Province</option>
                {provinces.map(province => (
                  <option key={province.value} value={province.value}>
                    {province.label}
                  </option>
                ))}
              </motion.select>
            </div>
            <div className="group">
              <label htmlFor="city" className={labelClass}>
                <MapPin className={iconClass} /> City
              </label>
              <motion.input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
                placeholder="City"
                whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
              />
            </div>
            <div className="group">
              <label htmlFor="address" className={labelClass}>
                <MapPin className={iconClass} /> Address
              </label>
              <motion.input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={inputClass}
                placeholder="Street Address"
                whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(239, 68, 68, 0.3)' }}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start mt-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="w-5 h-5 rounded bg-gray-900 border-gray-600 focus:ring-red-500 focus:ring-offset-gray-900"
              />
            </div>
            <label htmlFor="terms" className="ml-3 text-sm text-gray-200">
              I agree to the <a href="#" className="text-red-400 hover:text-red-300 transition-colors">Terms of Service</a> and <a href="#" className="text-red-400 hover:text-red-300 transition-colors">Privacy Policy</a> *
            </label>
          </div>

          {/* Register Button */}
          <div className="pt-6">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`${buttonClass} w-full ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" /> Register Now
                </>
              )}
            </motion.button>
          </div>

          {/* Signup with Google */}
          <div className="pt-4">
            <motion.button
              type="button"
              onClick={handleGoogleSignup}
              className={`${googleButtonClass} w-full`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Signup with Google
            </motion.button>
          </div>
        </form>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-900 p-8 rounded-2xl border border-red-600/50 max-w-md w-full shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" /> Registration Successful!
                </h3>
                <p className="text-gray-300 mb-6">
                  Your account has been created. Please check your email for verification.
                </p>
                <motion.button
                  onClick={closeModal}
                  className={buttonClass}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
            <Instagram className="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
            <Twitter className="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group">
            <Facebook className="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="group">
            <X className="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;