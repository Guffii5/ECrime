import React, { useState, useEffect } from "react";
import {
  Bell,
  Trash2,
  User,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  Eye,
  MapPin,
  Clock,
  FileText,
  Image,
  Video,
  X,
  Send,
  UserCheck,
  Map,
  Search,
  Filter,
  BarChart3,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Megaphone,
  Shield,
  AlertCircle
} from "lucide-react";

export default function ManageComplaints() {
  // Dummy 50 complaints with different statuses and additional details
  const dummyComplaints = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    time: new Date(Date.now() - i * 86400000).toLocaleTimeString(),
    description: `Complaint description for issue #${i + 1}. This is a more detailed description of the problem reported by the user.`,
    status: i % 4 === 0 ? "Incoming" : i % 4 === 1 ? "Assigned" : i % 4 === 2 ? "Pending" : "Resolved",
    city: i % 3 === 0 ? "New York" : i % 3 === 1 ? "Los Angeles" : "Chicago",
    location: i % 2 === 0 ? "Downtown" : "Suburban",
    anonymous: i % 5 === 0,
    images: i % 4 === 0 ? ["https://via.placeholder.com/400x300?text=Evidence+1"] : [],
    videos: i % 6 === 0 ? ["https://via.placeholder.com/400x300?text=Video+Evidence"] : [],
    assignedTo: i % 4 === 1 ? `Officer ${i % 5 + 1}` : "",
    assignedDate: i % 4 === 1 ? new Date(Date.now() - i * 43200000).toLocaleDateString() : "",
    priority: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)],
    type: ["Theft", "Assault", "Vandalism", "Noise", "Harassment"][Math.floor(Math.random() * 5)],
    investigationTime: i % 3 === 0 ? "2 hours" : i % 3 === 1 ? "1 day" : "3 days"
  }));

  const [complaints, setComplaints] = useState(dummyComplaints);
  const [activeTab, setActiveTab] = useState("Incoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResolvedModal, setShowResolvedModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignForm, setAssignForm] = useState({
    officer: "",
    deadline: "",
    instructions: "",
    arrivalTime: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  const complaintsPerPage = 9;
  const officers = ["Officer Salman", "Officer Maham", "Officer Rameen"];

  // Filter complaints based on active tab and search term
  const filteredComplaints = complaints.filter((c) =>
    c.status === activeTab &&
    (c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (priorityFilter === "All" || c.priority === priorityFilter)
  );

  // Pagination
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
  const startIndex = (currentPage - 1) * complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, startIndex + complaintsPerPage);

  // Handle status change
  const updateStatus = (id, newStatus) => {
    const updatedComplaints = complaints.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );

    setComplaints(updatedComplaints);

    // Show notification for status change
    const complaint = complaints.find(c => c.id === id);
    if (complaint) {
      if (newStatus === "Resolved") {
        setShowResolvedModal(true);
        setTimeout(() => setShowResolvedModal(false), 3000);
      }

      // Add notification
      setNotifications(prev => [
        {
          id: Date.now(),
          message: `Complaint #${id} status changed to ${newStatus}`,
          type: "status_change",
          time: new Date().toLocaleTimeString(),
          read: false
        },
        ...prev
      ]);
    }
  };

  // Handle delete
  const deleteComplaint = (id) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
    setShowDeleteModal(false);

    // Add notification
    setNotifications(prev => [
      {
        id: Date.now(),
        message: `Complaint #${id} has been deleted`,
        type: "deletion",
        time: new Date().toLocaleTimeString(),
        read: false
      },
      ...prev
    ]);
  };

  // Open delete confirmation modal
  const openDeleteModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDeleteModal(true);
  };

  // Open assign modal
  const openAssignModal = (complaint) => {
    setSelectedComplaint(complaint);
    setAssignForm({
      officer: "",
      deadline: "",
      instructions: "",
      arrivalTime: new Date().toLocaleTimeString()
    });
    setShowAssignModal(true);
  };

  // Handle assign form submission
  const handleAssign = () => {
    if (assignForm.officer && assignForm.deadline) {
      const updatedComplaints = complaints.map(c =>
        c.id === selectedComplaint.id
          ? {
            ...c,
            status: "Assigned",
            assignedTo: assignForm.officer,
            assignedDate: new Date().toLocaleDateString(),
            deadline: assignForm.deadline,
            instructions: assignForm.instructions,
            arrivalTime: assignForm.arrivalTime
          }
          : c
      );

      setComplaints(updatedComplaints);
      setShowAssignModal(false);

      // Add notification
      setNotifications(prev => [
        {
          id: Date.now(),
          message: `Complaint #${selectedComplaint.id} assigned to ${assignForm.officer}`,
          type: "assignment",
          time: new Date().toLocaleTimeString(),
          read: false
        },
        ...prev
      ]);

      // Show notification modal
      setShowNotificationModal(true);
      setTimeout(() => setShowNotificationModal(false), 3000);
    }
  };

  // Open details modal
  const openDetailsModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsModal(true);
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Simulate new incoming complaint notification
  useEffect(() => {
    const interval = setInterval(() => {
      const newComplaint = {
        id: complaints.length + 1,
        name: `User ${complaints.length + 1}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        description: `New complaint received from user ${complaints.length + 1}. This is an automatically generated complaint for testing purposes.`,
        status: "Incoming",
        city: "New York",
        location: "Downtown",
        anonymous: Math.random() > 0.5,
        images: [],
        videos: [],
        priority: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)],
        type: ["Theft", "Assault", "Vandalism", "Noise", "Harassment"][Math.floor(Math.random() * 5)]
      };

      setComplaints((prev) => [newComplaint, ...prev]);

      // Add notification
      setNotifications(prev => [
        {
          id: Date.now(),
          message: `New complaint #${newComplaint.id} registered`,
          type: "new_complaint",
          time: new Date().toLocaleTimeString(),
          read: false
        },
        ...prev
      ]);
    }, 30000); // every 30 seconds a new complaint

    return () => clearInterval(interval);
  }, [complaints]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      {/* Header with Notifications */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-red-400" /> Manage Complaints
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition relative"
            >
              <Bell className="w-5 h-5" />
              <span>Alerts</span>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            {/* Notifications Panel */}
            {showNotificationsPanel && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="font-semibold">Notifications</h3>
                  <button
                    onClick={() => {
                      markAllAsRead();
                      setShowNotificationsPanel(false); // panel close ho jaye
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer ${notification.read ? 'opacity-70' : ''}`}
                        onClick={() => {
                          setNotifications(prev =>
                            prev.map(n =>
                              n.id === notification.id ? { ...n, read: true } : n
                            )
                          );
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`mt-1 p-1 rounded-full ${notification.read ? 'bg-gray-600' : 'bg-blue-600'}`}>
                            <Megaphone className="w-3 h-3" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-400">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["Incoming", "Assigned", "Pending", "Resolved"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${activeTab === tab
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {tab === "Incoming" && <Clock className="w-4 h-4" />}
            {tab === "Assigned" && <UserCheck className="w-4 h-4" />}
            {tab === "Pending" && <AlertTriangle className="w-4 h-4" />}
            {tab === "Resolved" && <CheckCircle2 className="w-4 h-4" />}
            {tab}
            {tab === "Incoming" && notifications.filter(n => !n.read && n.type === "new_complaint").length > 0 &&
              `(${notifications.filter(n => !n.read && n.type === "new_complaint").length})`
            }
          </button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-800/80 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400">Total Complaints</div>
          <div className="text-2xl font-bold">{complaints.length}</div>
        </div>
        <div className="bg-blue-800/80 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400">Incoming</div>
          <div className="text-2xl font-bold text-yellow-400">
            {complaints.filter(c => c.status === "Incoming").length}
          </div>
        </div>
        <div className="bg-orange-800/80 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400">Assigned</div>
          <div className="text-2xl font-bold text-blue-400">
            {complaints.filter(c => c.status === "Assigned").length}
          </div>
        </div>
        <div className="bg-green-800/80 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400">Resolved</div>
          <div className="text-2xl font-bold text-green-400">
            {complaints.filter(c => c.status === "Resolved").length}
          </div>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {currentComplaints.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-gray-400">
            <ClipboardList className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No complaints found in {activeTab} status.</p>
          </div>
        ) : (
          currentComplaints.map((c) => (
            <div
              key={c.id}
              className="bg-gray-800/80 p-4 rounded-xl border border-gray-700 shadow hover:shadow-lg transition-all duration-300 hover:border-gray-500"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-2">
                {/* Left side */}
                <div className="flex items-center gap-2 flex-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold truncate">
                    {c.anonymous ? "Anonymous" : c.name}
                  </span>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                      c.priority
                    )}`}
                  >
                    {c.priority}
                  </span>
                  <div className="text-sm text-gray-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {c.date}
                  </div>
                </div>
              </div>

              {/* Complaint Type */}
              <div className="text-sm font-medium text-red-400 mb-1">
                {c.type}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <MapPin className="w-4 h-4" />
                {c.city}, {c.location}
              </div>

              {/* Complaint Text */}
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{c.description}</p>

              {/* Media Indicators */}
              <div className="flex gap-2 mb-3">
                {c.images.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-blue-400">
                    <Image className="w-4 h-4" />
                    {c.images.length} Image{c.images.length !== 1 ? 's' : ''}
                  </div>
                )}
                {c.videos.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-purple-400">
                    <Video className="w-4 h-4" />
                    {c.videos.length} Video{c.videos.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                {/* Left - Eye button */}
                <button
                  onClick={() => openDetailsModal(c)}
                  className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-blue-900/20 flex items-center justify-center w-8 h-8"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>

                {/* Center - Status buttons */}
                <div className="flex-1 flex justify-center gap-2">
                  {activeTab === "Incoming" && (
                    <button
                      onClick={() => openAssignModal(c)}
                      className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 rounded flex items-center justify-center h-8"
                    >
                      Assign
                    </button>
                  )}
                  {activeTab === "Assigned" && (
                    <>
                      <button
                        onClick={() => updateStatus(c.id, "Pending")}
                        className="bg-yellow-600 hover:bg-yellow-700 text-xs px-3 py-1 rounded h-8"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateStatus(c.id, "Resolved")}
                        className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1 rounded h-8"
                      >
                        Resolve
                      </button>
                    </>
                  )}
                  {activeTab === "Pending" && (
                    <button
                      onClick={() => updateStatus(c.id, "Resolved")}
                      className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1 rounded h-8"
                    >
                      Resolve
                    </button>
                  )}
                </div>

                {/* Right - Delete button */}
                <button
                  onClick={() => openDeleteModal(c)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-900/20 flex items-center justify-center w-8 h-8"
                  title="Delete Complaint"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 flex items-center gap-1"
          >
            <span>←</span> Prev
          </button>
          <span className="px-3 py-1 bg-gray-800 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 flex items-center gap-1"
          >
            Next <span>→</span>
          </button>
        </div>
      )}

      {/* Assign Investigation Modal */}
      {showAssignModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-semibold flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-400" />
                Assign for Investigation
              </h3>
              <button onClick={() => setShowAssignModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">Select Officer</label>
                <select
                  value={assignForm.officer}
                  onChange={(e) => setAssignForm({ ...assignForm, officer: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select an officer</option>
                  {officers.map(officer => (
                    <option key={officer} value={officer}>{officer}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">Deadline</label>
                <input
                  type="date"
                  value={assignForm.deadline}
                  onChange={(e) => setAssignForm({ ...assignForm, deadline: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">Arrival Time</label>
                <input
                  type="time"
                  value={assignForm.arrivalTime}
                  onChange={(e) => setAssignForm({ ...assignForm, arrivalTime: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">Investigation Time Estimate</label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select time estimate</option>
                  <option value="1h">1 hour</option>
                  <option value="2h">2 hours</option>
                  <option value="4h">4 hours</option>
                  <option value="1d">1 day</option>
                  <option value="2d">2 days</option>
                  <option value="3d">3 days</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">Additional Instructions</label>
                <textarea
                  value={assignForm.instructions}
                  onChange={(e) => setAssignForm({ ...assignForm, instructions: e.target.value })}
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="Add any specific instructions for this investigation..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 p-4 border-t border-gray-700">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!assignForm.officer || !assignForm.deadline}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Assign Investigation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complaint Details Modal */}
      {showDetailsModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-800">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Complaint Details
              </h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Complainant</h4>
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {selectedComplaint.anonymous ? "Anonymous" : selectedComplaint.name}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Date & Time</h4>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {selectedComplaint.date} at {selectedComplaint.time}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-1">City</h4>
                  <p className="flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    {selectedComplaint.city}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Location Type</h4>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedComplaint.location}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Complaint Type</h4>
                  <p className="text-red-400 font-medium">{selectedComplaint.type}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Priority</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(selectedComplaint.priority)}`}>
                    {selectedComplaint.priority}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm text-gray-400 mb-1">Description</h4>
                <p className="bg-gray-700 p-3 rounded-lg">{selectedComplaint.description}</p>
              </div>

              {/* Media Section */}
              {(selectedComplaint.images.length > 0 || selectedComplaint.videos.length > 0) && (
                <div className="mb-4">
                  <h4 className="text-sm text-gray-400 mb-2">Attached Media</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedComplaint.images.map((img, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                        <img src={img} alt={`Evidence ${index + 1}`} className="w-full h-32 object-cover" />
                        <div className="p-2 text-xs text-center">Image {index + 1}</div>
                      </div>
                    ))}
                    {selectedComplaint.videos.map((vid, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                        <div className="w-full h-32 bg-gray-600 flex items-center justify-center">
                          <Video className="w-8 h-8 text-white" />
                        </div>
                        <div className="p-2 text-xs text-center">Video {index + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignment Details if Assigned */}
              {selectedComplaint.status === "Assigned" && selectedComplaint.assignedTo && (
                <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-700/50">
                  <h4 className="text-sm text-blue-400 mb-2 flex items-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    Investigation Assignment
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Assigned To:</span>
                      <p>{selectedComplaint.assignedTo}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Assigned On:</span>
                      <p>{selectedComplaint.assignedDate}</p>
                    </div>
                    {selectedComplaint.deadline && (
                      <div>
                        <span className="text-gray-400">Deadline:</span>
                        <p>{selectedComplaint.deadline}</p>
                      </div>
                    )}
                    {selectedComplaint.arrivalTime && (
                      <div>
                        <span className="text-gray-400">Arrival Time:</span>
                        <p>{selectedComplaint.arrivalTime}</p>
                      </div>
                    )}
                    {selectedComplaint.investigationTime && (
                      <div>
                        <span className="text-gray-400">Time Estimate:</span>
                        <p>{selectedComplaint.investigationTime}</p>
                      </div>
                    )}
                    {selectedComplaint.instructions && (
                      <div className="col-span-2">
                        <span className="text-gray-400">Instructions:</span>
                        <p className="mt-1 bg-blue-900/30 p-2 rounded">{selectedComplaint.instructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end p-4 border-t border-gray-700 sticky bottom-0 bg-gray-800">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Confirm Deletion
              </h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <p className="text-gray-300 mb-4">
                Are you sure you want to delete complaint #{selectedComplaint.id}? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-2 p-4 border-t border-gray-700">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteComplaint(selectedComplaint.id)}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Complaint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Sent Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-xl border border-green-500/50 max-w-md w-full mx-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-400 mb-2">Notification Sent!</h3>
            <p className="text-gray-300">
              Investigator has been notified about complaint #{selectedComplaint.id}.
            </p>
          </div>
        </div>
      )}

      {/* Resolved Modal */}
      {showResolvedModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-xl border border-green-500/50 max-w-md w-full mx-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-400 mb-2">Complaint Resolved!</h3>
            <p className="text-gray-300">
              Complaint #{selectedComplaint?.id} has been marked as resolved.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}