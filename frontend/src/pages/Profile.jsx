import React from 'react'; import Nav from '../shared/Nav'; import { useAuth } from '../context/AuthContext';
export default function Profile(){ const { user } = useAuth(); return (<div><Nav /><div className="container"><h1>My Profile</h1><pre>{JSON.stringify(user,null,2)}</pre></div></div>); }
