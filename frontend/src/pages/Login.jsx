import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Nav from '../shared/Nav';

export default function Login(){
  const [serviceNo, setServiceNo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try { await login(serviceNo, password); } catch { alert('Login failed'); }
  };

  const quick = (user) => {
    const data = { admin:['admin','password123'], co:['co','password123'], officer:['officer','password123'], sailor:['sailor','password123'] };
    setServiceNo(data[user][0]); setPassword(data[user][1]);
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={submit} className="card">
          <div><label>Service No</label><br/><input value={serviceNo} onChange={e=>setServiceNo(e.target.value)} /></div>
          <div><label>Password</label><br/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
          <div style={{marginTop:8}}>
            <button className="button" type="submit">Login</button>
            <button type="button" className="button quick" onClick={()=>quick('admin')}>Quick Admin</button>
            <button type="button" className="button quick" onClick={()=>quick('co')}>Quick CO</button>
            <button type="button" className="button quick" onClick={()=>quick('officer')}>Quick Officer</button>
            <button type="button" className="button quick" onClick={()=>quick('sailor')}>Quick Sailor</button>
          </div>
        </form>
      </div>
    </div>
  );
}
