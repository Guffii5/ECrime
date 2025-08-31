import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  PieChart as PieIcon,
  LineChart,
  Filter,
  Download,
  AlertTriangle,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  UserPlus,
  User,
  ShieldAlert,
  Clock,
  Eye,
  FileText,
  Image,
  Video,
  Map,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  AlertCircle,
  MessageSquare,
  X,
  CheckCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Send,
  Bell,
  Megaphone
} from "lucide-react";

// Enhanced data with more complaint details
const generateComplaints = () => {
  const types = ["Theft", "Assault", "Fraud", "Noise Complaint", "Vandalism", "Harassment", "Suspicious Activity", "Drugs", "Trespassing", "Dispute"];
  const locations = ["Downtown", "City Park", "University Area", "Residential Block B", "Online", "Industrial Zone", "Alleyway", "Workplace", "Central Market", "Shopping District"];
  const times = ["2:30 PM", "11:45 AM", "9:15 PM", "1:20 AM", "4:45 PM", "8:30 PM", "3:15 AM", "2:00 PM", "6:45 PM", "10:30 PM"];

  const complaints = [];

  for (let i = 1; i <= 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    const anonymous = Math.random() > 0.5;

    let media = [];
    if (Math.random() > 0.6) {
      const mediaTypes = ["image", "video", "document"];
      const mediaCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < mediaCount; j++) {
        const mediaType = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];
        if (mediaType === "image") media.push(`image${Math.floor(Math.random() * 5) + 1}.jpg`);
        if (mediaType === "video") media.push(`video${Math.floor(Math.random() * 3) + 1}.mp4`);
        if (mediaType === "document") media.push(`document${Math.floor(Math.random() * 2) + 1}.txt`);
      }
    }

    complaints.push({
      id: i + 1000,
      type,
      location,
      time,
      description: `This is a detailed description of the ${type.toLowerCase()} incident that occurred at ${location} around ${time}. The complainant reported specific details about the situation that require investigation.`,
      anonymous,
      media,
      status: Math.random() > 0.7 ? "Resolved" : "Pending",
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      priority: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)]
    });
  }

  return complaints;
};

const allComplaints = generateComplaints();

// Group complaints by month for the chart
const complaintsData = [
  {
    id: 1,
    name: "Jan",
    complaints: 12,
    resolved: 8,
    anonymous: 4,
    details: allComplaints.slice(0, 2)
  },
  {
    id: 2,
    name: "Feb",
    complaints: 18,
    resolved: 12,
    anonymous: 7,
    details: allComplaints.slice(2, 4)
  },
  {
    id: 3,
    name: "Mar",
    complaints: 22,
    resolved: 15,
    anonymous: 9,
    details: allComplaints.slice(4, 6)
  },
  {
    id: 4,
    name: "Apr",
    complaints: 15,
    resolved: 10,
    anonymous: 5,
    details: allComplaints.slice(6, 8)
  },
  {
    id: 5,
    name: "May",
    complaints: 27,
    resolved: 18,
    anonymous: 9,
    details: allComplaints.slice(8, 10)
  },
  {
    id: 6,
    name: "Jun",
    complaints: 34,
    resolved: 22,
    anonymous: 12,
    details: allComplaints.slice(10, 12)
  },
];

const complaintTypeData = [
  { name: "Theft", value: 42, color: "#e11d48", priority: "High", avgResolution: "2 days" },
  { name: "Assault", value: 23, color: "#f97316", priority: "Critical", avgResolution: "5 days" },
  { name: "Fraud", value: 18, color: "#3b82f6", priority: "Medium", avgResolution: "7 days" },
  { name: "Noise", value: 12, color: "#10b981", priority: "Low", avgResolution: "1 day" },
  { name: "Vandalism", value: 5, color: "#8b5cf6", priority: "Medium", avgResolution: "3 days" },
];

const locationData = [
  { name: "Downtown Area", complaints: 24, trend: "up", priority: "High", commonTypes: ["Theft", "Vandalism"] },
  { name: "Industrial Zone", complaints: 15, trend: "up", priority: "Medium", commonTypes: ["Suspicious Activity", "Trespassing"] },
  { name: "University District", complaints: 8, trend: "down", priority: "Medium", commonTypes: ["Noise", "Harassment"] },
  { name: "Central Market", complaints: 18, trend: "up", priority: "High", commonTypes: ["Theft", "Fraud"] },
  { name: "Residential Block A", complaints: 6, trend: "stable", priority: "Low", commonTypes: ["Noise", "Dispute"] },
];

