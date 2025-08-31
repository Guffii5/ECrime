import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Shield, MapPin, Search, Lightbulb, Users, Settings,
  ArrowRight, Smartphone, BellRing, Eye, GitPullRequest, ThumbsUp, BarChart
} from 'lucide-react';
import { Link } from "react-router-dom";

export default function AdminHome() {
  const sectionPadding = "py-16 md:py-24 px-6";
  const containerClass = "max-w-7xl mx-auto";
  const headingClass = "text-4xl md:text-5xl font-extrabold text-center mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600 drop-shadow-lg";
  const subHeadingClass = "text-2xl md:text-3xl font-bold text-center text-white mb-8";
  const paragraphClass = "text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto";
  const cardBgClass = "bg-gray-800/70 backdrop-blur-sm border border-red-700/30 rounded-xl p-8 shadow-xl transition-all duration-300 hover:shadow-red-500/20";
  const buttonClass = "inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 group";

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: "url('/admin.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-brightness-75 z-0"></div>
        <motion.div
          className="relative z-10 p-4"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Admin Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto drop-shadow-xl">
            Manage crime reports, monitor danger zones, and ensure quick responses across Punjab.
          </p>
          <motion.div
            className={buttonClass}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/admin/dashboard"
              className="text-white font-bold text-lg hover:underline"
            >
              Go to Dashboard
            </Link>
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={`${sectionPadding} ${containerClass}`}>
        <h2 className={headingClass}>Admin Features</h2>
        <p className={paragraphClass}>
          Powerful tools to keep the system secure, responsive, and efficient.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariants}
        >
          <motion.div className={cardBgClass} variants={itemVariants}>
            <FileText className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Manage Reports</h3>
            <p className="text-gray-300 text-center">
              Review, verify, and assign incoming reports to the relevant departments.
            </p>
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <MapPin className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Monitor Danger Zones</h3>
            <p className="text-gray-300 text-center">
              Track high-risk locations and keep oversight of crime-prone areas.
            </p>
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <BellRing className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Instant Notifications</h3>
            <p className="text-gray-300 text-center">
              Stay updated with real-time alerts on new reports and system updates.
            </p>
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <Users className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">User Management</h3>
            <p className="text-gray-300 text-center">
              Manage registered users, roles, and maintain secure access.
            </p>
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <BarChart className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Analytics & Insights</h3>
            <p className="text-gray-300 text-center">
              Visualize crime data, trends, and response performance at a glance.
            </p>
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <Settings className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">System Settings</h3>
            <p className="text-gray-300 text-center">
              Configure platform settings, permissions, and admin preferences.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Workflow */}
      <section className={`relative ${sectionPadding} bg-gray-900/80 backdrop-blur-sm border-y border-gray-700/50`}>
        <div className={containerClass}>
          <h2 className={headingClass}>Admin Workflow</h2>
          <p className={`${paragraphClass} mb-12`}>
            The streamlined process for handling crime reports efficiently.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className={`${cardBgClass} flex flex-col items-center text-center`} variants={itemVariants}>
              <Smartphone className="w-14 h-14 text-red-500 mb-5" />
              <h3 className="text-2xl font-bold text-white mb-3">1. Review</h3>
              <p className="text-gray-300">Check all newly submitted crime reports for details and accuracy.</p>
            </motion.div>

            <motion.div className={`${cardBgClass} flex flex-col items-center text-center`} variants={itemVariants}>
              <GitPullRequest className="w-14 h-14 text-red-500 mb-5" />
              <h3 className="text-2xl font-bold text-white mb-3">2. Assign</h3>
              <p className="text-gray-300">Forward the reports to relevant police stations or departments.</p>
            </motion.div>

            <motion.div className={`${cardBgClass} flex flex-col items-center text-center`} variants={itemVariants}>
              <ThumbsUp className="w-14 h-14 text-red-500 mb-5" />
              <h3 className="text-2xl font-bold text-white mb-3">3. Resolve</h3>
              <p className="text-gray-300">Close reports after proper resolution and notify concerned users.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className={`${sectionPadding} ${containerClass}`}>
        <h2 className={headingClass}>Admin Impact</h2>
        <p className={`${paragraphClass} mb-12`}>
          Key stats showing the effectiveness of administration.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div className={`${cardBgClass} !p-6 flex flex-col items-center justify-center`} variants={itemVariants}>
            <p className="text-5xl font-extrabold text-red-500 mb-2">1,200+</p>
            <p className="text-lg text-gray-300 text-center">Reports Processed</p>
          </motion.div>
          <motion.div className={`${cardBgClass} !p-6 flex flex-col items-center justify-center`} variants={itemVariants}>
            <p className="text-5xl font-extrabold text-red-500 mb-2">95%</p>
            <p className="text-lg text-gray-300 text-center">Cases Resolved</p>
          </motion.div>
          <motion.div className={`${cardBgClass} !p-6 flex flex-col items-center justify-center`} variants={itemVariants}>
            <p className="text-5xl font-extrabold text-red-500 mb-2">50+</p>
            <p className="text-lg text-gray-300 text-center">Active Admins</p>
          </motion.div>
          <motion.div className={`${cardBgClass} !p-6 flex flex-col items-center justify-center`} variants={itemVariants}>
            <p className="text-5xl font-extrabold text-red-500 mb-2">24/7</p>
            <p className="text-lg text-gray-300 text-center">System Monitoring</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm py-8 px-6 border-t border-gray-700/50">
        <div className={`${containerClass} text-center text-gray-400 text-sm`}>
          <p>&copy; {new Date().getFullYear()} CrimeNet Admin Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
