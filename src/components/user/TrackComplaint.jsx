import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  BadgeCheck,
  Clock4,
  XCircle,
  User,
  Calendar,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  FileText,
  Phone,
  Mail,
  MapPin,
  Eye,
  Download,
  Star,
  X,
  ArrowLeft
} from "lucide-react";

export default function TrackComplaint() {
  const navigate = useNavigate();
  const [complaintId, setComplaintId] = useState("");
  const [status, setStatus] = useState(null);
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const mockComplaintData = {
    "123": {
      status: "In Progress",
      title: "Network Connectivity Issue",
      description: "Internet connection dropping frequently in residential area",
      submittedDate: "2024-06-10",
      expectedResolution: "2024-06-20",
      priority: "High",
      assignedTo: "Technical Team A",
      category: "Network",
      location: "Block A, Sector 15",
      contact: {
        phone: "+92-300-1234567",
        email: "support@example.com"
      },
      updates: [
        { date: "2024-06-10", message: "Complaint received and assigned to technical team" },
        { date: "2024-06-12", message: "Investigation started, technician dispatched" },
        { date: "2024-06-14", message: "Root cause identified, repair work in progress" }
      ],
      satisfaction: 4
    },
    "456": {
      status: "Resolved",
      title: "Street Light Malfunction",
      description: "Multiple street lights not working on Main Street",
      submittedDate: "2024-06-05",
      expectedResolution: "2024-06-15",
      resolvedDate: "2024-06-13",
      priority: "Medium",
      assignedTo: "Maintenance Team B",
      category: "Infrastructure",
      location: "Main Street, Downtown",
      contact: {
        phone: "+92-300-7654321",
        email: "maintenance@example.com"
      },
      updates: [
        { date: "2024-06-05", message: "Complaint registered successfully" },
        { date: "2024-06-07", message: "Site inspection completed" },
        { date: "2024-06-10", message: "Replacement parts ordered" },
        { date: "2024-06-13", message: "All street lights repaired and tested" }
      ],
      satisfaction: 5,
      resolution: "All 8 street lights have been repaired and are now functioning properly"
    },
    "789": {
      status: "Rejected",
      title: "Noise Complaint",
      description: "Loud music from neighboring property",
      submittedDate: "2024-06-08",
      priority: "Low",
      assignedTo: "Community Relations",
      category: "Community",
      location: "Residential Complex C",
      contact: {
        phone: "+92-300-9876543",
        email: "community@example.com"
      },
      updates: [
        { date: "2024-06-08", message: "Complaint received for review" },
        { date: "2024-06-09", message: "Investigation revealed no violation of noise ordinance" }
      ],
      rejectionReason: "Investigation found no violation of local noise ordinance during permitted hours",
      satisfaction: 2
    }
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!complaintId.trim()) return;

    setIsLoading(true);
    setStatus(null);
    setComplaintDetails(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const data = mockComplaintData[complaintId];
    if (data) {
      setStatus(data.status);
      setComplaintDetails(data);
      setShowForm(false); // Hide the form when complaint details are shown

      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [complaintId, ...prev.filter(id => id !== complaintId)].slice(0, 3);
        return updated;
      });

      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      setStatus("Not Found");
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    navigate("/user/dashboard");
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setComplaintDetails(null);
    setStatus(null);
  };

  const statusConfig = {
    "In Progress": {
      icon: <Clock4 className="w-6 h-6" />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20",
      borderColor: "border-yellow-400/30"
    },
    "Resolved": {
      icon: <BadgeCheck className="w-6 h-6" />,
      color: "text-green-400",
      bgColor: "bg-green-400/20",
      borderColor: "border-green-400/30"
    },
    "Rejected": {
      icon: <XCircle className="w-6 h-6" />,
      color: "text-red-400",
      bgColor: "bg-red-400/20",
      borderColor: "border-red-400/30"
    },
    "Not Found": {
      icon: <XCircle className="w-6 h-6" />,
      color: "text-gray-500",
      bgColor: "bg-gray-500/20",
      borderColor: "border-gray-500/30"
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-400 bg-red-400/20";
      case "Medium": return "text-yellow-400 bg-yellow-400/20";
      case "Low": return "text-green-400 bg-green-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  const handleRecentSearch = (id) => {
    setComplaintId(id);
    handleTrack({ preventDefault: () => { } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 text-white p-4 flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-600/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Complaint details loaded successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close Button - Only show one instance */}
      <motion.button
        onClick={handleClose}
        className="fixed top-20 right-6 z-50 text-gray-400 hover:text-white transition-colors p-2 bg-gray-800/50 rounded-full backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Close and return to dashboard"
      >
        <X className="w-6 h-6" />
      </motion.button>


      <div className="relative z-10 w-full max-w-6xl">
        {/* Header with title on left */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Complaint Tracking System
            </h1>
            <p className="text-gray-300 text-lg mt-2">Track your complaints in real-time with detailed updates</p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image on left side - hidden when complaint details are shown */}
          <AnimatePresence>
            {!complaintDetails && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="lg:w-2/5"
              >
                <img
                  src="/Track-Complaint.jpg"
                  alt="Customer Service Illustration"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover border border-red-600/30"
                />
                <p className="text-gray-400 mt-4 text-center text-sm">24/7 Customer Support Available</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Tracking Form - Right Side */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="lg:w-3/5 bg-gray-800/80 backdrop-blur-sm border border-red-600/30 rounded-2xl shadow-2xl p-8"
              >
                <h2 className="text-3xl font-bold text-red-500 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Search className="w-6 h-6" />
                  </div>
                  Track Complaint
                </h2>

                <form onSubmit={handleTrack} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Complaint ID (e.g. 123, 456, 789)"
                      value={complaintId}
                      onChange={(e) => setComplaintId(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/80 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      disabled={isLoading}
                    />
                    <FileText className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Tracking...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Track Complaint
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mt-8 p-4 bg-gray-900/50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <Clock4 className="w-4 h-4" />
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((id, index) => (
                        <motion.button
                          key={id}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleRecentSearch(id)}
                          className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-sm hover:bg-red-600/30 transition-colors"
                        >
                          #{id}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Display */}
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-8 p-6 rounded-xl border ${statusConfig[status]?.borderColor} ${statusConfig[status]?.bgColor}`}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-3 rounded-full ${statusConfig[status]?.bgColor}`}>
                        <div className={statusConfig[status]?.color}>
                          {statusConfig[status]?.icon}
                        </div>
                      </div>
                    </div>
                    <p className="text-xl text-center">
                      Status: <span className={`font-bold ${statusConfig[status]?.color}`}>{status}</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Complaint Details - Full width when shown */}
          <AnimatePresence>
            {complaintDetails && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6 }}
                className="w-full space-y-6"
              >
                {/* Back Button */}
                <motion.button
                  onClick={handleBackToForm}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Search
                </motion.button>

                {/* Header Card */}
                <div className="bg-gray-800/80 backdrop-blur-sm border border-red-600/30 rounded-2xl shadow-2xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{complaintDetails.title}</h3>
                      <p className="text-gray-300">{complaintDetails.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(complaintDetails.priority)}`}>
                      {complaintDetails.priority} Priority
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-sm text-gray-400">Submitted Date</p>
                          <p className="text-white font-semibold">{complaintDetails.submittedDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-sm text-gray-400">Assigned To</p>
                          <p className="text-white font-semibold">{complaintDetails.assignedTo}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-white font-semibold">{complaintDetails.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-sm text-gray-400">Category</p>
                          <p className="text-white font-semibold">{complaintDetails.category}</p>
                        </div>
                      </div>

                      {complaintDetails.expectedResolution && (
                        <div className="flex items-center gap-3">
                          <Clock4 className="w-5 h-5 text-red-400" />
                          <div>
                            <p className="text-sm text-gray-400">Expected Resolution</p>
                            <p className="text-white font-semibold">{complaintDetails.expectedResolution}</p>
                          </div>
                        </div>
                      )}

                      {complaintDetails.resolvedDate && (
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-sm text-gray-400">Resolved Date</p>
                            <p className="text-white font-semibold">{complaintDetails.resolvedDate}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-red-400" />
                      Contact Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{complaintDetails.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{complaintDetails.contact.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Satisfaction Rating */}
                  <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      Satisfaction Rating
                    </h4>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${star <= complaintDetails.satisfaction ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                        />
                      ))}
                      <span className="ml-2 text-gray-300">({complaintDetails.satisfaction}/5)</span>
                    </div>
                  </div>
                </div>

                {/* Updates Timeline */}
                <div className="bg-gray-800/80 backdrop-blur-sm border border-red-600/30 rounded-2xl shadow-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-red-400" />
                    Progress Updates
                  </h4>
                  <div className="space-y-4">
                    {complaintDetails.updates.map((update, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 bg-gray-900/50 rounded-lg border-l-4 border-red-500"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-red-400 font-semibold mb-1">{update.date}</p>
                          <p className="text-gray-300">{update.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Resolution/Rejection Details */}
                {complaintDetails.resolution && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-2xl shadow-2xl p-8">
                    <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      Resolution Details
                    </h4>
                    <p className="text-gray-300">{complaintDetails.resolution}</p>
                  </div>
                )}

                {complaintDetails.rejectionReason && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-2xl shadow-2xl p-8">
                    <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6" />
                      Rejection Reason
                    </h4>
                    <p className="text-gray-300">{complaintDetails.rejectionReason}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border border-red-600/30 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download Report
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 border border-gray-600/30 transition-all"
                  >
                    <Eye className="w-5 h-5" />
                    Full Details
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}