import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  AreaChart, 
  Area,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  PieChart as PieIcon, 
  LineChart as LineIcon,
  Filter,
  Download,
  AlertTriangle,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  Shield,
  Activity,
  Bell
} from "lucide-react";

// Sample data
const monthlyCrimeData = [
  { name: "Jan", theft: 12, assault: 8, vandalism: 5, resolved: 15 },
  { name: "Feb", theft: 18, assault: 10, vandalism: 7, resolved: 22 },
  { name: "Mar", theft: 22, assault: 14, vandalism: 9, resolved: 28 },
  { name: "Apr", theft: 15, assault: 9, vandalism: 6, resolved: 20 },
  { name: "May", theft: 27, assault: 16, vandalism: 11, resolved: 35 },
  { name: "Jun", theft: 34, assault: 20, vandalism: 14, resolved: 42 },
];

const crimeTypeData = [
  { name: "Theft", value: 42, color: "#e11d48" },
  { name: "Assault", value: 23, color: "#f97316" },
  { name: "Vandalism", value: 18, color: "#3b82f6" },
  { name: "Fraud", value: 12, color: "#10b981" },
  { name: "Drugs", value: 8, color: "#8b5cf6" },
];

const hourlyCrimeData = [
  { hour: "00:00", crimes: 4 },
  { hour: "03:00", crimes: 2 },
  { hour: "06:00", crimes: 5 },
  { hour: "09:00", crimes: 8 },
  { hour: "12:00", crimes: 12 },
  { hour: "15:00", crimes: 10 },
  { hour: "18:00", crimes: 15 },
  { hour: "21:00", crimes: 18 },
];

const hotZones = [
  { name: "Downtown Area", cases: 24, trend: "up" },
  { name: "Industrial Zone", cases: 15, trend: "up" },
  { name: "University District", cases: 8, trend: "down" },
  { name: "Central Market", cases: 18, trend: "up" },
];

const responseTimes = [
  { day: "Mon", time: 8.2 },
  { day: "Tue", time: 7.5 },
  { day: "Wed", time: 9.1 },
  { day: "Thu", time: 7.8 },
  { day: "Fri", time: 8.9 },
  { day: "Sat", time: 10.2 },
  { day: "Sun", time: 11.5 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [crimeTypeFilter, setCrimeTypeFilter] = useState("all");
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 flex items-center gap-3">
              <Activity className="w-7 h-7 md:w-8 md:h-8" /> 
              <span>Crime Analytics Dashboard</span>
            </h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Real-time crime statistics and predictive analysis
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 md:px-4 py-2 rounded-lg text-sm transition">
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span>Export Data</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 md:px-4 py-2 rounded-lg text-sm transition">
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Total Crimes</h3>
              <span className="text-xs bg-red-900/50 text-red-400 px-2 py-1 rounded-full">+18%</span>
            </div>
            <p className="text-2xl font-bold mt-1">1,248</p>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </div>
          <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Clearance Rate</h3>
              <span className="text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded-full">+5%</span>
            </div>
            <p className="text-2xl font-bold mt-1">68%</p>
            <p className="text-xs text-gray-500">Above national average</p>
          </div>
          <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Avg Response Time</h3>
              <span className="text-xs bg-yellow-900/50 text-yellow-400 px-2 py-1 rounded-full">-12%</span>
            </div>
            <p className="text-2xl font-bold mt-1">8.2 min</p>
            <p className="text-xs text-gray-500">Emergency calls</p>
          </div>
          <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Hotspots</h3>
              <span className="text-xs bg-orange-900/50 text-orange-400 px-2 py-1 rounded-full">3 new</span>
            </div>
            <p className="text-2xl font-bold mt-1">24</p>
            <p className="text-xs text-gray-500">High-risk areas</p>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Crime Trends */}
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Monthly Crime Trends
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTimeRange("monthly")}
                  className={`px-2 py-1 text-xs rounded ${timeRange === "monthly" ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setTimeRange("weekly")}
                  className={`px-2 py-1 text-xs rounded ${timeRange === "weekly" ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
                >
                  Weekly
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCrimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151', 
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="theft" name="Theft" fill="#e11d48" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="assault" name="Assault" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="vandalism" name="Vandalism" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crime Type Distribution */}
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-orange-400" />
                Crime Type Distribution
              </h3>
              <select 
                value={crimeTypeFilter}
                onChange={(e) => setCrimeTypeFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-xs rounded px-2 py-1"
              >
                <option value="all">All Areas</option>
                <option value="north">North District</option>
                <option value="south">South District</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={crimeTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {crimeTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} cases`, name]}
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151', 
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Hourly Crime Activity */}
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Hourly Crime Activity
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyCrimeData}>
                  <defs>
                    <linearGradient id="colorCrimes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151', 
                      borderRadius: '0.5rem'
                    }}
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

          {/* Response Times */}
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Response Times
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#374151', 
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value) => [`${value} minutes`, "Avg Response Time"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Expandable Hot Zones Section */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <button 
            onClick={() => toggleSection("hotzones")}
            className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-700/50 transition"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" /> 
              High Risk Zones
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
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 pt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Most Active Zones</h4>
                  <div className="space-y-3">
                    {hotZones.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-red-400" />
                          <span>{zone.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{zone.cases} cases</span>
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
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Zone Comparison</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={hotZones}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9ca3af" />
                        <YAxis dataKey="name" type="category" stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            borderColor: '#374151', 
                            borderRadius: '0.5rem'
                          }}
                          formatter={(value) => [`${value} cases`, "Reported Incidents"]}
                        />
                        <Bar dataKey="cases" fill="#e11d48" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                * Data based on last 30 days of reported incidents. Updated hourly.
              </div>
            </motion.div>
          )}
        </div>

        {/* Predictive Analysis */}
        <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-400" />
            Predictive Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/10 p-4 rounded-lg border border-red-800/30">
              <h4 className="text-sm font-medium mb-2">Next 24 Hours</h4>
              <p className="text-xl font-bold text-white mb-1">High Risk</p>
              <p className="text-xs text-gray-400">Increased probability of theft incidents</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 p-4 rounded-lg border border-yellow-800/30">
              <h4 className="text-sm font-medium mb-2">Next 7 Days</h4>
              <p className="text-xl font-bold text-white mb-1">Medium Risk</p>
              <p className="text-xs text-gray-400">Potential for public disturbances</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-4 rounded-lg border border-blue-800/30">
              <h4 className="text-sm font-medium mb-2">Next 30 Days</h4>
              <p className="text-xl font-bold text-white mb-1">Stable</p>
              <p className="text-xs text-gray-400">Seasonal patterns indicate normal activity</p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Crime Analytics Dashboard • v2.4.1
        </footer>
      </div>
    </div>
  );
}