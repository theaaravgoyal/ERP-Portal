import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Modules from './pages/Modules/Modules';
import Settings from './pages/Settings/Settings';
import Attendance from './Modules/Attendance/pages/Attendance';
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

      {/* Core Navigation Routes */}
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
        path={ROUTES.MODULES}
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Modules />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Settings />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      {/* Module Routes — permission-gated */}
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
            <LeadDashboard />
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
