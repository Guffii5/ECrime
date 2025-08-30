import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, X, BarChart3, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const punjabCitiesData = {
  Lahore: {
    hotspot: "Ichhra",
    dangerZones: [
      { name: "Ichhra", risk: "High", coordinates: [31.52, 74.32], crimes: 180 },
      { name: "Data Gunj Baksh", risk: "Medium", coordinates: [31.56, 74.34], crimes: 120 },
      { name: "Shahdara", risk: "Medium", coordinates: [31.63, 74.29], crimes: 95 },
      { name: "Bhati Gate", risk: "Low", coordinates: [31.58, 74.32], crimes: 60 },
      { name: "Mughalpura", risk: "Medium", coordinates: [31.59, 74.35], crimes: 75 },
      { name: "Gawalmandi", risk: "High", coordinates: [31.56, 74.31], crimes: 150 },
      { name: "Ferozepur Road", risk: "Medium", coordinates: [31.50, 74.33], crimes: 110 },
      { name: "Kot Lakhpat", risk: "High", coordinates: [31.47, 74.35], crimes: 170 },
      { name: "Samnabad", risk: "Low", coordinates: [31.53, 74.30], crimes: 55 },
      { name: "Anarkali", risk: "High", coordinates: [31.57, 74.32], crimes: 200 },
      { name: "Walton", risk: "Medium", coordinates: [31.48, 74.36], crimes: 90 },
    ],
    crimes: [
      { type: "Robbery", count: 90 },
      { type: "Snatching", count: 60 },
      { type: "Assault", count: 40 },
      { type: "Burglary", count: 35 },
      { type: "Fraud", count: 25 },
    ],
    trend: "+5%",
    riskLevel: "Medium",
    population: "13.0M",
    lastUpdated: "4 hours ago",
    mapCenter: [31.52, 74.32],
    mapZoom: 11
  },
  Faisalabad: {
    hotspot: "Peoples Colony",
    dangerZones: [
      { name: "Peoples Colony", risk: "High", coordinates: [31.38, 73.08], crimes: 120 },
      { name: "Samanabad", risk: "Medium", coordinates: [31.43, 73.11], crimes: 85 },
      { name: "Jhang Bazaar", risk: "Medium", coordinates: [31.41, 73.09], crimes: 70 },
      { name: "D-Type Colony", risk: "Low", coordinates: [31.45, 73.06], crimes: 45 },
      { name: "Ghulam Muhammad Abad", risk: "High", coordinates: [31.43, 73.04], crimes: 140 },
      { name: "Millat Town", risk: "Medium", coordinates: [31.48, 73.09], crimes: 95 },
      { name: "Satiana Road", risk: "Low", coordinates: [31.37, 73.12], crimes: 50 },
      { name: "Madina Town", risk: "Low", coordinates: [31.41, 73.15], crimes: 40 },
      { name: "Kohinoor Town", risk: "Medium", coordinates: [31.42, 73.13], crimes: 80 },
      { name: "Railway Colony", risk: "High", coordinates: [31.40, 73.07], crimes: 160 },
    ],
    crimes: [
      { type: "Street Crimes", count: 65 },
      { type: "Robbery", count: 50 },
      { type: "Theft", count: 40 },
      { type: "Assault", count: 30 },
      { type: "Fraud", count: 20 },
    ],
    trend: "+8%",
    riskLevel: "Medium",
    population: "3.8M",
    lastUpdated: "5 hours ago",
    mapCenter: [31.41, 73.10],
    mapZoom: 12
  },
  Rawalpindi: {
    hotspot: "Raja Bazaar",
    dangerZones: [
      { name: "Raja Bazaar", risk: "High", coordinates: [33.59, 73.04], crimes: 110 },
      { name: "Pir Wadhai", risk: "High", coordinates: [33.62, 73.06], crimes: 95 },
      { name: "Committee Chowk", risk: "Medium", coordinates: [33.60, 73.07], crimes: 75 },
      { name: "Westridge", risk: "Low", coordinates: [33.57, 72.98], crimes: 40 },
      { name: "Saddar", risk: "High", coordinates: [33.59, 73.05], crimes: 130 },
      { name: "Chandni Chowk", risk: "Medium", coordinates: [33.61, 73.08], crimes: 85 },
      { name: "Murree Road", risk: "High", coordinates: [33.62, 73.09], crimes: 150 },
      { name: "Dhoke Hassu", risk: "Medium", coordinates: [33.63, 73.04], crimes: 70 },
      { name: "Peshawar Road", risk: "Low", coordinates: [33.64, 72.99], crimes: 55 },
      { name: "Liaquat Bagh", risk: "High", coordinates: [33.61, 73.04], crimes: 140 },
    ],

    crimes: [
      { type: "Snatching", count: 70 },
      { type: "Robbery", count: 45 },
      { type: "Burglary", count: 35 },
      { type: "Assault", count: 25 },
      { type: "Fraud", count: 15 },
    ],
    trend: "+3%",
    riskLevel: "Medium",
    population: "2.3M",
    lastUpdated: "3 hours ago",
    mapCenter: [33.60, 73.04],
    mapZoom: 12
  },
  Multan: {
    hotspot: "Hussain Agahi",
    dangerZones: [
      { name: "Hussain Agahi", risk: "High", coordinates: [30.19, 71.46], crimes: 95 },
      { name: "Bosan Road", risk: "Medium", coordinates: [30.23, 71.44], crimes: 70 },
      { name: "Gulgasht Colony", risk: "Low", coordinates: [30.26, 71.48], crimes: 45 },
      { name: "Shah Rukn-e-Alam", risk: "Medium", coordinates: [30.20, 71.45], crimes: 60 },
      { name: "Chowk Kumharanwala", risk: "High", coordinates: [30.21, 71.49], crimes: 120 },
      { name: "Vehari Road", risk: "Medium", coordinates: [30.18, 71.50], crimes: 80 },
      { name: "Shershah", risk: "High", coordinates: [30.16, 71.42], crimes: 100 },
      { name: "New Multan", risk: "Low", coordinates: [30.22, 71.47], crimes: 50 },
      { name: "Qasim Bela", risk: "Medium", coordinates: [30.25, 71.43], crimes: 75 },
      { name: "Mumtazabad", risk: "High", coordinates: [30.24, 71.46], crimes: 110 },
    ],
    crimes: [
      { type: "Street Crimes", count: 55 },
      { type: "Robbery", count: 40 },
      { type: "Theft", count: 30 },
      { type: "Fraud", count: 25 },
      { type: "Assault", count: 20 },
    ],
    trend: "+2%",
    riskLevel: "Medium",
    population: "1.9M",
    lastUpdated: "6 hours ago",
    mapCenter: [30.20, 71.47],
    mapZoom: 12
  },
  Gujranwala: {
    hotspot: "Ghakhar Mandi",
    dangerZones: [
      { name: "Ghakhar Mandi", risk: "High", coordinates: [32.15, 74.18], crimes: 85 },
      { name: "Sialkot Bypass", risk: "Medium", coordinates: [32.17, 74.16], crimes: 65 },
      { name: "Court Road", risk: "Medium", coordinates: [32.16, 74.19], crimes: 55 },
      { name: "Nandipura", risk: "Low", coordinates: [32.14, 74.20], crimes: 35 },
      { name: "Peoples Colony", risk: "High", coordinates: [32.19, 74.18], crimes: 100 },
      { name: "Satellite Town", risk: "Medium", coordinates: [32.20, 74.17], crimes: 75 },
      { name: "Model Town", risk: "Low", coordinates: [32.18, 74.21], crimes: 40 },
      { name: "Khokhar Ke", risk: "High", coordinates: [32.21, 74.19], crimes: 95 },
      { name: "Ferozewala", risk: "Medium", coordinates: [32.13, 74.15], crimes: 70 },
      { name: "Eminabad", risk: "Low", coordinates: [32.12, 74.22], crimes: 45 },
    ],
    crimes: [
      { type: "Robbery", count: 45 },
      { type: "Snatching", count: 40 },
      { type: "Theft", count: 30 },
      { type: "Assault", count: 25 },
      { type: "Fraud", count: 15 },
    ],
    trend: "+4%",
    riskLevel: "Medium",
    population: "2.2M",
    lastUpdated: "4 hours ago",
    mapCenter: [32.16, 74.18],
    mapZoom: 12
  },
  Sialkot: {
    hotspot: "Allama Iqbal Road",
    dangerZones: [
      { name: "Allama Iqbal Road", risk: "Medium", coordinates: [32.49, 74.53], crimes: 70 },
      { name: "Daska Road", risk: "Medium", coordinates: [32.51, 74.51], crimes: 55 },
      { name: "Rangpura", risk: "Low", coordinates: [32.48, 74.54], crimes: 35 },
      { name: "Sambrial Road", risk: "Low", coordinates: [32.50, 74.49], crimes: 30 },
      { name: "Cantt Area", risk: "High", coordinates: [32.49, 74.55], crimes: 95 },
      { name: "Shahabpura", risk: "Medium", coordinates: [32.52, 74.52], crimes: 65 },
      { name: "Hajipura", risk: "High", coordinates: [32.47, 74.50], crimes: 90 },
      { name: "Murray College Road", risk: "Medium", coordinates: [32.50, 74.56], crimes: 75 },
      { name: "Kashmir Road", risk: "High", coordinates: [32.51, 74.54], crimes: 100 },
      { name: "Pakki Kotli", risk: "Low", coordinates: [32.46, 74.53], crimes: 40 },
    ],
    crimes: [
      { type: "Street Crimes", count: 40 },
      { type: "Robbery", count: 35 },
      { type: "Theft", count: 25 },
      { type: "Fraud", count: 20 },
      { type: "Assault", count: 15 },
    ],
    trend: "-2%",
    riskLevel: "Low",
    population: "1.0M",
    lastUpdated: "5 hours ago",
    mapCenter: [32.49, 74.52],
    mapZoom: 13
  },
  Bahawalpur: {
    hotspot: "Farid Gate",
    dangerZones: [
      { name: "Farid Gate", risk: "Medium", coordinates: [29.39, 71.68], crimes: 60 },
      { name: "Model Town", risk: "Low", coordinates: [29.36, 71.70], crimes: 40 },
      { name: "Station Bazaar", risk: "Medium", coordinates: [29.40, 71.69], crimes: 45 },
      { name: "Shahdabad", risk: "Low", coordinates: [29.38, 71.67], crimes: 30 },
      { name: "Cantt Area", risk: "High", coordinates: [29.41, 71.72], crimes: 90 },
      { name: "Circular Road", risk: "Medium", coordinates: [29.37, 71.71], crimes: 55 },
      { name: "Ahmedpur Road", risk: "High", coordinates: [29.35, 71.74], crimes: 100 },
      { name: "Lodhran Bypass", risk: "Low", coordinates: [29.34, 71.69], crimes: 25 },
      { name: "Satellite Town", risk: "Medium", coordinates: [29.39, 71.73], crimes: 65 },
      { name: "Chowk Fawara", risk: "High", coordinates: [29.40, 71.70], crimes: 110 },
    ],
    crimes: [
      { type: "Theft", count: 35 },
      { type: "Robbery", count: 25 },
      { type: "Fraud", count: 20 },
      { type: "Assault", count: 15 },
      { type: "Snatching", count: 10 },
    ],
    trend: "+1%",
    riskLevel: "Low",
    population: "0.8M",
    lastUpdated: "7 hours ago",
    mapCenter: [29.39, 71.68],
    mapZoom: 13
  },
  Sahiwal: {
    hotspot: "Jinnah Road",
    dangerZones: [
      { name: "Jinnah Road", risk: "Medium", coordinates: [30.66, 73.10], crimes: 50 },
      { name: "Jawaahar Town", risk: "Low", coordinates: [30.68, 73.12], crimes: 35 },
      { name: "Jhang Bazaar", risk: "Low", coordinates: [30.67, 73.09], crimes: 30 },
      { name: "Railway Road", risk: "Medium", coordinates: [30.65, 73.11], crimes: 40 },
      { name: "Depalpur Road", risk: "High", coordinates: [30.64, 73.08], crimes: 85 },
      { name: "Cantt Area", risk: "Medium", coordinates: [30.69, 73.10], crimes: 55 },
      { name: "Renala Khurd", risk: "Low", coordinates: [30.88, 73.57], crimes: 25 },
      { name: "Saddar Bazaar", risk: "High", coordinates: [30.67, 73.13], crimes: 95 },
      { name: "Church Road", risk: "Medium", coordinates: [30.66, 73.14], crimes: 60 },
      { name: "Akbar Town", risk: "Low", coordinates: [30.70, 73.09], crimes: 28 },
    ],
    crimes: [
      { type: "Street Crimes", count: 30 },
      { type: "Theft", count: 25 },
      { type: "Robbery", count: 20 },
      { type: "Fraud", count: 15 },
      { type: "Assault", count: 10 },
    ],
    trend: "0%",
    riskLevel: "Low",
    population: "0.6M",
    lastUpdated: "8 hours ago",
    mapCenter: [30.66, 73.10],
    mapZoom: 13
  },
};

