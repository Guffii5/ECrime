import React, { useState } from "react";
import { MessageSquare, Edit, Trash2, Save, X, PlusCircle, Star, User, Heart, Home, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeedbackManager() {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([
        {
            id: 1,
            text: "The complaint tracking is very helpful.",
            rating: 5,
            user: "Ali Ahmed",
            date: "2 hours ago",
            likes: 12
        },
        {
            id: 2,
            text: "Please improve response time.",
            rating: 3,
            user: "Sara Khan",
            date: "1 day ago",
            likes: 5
        },
        {
            id: 3,
            text: "The interface is user-friendly and intuitive.",
            rating: 4,
            user: "Usman Malik",
            date: "3 days ago",
            likes: 8
        },
        // Adding more feedbacks to demonstrate pagination
        {
            id: 4,
            text: "Great customer service experience!",
            rating: 5,
            user: "Fatima Ali",
            date: "4 days ago",
            likes: 15
        },
        {
            id: 5,
            text: "The mobile app needs improvement.",
            rating: 2,
            user: "Omar Khan",
            date: "5 days ago",
            likes: 3
        },
        {
            id: 6,
            text: "Very satisfied with the support team.",
            rating: 5,
            user: "Aisha Rahman",
            date: "6 days ago",
            likes: 10
        },
        {
            id: 7,
            text: "The website is sometimes slow to load.",
            rating: 3,
            user: "Hassan Malik",
            date: "1 week ago",
            likes: 7
        },
        {
            id: 8,
            text: "Excellent features and functionality.",
            rating: 5,
            user: "Zainab Ahmed",
            date: "1 week ago",
            likes: 18
        },
        {
            id: 9,
            text: "Could use more customization options.",
            rating: 4,
            user: "Bilal Hassan",
            date: "1 week ago",
            likes: 6
        },
        {
            id: 10,
            text: "The dashboard is very informative.",
            rating: 5,
            user: "Nadia Khan",
            date: "2 weeks ago",
            likes: 14
        },
        {
            id: 11,
            text: "Sometimes notifications don't work.",
            rating: 2,
            user: "Tariq Mahmood",
            date: "2 weeks ago",
            likes: 4
        },
        {
            id: 12,
            text: "Overall a great platform for complaints.",
            rating: 4,
            user: "Sanaullah Iqbal",
            date: "2 weeks ago",
            likes: 9
        },
        {
            id: 13,
            text: "The update made things worse.",
            rating: 1,
            user: "Farhan Ahmed",
            date: "3 weeks ago",
            likes: 2
        },
        {
            id: 14,
            text: "Love the new interface design!",
            rating: 5,
            user: "Amina Khan",
            date: "3 weeks ago",
            likes: 16
        },
        {
            id: 15,
            text: "Needs better documentation.",
            rating: 3,
            user: "Kamran Ali",
            date: "3 weeks ago",
            likes: 5
        },
        {
            id: 16,
            text: "The search functionality is excellent.",
            rating: 5,
            user: "Hina Malik",
            date: "4 weeks ago",
            likes: 11
        },
        {
            id: 17,
            text: "Too many bugs in the latest version.",
            rating: 2,
            user: "Imran Shah",
            date: "1 month ago",
            likes: 3
        },
        {
            id: 18,
            text: "The support team resolved my issue quickly.",
            rating: 5,
            user: "Sadia Rahman",
            date: "1 month ago",
            likes: 13
        },
        {
            id: 19,
            text: "The pricing is reasonable for the features.",
            rating: 4,
            user: "Asad Khan",
            date: "1 month ago",
            likes: 8
        },
        {
            id: 20,
            text: "Could use more integration options.",
            rating: 3,
            user: "Fariha Ahmed",
            date: "1 month ago",
            likes: 6
        },
        {
            id: 21,
            text: "The reporting features are comprehensive.",
            rating: 5,
            user: "Nasir Hussain",
            date: "2 months ago",
            likes: 10
        },
        {
            id: 22,
            text: "Sometimes the app crashes unexpectedly.",
            rating: 2,
            user: "Rabia Malik",
            date: "2 months ago",
            likes: 4
        },
        {
            id: 23,
            text: "The training materials are very helpful.",
            rating: 4,
            user: "Shahid Iqbal",
            date: "2 months ago",
            likes: 7
        },
        {
            id: 24,
            text: "The new update fixed all my issues.",
            rating: 5,
            user: "Zara Khan",
            date: "2 months ago",
            likes: 12
        },
        {
            id: 25,
            text: "The initial setup was confusing.",
            rating: 3,
            user: "Waqar Ahmed",
            date: "3 months ago",
            likes: 5
        },
        {
            id: 26,
            text: "The customer support is available 24/7.",
            rating: 5,
            user: "Saima Ali",
            date: "3 months ago",
            likes: 15
        },
        {
            id: 27,
            text: "The mobile interface needs improvement.",
            rating: 2,
            user: "Javed Iqbal",
            date: "3 months ago",
            likes: 3
        },
        {
            id: 28,
            text: "The analytics dashboard is impressive.",
            rating: 5,
            user: "Noreen Khan",
            date: "4 months ago",
            likes: 14
        },
        {
            id: 29,
            text: "Sometimes the loading time is too long.",
            rating: 3,
            user: "Arif Malik",
            date: "4 months ago",
            likes: 6
        },
        {
            id: 30,
            text: "The platform is very secure and reliable.",
            rating: 5,
            user: "Sara Ahmed",
            date: "4 months ago",
            likes: 17
        }
    ]);

    const [newFeedback, setNewFeedback] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [newUserName, setNewUserName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [editRating, setEditRating] = useState(5);
    const [likedFeedbacks, setLikedFeedbacks] = useState(new Set());
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [feedbackToDelete, setFeedbackToDelete] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Validate input to only allow alphabets and spaces
    const validateText = (text) => {
        return /^[a-zA-Z\s.,!?']*$/.test(text);
    };

    // Handle feedback input change with validation
    const handleFeedbackChange = (e) => {
        const value = e.target.value;
        if (validateText(value) || value === "") {
            setNewFeedback(value);
        }
    };

    // Handle edit text change with validation
    const handleEditTextChange = (e) => {
        const value = e.target.value;
        if (validateText(value) || value === "") {
            setEditText(value);
        }
    };

    // Handle username input change with validation
    const handleUserNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
            setNewUserName(value);
        }
    };

    // Add feedback
    const handleAddFeedback = () => {
        if (!newFeedback.trim() || !newUserName.trim()) return;
        const newEntry = {
            id: Date.now(),
            text: newFeedback,
            rating: newRating,
            user: newUserName,
            date: "Just now",
            likes: 0
        };
        setFeedbacks([newEntry, ...feedbacks]);
        setNewFeedback("");
        setNewUserName("");
        setNewRating(5);
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 2000);
        // Reset to first page when adding new feedback
        setCurrentPage(1);
    };

    // Delete feedback
    const handleDelete = (id) => {
        const updatedFeedbacks = feedbacks.filter((f) => f.id !== id);
        setFeedbacks(updatedFeedbacks);
        setShowDeleteModal(false);
        setFeedbackToDelete(null);
        
        // Adjust current page if needed after deletion
        const totalPages = Math.ceil(updatedFeedbacks.length / itemsPerPage);
        if (currentPage > totalPages) {
            setCurrentPage(totalPages > 0 ? totalPages : 1);
        }
    };

    // Start editing
    const handleEdit = (feedback) => {
        setEditingId(feedback.id);
        setEditText(feedback.text);
        setEditRating(feedback.rating);
    };

    // Save update
    const handleSave = (id) => {
        setFeedbacks(
            feedbacks.map((f) =>
                f.id === id ? { ...f, text: editText, rating: editRating } : f
            )
        );
        setEditingId(null);
        setEditText("");
        setEditRating(5);
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText("");
        setEditRating(5);
    };

    // Handle like
    const handleLike = (id) => {
        const newLiked = new Set(likedFeedbacks);
        if (newLiked.has(id)) {
            newLiked.delete(id);
            setFeedbacks(feedbacks.map(f =>
                f.id === id ? { ...f, likes: f.likes - 1 } : f
            ));
        } else {
            newLiked.add(id);
            setFeedbacks(feedbacks.map(f =>
                f.id === id ? { ...f, likes: f.likes + 1 } : f
            ));
        }
        setLikedFeedbacks(newLiked);
    };

    // Show delete confirmation
    const confirmDelete = (id) => {
        setFeedbackToDelete(id);
        setShowDeleteModal(true);
    };

    // Cancel delete
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setFeedbackToDelete(null);
    };

    // Navigate to dashboard
    const goToDashboard = () => {
        navigate("/user/dashboard");
    };

    // Render star ratings
    const renderStars = (rating, editable = false, onChange = null) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type={editable ? "button" : "div"}
                        onClick={editable ? () => onChange(star) : null}
                        className={`${editable ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
                    >
                        <Star
                            className={`w-5 h-5 ${star <= rating ? "text-red-400 fill-red-400" : "text-gray-500"}`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFeedbacks = feedbacks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Maximum page numbers to show in pagination
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
    
    if (endPage - startPage + 1 < maxPageNumbersToShow) {
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

    return (
        <div className="max-w-7xl mx-auto bg-gray-900 text-white shadow-xl p-6 border-red-800/50 relative">
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-6 rounded-xl border border-red-800/30 w-full max-w-md">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                            <h3 className="text-xl font-semibold">Confirm Deletion</h3>
                        </div>
                        <p className="text-gray-300 mb-6">Are you sure you want to delete this feedback? This action cannot be undone.</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(feedbackToDelete)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-6 rounded-xl border border-green-800/30 w-full max-w-md flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Feedback Submitted!</h3>
                        <p className="text-gray-300">Thank you for sharing your feedback with us.</p>
                    </div>
                </div>
            )}

            {/* Close button to navigate to dashboard */}
            <button
                onClick={goToDashboard}
                className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-red-700 rounded-lg transition-colors transform hover:scale-110 z-10 mr-3"
                title="Go to Dashboard"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold flex items-center gap-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    <MessageSquare className="w-8 h-8 text-red-500" />
                    User Feedback
                </h2>
            </div>

            {/* Give Feedback Input */}
            <div className="mb-8 p-6 bg-gray-800/80 rounded-xl border border-red-800/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-5 text-red-400 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" /> Share Your Feedback
                </h3>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={newUserName}
                            onChange={handleUserNameChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-red-800/30 focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Only letters and spaces allowed</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                        {renderStars(newRating, true, setNewRating)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Your Feedback</label>
                        <textarea
                            placeholder="Write your feedback here..."
                            value={newFeedback}
                            onChange={handleFeedbackChange}
                            rows="3"
                            className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-red-800/30 focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">Only letters, spaces, and basic punctuation allowed</p>
                    </div>

                    <button
                        onClick={handleAddFeedback}
                        disabled={!newFeedback.trim() || !newUserName.trim()}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95"
                    >
                        <PlusCircle className="w-5 h-5" /> Submit Feedback
                    </button>
                </div>
            </div>

            {/* Feedback List */}
            <div className="space-y-5 mb-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-red-400 flex items-center gap-2">
                        <Heart className="w-5 h-5" /> Recent Feedback
                    </h3>
                    <div className="text-sm text-gray-400">
                        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, feedbacks.length)} of {feedbacks.length} feedbacks
                    </div>
                </div>

                {feedbacks.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 bg-gray-800/50 rounded-xl border border-red-800/30">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50 text-red-400" />
                        <p className="text-lg">No feedback yet. Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    currentFeedbacks.map((f) => (
                        <div
                            key={f.id}
                            className="bg-gray-800/50 p-6 rounded-xl border border-red-800/30 hover:border-red-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20"
                        >
                            {editingId === f.id ? (
                                <div className="space-y-5">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-red-600/80 flex items-center justify-center border border-red-500">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={handleEditTextChange}
                                                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-red-800/30 text-white focus:ring-2 focus:ring-red-500"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                                            {renderStars(editRating, true, setEditRating)}
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleSave(f.id)}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                                            >
                                                <Save className="w-4 h-4" /> Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                                            >
                                                <X className="w-4 h-4" /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-red-600/80 flex items-center justify-center border border-red-500">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-200">{f.user}</h4>
                                                <p className="text-xs text-gray-400">{f.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(f)}
                                                className="p-2 bg-gray-700 hover:bg-yellow-500 hover:text-gray-900 rounded-lg transition-colors transform hover:scale-110"
                                                title="Edit feedback"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(f.id)}
                                                className="p-2 bg-gray-700 hover:bg-red-700 rounded-lg transition-colors transform hover:scale-110"
                                                title="Delete feedback"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        {renderStars(f.rating)}
                                    </div>

                                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">{f.text}</p>

                                    <div className="flex items-center justify-between pt-3 border-t border-red-800/30">
                                        <button
                                            onClick={() => handleLike(f.id)}
                                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${likedFeedbacks.has(f.id) ? 'fill-red-500 text-red-500' : ''}`}
                                            />
                                            <span>{f.likes} likes</span>
                                        </button>

                                        <div className="text-xs text-gray-500">
                                            Helpful? Give it a like!
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {feedbacks.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-8">
                    <nav className="flex items-center gap-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-gray-800 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {startPage > 1 && (
                            <>
                                <button
                                    onClick={() => paginate(1)}
                                    className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-red-800 transition-colors"
                                >
                                    1
                                </button>
                                {startPage > 2 && <span className="px-2">...</span>}
                            </>
                        )}

                        {visiblePageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-3 py-2 rounded-lg transition-colors ${currentPage === number ? 'bg-red-600' : 'bg-gray-800 hover:bg-red-800'}`}
                            >
                                {number}
                            </button>
                        ))}

                        {endPage < totalPages && (
                            <>
                                {endPage < totalPages - 1 && <span className="px-2">...</span>}
                                <button
                                    onClick={() => paginate(totalPages)}
                                    className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-red-800 transition-colors"
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg bg-gray-800 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
}