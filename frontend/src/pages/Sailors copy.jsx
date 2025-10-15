import React, { useEffect, useState } from 'react'; 
import axios from '../api/axiosInstance'; 
import Nav from '../shared/Nav'; 
import { useAuth } from '../context/AuthContext';

export default function Sailors() {
    const [sailors, setSailors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth();
    
    useEffect(() => {
        axios.get('/sailors').then(r => setSailors(r.data)).catch(() => setSailors([]));
    }, []);
    
    return (
        <div>
            <Nav />
            <div>Logged as: {user?.serviceNo} ({user?.role})</div>
            <div className="p-4">
                <h1 className="text-xl font-semibold mb-4">Sailors</h1>

                <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => setShowForm(true)}
                >
                    Add Sailor
                </button>

                {showForm && (
                    <SailorForm
                        onSuccess={(newSailor) => {
                            setSailors([...sailors, newSailor]);
                            setShowForm(false);
                        }}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                <SailorTable data={sailors} />
            </div>
        </div>
    );
}
