import React, { useEffect, useState } from 'react'; import axios from '../api/axiosInstance'; import Nav from '../shared/Nav';
export default function Divisions() {
    const [divs, setDivs] = useState([]);
    useEffect(() => {
        axios.get('/divisions')
            .then(r => setDivs(r.data))
            .catch(() => setDivs([]));
    }, []);
    return (
        <div>
            <Nav />
            <div className="container">
                <h1>Divisions</h1>
                <pre>{JSON.stringify(divs, null, 2)}</pre>
            </div>
        </div>
    );
}
