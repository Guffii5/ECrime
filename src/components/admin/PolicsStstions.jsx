import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  ShieldCheck,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  AlertTriangle,
  Mail,
  Globe,
  Car,
  Wifi
} from "lucide-react";
import { motion } from "framer-motion";

const stations = [
  {
    id: 1,
    name: "Central Police Headquarters",
    address: "123 Justice Road, Gujrat District",
    phone: "(021) 123-4567",
    email: "central.hq@police.gov",
    website: "www.police.gov/central",
    image: "https://images.unsplash.com/photo-1581090700227-1e8a26c2285d?auto=format&fit=crop&w=600&q=80",
    officers: 45,
    vehicles: 12,
    jurisdiction: "Downtown, Business District",
    facilities: ["24/7 Service", "Detention Cells", "Forensic Lab", "Parking"],
    status: "active",
    lastIncident: "2 hours ago"
  },
  {
    id: 2,
    name: "East District Station",
    address: "456 Islamabad, Sector A",
    phone: "(021) 987-6543",
    email: "east.district@police.gov",
    website: "www.police.gov/east",
    image: "https://images.unsplash.com/photo-1587560699334-0a1a7135d9a3?auto=format&fit=crop&w=600&q=80",
    officers: 28,
    vehicles: 8,
    jurisdiction: "Residential Areas A-F, Industrial Zone",
    facilities: ["24/7 Service", "Community Center", "Parking"],
    status: "active",
    lastIncident: "5 hours ago"
  },
  {
    id: 3,
    name: "West Zone Command",
    address: "789 Security Islamabad, Block D",
    phone: "(021) 321-9876",
    email: "west.command@police.gov",
    website: "www.police.gov/west",
    image: "https://images.unsplash.com/photo-1629749647344-8570f3b3ff8a?auto=format&fit=crop&w=600&q=80",
    officers: 32,
    vehicles: 10,
    jurisdiction: "Western Suburbs, University Area",
    facilities: ["24/7 Service", "Cyber Crime Unit", "Parking"],
    status: "active",
    lastIncident: "1 hour ago"
  },
  {
    id: 4,
    name: "North Precinct Station",
    address: "101 Safety Lane, Gujranwala",
    phone: "(021) 555-1234",
    email: "north.precinct@police.gov",
    website: "www.police.gov/north",
    image: "https://images.unsplash.com/photo-1567443024551-f3e3b7b40d08?auto=format&fit=crop&w=600&q=80",
    officers: 22,
    vehicles: 6,
    jurisdiction: "Northern Residential, Rural Outskirts",
    facilities: ["24/7 Service", "Parking"],
    status: "active",
    lastIncident: "8 hours ago"
  },
  {
    id: 5,
    name: "South Division HQ",
    address: "202 Patrol Street, Lahore",
    phone: "(021) 777-8910",
    email: "south.division@police.gov",
    website: "www.police.gov/south",
    image: "https://images.unsplash.com/photo-1589656894225-536553564b0d?auto=format&fit=crop&w=600&q=80",
    officers: 38,
    vehicles: 14,
    jurisdiction: "Southern Districts, Port Area",
    facilities: ["24/7 Service", "Marine Unit", "Detention Cells", "Parking"],
    status: "maintenance",
    lastIncident: "3 days ago"
  },
];

const statusOptions = [
  { value: "all", label: "All Stations" },
  { value: "active", label: "Active" },
  { value: "maintenance", label: "Under Maintenance" },
  { value: "closed", label: "Temporarily Closed" },
];

export default function PoliceStstions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedStation, setExpandedStation] = useState(null);

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         station.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || station.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStation = (id) => {
    setExpandedStation(expandedStation === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" /> 
              <span>Police Stations Network</span>
            </h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Directory and operational status of all police facilities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
              <MapPin className="w-4 h-4" />
              <span>View Map</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search stations..."
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Maintenance</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gray-800 rounded-lg overflow-hidden border ${station.status === "active" ? "border-green-900/50" : station.status === "maintenance" ? "border-yellow-900/50" : "border-red-900/50"} shadow-md hover:shadow-lg transition`}
                >
                  <div className="relative">
                    <img
                      src={station.image}
                      alt={station.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      station.status === "active" ? "bg-green-900/80 text-green-300" :
                      station.status === "maintenance" ? "bg-yellow-900/80 text-yellow-300" :
                      "bg-red-900/80 text-red-300"
                    }`}>
                      {station.status === "active" ? "Active" :
                       station.status === "maintenance" ? "Maintenance" : "Closed"}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{station.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <p className="text-sm text-gray-300">{station.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-400" />
                        <p className="text-sm text-gray-300">{station.phone}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{station.officers} officers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="w-4 h-4" />
                          <span>{station.vehicles} vehicles</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <button
                        onClick={() => toggleStation(station.id)}
                        className="w-full flex items-center justify-between text-sm text-blue-400 hover:text-blue-300"
                      >
                        <span>{expandedStation === station.id ? "Hide details" : "View details"}</span>
                        {expandedStation === station.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedStation === station.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <div className="bg-gray-700/50 p-3 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-medium text-gray-400 mb-2">JURISDICTION</h4>
                            <p className="text-sm">{station.jurisdiction}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-gray-400 mb-2">FACILITIES</h4>
                            <div className="flex flex-wrap gap-1">
                              {station.facilities.map((facility, i) => (
                                <span key={i} className="text-xs bg-gray-600 px-2 py-1 rounded">
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-600 grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-medium text-gray-400 mb-1">CONTACT</h4>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{station.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <span>{station.website}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-gray-400 mb-1">LAST INCIDENT</h4>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{station.lastIncident}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700 py-2 rounded text-sm">
                          View Officers
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm">
                          Dispatch To
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-400">
                No stations found matching your criteria
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-4 rounded-lg border border-blue-800/30 flex items-center gap-3">
              <div className="bg-blue-600/20 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Stations</div>
                <div className="text-xl font-bold">{stations.length}</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 p-4 rounded-lg border border-green-800/30 flex items-center gap-3">
              <div className="bg-green-600/20 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Officers</div>
                <div className="text-xl font-bold">
                  {stations.reduce((sum, station) => sum + station.officers, 0)}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 p-4 rounded-lg border border-yellow-800/30 flex items-center gap-3">
              <div className="bg-yellow-600/20 p-3 rounded-full">
                <Car className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Vehicles</div>
                <div className="text-xl font-bold">
                  {stations.reduce((sum, station) => sum + station.vehicles, 0)}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/10 p-4 rounded-lg border border-red-800/30 flex items-center gap-3">
              <div className="bg-red-600/20 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Incidents</div>
                <div className="text-xl font-bold">18</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Police Stations Network • v2.4.1
        </footer>
      </div>
    </div>
  );
}