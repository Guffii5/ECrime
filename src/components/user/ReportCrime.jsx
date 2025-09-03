import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileWarning, MapPin, Clock, User, Upload, Image, Video, X, CheckCircle, AlertCircle, Copy, Save } from "lucide-react";

export default function ReportCrime() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    city: "",
    address: "",
    time: "",
    details: "",
    emergency: false,
    crimeType: "",
    otherCrimeType: "",
    severity: 1,
    anonymous: false
  });

  const [mediaFiles, setMediaFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [complaintNumber, setComplaintNumber] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const fileInputRef = useRef(null);

  const crimeTypes = [
    { value: "murder", label: "Murder" },
    { value: "theft", label: "Theft" },
    { value: "assault", label: "Assault" },
    { value: "robbery", label: "Robbery" },
    { value: "vandalism", label: "Vandalism" },
    { value: "other", label: "Other" }
  ];

  const punjabCities = [
    "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala",
    "Sialkot", "Bahawalpur", "Sargodha", "Jhang", "Sheikhupura",
    "Rahim Yar Khan", "Gujrat", "Kasur", "Sahiwal", "Okara",
    "Mianwali", "Chiniot", "Kamoke", "Hafizabad", "Attock",
    "Wah Cantonment", "Jhelum", "Khanewal", "Muzaffargarh", "Burewala"
  ];

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !form.anonymous) {
      if (!value.trim()) {
        error = "Name is required unless anonymous";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        error = "Name should contain only alphabets";
      }
    }

    if (name === "city" && !value) error = "City is required";
    if (name === "address" && !value.trim()) error = "Address details are required";
    if (name === "time" && !value) error = "Time is required";
    if (name === "details" && !value.trim()) error = "Details are required";
    if (name === "crimeType" && !value) error = "Crime type is required";
    if (name === "otherCrimeType" && form.crimeType === "other" && !value.trim()) error = "Please specify the crime type";

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Validate name field to only accept alphabets
    if (name === "name" && !form.anonymous && newValue !== "" && !/^[A-Za-z\s]*$/.test(newValue)) {
      return;
    }

    setForm({ ...form, [name]: newValue });

    const error = validateField(name, newValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file =>
      (file.type.startsWith('image/') || file.type.startsWith('video/')) &&
      file.size <= 30 * 1024 * 1024 // 30MB limit
    );

    if (validFiles.length > 0) {
      setMediaFiles([...mediaFiles, ...validFiles]);

      // Show media upload success popup
      setPopupType("media");
      setShowSuccessPopup(true);

      // Auto-hide popup after 5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...mediaFiles];
    newFiles.splice(index, 1);
    setMediaFiles(newFiles);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setForm(prev => ({
            ...prev,
            location: `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`
          }));
          setErrors(prev => ({ ...prev, location: "" }));
        },
        () => {
          setErrors(prev => ({ ...prev, location: "Unable to fetch location" }));
        }
      );
    } else {
      setErrors(prev => ({ ...prev, location: "Geolocation not supported" }));
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setSubmitted(true);

          // Generate final complaint number on form submission
          const finalComplaintNumber = "CR-" + Math.floor(100000 + Math.random() * 900000);
          setComplaintNumber(finalComplaintNumber);

          // Show report submission success popup
          setPopupType("report");
          setShowSuccessPopup(true);
        }, 500);
      }
      setUploadProgress(progress);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach(key => {
      if (key !== "severity" && key !== "anonymous" && key !== "emergency" && key !== "otherCrimeType" && key !== "location") {
        const error = validateField(key, form[key]);
        if (error) newErrors[key] = error;
      }
      if (key === "otherCrimeType" && form.crimeType === "other") {
        const error = validateField(key, form[key]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(3);
      simulateUpload();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileChange({ target: { files } });
  };

  const openPreview = (file) => {
    setPreviewMedia(file);
  };

  const closePreview = () => {
    setPreviewMedia(undefined);
  };

  const copyComplaintNumber = () => {
    navigator.clipboard.writeText(complaintNumber);
    // You could add a toast notification here to indicate it was copied
  };

  const inputClass = "w-full bg-transparent focus:outline-none text-white placeholder-gray-500";
  const containerClass = "flex items-center gap-3 bg-gray-900 p-3 rounded-xl border border-gray-700 hover:border-red-500 transition-colors";
  const errorClass = "text-red-400 text-xs mt-1 flex items-center gap-1 animate-pulse";
  const buttonClass = "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all text-white py-4 px-8 rounded-xl font-medium flex items-center justify-center gap-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4 md:p-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-gray-800/95 border border-red-600/50 rounded-3xl shadow-xl overflow-hidden backdrop-blur-lg"
      >
        {/* Progress Tracker */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center gap-4">
            {["Details", "Media", "Review"].map((label, index) => (
              <div key={label} className="flex-1 text-center">
                <div className={`text-sm font-semibold ${step >= index + 1 ? "text-red-400" : "text-gray-500"}`}>
                  {index + 1}. {label}
                </div>
                <div className={`h-1 mt-2 rounded-full ${step >= index + 1 ? "bg-red-500" : "bg-gray-600"}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="bg-red-600 p-3 rounded-full">
              <FileWarning className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-red-500">Report a Crime</h2>
              <p className="text-gray-400 mt-1">
                Provide accurate details to assist authorities
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-5">
                  {/* Anonymous Toggle */}
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-700">
                    <input
                      type="checkbox"
                      id="anonymous"
                      name="anonymous"
                      checked={form.anonymous}
                      onChange={handleChange}
                      className="w-5 h-5 text-red-600 bg-gray-700 rounded focus:ring-red-500"
                    />
                    <label htmlFor="anonymous" className="text-red-400 font-medium">
                      Report Anonymously
                    </label>
                  </div>

                  {/* Name */}
                  {!form.anonymous && (
                    <div className={containerClass}>
                      <User className="text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name (Alphabets only)"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        required={!form.anonymous}
                        pattern="[A-Za-z\s]+"
                        title="Name should contain only alphabets"
                      />
                      {form.name && !errors.name && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {errors.name && <AlertCircle className="w-4 h-4 text-red-400" />}
                    </div>
                  )}
                  {errors.name && !form.anonymous && (
                    <p className={errorClass}>
                      <AlertCircle className="w-4 h-4" /> {errors.name}
                    </p>
                  )}

                  {/* Crime Type */}
                  <div className={containerClass}>
                    <FileWarning className="text-gray-400 flex-shrink-0" />
                    <select
                      name="crimeType"
                      value={form.crimeType}
                      onChange={handleChange}
                      className={`${inputClass} bg-gray-900 text-white appearance-none pr-8`}
                      required
                      style={{ color: form.crimeType ? 'white' : '#9CA3AF' }}
                    >
                      <option value="" className="text-gray-500 bg-gray-900">Select Crime Type</option>
                      {crimeTypes.map(type => (
                        <option key={type.value} value={type.value} className="text-white bg-gray-900">{type.label}</option>
                      ))}
                    </select>
                    {form.crimeType && !errors.crimeType && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {errors.crimeType && <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                  {errors.crimeType && (
                    <p className={errorClass}>
                      <AlertCircle className="w-4 h-4" /> {errors.crimeType}
                    </p>
                  )}

                  {form.crimeType === "other" && (
                    <div className={containerClass}>
                      <FileWarning className="text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        name="otherCrimeType"
                        placeholder="Specify Crime Type"
                        value={form.otherCrimeType}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                      {form.otherCrimeType && !errors.otherCrimeType && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {errors.otherCrimeType && <AlertCircle className="w-4 h-4 text-red-400" />}
                    </div>
                  )}
                  {errors.otherCrimeType && (
                    <p className={errorClass}>
                      <AlertCircle className="w-4 h-4" /> {errors.otherCrimeType}
                    </p>
                  )}

                  {/* City Selection */}
                  <div className={containerClass}>
                    <MapPin className="text-gray-400 flex-shrink-0" />
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={`${inputClass} bg-gray-900 text-white appearance-none pr-8`}
                      required
                      style={{ color: form.city ? 'white' : '#9CA3AF' }}
                    >
                      <option value="" className="text-gray-500 bg-gray-900">Select City in Punjab</option>
                      {punjabCities.map(city => (
                        <option key={city} value={city} className="text-white bg-gray-900">{city}</option>
                      ))}
                    </select>
                    {form.city && !errors.city && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {errors.city && <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                  {errors.city && (
                    <p className={errorClass}>
                      <AlertCircle className="w-4 h-4" /> {errors.city}
                    </p>
                  )}

                  {/* Address Details */}
                  <div className={containerClass}>
                    <MapPin className="text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address Details (e.g., Muslim Abad, Street #, House #)"
                      value={form.address}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                    {form.address && !errors.address && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {errors.address && <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                  {errors.address && (
                    <p className={errorClass}>
                      <AlertCircle className="w-4 h-4" /> {errors.address}
                    </p>
                  )}

                  {/* Location Coordinates */}
                  <div className={containerClass}>
                    <MapPin className="text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      name="location"
                      placeholder="Coordinates (Auto-filled or manual)"
                      value={form.location}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <motion.button
                      type="button"
                      onClick={handleGetLocation}
                      className="px-2 py-1 bg-red-600 rounded-lg text-xs whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Location
                    </motion.button>
                  </div>
                  {errors.location && (
                    <p className={errorClass}>
                      <AlertCircle className="w-4 h-4" /> {errors.location}
                    </p>
                  )}

                  {/* Time */}
                  <div className={containerClass}>
                    <Clock className="text-gray-400 flex-shrink-0" />
                    <input
                      type="datetime-local"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                    {form.time && !errors.time && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {errors.time && <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                  {errors.time && (
                    <p className={errorClass}>
                      <AlertCircle className="w-4 h-4" /> {errors.time}
                    </p>
                  )}

                  {/* Emergency */}
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-700">
                    <input
                      type="checkbox"
                      id="emergency"
                      name="emergency"
                      checked={form.emergency}
                      onChange={handleChange}
                      className="w-5 h-5 text-red-600 bg-gray-700 rounded focus:ring-red-500"
                    />
                    <label htmlFor="emergency" className="text-red-400 font-medium">
                      This is an emergency situation
                    </label>
                  </div>

                  {/* Severity Slider */}
                  <div className="p-3 rounded-xl border border-gray-700">
                    <label className="text-gray-300 font-medium flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Incident Severity: {form.severity}
                    </label>
                    <input
                      type="range"
                      name="severity"
                      min="1"
                      max="10"
                      value={form.severity}
                      onChange={handleChange}
                      className="w-full mt-2 accent-red-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                <div>
                  <textarea
                    name="details"
                    placeholder="Describe the incident in detail (what happened, people involved, etc.)"
                    value={form.details}
                    onChange={handleChange}
                    rows="8"
                    className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:outline-none hover:border-red-500 transition-colors"
                    required
                  />
                  {form.details && !errors.details && (
                    <div className="text-green-400 flex items-center gap-1 mt-1">
                      <CheckCircle className="w-4 h-4" /> Valid
                    </div>
                  )}
                  {errors.details && (
                    <p className={errorClass}>
                      <AlertCircle className="w-4 h-4" /> {errors.details}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <h3 className="font-medium text-gray-300 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Evidence (Photos or 30s Videos)
                </h3>
                <div
                  onClick={triggerFileInput}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed ${isDragging ? "border-red-500 bg-gray-900/50" : "border-gray-600"} rounded-xl p-6 text-center cursor-pointer transition-all backdrop-blur-sm`}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <p className="text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, MP4 (Max 30MB)</p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept="image/*,video/*"
                  />
                </div>

                {mediaFiles.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                    {mediaFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        {file.type.startsWith('image/') ? (
                          <div className="aspect-square bg-gray-900 rounded-md overflow-hidden cursor-pointer" onClick={() => openPreview(file)}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Evidence ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center cursor-pointer" onClick={() => openPreview(file)}>
                            <Video className="w-8 h-8 text-red-500" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <p className="text-xs text-gray-400 truncate mt-1">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="font-medium text-gray-300">Review Your Report</h3>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <p><strong>Crime Type:</strong> {form.crimeType === "other" ? form.otherCrimeType : crimeTypes.find(type => type.value === form.crimeType)?.label}</p>
                  <p><strong>Name:</strong> {form.anonymous ? "Anonymous" : form.name || "Not provided"}</p>
                  <p><strong>City:</strong> {form.city}</p>
                  <p><strong>Address:</strong> {form.address}</p>
                  <p><strong>Coordinates:</strong> {form.location || "Not provided"}</p>
                  <p><strong>Time:</strong> {new Date(form.time).toLocaleString()}</p>
                  <p><strong>Details:</strong> {form.details}</p>
                  <p><strong>Severity:</strong> {form.severity}/10</p>
                  <p><strong>Emergency:</strong> {form.emergency ? "Yes" : "No"}</p>
                  <p><strong>Media Files:</strong> {mediaFiles.length} file(s)</p>
                </div>
              </motion.div>
            )}

            <div className="pt-4 flex gap-4">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-xl bg-gray-700 text-white font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Previous
                </motion.button>
              )}
              {step < 3 && (
                <motion.button
                  type="button"
                  onClick={() => {
                    const newErrors = {};
                    const fieldsToValidate = step === 1 ? ["name", "city", "address", "time", "details", "crimeType", "otherCrimeType"] : [];
                    fieldsToValidate.forEach(key => {
                      const error = validateField(key, form[key]);
                      if (error) newErrors[key] = error;
                    });
                    setErrors(newErrors);
                    if (Object.keys(newErrors).length === 0) setStep(step + 1);
                  }}
                  className={buttonClass}
                >
                  Next
                </motion.button>
              )}
              {step === 3 && (
                <motion.button
                  type="submit"
                  className={`${buttonClass} w-full ${submitted ? "opacity-75 cursor-not-allowed" : ""}`}
                  disabled={submitted}
                >
                  {submitted ? (
                    'Submitted Successfully'
                  ) : (
                    <>
                      <FileWarning className="w-5 h-5" />
                      Submit Crime Report
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  Uploading... {Math.round(uploadProgress)}%
                </p>
              </div>
            )}

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-900/30 border border-green-600 rounded-xl text-green-400"
              >
                Thank you! Your report has been submitted. Authorities will review it shortly.
              </motion.div>
            )}
          </form>
        </div>

        {/* Media Preview Modal */}
        <AnimatePresence>
          {previewMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={closePreview}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full h-[80vh] p-4"
                onClick={e => e.stopPropagation()}
              >
                {previewMedia.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(previewMedia)}
                    alt="Media Preview"
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(previewMedia)}
                    controls
                    className="w-full h-full object-contain rounded-xl"
                  />
                )}
                <button
                  onClick={closePreview}
                  className="absolute -top-4 -right-4 bg-red-600 rounded-full p-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Popup with different messages for media vs report */}
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-gray-800 border border-red-500 rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {popupType === "media" ? "Media Uploaded!" : "Report Submitted!"}
                  </h3>
                </div>

                <p className="text-gray-300 mb-2">
                  {popupType === "media"
                    ? "Your media files have been uploaded successfully."
                    : "Your crime report has been submitted successfully."}
                </p>

                {popupType === "report" && complaintNumber && (
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-gray-400 text-sm mb-1">Your complaint reference number:</p>
                    <div className="flex items-center justify-between">
                      <span className="text-red-400 font-bold text-lg">{complaintNumber}</span>
                      <button
                        onClick={copyComplaintNumber}
                        className="flex items-center gap-1 text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                      >
                        <Copy className="w-4 h-4" /> Copy
                      </button>
                    </div>
                  </div>
                )}

                <p className="text-gray-400 text-sm mb-4">
                  {popupType === "media"
                    ? "You can now proceed to submit your report."
                    : "Please save this number for future reference. You can use it to track the status of your report."}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowSuccessPopup(false)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> OK
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-gray-900/50 p-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-red-400">Important Notes:</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Accurate information ensures effective response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Emergency reports are prioritized</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Your identity is confidential unless specified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>False reporting may lead to legal consequences</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-64 flex-shrink-0">
              <img
                src="/Crime scene.jpg"
                alt="Crime Scene"
                className="rounded-xl shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}