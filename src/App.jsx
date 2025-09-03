import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserDashboard from "./components/user/UserDashboard";
import ReportCrime from "./components/user/ReportCrime";
import TrackComplaint from "./components/user/TrackComplaint";
import SafetyTips from "./components/user/SafetyTips";
import Profile from "./components/Profile";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./components/Home";
import ForgotPassword from "./components/auth/Forgotpassword";
import Statistics from "./components/user/Statistics";
import Faqs from "./components/user/Faqs";
import Resources from "./components/user/Resources";
import MyReports from "./components/user/Myreports";
import ReportDetail from "./components/user/Reportdetails";
import CrimeByCity from "./components/user/CrimeBycity";
import Footer from "./components/user/Footer";
import Feedback from "./components/user/feedback"; 

function Layout({ children }) {
  const location = useLocation();

  const noFooterPaths = ["/login", "/register", "/forgotpassword", "/otp"];

  const hideFooter = noFooterPaths.some((path) =>
    location.pathname.toLowerCase().startsWith(path)
  );

  return (
    <>
      <Navigation />
      {children}
      {!hideFooter && <Footer />} {/* 👈 Footer conditionally rendered */}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<h1>OTP Page</h1>} />

            {/* User Routes */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/report" element={<ReportCrime />} />
            <Route path="/user/track" element={<TrackComplaint />} />
            <Route path="/user/safetyTips" element={<SafetyTips />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/myReports" element={<MyReports />} />
            <Route path="/user/statistics" element={<Statistics />} />
            <Route path="/user/faqs" element={<Faqs />} />
            <Route path="/user/resources" element={<Resources />} />
            <Route path="/user/CrimeBycity" element={<CrimeByCity />} />
            <Route path="/user/myReports/:id" element={<ReportDetail />} />
            <Route path="/user/feedback" element={<Feedback />} />

            {/* Fallback Route */}
            <Route
              path="*"
              element={
                <h1 className="p-6 text-2xl text-red-600">
                  404 - Page Not Found
                </h1>
              }
            />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}
