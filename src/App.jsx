import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageComplaints from "./components/admin/ManageComplaints";
import Analytics from "./components/admin/Analytics";
import PoliceStations from "./components/admin/PolicsStstions";
import AdminSettings from "./components/admin/AdminSetting";
import ErrorBoundary from "./components/ErrorBoundary";

function Layout() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage" element={<ManageComplaints />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/stations" element={<PoliceStations />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

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
    </ErrorBoundary>
  );
}
