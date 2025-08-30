import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { X, MapPin, AlertCircle, ArrowLeft, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data
const monthlyData = [
  { month: "Jan", reports: 30 },
  { month: "Feb", reports: 45 },
  { month: "Mar", reports: 28 },
  { month: "Apr", reports: 60 },
  { month: "May", reports: 50 },
  { month: "Jun", reports: 70 },
  { month: "Jul", reports: 90 },
  { month: "Aug", reports: 40 },
  { month: "Sep", reports: 55 },
  { month: "Oct", reports: 65 },
  { month: "Nov", reports: 80 },
  { month: "Dec", reports: 75 },
];

const yearlyData = [
  { year: "2020", reports: 500 },
  { year: "2021", reports: 650 },
  { year: "2022", reports: 720 },
  { year: "2023", reports: 810 },
  { year: "2024", reports: 900 },
];

// All major cities of Punjab with crime data
const cityCrimeData = [
  { 
    city: "Lahore", 
    cases: 320, 
    highlight: "Robbery & Snatching incidents",
    breakdown: [
      { type: "Robbery", count: 70 },
      { type: "Snatching", count: 80 },
      { type: "Murder", count: 25 },
      { type: "Kidnapping", count: 20 },
      { type: "Theft", count: 45 },
      { type: "Smuggling", count: 30 },
      { type: "Fraud", count: 25 },
      { type: "Assault", count: 25 }
    ]
  },
  { 
    city: "Faisalabad", 
    cases: 180, 
    highlight: "Industrial theft cases",
    breakdown: [
      { type: "Robbery", count: 30 },
      { type: "Snatching", count: 25 },
      { type: "Murder", count: 15 },
      { type: "Kidnapping", count: 20 },
      { type: "Theft", count: 40 },
      { type: "Smuggling", count: 15 },
      { type: "Fraud", count: 20 },
      { type: "Assault", count: 15 }
    ]
  },
  { 
    city: "Rawalpindi", 
    cases: 160, 
    highlight: "Property crimes",
    breakdown: [
      { type: "Robbery", count: 25 },
      { type: "Snatching", count: 30 },
      { type: "Murder", count: 10 },
      { type: "Kidnapping", count: 15 },
      { type: "Theft", count: 35 },
      { type: "Smuggling", count: 20 },
      { type: "Fraud", count: 15 },
      { type: "Assault", count: 10 }
    ]
  },
  { 
    city: "Gujranwala", 
    cases: 140, 
    highlight: "Smuggling cases",
    breakdown: [
      { type: "Robbery", count: 20 },
      { type: "Snatching", count: 25 },
      { type: "Murder", count: 8 },
      { type: "Kidnapping", count: 12 },
      { type: "Theft", count: 25 },
      { type: "Smuggling", count: 30 },
      { type: "Fraud", count: 10 },
      { type: "Assault", count: 10 }
    ]
  },
  { 
    city: "Multan", 
    cases: 130, 
    highlight: "Agricultural theft",
    breakdown: [
      { type: "Robbery", count: 25 },
      { type: "Snatching", count: 20 },
      { type: "Murder", count: 12 },
      { type: "Kidnapping", count: 15 },
      { type: "Theft", count: 30 },
      { type: "Smuggling", count: 15 },
      { type: "Fraud", count: 8 },
      { type: "Assault", count: 5 }
    ]
  },
  { 
    city: "Sialkot", 
    cases: 110, 
    highlight: "Export-related fraud",
    breakdown: [
      { type: "Robbery", count: 15 },
      { type: "Snatching", count: 20 },
      { type: "Murder", count: 5 },
      { type: "Kidnapping", count: 10 },
      { type: "Theft", count: 25 },
      { type: "Smuggling", count: 15 },
      { type: "Fraud", count: 15 },
      { type: "Assault", count: 5 }
    ]
  },
  { 
    city: "Bahawalpur", 
    cases: 90, 
    highlight: "Border smuggling",
    breakdown: [
      { type: "Robbery", count: 15 },
      { type: "Snatching", count: 10 },
      { type: "Murder", count: 8 },
      { type: "Kidnapping", count: 12 },
      { type: "Theft", count: 15 },
      { type: "Smuggling", count: 20 },
      { type: "Fraud", count: 5 },
      { type: "Assault", count: 5 }
    ]
  },
  { 
    city: "Sargodha", 
    cases: 85, 
    highlight: "Agricultural equipment theft",
    breakdown: [
      { type: "Robbery", count: 10 },
      { type: "Snatching", count: 15 },
      { type: "Murder", count: 5 },
      { type: "Kidnapping", count: 8 },
      { type: "Theft", count: 25 },
      { type: "Smuggling", count: 10 },
      { type: "Fraud", count: 7 },
      { type: "Assault", count: 5 }
    ]
  },
  { 
    city: "Sheikhupura", 
    cases: 75, 
    highlight: "Industrial area crimes",
    breakdown: [
      { type: "Robbery", count: 12 },
      { type: "Snatching", count: 15 },
      { type: "Murder", count: 5 },
      { type: "Kidnapping", count: 8 },
      { type: "Theft", count: 15 },
      { type: "Smuggling", count: 10 },
      { type: "Fraud", count: 5 },
      { type: "Assault", count: 5 }
    ]
  },
  { 
    city: "Jhang", 
    cases: 70, 
    highlight: "Rural property crimes",
    breakdown: [
      { type: "Robbery", count: 10 },
      { type: "Snatching", count: 12 },
      { type: "Murder", count: 8 },
      { type: "Kidnapping", count: 10 },
      { type: "Theft", count: 12 },
      { type: "Smuggling", count: 8 },
      { type: "Fraud", count: 5 },
      { type: "Assault", count: 5 }
    ]
  },
  { 
    city: "Rahim Yar Khan", 
    cases: 65, 
    highlight: "Border area smuggling",
    breakdown: [
      { type: "Robbery", count: 8 },
      { type: "Snatching", count: 10 },
      { type: "Murder", count: 5 },
      { type: "Kidnapping", count: 7 },
      { type: "Theft", count: 10 },
      { type: "Smuggling", count: 15 },
      { type: "Fraud", count: 5 },
      { type: "Assault", count: 5 }
    ]
  },
  { 
    city: "Gujrat", 
    cases: 60, 
    highlight: "Pottery industry theft",
    breakdown: [
      { type: "Robbery", count: 8 },
      { type: "Snatching", count: 10 },
      { type: "Murder", count: 4 },
      { type: "Kidnapping", count: 6 },
      { type: "Theft", count: 15 },
      { type: "Smuggling", count: 8 },
      { type: "Fraud", count: 5 },
      { type: "Assault", count: 4 }
    ]
  },
  { 
    city: "Kasur", 
    cases: 55, 
    highlight: "Cattle smuggling",
    breakdown: [
      { type: "Robbery", count: 8 },
      { type: "Snatching", count: 10 },
      { type: "Murder", count: 5 },
      { type: "Kidnapping", count: 7 },
      { type: "Theft", count: 10 },
      { type: "Smuggling", count: 10 },
      { type: "Fraud", count: 3 },
      { type: "Assault", count: 2 }
    ]
  },
  { 
    city: "Sahiwal", 
    cases: 50, 
    highlight: "Agricultural theft",
    breakdown: [
      { type: "Robbery", count: 6 },
      { type: "Snatching", count: 8 },
      { type: "Murder", count: 4 },
      { type: "Kidnapping", count: 5 },
      { type: "Theft", count: 12 },
      { type: "Smuggling", count: 8 },
      { type: "Fraud", count: 4 },
      { type: "Assault", count: 3 }
    ]
  },
  { 
    city: "Okara", 
    cases: 45, 
    highlight: "Rural area crimes",
    breakdown: [
      { type: "Robbery", count: 5 },
      { type: "Snatching", count: 7 },
      { type: "Murder", count: 3 },
      { type: "Kidnapping", count: 4 },
      { type: "Theft", count: 10 },
      { type: "Smuggling", count: 8 },
      { type: "Fraud", count: 4 },
      { type: "Assault", count: 4 }
    ]
  },
  { 
    city: "Mianwali", 
    cases: 40, 
    highlight: "Mineral smuggling",
    breakdown: [
      { type: "Robbery", count: 5 },
      { type: "Snatching", count: 6 },
      { type: "Murder", count: 3 },
      { type: "Kidnapping", count: 4 },
      { type: "Theft", count: 8 },
      { type: "Smuggling", count: 10 },
      { type: "Fraud", count: 2 },
      { type: "Assault", count: 2 }
    ]
  },
  { 
    city: "Hafizabad", 
    cases: 35, 
    highlight: "Rice industry crimes",
    breakdown: [
      { type: "Robbery", count: 4 },
      { type: "Snatching", count: 5 },
      { type: "Murder", count: 2 },
      { type: "Kidnapping", count: 3 },
      { type: "Theft", count: 10 },
      { type: "Smuggling", count: 6 },
      { type: "Fraud", count: 3 },
      { type: "Assault", count: 2 }
    ]
  },
  { 
    city: "Attock", 
    cases: 30, 
    highlight: "Oil industry crimes",
    breakdown: [
      { type: "Robbery", count: 4 },
      { type: "Snatching", count: 5 },
      { type: "Murder", count: 2 },
      { type: "Kidnapping", count: 3 },
      { type: "Theft", count: 6 },
      { type: "Smuggling", count: 7 },
      { type: "Fraud", count: 2 },
      { type: "Assault", count: 1 }
    ]
  },
  { 
    city: "Chiniot", 
    cases: 25, 
    highlight: "Furniture industry theft",
    breakdown: [
      { type: "Robbery", count: 3 },
      { type: "Snatching", count: 4 },
      { type: "Murder", count: 1 },
      { type: "Kidnapping", count: 2 },
      { type: "Theft", count: 8 },
      { type: "Smuggling", count: 4 },
      { type: "Fraud", count: 2 },
      { type: "Assault", count: 1 }
    ]
  }
];

// Crime categories for overall Punjab
const crimeCategories = [
  { type: "Robbery", count: 250 },
  { type: "Theft", count: 320 },
  { type: "Smuggling", count: 180 },
  { type: "Kidnapping", count: 150 },
  { type: "Murder", count: 120 },
  { type: "Snatching", count: 280 },
  { type: "Fraud", count: 130 },
  { type: "Assault", count: 110 }
];

const COLORS = ['#dc2626', '#ea580c', '#d97706', '#65a30d', '#0891b2', '#7e22ce', '#db2777', '#4f46e5'];

export default function CrimeStatisticsScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Monthly");
  const [selectedCity, setSelectedCity] = useState(null);
  const [crimeFilter, setCrimeFilter] = useState("All");

  const data = filter === "Monthly" ? monthlyData : yearlyData;

  const handleClose = () => {
    navigate("/user/dashboard");
  };

  // Punjab total cases
  const totalPunjabCases = crimeCategories.reduce((sum, c) => sum + c.count, 0);

  // Filtered crime data based on selection
  const filteredCrimeData = crimeFilter === "All" 
    ? crimeCategories 
    : crimeCategories.filter(crime => crime.type === crimeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {selectedCity && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedCity(null)}
              className="p-2 bg-gray-800 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 flex items-center gap-2">
            {selectedCity ? `${selectedCity} Crime Statistics` : "Punjab Crime Statistics"}
          </h1>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!selectedCity ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Punjab Summary */}
            <div className="mb-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-red-400">
                Overall Punjab: {totalPunjabCases} cases registered
              </h2>
            </div>

            {/* Cities Breakdown */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto mb-6">
              {cityCrimeData.map((city, index) => (
                <motion.div
                  key={city.city}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800 p-4 rounded-xl shadow-md border border-red-600/30 text-center cursor-pointer"
                  onClick={() => setSelectedCity(city.city)}
                >
                  <div className="flex justify-center mb-2">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{city.city}</h3>
                  <p className="text-xl font-bold text-red-400">{city.cases}</p>
                  <p className="text-gray-400 text-xs mt-1">{city.highlight}</p>
                  <div className="mt-2 text-xs text-gray-500">Click for details</div>
                </motion.div>
              ))}
            </div>

            {/* Crime Type Filter */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Filter className="w-4 h-4" />
                <span>Filter by crime type:</span>
              </div>
              {["All", "Robbery", "Theft", "Smuggling", "Kidnapping", "Murder", "Snatching", "Fraud", "Assault"].map((type) => (
                <button
                  key={type}
                  onClick={() => setCrimeFilter(type)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition
                    ${
                      crimeFilter === type
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Crime Categories Breakdown */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
              {filteredCrimeData.map((crime, index) => (
                <motion.div
                  key={crime.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 p-4 rounded-xl shadow-md border border-red-600/30 flex flex-col items-center"
                >
                  <p className="text-lg font-semibold text-white">{crime.type}</p>
                  <p className="text-2xl font-bold text-red-400">{crime.count}</p>
                </motion.div>
              ))}
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-6 justify-center">
              {["Monthly", "Yearly"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl font-semibold transition
                    ${
                      filter === f
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg shadow-red-900/30 mb-8">
              <h2 className="text-xl font-bold text-center mb-4 text-red-400">
                Crime Reports Trend ({filter})
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: -10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="4 4" stroke="#374151" />
                  <XAxis
                    dataKey={filter === "Monthly" ? "month" : "year"}
                    stroke="#9CA3AF"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#374151",
                    }}
                    itemStyle={{ color: "#F3F4F6" }}
                  />
                  <Legend wrapperStyle={{ color: "#FCA5A5" }} />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 5 }}
                    activeDot={{ fill: "#FECACA", stroke: "#EF4444", strokeWidth: 2, r: 7 }}
                    isAnimationActive={true}
                    animationDuration={1200}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="city-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {/* City Detail View */}
            {cityCrimeData.filter(city => city.city === selectedCity).map(city => (
              <div key={city.city}>
                {/* City Header */}
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-500/30 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-8 h-8 text-red-500" />
                      <h2 className="text-2xl md:text-3xl font-bold">{city.city}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-red-500">{city.cases}</p>
                      <p className="text-gray-400">Total Reported Cases</p>
                    </div>
                  </div>
                  <p className="text-gray-300 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    {city.highlight}
                  </p>
                </div>

                {/* Crime Breakdown Charts */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Bar Chart */}
                  <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-500/30">
                    <h3 className="text-xl font-bold mb-4 text-center text-red-400">
                      Crime Type Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={city.breakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="type" stroke="#aaa" fontSize={12} angle={-45} textAnchor="end" height={80} />
                        <YAxis stroke="#aaa" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #dc2626",
                            borderRadius: "8px",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="count" fill="#dc2626" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie Chart */}
                  <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-500/30">
                    <h3 className="text-xl font-bold mb-4 text-center text-red-400">
                      Crime Percentage
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={city.breakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="type"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {city.breakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #dc2626",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Detailed Crime List */}
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-500/30">
                  <h3 className="text-xl font-bold mb-4 text-red-400">Detailed Crime Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {city.breakdown.map((crime, index) => (
                      <motion.div 
                        key={crime.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-red-500"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">{crime.type}</h4>
                          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-bold">
                            {crime.count} cases
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-400">
                          {Math.round((crime.count / city.cases) * 100)}% of total cases in {city.city}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-6 text-gray-400 text-sm md:text-base text-center">
        Visual representation of crime reports helps in awareness and prevention.
      </div>
    </motion.div>
  );
}