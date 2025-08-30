import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  LogIn,
  ShieldAlert,
  LayoutDashboard,
  PlusCircle,
  User,
  SearchCheck,
  ClipboardList,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setIsOpen(false);
    setShowConfirm(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Links for guest and user
  const guestLinks = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Login', path: '/login', icon: <LogIn className="w-5 h-5" /> },
  ];

  const userLinks = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Dashboard', path: '/user/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Report Crime', path: '/user/report', icon: <PlusCircle className="w-5 h-5" /> },
    { label: 'My Reports', path: '/user/MyReports', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Track Complaints', path: '/user/track', icon: <SearchCheck className="w-5 h-5" /> },
    { label: 'Profile', path: '/user/profile', icon: <User className="w-5 h-5" /> },
  ];

  const linksToShow = role === 'user' ? userLinks : guestLinks;

  const getLinkClasses = (path) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
      location.pathname === path
        ? 'bg-red-900/50 text-white shadow-inner border border-red-800/50'
        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
    }`;

  return (
    <>
      <nav className="bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl border-b border-red-900/50 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-red-500 tracking-tight flex items-center gap-2"
              >
                <ShieldAlert className="w-7 h-7 text-red-600" />
                <span className="hidden sm:inline">ECrime Sphere</span>
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex ml-10 space-x-2">
              {linksToShow.map((link, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to={link.path} className={getLinkClasses(link.path)}>
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {role && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all ml-2"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/95 backdrop-blur-sm">
            {linksToShow.map((link, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-3 rounded-md text-base font-medium w-full ${
                    location.pathname === link.path
                      ? 'bg-red-900/50 text-white border border-red-800/50'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {role && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: linksToShow.length * 0.1 }}
              >
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center px-3 py-3 rounded-md text-base font-medium w-full text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </nav>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-red-700/50"
            >
              <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
              <p className="text-sm text-gray-300 mb-6">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
                >
                   Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
