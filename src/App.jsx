import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Sidebar from "./components/navigation/Navigation";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageComplaints from "./components/admin/ManageComplaints";
import Analytics from "./components/admin/Analytics";
import PoliceStations from "./components/admin/PolicsStstions";
import AdminSettings from "./components/admin/AdminSetting";
import ErrorBoundary from "./components/ErrorBoundary";
import ForgotPassword from "./components/auth/forgotpassword";
import User from "./components/admin/User"; 
import CrimeByCity from "./components/admin/CrimeByCity"; 
import Feedback from "./components/admin/feedback"; 

function Layout() {
  const role = localStorage.getItem("role"); 

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Show sidebar only for logged-in users */}
      {role && <Sidebar />}

      {/* Page Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

// Protect admin routes
function ProtectedRoute({ children }) {
  const role = localStorage.getItem("role");
  if (!role) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Guest Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Layout for pages (sidebar shows only if logged in) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} /> {/* Default home page visible to all */}

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage"
            element={
              <ProtectedRoute>
                <ManageComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stations"
            element={
              <ProtectedRoute>
                <PoliceStations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crime-by-city"
            element={
              <ProtectedRoute>
                <CrimeByCity />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback Route */}
        <Route
          path="*"
          element={<h1 className="p-6 text-2xl text-red-600">404 - Page Not Found</h1>}
        />
      </Routes>
    </ErrorBoundary>
  );
}
