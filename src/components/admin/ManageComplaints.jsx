import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";
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
  Clock
} from "lucide-react";

// Enhanced data with reporters and priority information
const barData = [
  { name: "Jan", reports: 12, resolved: 8, reporters: ["John D.", "Sarah M.", "Mike T."] },
  { name: "Feb", reports: 18, resolved: 12, reporters: ["Emma L.", "Robert K.", "Lisa P."] },
  { name: "Mar", reports: 22, resolved: 15, reporters: ["David S.", "Anna B.", "James W."] },
  { name: "Apr", reports: 15, resolved: 10, reporters: ["Olivia M.", "Thomas R.", "Grace H."] },
  { name: "May", reports: 27, resolved: 18, reporters: ["Daniel C.", "Sophia L.", "Ethan P."] },
  { name: "Jun", reports: 34, resolved: 22, reporters: ["Mia S.", "Noah K.", "Ava W."] },
  { name: "Jul", reports: 29, resolved: 20, reporters: ["Liam B.", "Isabella T.", "Lucas M."] },
];

const pieData = [
  { name: "Theft", value: 42, color: "#e11d48", priority: "High", lastReported: "2023-07-15" },
  { name: "Assault", value: 23, color: "#f97316", priority: "Critical", lastReported: "2023-07-18" },
  { name: "Fraud", value: 18, color: "#3b82f6", priority: "Medium", lastReported: "2023-07-10" },
  { name: "Drugs", value: 12, color: "#10b981", priority: "Low", lastReported: "2023-07-05" },
  { name: "Vandalism", value: 5, color: "#8b5cf6", priority: "Low", lastReported: "2023-07-12" },
];

const areaData = [
  { name: "00:00", crimes: 4, reporters: ["Night Patrol"] },
  { name: "03:00", crimes: 2, reporters: ["Night Patrol"] },
  { name: "06:00", crimes: 5, reporters: ["Morning Patrol"] },
  { name: "09:00", crimes: 8, reporters: ["Officer Smith", "Officer Johnson"] },
  { name: "12:00", crimes: 12, reporters: ["Officer Brown", "Officer Davis"] },
  { name: "15:00", crimes: 10, reporters: ["Officer Miller", "Officer Wilson"] },
  { name: "18:00", crimes: 15, reporters: ["Evening Patrol"] },
  { name: "21:00", crimes: 18, reporters: ["Officer Taylor", "Officer Anderson"] },
];

const hotZones = [
  { name: "Downtown Area", cases: 24, trend: "up", priority: "High", reporters: ["Business Owners Assoc"] },
  { name: "Industrial Zone", cases: 15, trend: "up", priority: "Medium", reporters: ["Security Company A"] },
  { name: "University District", cases: 8, trend: "down", priority: "Medium", reporters: ["Campus Security"] },
  { name: "Central Market", cases: 18, trend: "up", priority: "High", reporters: ["Market Association"] },
  { name: "Residential Block A", cases: 6, trend: "stable", priority: "Low", reporters: ["Neighborhood Watch"] },
];

