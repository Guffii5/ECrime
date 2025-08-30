import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock4, BadgeCheck, XCircle, Search, X } from "lucide-react";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Mock data (4 reports with image + video)
  const mockReports = [
    {
      id: "101",
      title: "Network Connectivity Issue",
      submittedDate: "2024-06-10",
      status: "In Progress",
      category: "Network",
      name: "Ali Khan",
      crimeType: "Cyber Crime",
      location: "Lahore",
      dateTime: "2024-06-10 14:30",
      emergency: "Yes",
      severity: "High",
      image: "https://source.unsplash.com/600x350/?cyber",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "102",
      title: "Street Light Malfunction",
      submittedDate: "2024-06-05",
      status: "Resolved",
      category: "Infrastructure",
      name: "Sara Ahmed",
      crimeType: "Public Issue",
      location: "Karachi",
      dateTime: "2024-06-05 19:45",
      emergency: "No",
      severity: "Low",
      image: "https://source.unsplash.com/600x350/?streetlight",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: "103",
      title: "Garbage Overflow",
      submittedDate: "2024-06-12",
      status: "Rejected",
      category: "Sanitation",
      name: "Bilal Raza",
      crimeType: "Environmental Issue",
      location: "Islamabad",
      dateTime: "2024-06-12 10:15",
      emergency: "Yes",
      severity: "Medium",
      image: "https://source.unsplash.com/600x350/?garbage",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "104",
      title: "Power Outage",
      submittedDate: "2024-06-20",
      status: "In Progress",
      category: "Utilities",
      name: "Hina Malik",
      crimeType: "Electricity Issue",
      location: "Rawalpindi",
      dateTime: "2024-06-20 08:00",
      emergency: "Yes",
      severity: "High",
      image: "https://source.unsplash.com/600x350/?electricity",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
  ];

  useEffect(() => {
    setReports(mockReports);
  }, []);

  const statusConfig = {
    "In Progress": {
      color: "text-yellow-400 bg-yellow-400/20",
      icon: <Clock4 className="w-5 h-5" />,
    },
    Resolved: {
      color: "text-green-400 bg-green-400/20",
      icon: <BadgeCheck className="w-5 h-5" />,
    },
    Rejected: {
      color: "text-red-400 bg-red-400/20",
      icon: <XCircle className="w-5 h-5" />,
    },
  };

  const filteredReports = reports.filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 text-white p-4 relative">
      {/* ❌ Close Icon */}
      <motion.button
        onClick={() => navigate("/user/dashboard")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 bg-gray-800/50 rounded-full backdrop-blur-sm"
      >
        <X className="w-6 h-6" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-red-500 mb-6">My Reports</h1>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <input
            type="text"
            placeholder="Search by ID or Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-white"
          />
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
        </div>

        {/* Reports Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filteredReports.length === 0 && (
            <p className="text-gray-400 col-span-full text-center">
              No reports found.
            </p>
          )}
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/80 backdrop-blur-sm border border-red-600/30 rounded-2xl shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {report.title}
                </h3>
                <p className="text-gray-400 mb-1">ID: #{report.id}</p>
                <p className="text-gray-400 mb-3">Category: {report.category}</p>
                <p className="text-gray-400">
                  Submitted: {report.submittedDate}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${statusConfig[report.status].color}`}
                >
                  {statusConfig[report.status].icon}
                  {report.status}
                </div>

                {/* View Button */}
                <button
                  onClick={() =>
                    navigate(`/user/myReports/${report.id}`, { state: report })
                  }
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg shadow-md transition-all"
                >
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