export default function ComplaintsDashboard() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [complaintTypeFilter, setComplaintTypeFilter] = useState("all");
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewMode, setViewMode] = useState("overview"); // overview, details, allComplaints, assignInvestigator
  const [resolvedPopup, setResolvedPopup] = useState(false);
  const [assignPopup, setAssignPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [investigationTime, setInvestigationTime] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newComplaintCount, setNewComplaintCount] = useState(0);
  const complaintsPerPage = 10;

  // Simulate new complaints being added
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance of a new complaint every 10 seconds
      if (Math.random() < 0.2) {
        const types = ["Theft", "Assault", "Fraud", "Noise Complaint", "Vandalism"];
        const locations = ["Downtown", "City Park", "University Area", "Residential Block B", "Shopping District"];

        const newComplaint = {
          id: Math.floor(Math.random() * 10000) + 2000,
          type: types[Math.floor(Math.random() * types.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          time: new Date().toLocaleTimeString(),
          description: "New complaint registered through mobile app",
          anonymous: Math.random() > 0.5,
          media: [],
          status: "Pending",
          date: new Date().toLocaleDateString(),
          priority: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)]
        };

        setNotifications(prev => [
          {
            id: Date.now(),
            message: `New ${newComplaint.type} complaint reported at ${newComplaint.location}`,
            type: "new_complaint",
            complaint: newComplaint,
            time: new Date().toLocaleTimeString(),
            read: false
          },
          ...prev.slice(0, 9) // Keep only last 10 notifications
        ]);

        setNewComplaintCount(prev => prev + 1);

        // Auto-hide notification badge after 5 seconds
        setTimeout(() => {
          setNewComplaintCount(prev => Math.max(0, prev - 1));
        }, 5000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const viewComplaintDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setViewMode("details");
  };

  const closeComplaintDetails = () => {
    setSelectedComplaint(null);
    setViewMode("overview");
  };

  const viewAllComplaints = () => {
    setViewMode("allComplaints");
  };

  const markAsResolved = () => {
    if (selectedComplaint) {
      setResolvedPopup(true);
      setTimeout(() => {
        setResolvedPopup(false);
        closeComplaintDetails();
      }, 2000);
    }
  };

  const assignInvestigator = () => {
    setViewMode("assignInvestigator");
  };

  const sendInvestigationNotification = () => {
    if (investigationTime) {
      setAssignPopup(true);
      setTimeout(() => {
        setAssignPopup(false);
        setViewMode("details");
        setInvestigationTime("");
      }, 2000);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "bg-red-900/50 text-red-400";
      case "High": return "bg-orange-900/50 text-orange-400";
      case "Medium": return "bg-yellow-900/50 text-yellow-400";
      case "Low": return "bg-green-900/50 text-green-400";
      default: return "bg-gray-700 text-gray-400";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved": return "bg-green-900/50 text-green-400";
      case "Pending": return "bg-yellow-900/50 text-yellow-400";
      case "Investigating": return "bg-blue-900/50 text-blue-400";
      default: return "bg-gray-700 text-gray-400";
    }
  };

  // Filter complaints based on search term
  const filteredComplaints = allComplaints.filter(complaint =>
    complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mark notifications as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    setNewComplaintCount(0);
  };

  // Assign Investigator View
  if (viewMode === "assignInvestigator" && selectedComplaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-3">
              <Send className="w-7 h-7" />
              <span>Assign Investigator</span>
            </h2>
            <button
              onClick={() => setViewMode("details")}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>

          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Complaint Information
              </h3>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">ID</p>
                    <p className="font-medium">#{selectedComplaint.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Type</p>
                    <p className="font-medium">{selectedComplaint.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">{selectedComplaint.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Priority</p>
                    <p className={`text-xs px-2 py-1 rounded-full inline-block ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-blue-400" />
                Schedule Investigation
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Investigation Time
                  </label>
                  <input
                    type="datetime-local"
                    value={investigationTime}
                    onChange={(e) => setInvestigationTime(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Investigator Notes
                  </label>
                  <textarea
                    placeholder="Add any specific instructions for the investigator..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={sendInvestigationNotification}
              disabled={!investigationTime}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Notification to Investigator
            </button>
          </div>
        </div>
      </div>
    );
  }

  // All Complaints View
  if (viewMode === "allComplaints") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-3">
              <FileText className="w-7 h-7" />
              <span>All Complaints ({allComplaints.length})</span>
            </h2>
            <button
              onClick={() => setViewMode("overview")}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 mb-6">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search complaints by type, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Showing {filteredComplaints.length} of {allComplaints.length} complaints
            </p>
          </div>

          {/* Complaints Table */}
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {currentComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-700/50 transition">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-300">#{complaint.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{complaint.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{complaint.location}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        <div>{complaint.date}</div>
                        <div className="text-xs text-gray-400">{complaint.time}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button
                          onClick={() => viewComplaintDetails(complaint)}
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-700/50">
                <div className="text-sm text-gray-400">
                  Showing {indexOfFirstComplaint + 1} to {Math.min(indexOfLastComplaint, filteredComplaints.length)} of {filteredComplaints.length} results
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-600 text-gray-300 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-600 text-gray-300 disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Complaint Detail View
  if (viewMode === "details" && selectedComplaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-3">
              <FileText className="w-7 h-7" />
              <span>Complaint Details</span>
            </h2>
            <button
              onClick={closeComplaintDetails}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  Complaint Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">ID:</span>
                    <span className="font-medium">#{selectedComplaint.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="font-medium">{selectedComplaint.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedComplaint.status)}`}>
                      {selectedComplaint.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Priority:</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Anonymous:</span>
                    <span className="font-medium">{selectedComplaint.anonymous ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Map className="w-5 h-5 text-blue-400" />
                  Location & Time
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedComplaint.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span>{selectedComplaint.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span>{selectedComplaint.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-400" />
                Description
              </h3>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-300">{selectedComplaint.description}</p>
              </div>
            </div>

            {selectedComplaint.media && selectedComplaint.media.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {selectedComplaint.media[0].includes('.mp4') ? (
                    <Video className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Image className="w-5 h-5 text-purple-400" />
                  )}
                  Attached Media
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedComplaint.media.map((media, index) => (
                    <div key={index} className="bg-gray-700/50 p-4 rounded-lg flex items-center gap-3">
                      {media.includes('.mp4') ? (
                        <Video className="w-8 h-8 text-purple-400" />
                      ) : media.includes('.jpg') || media.includes('.png') ? (
                        <Image className="w-8 h-8 text-purple-400" />
                      ) : (
                        <FileText className="w-8 h-8 text-purple-400" />
                      )}
                      <div>
                        <p className="font-medium">{media}</p>
                        <p className="text-xs text-gray-400">
                          {media.includes('.mp4') ? 'Video file' :
                            media.includes('.jpg') || media.includes('.png') ? 'Image file' : 'Document'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={assignInvestigator}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition"
              >
                Assign Investigator
              </button>
              {selectedComplaint.status !== "Resolved" && (
                <button
                  onClick={markAsResolved}
                  className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-medium transition"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Resolved Popup */}
        <AnimatePresence>
          {resolvedPopup && (
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
                className="bg-gray-800 p-6 rounded-xl border border-green-500/50 max-w-md w-full mx-4 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-2">Case Resolved!</h3>
                <p className="text-gray-300">
                  Complaint #{selectedComplaint.id} has been marked as resolved successfully.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Assign Investigator Popup */}
        <AnimatePresence>
          {assignPopup && (
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
                className="bg-gray-800 p-6 rounded-xl border border-blue-500/50 max-w-md w-full mx-4 text-center"
              >
                <Send className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-blue-400 mb-2">Notification Sent!</h3>
                <p className="text-gray-300">
                  Investigator has been notified to investigate complaint #{selectedComplaint.id} at {investigationTime}.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 flex items-center gap-3">
              <BarChart3 className="w-7 h-7 md:w-8 md:h-8" />
              <span>Complaints Management System</span>
            </h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Monitor and analyze citizen complaints and reports
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 md:px-4 py-2 rounded-lg text-sm transition relative"
              >
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                <span>Notifications</span>
                {newComplaintCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {newComplaintCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50"
                  >
                    <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold">Notifications</h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer ${notification.read ? 'opacity-70' : ''}`}
                            onClick={() => {
                              markAsRead(notification.id);
                              if (notification.type === "new_complaint") {
                                viewComplaintDetails(notification.complaint);
                                setShowNotifications(false);
                              }
                            }}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`mt-1 p-1 rounded-full ${notification.read ? 'bg-gray-600' : 'bg-blue-600'}`}>
                                <Megaphone className="w-3 h-3" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-400">
                          No notifications
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 md:px-4 py-2 rounded-lg text-sm transition">
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 md:px-4 py-2 rounded-lg text-sm transition">
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        <AnimatePresence>
          {newComplaintCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm"
            >
              <div className="flex items-center gap-3">
                <Megaphone className="w-5 h-5" />
                <div>
                  <p className="font-medium">New Complaint Registered</p>
                  <p className="text-sm opacity-80">Check notifications for details</p>
                </div>
                <button
                  onClick={() => setNewComplaintCount(0)}
                  className="ml-4 text-white opacity-70 hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/10 p-5 md:p-6 rounded-xl border border-red-800/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Total Complaints</h3>
                <p className="text-2xl md:text-3xl font-bold text-white">{allComplaints.length}</p>
              </div>
              <div className="bg-red-900/50 p-3 rounded-full">
                <FileText className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              <span className="text-red-400">+12%</span> from last month
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 p-5 md:p-6 rounded-xl border border-green-800/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Resolved</h3>
                <p className="text-2xl md:text-3xl font-bold text-white">{allComplaints.filter(c => c.status === "Resolved").length}</p>
              </div>
              <div className="bg-green-900/50 p-3 rounded-full">
                <ShieldAlert className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              <span className="text-green-400">{Math.round((allComplaints.filter(c => c.status === "Resolved").length / allComplaints.length) * 100)}%</span> resolution rate
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-5 md:p-6 rounded-xl border border-blue-800/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Avg. Response Time</h3>
                <p className="text-2xl md:text-3xl font-bold text-white">2.4h</p>
              </div>
              <div className="bg-blue-900/50 p-3 rounded-full">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              <span className="text-blue-400">-0.8h</span> from last month
            </p>
          </div>
        </div>

        {/* Recent Complaints List */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden mb-6 md:mb-8">
          <button
            onClick={() => toggleSection("recent")}
            className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-700/50 transition"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" /> Recent Complaints
            </h3>
            {expandedSection === "recent" ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {expandedSection === "recent" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 pt-0"
            >
              <div className="space-y-3">
                {allComplaints.slice(0, 5).map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition cursor-pointer"
                    onClick={() => viewComplaintDetails(complaint)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${complaint.anonymous ? 'bg-purple-900/50 text-purple-400' : 'bg-blue-900/50 text-blue-400'}`}>
                        {complaint.anonymous ? <User className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{complaint.type}</p>
                        <p className="text-xs text-gray-400">{complaint.location} • {complaint.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                      <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={viewAllComplaints}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-1"
                >
                  View All {allComplaints.length} Complaints <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Complaints Trends Section */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-400" /> Complaints Trends
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTimeRange("weekly")}
                className={`px-3 py-1 rounded-lg text-sm ${timeRange === "weekly" ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeRange("monthly")}
                className={`px-3 py-1 rounded-lg text-sm ${timeRange === "monthly" ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeRange("yearly")}
                className={`px-3 py-1 rounded-lg text-sm ${timeRange === "yearly" ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complaintsData}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                  formatter={(value, name) => {
                    if (name === "Complaints") {
                      return [value, "Total Complaints"];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar
                  dataKey="complaints"
                  name="Complaints"
                  fill="#e11d48"
                  radius={[4, 4, 0, 0]}
                  onClick={(data) => {
                    if (data && data.details) {
                      // Show first complaint details as example
                      viewComplaintDetails(data.details[0]);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                />
                <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="anonymous" name="Anonymous" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-500 mt-4">
            * Click on complaint bars to view detailed information
          </div>
        </div>

        <footer className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Complaints Management System • v2.0.0
        </footer>
      </div>
    </div>
  );
}