import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import Nav from '../shared/Nav';

export default function Users(){
  const [users, setUsers] = useState([]);
  useEffect(()=>{ axios.get('/users').then(r=>setUsers(r.data)).catch(()=>setUsers([])); }, []);
  return (<div><Nav /><div className="container"><h1>Users</h1><pre>{JSON.stringify(users,null,2)}</pre></div></div>);
}
