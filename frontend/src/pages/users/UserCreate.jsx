import React, { useState } from 'react';
import axios from '../../api/axiosInstance';

export default function UserCreate() {
    const [serviceNo, setServiceNo] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('sailor');
    const submit = async e => {
        e.preventDefault();
        await axios.post('/users', { serviceNo, password, role });
        window.location.href = '/users';
    };
    return (
        <div className="container card">
            <h1>Create User</h1>
            <form onSubmit={submit}>
                <div>
                    <input placeholder="Service No" value={serviceNo} onChange={e => setServiceNo(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="admin">admin</option>
                        <option value="co">co</option>
                        <option value="officer">officer</option>
                        <option value="sailor">sailor</option>
                    </select>
                </div>
                <button className="button" type="submit">Create</button>
            </form>
        </div>
    );
}
