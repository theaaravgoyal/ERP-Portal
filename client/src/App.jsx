import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Attendance from './Modules/Attendance/pages/Attendance';
import SiteManagement from './Modules/SiteManagement/pages/SiteManagement';
import FeesManagement from './Modules/FeesManagement/pages/FeesManagement';
import LeadDashboard from './Modules/LeadManagement/pages/LeadDashboard';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './routes/ProtectedRoute';
import ProtectedLayout from './components/ProtectedLayout';
import { ROUTES } from './constants/Routes';
import { PERMISSIONS } from './constants/Permissions';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      
      {/* Protected Layout Routes */}
      <Route 
        path={ROUTES.DASHBOARD} 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path={ROUTES.ATTENDANCE} 
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.ACCESS_ATTENDANCE}>
            <ProtectedLayout>
              <Attendance />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path={ROUTES.SITE_MANAGEMENT} 
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.ACCESS_SITE}>
            <ProtectedLayout>
              <SiteManagement />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path={ROUTES.FEES_MANAGEMENT} 
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.ACCESS_FEES}>
            <ProtectedLayout>
              <FeesManagement />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path={ROUTES.LEAD_MANAGEMENT} 
        element={
          <ProtectedRoute requiredPermission={PERMISSIONS.ACCESS_LEADS}>
            <ProtectedLayout>
              <LeadDashboard />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path={ROUTES.UNAUTHORIZED} 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Unauthorized />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />

      {/* Default Redirections */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}

export default App;
