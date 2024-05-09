
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const jwt = require('jsonwebtoken');

const BusinessLoginPage = () => {
    const router = useRouter();

    const [authToken, setAuthToken] = useState('');

    const fetchData = async (cif) => {
        try {
            const response = await fetch(`http://localhost:3000/api/comercio/${cif}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching commerce data:', error);
        }
    }

    const handleLogIn = async () => {
        const decodedToken = jwt.decode(authToken);
        const commerce = await fetchData(decodedToken.cif);
        if (!commerce) {
            alert('Business not found.');
            return;
        }

        localStorage.setItem('token', authToken);
        router.push(`/commerces/business/${decodedToken.cif}`);
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 to-slate-800 flex justify-center items-center">
            <div className="bg-white w-auto h-full p-10 rounded flex flex-col gap-5 justify-between shadow-2xl bg-opacity-60">
                <input
                    type="text"
                    value={authToken}
                    placeholder="Authentication token..."
                    className="p-4 rounded w-[350px]"
                    onChange={(e) => setAuthToken(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-4 rounded hover:bg-sky-700 text-center"
                    onClick={handleLogIn}>
                    Log In
                </button>
            </div>
        </div>
    )
}

export default BusinessLoginPage;