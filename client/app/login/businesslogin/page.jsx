
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BusinessLoginPage = () => {
    const router = useRouter();
    const [commerceId, setBusinessId] = useState('');
    const [commerceList, setCommerceList] = useState([]);

    const handleLogIn = () => {
        const business = commerceList.find(business => business.id === commerceId);

        if (!business) {
            alert(`Business with id ${commerceId} not found.`);
            console.error(`Business with id ${commerceId} not found.`);
            return;
        }

        router.push(`/commerces/business/${commerceId}`);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/commerces');
                const data = await response.json();
                setCommerceList(data.commerces);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 to-slate-800 flex justify-center items-center">
            <div className="bg-white w-auto h-full p-10 rounded flex flex-col gap-5 justify-between shadow-2xl bg-opacity-60">
                <input
                    type="text"
                    value={commerceId}
                    placeholder="Commerce id..."
                    className="p-4 rounded w-[350px]"
                    onChange={(e) => setBusinessId(e.target.value)}
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