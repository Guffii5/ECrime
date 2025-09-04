import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LogIn,
  ShieldAlert,
  LayoutDashboard,
  Settings,
  ChartLine,
  MapPin,
  LogOut,
  Menu,
  ChevronLeft,
  UserCog,
  User,
  X,
  MessageSquare,
  BarChart2,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && isMobileOpen) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

  useEffect(() => {
    if (location.pathname === '/User') setIsCollapsed(true);
  }, [location.pathname]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate('/login');
    setIsCollapsed(true);
    setIsMobileOpen(false);
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  const handleLinkClick = (path) => {
    if (isMobile) setIsMobileOpen(false);
    if (path === '/User') setIsCollapsed(true);
  };

  const guestLinks = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Login', path: '/login', icon: <LogIn className="w-5 h-5" /> },
  ];

  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Complaints', path: '/admin/manage', icon: <UserCog className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <ChartLine className="w-5 h-5" /> },
    { label: 'Crime by City', path: '/crime-by-city', icon: <BarChart2 className="w-5 h-5" /> },
    { label: 'Stations', path: '/admin/stations', icon: <Building2 className="w-5 h-5" /> },
    { label: 'User', path: '/User', icon: <User className="w-5 h-5" /> },
    { label: 'Feedback', path: '/feedback', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const linksToShow = role === 'admin' ? adminLinks : guestLinks;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: 80 }}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg z-40 flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-red-500">
            <ShieldAlert className="w-6 h-6 text-red-600" />
            {!isCollapsed && <span>ECrime</span>}
          </Link>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <ChevronLeft className={`w-6 h-6 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {linksToShow.map((link, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${location.pathname === link.path
                  ? 'bg-red-900/50 text-white border border-red-800/50'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <span className="mr-2">{link.icon}</span>
                {!isCollapsed && <span>{link.label}</span>}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logout */}
        {role && (
          <div className="px-4 py-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-2" />
              {!isCollapsed && 'Logout'}
            </button>
          </div>
        )}
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-black z-40"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg z-50 flex flex-col"
            >
              {/* Mobile Top */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-red-500">
                  <ShieldAlert className="w-6 h-6 text-red-600" />
                  <span>ECrime</span>
                </Link>
                <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
                {linksToShow.map((link, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${location.pathname === link.path
                        ? 'bg-red-900/50 text-white border border-red-800/50'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Logout */}
              {role && (
                <div className="px-4 py-4 border-t border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={cancelLogout}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md text-center text-white border border-gray-700 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-900/30 rounded-full">
                  <LogOut className="w-8 h-8 text-red-400" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">Confirm Logout</h3>
              <p className="text-gray-300 mb-6">Are you sure you want to logout from your account?</p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={cancelLogout}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium transition-colors flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors flex-1"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Page content margin */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
      </div>
    </>
  );
}