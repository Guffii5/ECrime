import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, 
  LogIn,
  ShieldAlert,
  LayoutDashboard,
  Settings,
  BarChart2,
  FileText,
  Building2,
  LogOut,
  Menu,
  X,
  PlusCircle,
  UserCog,
  ChartLine,
  MapPin,
  Bell,
  Activity,
  User,
  ShieldCheck,
  AlertTriangle,
  ClipboardList,
  Map,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Navigation links with additional icons
  const guestLinks = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Login', path: '/login', icon: <LogIn className="w-5 h-5" /> },
  ];


  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Complaints', path: '/admin/manage', icon: <UserCog className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <ChartLine className="w-5 h-5" /> },
    { label: 'Stations', path: '/admin/stations', icon: <MapPin className="w-5 h-5" /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  let linksToShow = guestLinks;
  if (role === 'admin') linksToShow = adminLinks;

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl border-b border-red-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link
              to="/"
              className="text-2xl font-bold text-red-500 tracking-tight flex items-center gap-2"
            >
              <ShieldAlert className="w-7 h-7 text-red-600" />
              <span className="hidden sm:inline">ECrime Sphere</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {linksToShow.map((link, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${location.pathname === link.path
                        ? 'bg-red-900/50 text-white shadow-inner border border-red-800/50'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {role && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all ml-2"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
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
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium w-full ${location.pathname === link.path
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
                onClick={handleLogout}
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
  );
}