import React, { useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";

export default function Feedback() {
  const [currentPage, setCurrentPage] = useState(1);

  const FEEDBACKS_PER_PAGE = 30;

  // Fixed Dummy 50 Feedbacks
  const dummyFeedbacks = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    text: `This is dummy complaint/feedback number ${i + 1}. It is recorded for testing purpose.`,
    user: i % 2 === 0 ? "Ali" : "Sara",
    date: `2025-09-${String((i % 30) + 1).padStart(2, "0")} ${
      10 + (i % 12)
    }:${String((i * 2) % 60).padStart(2, "0")} PM`,
  }));

  const [feedbacks, setFeedbacks] = useState(dummyFeedbacks);

  // Delete Feedback
  const handleDelete = (id) => {
    const updated = feedbacks.filter((f) => f.id !== id);
    setFeedbacks(updated);
  };

  // Pagination logic
  const indexOfLast = currentPage * FEEDBACKS_PER_PAGE;
  const indexOfFirst = indexOfLast - FEEDBACKS_PER_PAGE;
  const currentFeedbacks = feedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(feedbacks.length / FEEDBACKS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <MessageSquare className="text-red-400" /> Complaints & Feedback (Admin)
      </h2>

      {/* Feedback Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFeedbacks.length === 0 ? (
          <p className="text-gray-400">No complaints found.</p>
        ) : (
          currentFeedbacks.map((f) => (
            <div
              key={f.id}
              className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Header Line with name, date and delete */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-400 truncate">
                  <span className="font-semibold text-white">{f.user}</span> •{" "}
                  {f.date}
                </p>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Complaint/Feedback Text */}
              <p className="text-gray-200">{f.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === i + 1
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
