import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Shield,
  Users,
  Car,
  AlertTriangle,
  Clock,
  X,
  ChevronDown,
  Search,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  Send,
  Filter,
  Mail,
  Globe,
} from "lucide-react";

// Dummy stations data with city field
const stationsData = [
  {
    id: 1,
    name: "Central Police Station",
    city: "Lahore",
    address: "123 Main Street, Downtown",
    phone: "123-456-7890",
    email: "central@police.gov",
    website: "www.centralpolice.gov",
    officers: 50,
    vehicles: 20,
    jurisdiction: "Downtown Area",
    facilities: ["Jail", "Helipad", "Control Room"],
    lastIncident: "2 hours ago",
    status: "Active",
    assignedComplaints: [],
    alerts: 2,
    efficiency: 92,
  },
  {
    id: 2,
    name: "North Division Station",
    city: "Karachi",
    address: "456 North Street",
    phone: "123-555-7890",
    email: "north@police.gov",
    website: "www.northpolice.gov",
    officers: 30,
    vehicles: 10,
    jurisdiction: "North City",
    facilities: ["Control Room"],
    lastIncident: "5 hours ago",
    status: "Active",
    assignedComplaints: [],
    alerts: 0,
    efficiency: 85,
  },
  {
    id: 3,
    name: "West Division Station",
    city: "Gujrat",
    address: "789 West Street",
    phone: "123-777-7890",
    email: "west@police.gov",
    website: "www.westpolice.gov",
    officers: 25,
    vehicles: 8,
    jurisdiction: "West City",
    facilities: ["Jail"],
    lastIncident: "1 day ago",
    status: "Maintenance",
    assignedComplaints: [],
    alerts: 3,
    efficiency: 72,
  },
  {
    id: 4,
    name: "South Division Station",
    city: "Islamabad",
    address: "101 South Avenue",
    phone: "123-888-7890",
    email: "south@police.gov",
    website: "www.southpolice.gov",
    officers: 40,
    vehicles: 15,
    jurisdiction: "South District",
    facilities: ["Jail", "Forensic Lab", "Control Room"],
    lastIncident: "30 minutes ago",
    status: "Active",
    assignedComplaints: [],
    alerts: 1,
    efficiency: 95,
  },
];

// Dummy complaints with city field
const complaintsData = [
  { id: 101, title: "Mobile theft in Downtown", city: "Lahore", status: "Unassigned", priority: "High", time: "15 min ago" },
  { id: 102, title: "Car stolen North City", city: "Karachi", status: "Unassigned", priority: "Medium", time: "45 min ago" },
  { id: 103, title: "House burglary West City", city: "Gujrat", status: "Unassigned", priority: "High", time: "1 hour ago" },
  { id: 104, title: "Vandalism in Central Park", city: "Lahore", status: "Unassigned", priority: "Low", time: "2 hours ago" },
  { id: 105, title: "Bank robbery in downtown", city: "Islamabad", status: "Unassigned", priority: "High", time: "10 min ago" },
];

