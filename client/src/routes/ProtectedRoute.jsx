import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { ROUTES } from '../constants/Routes';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { token, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen={true} />;
  }

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Database-Driven Permission Checks
  if (requiredPermission && user) {
    const hasPermission = user.permissions.some(p => p.code === requiredPermission);
    if (!hasPermission) {
      return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
