import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './components/landingPage';
import SignUp from './components/SignUp';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/DashboardPage';
import Profile from './pages/ProfilePage';
import Collections from './pages/CollectionsPage';
import Reports from './pages/ReportsPage';
import Settings from './pages/SettingsPage';
import { useAuth } from './context/AuthContext';
import { useModal } from './context/ModalContext';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminDashboard from './admin/pages/DashboardPage';
import ReportsManagementPage from './admin/pages/ReportsManagementPage';
import CollectionSchedulingPage from './admin/pages/CollectionSchedulingPage';
import CollectionDetailPage from './admin/pages/CollectionDetailPage';
import VehiclesManagementPage from './admin/pages/VehiclesManagementPage';
import VehicleDetailPage from './admin/pages/VehicleDetailPage';
import SettingsPage from './admin/pages/SettingsPage';
import AuditLogsPage from './admin/pages/AuditLogsPage';
import NotificationsPage from './admin/pages/NotificationsPage';
import AnalyticsPage from './admin/pages/AnalyticsPage';
import DriverDashboard from './components/driver/DriverDashboard';

import UserManagementPage from './admin/pages/UserManagementPage';
import { Toaster } from 'react-hot-toast';

// Component to handle authentication for protected routes
const ProtectedContent = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();
  const { openLoginModal } = useModal();

  useEffect(() => {
    if (!loading && !user) {
      openLoginModal();
    }
  }, [user, loading, openLoginModal]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    // Display a placeholder while modal is being shown
    return <div className="flex items-center justify-center h-screen">Checking authentication...</div>;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { user } = useAuth();

  // Determine the appropriate dashboard based on user role
  const getDashboardRedirect = () => {
    if (!user) return <LandingPage />;
    
    if (user.role === 'Admin') {
      return <Navigate to="/admin/dashboard" />;
    } else if (user.role === 'Driver') {
      return <Navigate to="/driver/dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={getDashboardRedirect()} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/admin" element={
          <ProtectedContent requiredRole="Admin">
            <AdminLayout />
          </ProtectedContent>
        }>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="reports" element={<ReportsManagementPage />} />
          <Route path="collections" element={<CollectionSchedulingPage />} />
          <Route path="collections/:id" element={<CollectionDetailPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="vehicles" element={<VehiclesManagementPage />} />
          <Route path="vehicles/:id" element={<VehicleDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        <Route path="/driver/dashboard" element={<DriverDashboard />} />

        <Route path="/dashboard" element={
          <ProtectedContent>
            <DashboardLayout />
          </ProtectedContent>
        }>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections" element={<Collections />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App;
