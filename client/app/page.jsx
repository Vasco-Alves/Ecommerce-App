
'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();

    const [cityFilter, setFilter] = useState('');
    const [activityFilter, setActivityFilter] = useState('');

    const [commerceList, setCommerceList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/commerces');
                const data = await response.json();

                setCommerceList(data.commerces);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        }

        fetchData();
    }, []);


    return (
        <div className="absolute min-h-screen min-w-full bg-gradient-to-br from-gray-800 to-cyan-700">
            {/* Navbar */}
            <nav className="flex items-center fixed top-0 h-16 w-full px-5 justify-between bg-slate-50 shadow-xl">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">Search:</span>
                    <input
                        type="text"
                        className="p-2 w-28 placeholder:text-sm md:w-auto sm:placeholder:text-lg bg-slate-50 border-b-gray-300 border-b-2 focus:outline-none focus:border-b-gray-500"
                        placeholder="City..."
                        onChange={(e) => setFilter(e.target.value.toLowerCase())}
                    />
                    <input
                        type="text"
                        className="p-2 w-28 placeholder:text-sm md:w-auto sm:placeholder:text-lg bg-slate-50 border-b-gray-300 border-b-2 focus:outline-none focus:border-b-gray-500"
                        placeholder="Activity..."
                        onChange={(e) => setActivityFilter(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/register')}
                        className="bg-cyan-700 hover:bg-cyan-500 text-white md:text-xl p-2.5 rounded">
                        Register
                    </button>
                    <button
                        onClick={() => router.push('/login')}
                        className="bg-cyan-700 hover:bg-cyan-500 text-white md:text-xl p-2.5 rounded">
                        Log In
                    </button>
                </div>
            </nav>

            {!loading && <div className="flex justify-center mt-20 p-8" >
                <div className="h-[calc(100vh-145px)] overflow-y-scroll w-full p-4 bg-slate-100 bg-opacity-80 rounded shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px]">
                    <ul className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
                        {commerceList.filter((c) =>
                            c.city.toLowerCase().includes(cityFilter) &&
                            c.activity.toLowerCase().includes(activityFilter)
                        ).map((c) => (
                            <li key={c.id} className="flex flex-col xl:flex-row gap-2">
                                {/* Image */}
                                <Link href={{ pathname: '/commerces/publicuser', query: { id: c.id } }}
                                    className="h-64 xl:h-full w-full bg-black bg-cover bg-center rounded shadow-[rgba(0,_0,_0,_0.5)_0px_0px_15px] hover:opacity-50"
                                    style={{ backgroundImage: `url(/${c.cover})` }}>
                                </Link>

                                {/* Info */}
                                <div className="flex flex-col sm:flex-row xl:flex-col xl:items-start sm:items-center py-4 px-10 xl:p-8 xl:w-2/3 gap-7 xl:gap-5 bg-white w-full rounded
                                     shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px]">
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <h1 className="font-bold text-3xl xl:text-4xl">{c.name}</h1>
                                        <div>
                                            <h3><span className="font-bold">Activity: </span>{c.activity}</h3>
                                            <h3><span className="font-bold">Score: </span>{c.score}</h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 xl:grid-cols-1 w-full border-l-2 border-l-gray-700 pl-4">
                                        <h2 className="text-sm xl:text-lg"><span className="font-bold">CIF: </span>{c.cif}</h2>
                                        <h2 className="text-sm xl:text-lg"><span className="font-bold">Phone: </span>{c.phone}</h2>
                                        <h2 className="text-sm xl:text-lg"><span className="font-bold">Email: </span>{c.email}</h2>
                                        <h2 className="text-sm xl:text-lg"><span className="font-bold">City: </span>{c.city}</h2>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div >
            }
        </div >
    );
}

export default Home;