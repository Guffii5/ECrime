import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Shield, MapPin, Search, Lightbulb, Users, Handshake,
  ArrowRight, Smartphone, BellRing, Eye, GitPullRequest, ThumbsUp
} from 'lucide-react';

export default function Home() {
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
      <section
        className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: "/Crime scene.jpg",
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
            Your Safety, Our Priority.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto drop-shadow-xl">
            Empowering communities in Punjab, Pakistan to report crimes efficiently and securely.
          </p>
          <motion.div
            href=""
            className={buttonClass}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Report a Crime Now <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </motion.div>
      </section>

      <section className={`${sectionPadding} ${containerClass}`}>
        <h2 className={headingClass}>Key Features</h2>
        <p className={paragraphClass}>
          A seamless experience designed to connect you with law enforcement and ensure timely action.
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
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Easy & Secure Reporting</h3>
            <p className="text-gray-300 text-center">
              Submit detailed crime reports quickly and securely from any device. Your privacy is paramount.
            </p>
            
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <Search className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Track Your Complaints</h3>
            <p className="text-gray-300 text-center">
              Monitor the real-time status of your submitted reports and receive instant updates.
            </p>
           
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <Lightbulb className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Safety & Prevention Tips</h3>
            <p className="text-gray-300 text-center">
              Access valuable resources and expert advice to enhance your personal and community safety.
            </p>
            
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <MapPin className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Location-Based Reporting</h3>
            <p className="text-gray-300 text-center">
              Pinpoint incident locations accurately, assisting law enforcement in rapid response.
            </p>
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <BellRing className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Real-time Notifications</h3>
            <p className="text-gray-300 text-center">
              Receive instant alerts on your report status and important safety advisories.
            </p>
            
          </motion.div>

          <motion.div className={cardBgClass} variants={itemVariants}>
            <Users className="w-12 h-12 text-red-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-3 text-center">Community Engagement</h3>
            <p className="text-gray-300 text-center">
              Join a network of vigilant citizens contributing to a safer Punjab.
            </p>
            
          </motion.div>
        </motion.div>
      </section>

      <section className={`${sectionPadding} ${containerClass} grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
          className="md:order-2" 
        >
          <h2 className={`${subHeadingClass} text-left`}>Our Mission for a Safer Punjab</h2>
          <p className={`${paragraphClass} text-left`}>
            At CrimeNet, we are committed to building a safer community in Punjab by bridging the gap between citizens and law enforcement. Our platform provides a modern, accessible, and confidential way to report criminal activities, contributing directly to crime prevention and rapid response. We believe that an informed and engaged community is the strongest defense against crime.
          </p>
          <p className={`${paragraphClass} text-left mt-4`}>
            By empowering every resident with the tools to report and track incidents, we foster an environment of collective responsibility and proactive safety. Join us in making Punjab a secure place for everyone.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
          className="md:order-1"
        >
          <img
            src="/Community Engaged.jpg"
            alt="Community engagement for safety"
            className="rounded-xl shadow-2xl border border-red-700/50 w-full h-auto object-cover"
          />
        </motion.div>
      </section>

      <section className={`relative ${sectionPadding} bg-gray-900/80 backdrop-blur-sm border-y border-gray-700/50`}>
        <div className={containerClass}>
          <h2 className={headingClass}>How It Works</h2>
          <p className={`${paragraphClass} mb-12`}>
            Our simple 3-step process ensures your report reaches the right authorities quickly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className={`${cardBgClass} flex flex-col items-center text-center`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
            >
              <Smartphone className="w-14 h-14 text-red-500 mb-5 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-3">1. Report</h3>
              <p className="text-gray-300">
                Submit a detailed report online or via our mobile app. Provide all necessary information and evidence.
              </p>
            </motion.div>

            <motion.div
              className={`${cardBgClass} flex flex-col items-center text-center`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
            >
              <GitPullRequest className="w-14 h-14 text-red-500 mb-5 animate-bounce-slow" />
              <h3 className="text-2xl font-bold text-white mb-3">2. Process</h3>
              <p className="text-gray-300">
                Your report is instantly forwarded to the relevant police department for verification and action.
              </p>
            </motion.div>

            <motion.div
              className={`${cardBgClass} flex flex-col items-center text-center`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
            >
              <ThumbsUp className="w-14 h-14 text-red-500 mb-5 animate-wiggle" />
              <h3 className="text-2xl font-bold text-white mb-3">3. Resolve</h3>
              <p className="text-gray-300">
                Track the status of your complaint and receive notifications until the case is resolved.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`${sectionPadding} ${containerClass}`}>
        <h2 className={headingClass}>Our Impact in Punjab</h2>
        <p className={`${paragraphClass} mb-12`}>
          See how your contributions are making a tangible difference in community safety.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            className={`${cardBgClass} !p-6 flex flex-col items-center justify-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <p className="text-5xl font-extrabold text-red-500 mb-2">1,200+</p>
            <p className="text-lg text-gray-300 text-center">Reports Filed</p>
          </motion.div>
          <motion.div
            className={`${cardBgClass} !p-6 flex flex-col items-center justify-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <p className="text-5xl font-extrabold text-red-500 mb-2">90%</p>
            <p className="text-lg text-gray-300 text-center">Resolution Rate</p>
          </motion.div>
          <motion.div
            className={`${cardBgClass} !p-6 flex flex-col items-center justify-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <p className="text-5xl font-extrabold text-red-500 mb-2">500+</p>
            <p className="text-lg text-gray-300 text-center">Active Users</p>
          </motion.div>
          <motion.div
            className={`${cardBgClass} !p-6 flex flex-col items-center justify-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <p className="text-5xl font-extrabold text-red-500 mb-2">24/7</p>
            <p className="text-lg text-gray-300 text-center">Support & Monitoring</p>
          </motion.div>
        </div>
      </section>

      {/* Final Call to Action - Full Width */}
      <section className="relative bg-red-800/80 ${sectionPadding} text-center overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark opacity-10 z-0"></div> 
        <div className={`${containerClass} relative z-10`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl mt-5">
            Be the Change. Report a Crime.
          </h2>
          <p className="text-xl md:text-2xl text-red-100 mb-10 max-w-4xl mx-auto drop-shadow">
            Your vigilance helps make Punjab safer for everyone. Take action today.
          </p>
          <motion.div
            className={`${buttonClass} !bg-white !text-white hover:!bg-gray-200 mb-5`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           Your Report
          </motion.div>
        </div>
      </section>

      {/* Footer - Full Width */}
      <footer className="bg-gray-900/80 backdrop-blur-sm py-8 px-6 border-t border-gray-700/50">
        <div className={`${containerClass} text-center text-gray-400 text-sm`}>
          <p>&copy; {new Date().getFullYear()} CrimeNet. All rights reserved.</p>
          <p className="mt-2">Designed with <span className="text-red-500">&hearts;</span> for the community of Gujrat, Punjab, Pakistan.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="/privacy" className="hover:text-red-400 transition-colors duration-200">Privacy Policy</a>
            <a href="/terms" className="hover:text-red-400 transition-colors duration-200">Terms of Service</a>
            <a href="/sitemap" className="hover:text-red-400 transition-colors duration-200">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}