import React, { useState } from "react";
import {
  Settings,
  Users,
  Shield,
  Database,
  Bell,
  Lock,
  Activity,
  AlertCircle,
  Mail,
  Key,
  LogOut,
  ChevronDown,
  ChevronUp,
  Search,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [expandedSection, setExpandedSection] = useState(null);
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    smsAlerts: true,
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    passwordExpiry: 90,
    loginAttempts: 5,
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type } = e.target;
    setSecurity((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Guffii",
      email: "Guffii@crimeunit.gov",
      role: "Admin",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Salman",
      email: "Salman@crimeunit.gov",
      role: "Analyst",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Gulfam",
      email: "Gulfam@crimeunit.gov",
      role: "Officer",
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Hamza",
      email: "Hamza@crimeunit.gov",
      role: "Officer",
      lastActive: "1 week ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-red-500 flex items-center gap-3">
                <ShieldCheck className="w-9 h-9 text-red-600" />
                <span>Police Command Center</span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm md:text-base">
                System Configuration and Administration Panel
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span>Alerts</span>
              </button>
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                <Activity className="w-5 h-5" />
                <span>Emergency Mode</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-64 bg-gray-800/80 rounded-lg shadow-lg p-4 h-fit sticky top-6 border border-gray-700 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-400">
              <Settings className="w-5 h-5 text-red-500" />
              <span>Admin Settings</span>
            </h2>

            <nav className="space-y-1">
              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                  activeTab === "general"
                    ? "bg-red-900/30 text-red-400 border border-red-800/50"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>General Settings</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                  activeTab === "users"
                    ? "bg-red-900/30 text-red-400 border border-red-800/50"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>User Management</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                  activeTab === "security"
                    ? "bg-red-900/30 text-red-400 border border-red-800/50"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                  activeTab === "notifications"
                    ? "bg-red-900/30 text-red-400 border border-red-800/50"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab("data")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                  activeTab === "data"
                    ? "bg-red-900/30 text-red-400 border border-red-800/50"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Data Management</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab("audit")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                  activeTab === "audit"
                    ? "bg-red-900/30 text-red-400 border border-red-800/50"
                    : "hover:bg-gray-700/50"
                }`}
              >
                
              </motion.button>
            </nav>

            <div className="mt-8 pt-4 border-t border-gray-700">
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-400 hover:bg-red-900/20 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === "general" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800/80 rounded-lg shadow-lg p-6 border border-gray-700 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-red-400">
                  <Settings className="w-5 h-5 text-red-500" />
                  General System Settings
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      System Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          System Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Crime Reporting System"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          System Version
                        </label>
                        <input
                          type="text"
                          defaultValue="v2.4.1"
                          disabled
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      Maintenance Mode
                    </h4>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-400">
                        Enable maintenance mode
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      When enabled, only administrators can access the system.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      Default System Language
                    </h4>
                    <select className="w-full md:w-64 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800/80 rounded-lg shadow-lg overflow-hidden border border-gray-700 backdrop-blur-sm"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-red-400">
                    <Users className="w-5 h-5 text-red-500" />
                    User Management
                  </h3>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="relative w-full md:w-64">
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2 whitespace-nowrap">
                      <Users className="w-4 h-4" />
                      Add New User
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          >
                            Last Active
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-medium border border-red-800/50">
                                  {user.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">
                                    {user.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  user.role === "Admin"
                                    ? "bg-purple-900/30 text-purple-400 border border-purple-800/50"
                                    : user.role === "Analyst"
                                    ? "bg-blue-900/30 text-blue-400 border border-blue-800/50"
                                    : "bg-green-900/30 text-green-400 border border-green-800/50"
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {user.lastActive}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-400 hover:text-blue-300 mr-3">
                                Edit
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800/80 rounded-lg shadow-lg p-6 border border-gray-700 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-red-400">
                  <Shield className="w-5 h-5 text-red-500" />
                  Security Settings
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      Password Policies
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Minimum Password Length
                        </label>
                        <input
                          type="number"
                          name="passwordLength"
                          min="8"
                          max="32"
                          defaultValue="12"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Password Expiry (days)
                        </label>
                        <input
                          type="number"
                          name="passwordExpiry"
                          min="30"
                          max="365"
                          value={security.passwordExpiry}
                          onChange={handleSecurityChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="requireSpecialChar"
                          defaultChecked
                          className="h-4 w-4 text-red-600 focus:ring-red-500 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-400">
                          Require special characters
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="requireNumbers"
                          defaultChecked
                          className="h-4 w-4 text-red-600 focus:ring-red-500 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-400">
                          Require numbers
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="preventReuse"
                          defaultChecked
                          className="h-4 w-4 text-red-600 focus:ring-red-500 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-400">
                          Prevent password reuse
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      Login Security
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Two-Factor Authentication
                          </label>
                          <p className="text-xs text-gray-500">
                            Require users to enable 2FA for additional security
                          </p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="twoFactorAuth"
                            checked={security.twoFactorAuth}
                            onChange={(e) =>
                              setSecurity((prev) => ({
                                ...prev,
                                twoFactorAuth: e.target.checked,
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Failed Login Attempts
                          </label>
                          <p className="text-xs text-gray-500">
                            Lock account after specified failed attempts
                          </p>
                        </div>
                        <input
                          type="number"
                          name="loginAttempts"
                          min="1"
                          max="10"
                          value={security.loginAttempts}
                          onChange={handleSecurityChange}
                          className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Account Lockout Duration
                          </label>
                          <p className="text-xs text-gray-500">
                            Minutes to lock account after failed attempts
                          </p>
                        </div>
                        <select className="w-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-500 text-white">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>24 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Update Security Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800/80 rounded-lg shadow-lg p-6 border border-gray-700 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-red-400">
                  <Bell className="w-5 h-5 text-red-500" />
                  Notification Settings
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      Notification Channels
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email Alerts
                          </label>
                          <p className="text-xs text-gray-500">
                            Receive important system notifications via email
                          </p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="emailAlerts"
                            checked={notifications.emailAlerts}
                            onChange={handleNotificationChange}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Push Notifications
                          </label>
                          <p className="text-xs text-gray-500">
                            Receive real-time alerts on your mobile device
                          </p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="pushNotifications"
                            checked={notifications.pushNotifications}
                            onChange={handleNotificationChange}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            SMS Alerts
                          </label>
                          <p className="text-xs text-gray-500">
                            Receive critical alerts via text message
                          </p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="smsAlerts"
                            checked={notifications.smsAlerts}
                            onChange={handleNotificationChange}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      Alert Thresholds
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          High Priority
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white">
                          <option>Immediate notification</option>
                          <option>Within 15 minutes</option>
                          <option>Within 1 hour</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Medium Priority
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white">
                          <option>Within 1 hour</option>
                          <option>Within 4 hours</option>
                          <option>Within 24 hours</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Low Priority
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white">
                          <option>Within 24 hours</option>
                          <option>Weekly digest</option>
                          <option>No notification</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Save Notification Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "data" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800/80 rounded-lg shadow-lg p-6 border border-gray-700 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-red-400">
                  <Database className="w-5 h-5 text-red-500" />
                  Data Management
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      Database Operations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                        <label className="block text-sm font-medium text-gray-300 mb-2 sm:flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          Backup Database
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          Create a full backup of the system database.
                        </p>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2">
                          <Database className="w-4 h-4" />
                          Initiate Backup
                        </button>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                        <label className="block text-sm font-medium text-gray-300 mb-2 sm:flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          Optimize Database
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          Improve database performance and integrity.
                        </p>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          Run Optimization
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-gray-300">
                      Data Retention Policies
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Case Data Retention
                          </label>
                          <p className="text-xs text-gray-500">
                            Number of years to retain closed case data.
                          </p>
                        </div>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          defaultValue="5"
                          className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Audit Log Retention
                          </label>
                          <p className="text-xs text-gray-500">
                            Number of days to retain system audit logs.
                          </p>
                        </div>
                        <input
                          type="number"
                          min="30"
                          max="365"
                          defaultValue="180"
                          className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Save Data Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "audit" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800/80 rounded-lg shadow-lg p-6 border border-gray-700 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-red-400">
                  <Activity className="w-5 h-5 text-red-500" />
                  Audit Logs
                </h3>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search logs..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition flex items-center gap-2 whitespace-nowrap">
                      <Clock className="w-4 h-4" />
                      Filter by Date
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap">
                      <Download className="w-4 h-4" />
                      Export Logs
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Timestamp
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Action
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Details
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          IP Address
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {auditLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {log.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                log.action.includes("login")
                                  ? "bg-purple-900/30 text-purple-400 border border-purple-800/50"
                                  : log.action.includes("created")
                                  ? "bg-green-900/30 text-green-400 border border-green-800/50"
                                  : log.action.includes("update")
                                  ? "bg-blue-900/30 text-blue-400 border border-blue-800/50"
                                  : "bg-gray-700/50 text-gray-300 border border-gray-600"
                              }`}
                            >
                              {log.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {log.details}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {log.ip}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;