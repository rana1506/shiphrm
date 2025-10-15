import React from 'react';
import { useAuth } from '../context/AuthContext';
import Nav from '../shared/Nav';

export default function Dashboard(){
  const { user } = useAuth();
  const role = user?.role;
  return (
    <div>
      <Nav />
      <div className="container">
        <h1>Dashboard</h1>
        <div className="card">
          <h3>Welcome, {user?.serviceNo}</h3>
          {role==='admin' || role==='co' ? <p>You can manage everything.</p> : role==='officer' ? <p>You can manage sailors in your division.</p> : <p>You can view your profile only.</p>}
        </div>
      </div>
    </div>
  );
}
