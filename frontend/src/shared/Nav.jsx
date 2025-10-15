import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav(){
  const { user, logout } = useAuth();
  const role = user?.role;
  return (
    <div className="nav">
      <div style={{fontWeight:700}}>Ship HRM</div>
      {user && <div style={{display:'flex', gap:8}}>
        <Link className="link" to="/">Dashboard</Link>
        {(role==='admin'||role==='co') && <Link className="link" to="/users">Users</Link>}
        {(role==='admin'||role==='co') && <Link className="link" to="/divisions">Divisions</Link>}
        {(role==='admin'||role==='co'||role==='officer') && <Link className="link" to="/sailors">Sailors</Link>}
        {(role==='admin'||role==='co') && <Link className="link" to="/officers">Officers</Link>}
        <Link className="link" to="/organization">Org Chart</Link>
        {role==='sailor' && <Link className="link" to="/profile">My Profile</Link>}
      </div>}
      <div style={{marginLeft:'auto'}}>
        {user ? <button className="button" onClick={logout}>Logout</button> : <Link className="link" to="/login">Login</Link>}
      </div>
    </div>
  );
}