const COLORS = ['#dc2626', '#ea580c', '#d97706', '#65a30d', '#0891b2', '#7e22ce'];

export default function PunjabCrimeHotspot() {
  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [mapZoom, setMapZoom] = useState(11);
  const navigate = useNavigate();

  const cityInfo = selectedCity ? punjabCitiesData[selectedCity] : null;

  const getRiskColor = (level) => {
    switch (level) {
      case "High": return "text-red-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getTrendColor = (trend) => {
    return trend.includes("+") ? "text-red-500" : trend.includes("-") ? "text-green-500" : "text-gray-400";
  };

  const handleZoomIn = () => {
    if (mapZoom < 18) setMapZoom(mapZoom + 1);
  };

  const handleZoomOut = () => {
    if (mapZoom > 5) setMapZoom(mapZoom - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center py-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-600/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/user/dashboard")}
        className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white p-2 bg-gray-800/50 rounded-full backdrop-blur-sm"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-red-500/20 rounded-xl">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-red-500 bg-clip-text">
            Punjab Crime Hotspot Analysis
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real-time crime statistics and hotspot identification for cities across Punjab. Stay informed and safe.
        </p>
      </motion.div>

      {/* City Selection Card */}
      <motion.div
        className="w-full max-w-4xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8 shadow-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* City Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Punjab City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
            >
              {Object.keys(punjabCitiesData).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      {cityInfo && (
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          {/* Left Column - City Overview */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* City Info Card */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-500/30">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedCity}</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(cityInfo.riskLevel)} bg-opacity-20 ${getRiskColor(cityInfo.riskLevel).replace('text-', 'bg-')}`}>
                  {cityInfo.riskLevel} Risk
                </div>
              </div>

              <div className="flex items-center gap-2 text-red-400 mb-6">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Primary Hotspot:</span>
                <span>{cityInfo.hotspot}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span>Population</span>
                  </div>
                  <span className="font-semibold">{cityInfo.population}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span>Crime Trend</span>
                  </div>
                  <span className={`font-semibold ${getTrendColor(cityInfo.trend)}`}>
                    {cityInfo.trend}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span>Last Updated</span>
                  </div>
                  <span className="font-semibold">{cityInfo.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Danger Zones List */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Danger Zones
              </h3>
              <div className="space-y-4 h-[700px] overflow-y-auto scrollbar-hide">
                {cityInfo.dangerZones.map((zone, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-900/50 rounded-lg border-l-4 border-red-500"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{zone.name}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${getRiskColor(
                          zone.risk
                        )} ${getRiskBgColor(zone.risk)}/20`}
                      >
                        {zone.risk} Risk
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{zone.crimes} reported crimes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </motion.div>

          {/* Right Column - Map and Charts */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Map Container */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-400" />
                Danger Zones Map - {selectedCity}
              </h3>

              <div className="relative h-96 rounded-xl overflow-hidden border border-gray-700">
                {/* Map Background (simulated) */}
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full">
                      <MapPin className="w-8 h-8 text-red-500" />
                    </div>
                    <p>Interactive Map Visualization</p>
                    <p className="text-sm mt-2">(Shows danger zones with risk indicators)</p>
                  </div>

                  {/* Simulated Danger Zones on Map */}
                  {cityInfo.dangerZones.map((zone, index) => {
                    const left = 20 + (index * 15) % 70;
                    const top = 20 + (index * 25) % 70;

                    return (
                      <div
                        key={index}
                        className={`absolute w-8 h-8 rounded-full border-4 ${getRiskBgColor(zone.risk)} flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse`}
                        style={{ left: `${left}%`, top: `${top}%` }}
                        title={`${zone.name} - ${zone.risk} Risk`}
                      >
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute top-4 left-4 bg-gray-800/80 px-3 py-2 rounded-lg border border-gray-700">
                  <span className="text-sm">Zoom: {mapZoom}</span>
                </div>

                <div className="absolute top-4 right-4 bg-gray-800/80 px-3 py-2 rounded-lg border border-gray-700 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">High Risk</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Low</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Map Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm">High Risk Area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Medium Risk Area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Low Risk Area</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Safety Advisory</h4>
                  <p className="text-sm text-gray-400">Avoid traveling to red zones, especially after dark. Exercise caution in yellow zones.</p>
                </div>
              </div>
            </div>

            {/* Crime Statistics Card */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-500/30">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-400" />
                Crime Statistics by Type
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cityInfo.crimes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="type" stroke="#aaa" fontSize={12} />
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
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}