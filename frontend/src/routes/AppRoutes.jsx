import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Users from '../pages/Users';
import UserCreate from '../pages/users/UserCreate';
import Divisions from '../pages/Divisions';
import Officers from '../pages/Officers';
import Sailors from '../pages/Sailors';
import Organization from '../pages/Organization';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />

        <Route path="/users" element={<ProtectedRoute requiredPermission="users:list"><Users/></ProtectedRoute>} />
        <Route path="/users/create" element={<ProtectedRoute requiredPermission="users:create"><UserCreate/></ProtectedRoute>} />

        <Route path="/divisions" element={<ProtectedRoute requiredPermission="divisions:*"><Divisions/></ProtectedRoute>} />

        <Route path="/officers" element={<ProtectedRoute requiredPermission="officers:*"><Officers/></ProtectedRoute>} />
        <Route path="/sailors" element={<ProtectedRoute requiredPermission="sailors:list"><Sailors/></ProtectedRoute>} />

        <Route path="/organization" element={<ProtectedRoute requiredPermission="organization:view"><Organization/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute requiredPermission="self:view"><Profile/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
