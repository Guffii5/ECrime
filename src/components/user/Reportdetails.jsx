import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ReportDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state; // 👈 data passed from MyReports

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>No report found for ID {id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900/30 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 relative"
      >
        {/* X (close) button */}
        <button
          onClick={() => navigate("/user/myReports")}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <X className="w-7 h-7" />
        </button>

        <h1 className="text-3xl font-bold text-red-500 mb-6">
          Report Details
        </h1>

        <div className="space-y-4">
          <p><span className="font-semibold">Report ID:</span> {report.id}</p>
          <p><span className="font-semibold">Title:</span> {report.title}</p>
          <p><span className="font-semibold">Name:</span> {report.name}</p>
          <p><span className="font-semibold">Crime Type:</span> {report.crimeType}</p>
          <p><span className="font-semibold">Location:</span> {report.location}</p>
          <p><span className="font-semibold">Date & Time:</span> {report.dateTime}</p>
          <p><span className="font-semibold">Emergency:</span> {report.emergency}</p>
          <p><span className="font-semibold">Severity Level:</span> {report.severity}</p>
        </div>

        {/* Image */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Attached Image</h2>
          <img
            src={report.image}
            alt="report evidence"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Video */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Attached Video</h2>
          <video
            src={report.video}
            controls
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </motion.div>
    </div>
  );
}
