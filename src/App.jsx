import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/landingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/DashboardPage';
import Profile from './pages/ProfilePage';
import Collections from './pages/CollectionsPage';
import Reports from './pages/ReportsPage';
import Settings from './pages/SettingsPage';
import { useAuth } from './context/AuthContext';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminDashboard from './admin/pages/DashboardPage';
import ReportsManagementPage from './admin/pages/ReportsManagementPage';
import CollectionSchedulingPage from './admin/pages/CollectionSchedulingPage';
import CollectionDetailPage from './admin/pages/CollectionDetailPage';
import VehiclesManagementPage from './admin/pages/VehiclesManagementPage';
import VehicleDetailPage from './admin/pages/VehicleDetailPage';
import SettingsPage from './admin/pages/SettingsPage';
import AuditLogsPage from './admin/pages/AuditLogsPage';

import UserManagementPage from './admin/pages/UserManagementPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="reports" element={<ReportsManagementPage />} />
          <Route path="collections" element={<CollectionSchedulingPage />} />
          <Route path="collections/:id" element={<CollectionDetailPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="vehicles" element={<VehiclesManagementPage />} />
          <Route path="vehicles/:id" element={<VehicleDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
        </Route>

        <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
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
