import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){ setLoading(false); return; }
    axios.get('/auth/me').then(res=>setUser(res.data)).catch(()=>localStorage.removeItem('token')).finally(()=>setLoading(false));
  }, []);

  const login = async (serviceNo, password) => {
    const res = await axios.post('/auth/login', { serviceNo, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    // redirect to dashboard
    window.location.href = '/';
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (<AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>);
};

export const useAuth = () => useContext(AuthContext);
