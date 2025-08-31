import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Users,
  Shield,
  Bell,
  Database,
  Activity,
  Save,
  Download,
  Upload,
  Lock,
  Key,
  Eye,
  EyeOff,
  Mail,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  UserPlus,
  Edit,
  LogOut,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Server,
  HardDrive,
  Network,
  Cpu,
  BarChart3,
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Police Admin System",
    language: "en",
    timezone: "UTC+5",
    dateFormat: "MM/DD/YYYY",
    enableNotifications: true,
    enableAuditLogs: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    backupFrequency: 7,
    retainBackups: 30,
    twoFactorAuth: true,
  });

  const [users, setUsers] = useState([
    { id: 1, name: "Guffii", email: "guffii@admin.com", role: "Super Admin", status: "Active", lastLogin: "2025-08-31 10:45" },
    { id: 2, name: "Salman", email: "salman@admin.com", role: "Admin", status: "Active", lastLogin: "2025-08-30 16:20" },
    { id: 3, name: "Hamza", email: "hamza@admin.com", role: "Moderator", status: "Inactive", lastLogin: "2025-08-28 15:00" },
    { id: 4, name: "Ali", email: "ali@admin.com", role: "Viewer", status: "Active", lastLogin: "2025-08-29 09:30" },
  ]);

  const [auditLogs] = useState([
    { id: 1, user: "Guffii", action: "Logged in", time: "2025-08-31 10:45", ip: "192.168.1.101", status: "Success" },
    { id: 2, user: "Salman", action: "Deleted complaint #102", time: "2025-08-30 16:20", ip: "192.168.1.102", status: "Success" },
    { id: 3, user: "Hamza", action: "Failed login attempt", time: "2025-08-30 15:00", ip: "192.168.1.103", status: "Failed" },
    { id: 4, user: "Ali", action: "Updated station details", time: "2025-08-29 14:22", ip: "192.168.1.104", status: "Success" },
    { id: 5, user: "Guffii", action: "Changed security settings", time: "2025-08-29 11:15", ip: "192.168.1.101", status: "Success" },
    { id: 6, user: "Salman", action: "Exported data report", time: "2025-08-28 17:45", ip: "192.168.1.102", status: "Success" },
  ]);

  const [backups] = useState([
    { id: 1, name: "backup_20250831.zip", size: "2.4 GB", date: "2025-08-31 02:00", status: "Completed" },
    { id: 2, name: "backup_20250830.zip", size: "2.3 GB", date: "2025-08-30 02:00", status: "Completed" },
    { id: 3, name: "backup_20250829.zip", size: "2.2 GB", date: "2025-08-29 02:00", status: "Completed" },
    { id: 4, name: "backup_20250828.zip", size: "2.1 GB", date: "2025-08-28 02:00", status: "Completed" },
  ]);

  const [systemStats] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkIn: 120,
    networkOut: 85,
    uptime: "12 days, 4 hours",
    version: "v2.4.1",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    console.log("Settings saved:", settings);
  };

  const handleCreateBackup = () => {
    // Backup functionality would go here
    console.log("Creating backup...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-800/70 backdrop-blur-lg rounded-xl p-4 border border-gray-700 md:col-span-1"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-400" />
            System Settings
          </h2>
          <div className="space-y-1">
            {/* General */}
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${activeTab === "general"
                  ? "bg-red-900/30 text-red-400 border border-red-800/50"
                  : "hover:bg-gray-700/50"
                }`}
            >
              <Settings className="w-4 h-4" />
              <span>General</span>
            </motion.button>
            {/* Users */}
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${activeTab === "users"
                  ? "bg-red-900/30 text-red-400 border border-red-800/50"
                  : "hover:bg-gray-700/50"
                }`}
            >
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </motion.button>
            {/* Security */}
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${activeTab === "security"
                  ? "bg-red-900/30 text-red-400 border border-red-800/50"
                  : "hover:bg-gray-700/50"
                }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </motion.button>
            {/* Notifications */}
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${activeTab === "notifications"
                  ? "bg-red-900/30 text-red-400 border border-red-800/50"
                  : "hover:bg-gray-700/50"
                }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </motion.button>
            {/* Data */}
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("data")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${activeTab === "data"
                  ? "bg-red-900/30 text-red-400 border border-red-800/50"
                  : "hover:bg-gray-700/50"
                }`}
            >
              <Database className="w-4 h-4" />
              <span>Data Management</span>
            </motion.button>
            {/* Audit Logs */}
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("audit")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${activeTab === "audit"
                  ? "bg-red-900/30 text-red-400 border border-red-800/50"
                  : "hover:bg-gray-700/50"
                }`}
            >
              <Activity className="w-4 h-4" />
              <span>Audit Logs</span>
            </motion.button>
            {/* System Health */}
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("system")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${activeTab === "system"
                  ? "bg-red-900/30 text-red-400 border border-red-800/50"
                  : "hover:bg-gray-700/50"
                }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>System Health</span>
            </motion.button>
          </div>

        </motion.div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {/* General Settings */}
            {activeTab === "general" && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/80 p-6 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Settings className="w-5 h-5 text-red-400" />
                    General Settings
                  </h3>
                  <button
                    onClick={handleSaveSettings}
                    className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                      <input
                        type="text"
                        name="siteName"
                        value={settings.siteName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                      <select
                        name="language"
                        value={settings.language}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="en">English</option>
                        <option value="ur">Urdu</option>
                        <option value="ar">Arabic</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                      <select
                        name="timezone"
                        value={settings.timezone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="UTC+5">UTC+5 (Pakistan Standard Time)</option>
                        <option value="UTC+0">UTC+0 (GMT)</option>
                        <option value="UTC-5">UTC-5 (EST)</option>
                        <option value="UTC+1">UTC+1 (CET)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date Format</label>
                      <select
                        name="dateFormat"
                        value={settings.dateFormat}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Enable Notifications</label>
                        <p className="text-xs text-gray-500">System-wide notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="enableNotifications"
                          checked={settings.enableNotifications}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Enable Audit Logs</label>
                        <p className="text-xs text-gray-500">Record system activities</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="enableAuditLogs"
                          checked={settings.enableAuditLogs}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* User Management */}
            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/80 p-6 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-400" />
                    User Management
                  </h3>
                  <button className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition">
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Login</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${user.role === "Super Admin" ? "bg-purple-900/30 text-purple-400" :
                                user.role === "Admin" ? "bg-red-900/30 text-red-400" :
                                  user.role === "Moderator" ? "bg-blue-900/30 text-blue-400" :
                                    "bg-gray-700 text-gray-300"
                              }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${user.status === "Active"
                                ? "bg-green-900/30 text-green-400"
                                : "bg-gray-700 text-gray-300"
                              }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-400">{user.lastLogin}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-1 text-blue-400 hover:text-blue-300">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/80 p-6 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    Security Settings
                  </h3>
                  <button
                    onClick={handleSaveSettings}
                    className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        name="sessionTimeout"
                        value={settings.sessionTimeout}
                        onChange={handleInputChange}
                        min="5"
                        max="120"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">After this time, users will be automatically logged out</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Password Expiry (days)</label>
                      <input
                        type="number"
                        name="passwordExpiry"
                        value={settings.passwordExpiry}
                        onChange={handleInputChange}
                        min="1"
                        max="365"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Users will be prompted to change their password after this period</p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Two-Factor Authentication</label>
                        <p className="text-xs text-gray-500">Require 2FA for all users</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="twoFactorAuth"
                          checked={settings.twoFactorAuth}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-red-400" />
                        Password Requirements
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-sm">Minimum 8 characters</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-sm">At least one uppercase letter</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-sm">At least one number</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-sm">At least one special character</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-md font-medium mb-4 flex items-center gap-2">
                        <Key className="w-4 h-4 text-red-400" />
                        Change Admin Password
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <button className="w-full bg-red-700 hover:bg-red-600 py-2 rounded-lg mt-2">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/80 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-red-400" />
                  Notification Settings
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-400">Receive important updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-gray-400">Get instant alerts on your device</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">SMS Alerts</h4>
                        <p className="text-sm text-gray-400">Critical alerts via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Notification Types</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                          <span className="text-sm">New User Registrations</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                          <span className="text-sm">System Updates</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                          <span className="text-sm">Security Alerts</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                          <span className="text-sm">Backup Status</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Email Address for Notifications</h4>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          placeholder="admin@example.com"
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Data Management */}
            {activeTab === "data" && (
              <motion.div
                key="data"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/80 p-6 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Database className="w-5 h-5 text-red-400" />
                    Data Management
                  </h3>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition">
                      <Download className="w-4 h-4" />
                      Export Data
                    </button>
                    <button
                      onClick={handleCreateBackup}
                      className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-3 py-2 rounded-lg transition"
                    >
                      <Save className="w-4 h-4" />
                      Create Backup
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Backup Frequency (days)</label>
                      <input
                        type="number"
                        name="backupFrequency"
                        value={settings.backupFrequency}
                        onChange={handleInputChange}
                        min="1"
                        max="30"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Retain Backups (days)</label>
                      <input
                        type="number"
                        name="retainBackups"
                        value={settings.retainBackups}
                        onChange={handleInputChange}
                        min="7"
                        max="365"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Auto Backup</h4>
                        <p className="text-sm text-gray-400">Automatically create backups</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Cloud Backup</h4>
                        <p className="text-sm text-gray-400">Store backups in cloud storage</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-red-400" />
                    Recent Backups
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Backup Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {backups.map((backup) => (
                          <tr key={backup.id}>
                            <td className="px-4 py-3 text-sm font-medium">{backup.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-400">{backup.size}</td>
                            <td className="px-4 py-3 text-sm text-gray-400">{backup.date}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${backup.status === "Completed"
                                  ? "bg-green-900/30 text-green-400"
                                  : "bg-yellow-900/30 text-yellow-400"
                                }`}>
                                {backup.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1 text-blue-400 hover:text-blue-300">
                                  <Download className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-red-400 hover:text-red-300">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    Danger Zone
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">These actions are irreversible. Please be cautious.</p>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                      Purge Old Data
                    </button>
                    <button className="px-4 py-2 bg-red-800 hover:bg-red-700 rounded-lg text-sm">
                      Reset System
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Audit Logs */}
            {activeTab === "audit" && (
              <motion.div
                key="audit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/80 p-6 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-red-400">
                    <Activity className="w-5 h-5" />
                    System Audit Logs
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search logs..."
                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          IP Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {auditLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-300">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {log.ip}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {log.time}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === "Success"
                                  ? "bg-green-900/30 text-green-400 border border-green-800/50"
                                  : "bg-red-900/30 text-red-400 border border-red-800/50"
                                }`}
                            >
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-400">Showing 6 of 128 entries</p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-red-700 rounded-lg text-sm">
                      1
                    </button>
                    <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm">
                      2
                    </button>
                    <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm">
                      3
                    </button>
                    <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* System Health */}
            {activeTab === "system" && (
              <motion.div
                key="system"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/80 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-400" />
                  System Health
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-red-400" />
                        CPU Usage
                      </h4>
                      <span className="text-sm font-medium">{systemStats.cpuUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full"
                        style={{ width: `${systemStats.cpuUsage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Server className="w-4 h-4 text-red-400" />
                        Memory Usage
                      </h4>
                      <span className="text-sm font-medium">{systemStats.memoryUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full"
                        style={{ width: `${systemStats.memoryUsage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-red-400" />
                        Disk Usage
                      </h4>
                      <span className="text-sm font-medium">{systemStats.diskUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full"
                        style={{ width: `${systemStats.diskUsage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Network className="w-4 h-4 text-red-400" />
                        Network Traffic
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>In: {systemStats.networkIn} MB/s</span>
                        <Download className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Out: {systemStats.networkOut} MB/s</span>
                        <Upload className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-400" />
                      System Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime:</span>
                        <span>{systemStats.uptime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Version:</span>
                        <span>{systemStats.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Backup:</span>
                        <span>2025-08-31 02:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Update:</span>
                        <span>2025-08-28 14:30</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-red-400" />
                      Recent Events
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Backup completed</span>
                        <span className="text-green-400 text-xs">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>User login</span>
                        <span className="text-green-400 text-xs">4 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Security scan</span>
                        <span className="text-green-400 text-xs">6 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Database optimized</span>
                        <span className="text-green-400 text-xs">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}