// List of known reporters
const allReporters = [
  "John D.", "Sarah M.", "Mike T.", "Emma L.", "Robert K.", "Lisa P.", 
  "David S.", "Anna B.", "James W.", "Olivia M.", "Thomas R.", "Grace H.",
  "Daniel C.", "Sophia L.", "Ethan P.", "Mia S.", "Noah K.", "Ava W.",
  "Liam B.", "Isabella T.", "Lucas M.", "Night Patrol", "Morning Patrol",
  "Officer Smith", "Officer Johnson", "Officer Brown", "Officer Davis",
  "Officer Miller", "Officer Wilson", "Evening Patrol", "Officer Taylor",
  "Officer Anderson", "Business Owners Assoc", "Security Company A",
  "Campus Security", "Market Association", "Neighborhood Watch"
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [crimeTypeFilter, setCrimeTypeFilter] = useState("all");
  const [expandedSection, setExpandedSection] = useState(null);
  const [showAddReporter, setShowAddReporter] = useState(false);
  const [newReporter, setNewReporter] = useState("");
  const [reporters, setReporters] = useState(allReporters);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const addReporter = () => {
    if (newReporter.trim() && !reporters.includes(newReporter)) {
      setReporters([...reporters, newReporter]);
      setNewReporter("");
      setShowAddReporter(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header remains the same */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 flex items-center gap-3">
              <BarChart3 className="w-7 h-7 md:w-8 md:h-8" />
              <span>Crime Analytics Intelligence</span>
            </h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Comprehensive crime statistics and predictive analysis
            </p>
          </div>
          <div className="flex items-center gap-3">
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

        {/* KPI Cards remain the same */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* ... existing KPI cards ... */}
        </div>

        {/* New Reporters Management Section */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden mb-6 md:mb-8">
          <button
            onClick={() => toggleSection("reporters")}
            className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-700/50 transition"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" /> Crime Reporters
            </h3>
            {expandedSection === "reporters" ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {expandedSection === "reporters" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 pt-0"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium">Registered Reporters</h4>
                <button 
                  onClick={() => setShowAddReporter(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Reporter
                </button>
              </div>

              {showAddReporter && (
                <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      value={newReporter}
                      onChange={(e) => setNewReporter(e.target.value)}
                      placeholder="Enter reporter name"
                      className="flex-1 bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={addReporter}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setShowAddReporter(false)}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">Add new crime reporter to the system</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reporters.map((reporter, index) => (
                  <div key={index} className="bg-gray-700/50 p-3 rounded-lg flex items-center gap-3">
                    <div className="bg-gray-600 p-2 rounded-full">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{reporter}</p>
                      <p className="text-xs text-gray-400">
                        Reported {Math.floor(Math.random() * 10) + 1} cases
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Crime Trends Section with Reporter Info */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-400" /> Crime Trends Over Time
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
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                  formatter={(value, name, props) => {
                    if (name === "Reported Crimes" && props.payload.reporters) {
                      return [
                        value,
                        name,
                        `Reporters: ${props.payload.reporters.join(", ")}`
                      ];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar dataKey="reports" name="Reported Crimes" fill="#e11d48" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved Cases" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced Pie Chart with Priority Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-orange-400" /> Crime Type Distribution
              </h3>
              <select
                value={crimeTypeFilter}
                onChange={(e) => setCrimeTypeFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-1"
              >
                <option value="all">All Areas</option>
                <option value="north">North District</option>
                <option value="south">South District</option>
                <option value="east">East District</option>
                <option value="west">West District</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                    formatter={(value, name, props) => [
                      `${value} cases`,
                      `Priority: ${props.payload.priority}`,
                      `Last Reported: ${props.payload.lastReported}`
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {pieData.map((crime, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crime.color }} />
                  <span className="text-sm">{crime.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(crime.priority)}`}>
                    {crime.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Area Chart with Reporter Info */}
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" /> Time of Day Analysis
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorCrimes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                    formatter={(value, name, props) => [
                      `${value} cases`,
                      `Reported by: ${props.payload.reporters.join(", ")}`
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="crimes"
                    stroke="#e11d48"
                    fillOpacity={1}
                    fill="url(#colorCrimes)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Enhanced Hot Zones with Priority Info */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden mb-6 md:mb-8">
          <button
            onClick={() => toggleSection("hotzones")}
            className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-700/50 transition"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" /> High Risk Zones
            </h3>
            {expandedSection === "hotzones" ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {expandedSection === "hotzones" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 pt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Most Active Zones</h4>
                  <div className="space-y-3">
                    {hotZones.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-red-400" />
                          <div>
                            <p className="font-medium">{zone.name}</p>
                            <p className="text-xs text-gray-400">
                              Reported by: {zone.reporters.join(", ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{zone.cases} cases</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(zone.priority)}`}>
                            {zone.priority}
                          </span>
                          {zone.trend === "up" && (
                            <span className="text-xs bg-red-900/50 text-red-400 px-1.5 py-0.5 rounded-full flex items-center">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                            </span>
                          )}
                          {zone.trend === "down" && (
                            <span className="text-xs bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded-full flex items-center">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Zone Comparison</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={hotZones}
                      >
                        <XAxis type="number" stroke="#6b7280" />
                        <YAxis dataKey="name" type="category" stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                          formatter={(value, name, props) => [
                            `${value} cases`,
                            `Priority: ${props.payload.priority}`,
                            `Reporters: ${props.payload.reporters.join(", ")}`
                          ]}
                        />
                        <Bar dataKey="cases" fill="#e11d48" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                * Data based on last 30 days of reported incidents. Updated hourly.
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Predictive Analysis with Priority Dates */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-yellow-400" /> Predictive Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/10 p-4 rounded-lg border border-red-800/30">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium mb-2">Next 24 Hours</h4>
                  <p className="text-2xl font-bold text-white mb-1">High Risk</p>
                </div>
                <span className="text-xs bg-red-900/50 text-red-400 px-2 py-1 rounded-full">
                  Priority
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-300">Increased probability of theft incidents</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 p-4 rounded-lg border border-yellow-800/30">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium mb-2">Next 7 Days</h4>
                  <p className="text-2xl font-bold text-white mb-1">Medium Risk</p>
                </div>
                <span className="text-xs bg-yellow-900/50 text-yellow-400 px-2 py-1 rounded-full">
                  Watch
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-300">Potential for public disturbances</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-4 rounded-lg border border-blue-800/30">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium mb-2">Next 30 Days</h4>
                  <p className="text-2xl font-bold text-white mb-1">Stable</p>
                </div>
                <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-1 rounded-full">
                  Normal
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-300">Seasonal patterns indicate normal activity</p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Crime Analytics Intelligence • v2.5.0
        </footer>
      </div>
    </div>
  );
}