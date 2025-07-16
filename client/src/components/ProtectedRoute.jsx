import { Outlet, useNavigate , useLocation , Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import React from 'react';

const ProtectedRoute = ({ children, requireAuth = true, allowedRoles = [], redirectTo = '/login' }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If authentication is not required but user is authenticated (like login/signup pages)
  if (!requireAuth && isAuthenticated) {
    // Redirect based on user role
    const redirectPath = user?.role === 'admin' ? '/admin' : '/home/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // Check role-based access
  if (requireAuth && allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user's actual role
      const redirectPath = user.role === 'admin' ? '/admin' : '/home/dashboard';
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;