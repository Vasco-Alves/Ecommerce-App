
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import EditModal from '../components/EditModal';

const BussinessPage = ({ params }) => {
    const businessCIF = params.cif;
    const router = useRouter();

    const [isLoading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [commerce, setCommerce] = useState([]);
    const [users, setUsers] = useState([]);

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

            const response = await fetch(`http://localhost:3000/api/comercio/${commerce._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(commerce)
            });

            if (!response.ok)
                throw new Error('Error updating commerce.');

            router.replace(`/commerces/business/${commerce.cif}`);

        } catch (error) {
            console.error(error);
        }
    }

    const deleteCommerce = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token)
                return;

            const response = await fetch(`http://localhost:3000/api/comercio/${commerce.cif}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok)
                throw new Error('Error deleting commerce.');

            logout();

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchCommerceData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/comercio/${businessCIF}`);
                const data = await response.json();

                setCommerce(data);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        }

        fetchCommerceData();
    }, [businessCIF]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users');
                const data = await response.json();

                // Only users with enableOffers enabled and interested in commerce activity
                setUsers(data.filter(
                    user =>
                        user.enableOffers === true && user.interests.some(
                            interest =>
                                interest.toLowerCase() === (commerce?.activity || '').toLowerCase()
                        )
                ));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, [commerce]);


    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-0">
            {isLoading ?
                (<h1 className="text-2xl text-black">Loading...</h1>) :
                (<div className="h-auto w-full bg-blue shadow-2xl">
                    {/* Cover Image */}
                    <div className="h-96 w-full bg-black bg-cover bg-center" style={{ backgroundImage: `url(/${commerce.cover})` }} />

                    {/* Info */}
                    <div className="h-2/3 w-full flex flex-col bg-white p-16">
                        <div className="flex flex-col gap-7">
                            <div className="flex flex-row justify-between">
                                <h1 className="font-bold text-5xl">{commerce.name}</h1>
                                <button className="h-10 w-28 border-2 border-teal-700 rounded-lg text-teal-700 font-bold hover:bg-teal-700 hover:text-white"
                                    onClick={openModal}>
                                    Edit
                                </button>
                            </div>
                            <div className="flex flex-col gap-4 mt-5">
                                <p className="text-2xl"><span className="font-bold">Activity: </span>{commerce.activity}</p>
                                <p className="text-2xl"><span className="font-bold">Score: </span>{commerce.score} / 5</p>
                            </div>
                        </div>
                        <div className="mt-20 grid xl:grid-cols-2 gap-10">
                            <div className="border-t-2 border-b-2 border-black py-6">
                                <h2 className="text-xl font-bold">About us:</h2>
                                <div className="px-3 mt-7 w-full text-justify">
                                    {commerce.description}
                                </div>
                            </div>
                            <div className="border-t-2 border-b-2 border-black py-6">
                                <h2 className="text-xl font-bold">Reviews:</h2>
                                <ul className="mt-7 px-3 list-disc">
                                    {commerce.reviews.map(t => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="border-t-2 border-b-2 border-black py-6">
                                <h2 className="text-xl font-bold">Interested users:</h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-7 justify-start gap-2 h-auto px-3 pb-4">
                                    {users.map(user =>
                                        <li key={user.username}
                                            className="min-w-[200px] flex flex-col gap-6 rounded justify-between items-center py-4 border-2 border-black">
                                            <div className="flex flex-col items-center">
                                                <p className="font-bold">Username:</p>
                                                <p>{user.username}</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <p className="font-bold">Email:</p>
                                                <p>{user.email}</p>
                                            </div>
                                        </li>)}
                                </ul>
                            </div>
                        </div>

                        <button className="self-start mt-14 h-10 w-28 border-2 border-red-500 rounded-lg text-red-500 font-bold hover:bg-red-500 hover:text-white"
                            onClick={() => deleteCommerce(commerce.id)}>
                            Delete
                        </button>
                    </div>
                    {isModalOpen &&
                        <EditModal
                            onClose={closeModal}
                            onEdit={saveChanges}
                            setCommerce={setCommerce}
                            commerce={commerce} />
                    }
                </div>
                )}
        </div>
    );
}

export default BussinessPage;
