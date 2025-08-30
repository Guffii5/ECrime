import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Shield, HelpCircle, Mail, Moon, Sun,
  Menu, X, LogOut, Bell, User, Settings,
  AlertTriangle, MapPin, Clock, ChevronRight,
  BarChart2, Activity, ShieldCheck, MessageSquare, Database,
  ChevronDown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const actions = [
  {
    icon: <Shield className="w-6 h-6 text-red-400" />,
    title: "Safety Tips",
    description: "Learn how to stay safe",
    link: "/user/SafetyTips"
  },
  {
    icon: <HelpCircle className="w-6 h-6 text-red-400" />,
    title: "Track Complaints",
    description: "Monitor your reports",
    link: "/user/track"
  },
  {
    icon: <MapPin className="w-6 h-6 text-red-400" />,
    title: "Crime Map",
    description: "View incidents in your area",
    link: "/user/CrimeBycity"
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-red-400" />,
    title: "FAQS",
    description: "Frequently Asking Questions",
    link: "/user/faqs",
    urgent: true
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-red-400" />,
    title: "Statistics",
    description: "Crime trends analysis",
    link: "/user/Statistics"
  },
  {
    icon: <Database className="w-6 h-6 text-red-400" />,
    title: "Resources",
    description: "Helpful documents",
    link: "/user/Resources"
  }
];

const stats = [
  { label: "Reports Filed", value: 4, icon: <FileText className="w-5 h-5" />, trend: "up", link: "/user/Myreports" },
  { label: "Pending Reports", value: 2, icon: <Clock className="w-5 h-5" />, trend: "down", link: "/user/Myreports?filter=pending" },
  { label: "Resolved Cases", value: 1, icon: <ShieldCheck className="w-5 h-5" />, trend: "up", link: "/user/Myreports?filter=resolved" },
  { label: "Safety Score", value: "87%", icon: <Activity className="w-5 h-5" />, trend: "neutral" }
];

const allActivity = [
  { id: 1, type: "report", title: "Burglary Report", time: "2 hours ago", status: "processing" },
  { id: 2, type: "update", title: "Case #2456 Updated", time: "1 day ago", status: "resolved" },
  { id: 3, type: "message", title: "New Message from Officer", time: "2 days ago", status: "unread" },
  { id: 4, type: "update", title: "Case #2457 Resolved", time: "3 days ago", status: "resolved" },
  { id: 5, type: "report", title: "Suspicious Activity", time: "4 days ago", status: "processing" },
  { id: 6, type: "message", title: "Safety Alert", time: "5 days ago", status: "read" },
  { id: 7, type: "update", title: "Case #2458 In Progress", time: "1 week ago", status: "processing" }
];

const crimeData = [
  { month: 'Jan', reports: 40 },
  { month: 'Feb', reports: 30 },
  { month: 'Mar', reports: 50 },
  { month: 'Apr', reports: 45 },
  { month: 'May', reports: 55 },
  { month: 'Jun', reports: 60 }
];

export default function UserDashboard() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your report #2456 has been updated", read: false },
    { id: 2, message: "New safety alert in your area", read: false }
  ]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'bg-gradient-to-br from-black to-gray-900' : 'bg-gradient-to-br from-gray-900 to-black';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'midnight' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    // Mark as read when opened
    if (!showNotifications) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const handleLogout = () => {
    alert("Logged out successfully! (Mock implementation)");
  };

  const handleStatClick = (link) => {
    // Navigate to the reports page with the appropriate filter
    window.location.href = link;
  };

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const cardClass = "bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:border-red-500/50 hover:shadow-red-600/20 hover:shadow-lg";
  const buttonClass = "px-4 py-2 rounded-xl font-medium bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white flex items-center gap-2 transition-all duration-300";

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-black to-gray-900' : 'bg-gradient-to-br from-gray-900 to-black'} text-white py-10`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={containerClass}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <img
                src="/Profile.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-red-500"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border border-gray-800"></div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-red-500">Hello, User</h1>
              <p className="text-gray-400 text-sm">Welcome to your dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.button
                onClick={toggleNotifications}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute right-0 mt-2 w-72 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg z-50"
                  >
                    <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold">Notifications</h3>
                      <button onClick={toggleNotifications} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div key={notification.id} className="p-3 border-b border-gray-700 hover:bg-gray-700/50">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-400">No new notifications</div>
                      )}
                    </div>
                    <div className="p-2 border-t border-gray-700 text-center">
                      <button className="text-xs text-red-400 hover:text-red-300">
                        Mark all as read
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-3">
                {actions.map((action, index) => (
                  <motion.a
                    key={index}
                    href={action.link}
                    className={`bg-gray-900/50 border ${action.urgent ? 'border-red-500/50' : 'border-gray-700'} rounded-lg p-4 flex items-center gap-4`}
                    onClick={toggleMenu}
                    whileHover={{ x: 5 }}
                  >
                    {action.icon}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                      <p className="text-sm text-gray-400">{action.description}</p>
                    </div>
                    {action.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {action.badge}
                      </span>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => handleStatClick(stat.link)}
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-red-400 mt-1">{stat.value}</h3>
                </div>
                <div className={`p-2 rounded-full ${stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : stat.trend === 'down' ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-400'}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs">
                {stat.trend === 'up' ? (
                  <>
                    <span className="text-green-400">↑ 12%</span>
                    <span className="text-gray-400 ml-1">from last month</span>
                  </>
                ) : stat.trend === 'down' ? (
                  <>
                    <span className="text-red-400">↓ 5%</span>
                    <span className="text-gray-400 ml-1">from last month</span>
                  </>
                ) : (
                  <span className="text-gray-400">No change from last month</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Action Cards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {actions.map((action, index) => (
                <motion.a
                  key={index}
                  href={action.link}
                  className={`${cardClass} ${action.urgent ? 'border-red-500/70 hover:border-red-500' : ''}`}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={action.title}
                >
                  {action.badge && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {action.badge}
                    </span>
                  )}
                  <div className={`p-3 rounded-full mb-3 ${action.urgent ? 'bg-red-500/20' : 'bg-gray-700'}`}>
                    {action.icon}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white text-center">{action.title}</h3>
                  <p className="mt-1 text-sm text-gray-400 text-center">{action.description}</p>
                  <motion.div
                    className="mt-4 text-red-400 flex items-center text-sm"
                    whileHover={{ x: 5 }}
                  >
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8"
            >
              <h2 className="text-xl font-bold text-red-400 mb-6">Recent Activity</h2>

              {/* Activity list with scrollbar */}
              <div className="space-y-4 max-h-72 overflow-y-auto scrollbar-hide">
                {allActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg border ${activity.status === "unread"
                      ? "border-red-500/30 bg-red-500/10"
                      : "border-gray-700"
                      } flex items-start gap-3`}
                    whileHover={{ x: 5 }}
                  >
                    <div
                      className={`p-2 rounded-full ${activity.status === "unread"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-700 text-gray-400"
                        }`}
                    >
                      {activity.type === "report" && <FileText className="w-4 h-4" />}
                      {activity.type === "update" && <ShieldCheck className="w-4 h-4" />}
                      {activity.type === "message" && <Mail className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                    {activity.status === "unread" && (
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}