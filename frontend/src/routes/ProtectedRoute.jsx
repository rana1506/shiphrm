import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import rules from '../utils/rbac';

export default function ProtectedRoute({ children, requiredPermission }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const permissions = rules[user.role]?.static || [];
  if (permissions.includes('*')) return children;
  if (!requiredPermission) return children;
  if (permissions.includes(requiredPermission) || permissions.includes(requiredPermission.split(':')[0]+':*')) return children;
  return <div className="container card" style={{color:'red'}}>Access Denied</div>;
}
