import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  BarChart2,
  MapPin,
  Users,
  AlertCircle,
  Activity,
  Bell,
  Map,
  AlertTriangle,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [alertError, setAlertError] = useState("");
  const [emergencyError, setEmergencyError] = useState("");

  const stats = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Total Complaints",
      count: 120,
      trend: "↑ 12%",
      trendColor: "text-red-400",
      description: "Total Complaints",
      link: "/admin/manage",
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "Reports Analyzed",
      count: 45,
      trend: "↑ 8%",
      trendColor: "text-green-400",
      description: "AI processed reports",
      link: "/admin/manage",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Police Stations",
      count: 18,
      trend: "→ 0%",
      trendColor: "text-gray-400",
      description: "Active stations",
      link: "/admin/stations",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Resolved Cases",
      count: 97,
      trend: "↑ 23%",
      trendColor: "text-green-400",
      description: "Efficiency improved",
      link: "/admin/manage",
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Pending Issues",
      count: 23,
      trend: "↓ 5%",
      trendColor: "text-yellow-400",
      description: "Needs attention",
      link: "/admin/manage",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Registered Users",
      count: 300,
      trend: "↑ 15%",
      trendColor: "text-blue-400",
      description: "New signups",
      link: "/User",
    },
  ];

  const activities = [
    {
      id: 1,
      type: "alert",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      text: "Theft reported at Main Street at 09:30 AM",
      time: "2 mins ago",
    },
    {
      id: 2,
      type: "success",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      text: "Case #1045 marked as resolved",
      time: "15 mins ago",
    },
    {
      id: 3,
      type: "warning",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      text: "Suspicious activity flagged in West District",
      time: "32 mins ago",
    },
    {
      id: 4,
      type: "info",
      icon: <Activity className="w-5 h-5 text-blue-500" />,
      text: "Patrol dispatched to Sector 12",
      time: "1 hour ago",
    },
    {
      id: 5,
      type: "error",
      icon: <AlertCircle className="w-5 h-5 text-red-400" />,
      text: "Complaint #2012 rejected due to insufficient evidence",
      time: "2 hours ago",
    },
  ];

  const crimeHotspots = [
    { name: "Downtown Area", risk: "High", cases: 24 },
    { name: "Industrial Zone", risk: "Medium", cases: 15 },
    { name: "University District", risk: "Low", cases: 8 },
  ];

  const handleSendAlert = () => {
    if (!alertMessage.trim()) {
      setAlertError("Please write something before sending an alert");
      return;
    }
    
    // Here you would typically send the alert to all users via an API
    setConfirmationMessage(`Alert sent to all users: "${alertMessage}"`);
    setShowConfirmationModal(true);
    setShowAlertModal(false);
    setAlertMessage("");
    setAlertError("");
  };

  const handleActivateEmergency = () => {
    if (!emergencyMessage.trim()) {
      setEmergencyError("Please write something before activating emergency mode");
      return;
    }
    
    // Here you would typically activate emergency mode via an API
    setConfirmationMessage(`Emergency mode activated: "${emergencyMessage}"`);
    setShowConfirmationModal(true);
    setShowEmergencyModal(false);
    setEmergencyMessage("");
    setEmergencyError("");
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleAlertChange = (e) => {
    setAlertMessage(e.target.value);
    if (e.target.value.trim()) {
      setAlertError("");
    }
  };

  const handleEmergencyChange = (e) => {
    setEmergencyMessage(e.target.value);
    if (e.target.value.trim()) {
      setEmergencyError("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-red-500 flex items-center gap-3">
                <ShieldCheck className="w-9 h-9 text-red-600" />
                <span>Police Command Center</span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                Welcome back, Commander. Real-time monitoring and analytics
                dashboard.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowAlertModal(true);
                  setAlertError("");
                }}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                <Bell className="w-5 h-5" />
                <span>Alerts</span>
              </button>
              <button
                onClick={() => {
                  setShowEmergencyModal(true);
                  setEmergencyError("");
                }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                <Activity className="w-5 h-5" />
                <span>Emergency Mode</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards with Links */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((item, idx) => (
            <Link key={idx} to={item.link}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gray-800/80 hover:bg-gray-700 p-4 md:p-6 rounded-xl shadow-md border border-gray-700 backdrop-blur-sm transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-600/90 p-3 rounded-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-medium text-gray-300">
                        {item.title}
                      </h3>
                      <p className="text-2xl md:text-3xl font-bold text-white">
                        {item.count}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold ${item.trendColor}`}
                  >
                    {item.trend}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-3">{item.description}</p>
              </motion.div>
            </Link>
          ))}
        </section>

        {/* Main Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 md:mb-12">
          {/* Live Crime Heatmap */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/80 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                <Map className="w-6 h-6 text-blue-400" /> Live Crime Heatmap
              </h2>
              <button 
                className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full"
                onClick={() => window.open('/heatmap-fullscreen','_blank')}
              >
                Fullscreen
              </button>
            </div>

            {/* Placeholder Map */}
            <div className="relative w-full h-64 rounded-md overflow-hidden border border-gray-600 mb-4">
              <img
                src="https://via.placeholder.com/800x400.png?text=Live+Crime+Heatmap+Coming+Soon"
                alt="Map Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-red-500/10 pointer-events-none"></div>
            </div>

            {/* Hotspots */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Current Hotspots</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {crimeHotspots.map((spot, i) => (
                  <div key={i} className={`p-2 rounded-lg text-xs ${
                    spot.risk === 'High' ? 'bg-red-900/50 border border-red-700' :
                    spot.risk === 'Medium' ? 'bg-yellow-900/50 border border-yellow-700' :
                    'bg-green-900/50 border border-green-700'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span>{spot.name}</span>
                      <span className="font-bold">{spot.cases} cases</span>
                    </div>
                    <div className="w-full bg-gray-700 h-1 mt-1 rounded-full">
                      <div 
                        className={`h-1 rounded-full ${
                          spot.risk === 'High' ? 'bg-red-500' :
                          spot.risk === 'Medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(spot.cases / 24) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              * Real-time data from connected police networks and surveillance systems.
            </p>
          </motion.div>

          {/* Recent Activity Stream */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/80 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                <Activity className="w-6 h-6 text-green-400" /> Recent Activity Stream
              </h2>
              <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">
                View All
              </button>
            </div>
            <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {activities.map((act) => (
                <motion.li 
                  key={act.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`border-l-4 ${
                    act.type === 'alert' ? 'border-red-500 bg-red-900/10' :
                    act.type === 'success' ? 'border-green-500 bg-green-900/10' :
                    act.type === 'warning' ? 'border-yellow-500 bg-yellow-900/10' :
                    act.type === 'error' ? 'border-red-400 bg-red-900/10' :
                    'border-blue-500 bg-blue-900/10'
                  } p-3 rounded-r-lg`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{act.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm">{act.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {act.time}
                        </span>
                        <button className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-0.5 rounded">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Priority Alert */}
        <section className="mb-8 md:mb-12">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-red-900/50 to-red-800/30 p-4 md:p-6 rounded-lg border border-red-800/50 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" /> Priority Alert
                </h2>
                <div className="text-sm md:text-base">
                  <p>🚨 Increased pickpocketing incidents reported in downtown area.</p>
                  <p className="mt-1">⚠️ All patrol units advised to increase vigilance.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Dispatch Units
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                  Acknowledge
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Alerts Modal */}
        {showAlertModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl relative">
              <button
                onClick={() => {
                  setShowAlertModal(false);
                  setAlertError("");
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-400" /> Create Alert
              </h2>
              <textarea
                rows="4"
                placeholder="Enter alert details..."
                className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
                value={alertMessage}
                onChange={handleAlertChange}
              />
              {alertError && (
                <p className="text-red-400 text-sm mt-2">{alertError}</p>
              )}
              <button 
                onClick={handleSendAlert}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium"
              >
                Send Alert to All Users
              </button>
            </div>
          </div>
        )}

        {/* Emergency Modal */}
        {showEmergencyModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl relative">
              <button
                onClick={() => {
                  setShowEmergencyModal(false);
                  setEmergencyError("");
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-500" /> Emergency Mode
              </h2>
              <textarea
                rows="4"
                placeholder="Enter emergency instructions..."
                className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
                value={emergencyMessage}
                onChange={handleEmergencyChange}
              />
              {emergencyError && (
                <p className="text-red-400 text-sm mt-2">{emergencyError}</p>
              )}
              <button 
                onClick={handleActivateEmergency}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium"
              >
                Activate Emergency Mode
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmationModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl relative">
              <button
                onClick={closeConfirmationModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" /> Success!
              </h2>
              <p className="text-white mb-4">{confirmationMessage}</p>
              <button 
                onClick={closeConfirmationModal}
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
            <span>© {new Date().getFullYear()} Police Command Dashboard</span>
            <span className="hidden md:block">•</span>
            <span>Version 2.4.1</span>
            <span className="hidden md:block">•</span>
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}