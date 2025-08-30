import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 border-t border-red-900/50 relative z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="text-2xl font-bold text-red-500 tracking-tight flex items-center gap-2"
          >
            <ShieldAlert className="w-7 h-7 text-red-600" />
            ECrime Sphere
          </Link>
          <p className="mt-3 text-sm text-gray-400">
            A trusted platform for safe and quick crime reporting.  
            Report, track, and stay secure with ease.
          </p>
        </motion.div>

        {/* Middle Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-red-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-red-500 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/user/report" className="hover:text-red-500 transition">
                Report Crime
              </Link>
            </li>
            <li>
              <Link to="/user/track" className="hover:text-red-500 transition">
                Track Complaints
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Right Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-red-500" /> support@ecrimesphere.com
          </p>
          <p className="flex items-center gap-2 text-sm mt-2">
            <Phone className="w-4 h-4 text-red-500" /> +92 300 1234567
          </p>
          <p className="flex items-center gap-2 text-sm mt-2">
            <MapPin className="w-4 h-4 text-red-500" /> Lahore, Pakistan
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-red-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-500">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-500">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ECrime Sphere. All Rights Reserved.
      </div>
    </footer>
  );
}