export default function StationsAdmin() {
  const [stations, setStations] = useState(stationsData);
  const [complaints, setComplaints] = useState(complaintsData);
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDispatchClick = (station) => {
    setSelectedStation(station);
    setShowModal(true);
  };

  // Assign complaint to station + update status
  const assignComplaint = () => {
    if (!selectedComplaint || !selectedStation) return;

    const complaintObj = complaints.find((c) => c.id === parseInt(selectedComplaint));

    setStations((prev) =>
      prev.map((st) =>
        st.id === selectedStation.id
          ? { ...st, assignedComplaints: [...st.assignedComplaints, complaintObj] }
          : st
      )
    );

    // update complaint status
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === parseInt(selectedComplaint) ? { ...c, status: "Assigned" } : c
      )
    );

    setShowModal(false);
    setSelectedComplaint("");
  };

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || station.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white flex">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Police Stations Management
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              New Station
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search stations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`flex items-center px-3 py-2 rounded-lg ${showFilters ? "bg-red-800" : "bg-gray-800/70 hover:bg-gray-700"}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </button>

            {showFilters && (
              <div className="flex items-center gap-2 bg-gray-800/70 p-2 rounded-lg">
                <select
                  className="bg-gray-700 border border-gray-600 text-white rounded px-2 py-1 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Stations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <motion.div
              key={station.id}
              layout
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-white">
                    {station.name}
                  </h2>
                  {station.alerts > 0 && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {station.alerts}
                    </span>
                  )}
                </div>

                <p className="flex items-center text-sm text-gray-300 mb-1">
                  <MapPin className="w-4 h-4 mr-2 text-red-400" />
                  {station.city} - {station.address}
                </p>
                <p className="flex items-center text-sm text-gray-300 mb-1">
                  <Phone className="w-4 h-4 mr-2 text-red-400" />
                  {station.phone}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-700 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-gradient-to-r from-red-600 to-red-400 h-2.5 rounded-full"
                        style={{ width: `${station.efficiency}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">{station.efficiency}%</span>
                  </div>

                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      station.status === "Active"
                        ? "bg-green-900/30 text-green-400"
                        : "bg-yellow-900/30 text-yellow-400"
                    }`}
                  >
                    {station.status}
                  </span>
                </div>

                {/* Assigned complaints */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/50">
                  <p className="flex items-center text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
                    Assigned:{" "}
                    <span className="ml-1 font-bold text-white">
                      {station.assignedComplaints.length}
                    </span>
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleExpand(station.id)}
                      className="text-red-400 hover:text-red-300 flex items-center text-sm"
                    >
                      Details{" "}
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform ${
                          expandedId === station.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => handleDispatchClick(station)}
                      className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Dispatch
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === station.id && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/60 p-5 text-sm space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <p className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-red-400" />
                        Officers: <span className="ml-auto font-semibold">{station.officers}</span>
                      </p>
                      <p className="flex items-center">
                        <Car className="w-4 h-4 mr-2 text-red-400" />
                        Vehicles: <span className="ml-auto font-semibold">{station.vehicles}</span>
                      </p>
                      <p className="flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-red-400" />
                        Jurisdiction: <span className="ml-auto font-semibold">{station.jurisdiction}</span>
                      </p>
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-red-400" />
                        Last Incident: <span className="ml-auto font-semibold">{station.lastIncident}</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 mb-1">Facilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {station.facilities.map((facility, index) => (
                          <span key={index} className="bg-gray-700/50 text-xs px-2 py-1 rounded">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 mb-1">Contact:</p>
                      <p className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-red-400" />
                        {station.email}
                      </p>
                      <p className="flex items-center text-sm">
                        <Globe className="w-4 h-4 mr-2 text-red-400" />
                        {station.website}
                      </p>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-gray-700/30">
                      <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300 text-sm flex items-center">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredStations.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No stations found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedStation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-gray-800 to-gray-900 border border-red-900/30 p-6 rounded-xl shadow-2xl w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  Dispatch Complaint → {selectedStation.name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Select Complaint ({selectedStation.city})</label>
                <select
                  className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={selectedComplaint}
                  onChange={(e) => setSelectedComplaint(e.target.value)}
                >
                  <option value="">Choose a complaint...</option>
                  {complaints
                    .filter((c) => c.status === "Unassigned" && c.city === selectedStation.city)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        #{c.id} - {c.title}
                      </option>
                    ))}
                </select>
              </div>

              {selectedComplaint && (
                <div className="bg-gray-700/30 p-3 rounded-lg mb-4 text-sm">
                  {complaints.find(c => c.id === parseInt(selectedComplaint)) && (
                    <>
                      <p className="font-medium text-white">
                        {complaints.find(c => c.id === parseInt(selectedComplaint)).title}
                      </p>
                      <p className="text-gray-400 mt-1">
                        Priority: <span className={getPriorityColor(complaints.find(c => c.id === parseInt(selectedComplaint)).priority)}>
                          {complaints.find(c => c.id === parseInt(selectedComplaint)).priority}
                        </span>
                      </p>
                      <p className="text-gray-400">
                        Reported: {complaints.find(c => c.id === parseInt(selectedComplaint)).time}
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={assignComplaint}
                  disabled={!selectedComplaint}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Assign Complaint
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
