
'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditModal from '../components/EditModal';

const jwt = require('jsonwebtoken');

const UserHome = () => {
    const router = useRouter();

    const [username, setUserName] = useState('');
    const [interestsData, setInterestsData] = useState([]);

    const [cityFilter, setFilter] = useState('');
    const [activityFilter, setActivityFilter] = useState('');

    const [commerceList, setCommerceList] = useState([]);
    const [user, setUser] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openModal = () => { setModalOpen(true) }
    const closeModal = () => { setModalOpen(false) }

    const logout = () => {
        router.replace('/');
        localStorage.removeItem('token');
    }

    const saveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token)
                return;

            const { _id, ...userData } = user;

            const response = await fetch(`http://localhost:3000/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok)
                throw new Error('Error updating user.');

            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    }

    const deleteUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token)
                return;

            const response = await fetch(`http://localhost:3000/api/users/${user._id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok)
                throw new Error('Error updating user.');

            logout();

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // Petición GET de comercios
        const fetchCommerces = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/comercio');
                if (!response.ok)
                    throw new Error('Error fetching data.');

                const data = await response.json();
                setCommerceList(data);

            } catch (error) {
                console.error(error);
            }
        }

        // Petición GET de información del usuario
        const fetchUserData = async (id, token) => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!response.ok)
                    throw new Error('Error fetching user data.');

                const data = await response.json();
                setUser(data);
                setUserName(data.username);

            } catch (error) {
                console.error(error);
            }
        }

        const fetchInterests = async () => {
            try {
                const response = await fetch('/api/interests');
                const data = await response.json();
                setInterestsData(data.interests);

            } catch (error) {
                console.error('Error fetching interests data:', error);
            }
        }

        const token = localStorage.getItem('token');
        if (!token || token === undefined) {
            alert('Token not found');
            router.replace('/');
        }
        const decodedToken = jwt.decode(token);

        fetchInterests();
        fetchCommerces();
        fetchUserData(decodedToken._id, token);
        setLoading(false);
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
                    <button onClick={openModal}
                        className="text-lg font-bold">{username.toUpperCase()}</button>
                    <button
                        onClick={() => logout()}
                        className="bg-cyan-700 hover:bg-cyan-500 text-white md:text-xl p-2.5 rounded">
                        Log Out
                    </button>
                </div>
            </nav>

            {!loading && <div className="flex justify-center mt-20 px-3" >
                <div className="h-[calc(100vh-95px)] overflow-y-scroll w-full p-4 bg-slate-100 bg-opacity-80 rounded shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px]">
                    <ul className="grid grid-cols-1 2xl:grid-cols-2 gap-10">
                        {commerceList.filter((c) =>
                            c.city.toLowerCase().includes(cityFilter) &&
                            c.activity.toLowerCase().includes(activityFilter)
                        ).map((c, index) => (
                            <li key={index} className="flex flex-col lg:flex-row gap-2">
                                {/* Image */}
                                <Link href={{ pathname: '/commerces/registereduser', query: { cif: c.cif } }}
                                    className="h-64 xl:h-full w-full bg-black bg-cover bg-center rounded shadow-[rgba(0,_0,_0,_0.5)_0px_0px_15px] hover:opacity-50"
                                    style={{ backgroundImage: `url(/${c.cover})` }}>
                                </Link>

                                {/* Info */}
                                <div className="lg:w-96 p-4 lg:py-10 bg-white rounded shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px]">
                                    <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center justify-between gap-4 w-full h-full">
                                        <h1 className="font-bold text-center text-3xl xl:text-4xl">{c.name}</h1>
                                        <div className="flex flex-wrap justify-center gap-6">
                                            <h3><span className="font-bold">Activity: </span>{c.activity}</h3>
                                            <h3><span className="font-bold">Score: </span>{c.score}</h3>
                                            <h3><span className="font-bold">City: </span>{c.city}</h3>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {isModalOpen &&
                    <EditModal
                        closeModal={closeModal}
                        onEdit={saveChanges}
                        onDelete={deleteUser}
                        setUser={setUser}
                        user={user}
                        interestsData={interestsData}
                    />
                }
            </div >
            }
        </div >
    );
}

export default UserHome;
