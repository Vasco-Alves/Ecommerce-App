
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import EditModal from '../components/EditModal';

const BussinessPage = ({ params }) => {
    const commerceId = params.businessId;

    const router = useRouter();

    const [isLoading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);

    const [commerce, setCommerce] = useState([]);
    const [users, setUsers] = useState([]);

    const openModal = () => { setModalOpen(true) };
    const closeModal = () => { setModalOpen(false) };

    const saveChanges = (updatedCommerce) => {
        setCommerce(updatedCommerce);

        // Petición PUT para actualizar los datos del comercio
        fetch('/api/commerces', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCommerce)
        }).then(res => res.json()).then(data => console.log(data));
    }

    const deleteCommerce = (id) => {
        // Petición DELETE para eliminar comercio
        fetch('/api/commerces', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        }).then(res => res.json()).then(router.replace('/'));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commerceResponse = await fetch('/api/commerces');
                const commerceData = await commerceResponse.json();
                const currentCommerce = commerceData.commerces.find(c => c.id === commerceId);

                setCommerce(currentCommerce);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        };
        fetchData();
    }, [commerceId]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const usersResponse = await fetch('/api/users');
                const userData = await usersResponse.json();

                setUsers(
                    userData.users.filter(
                        user =>
                            user.enableOffers === true &&
                            user.interests.some(
                                interest =>
                                    interest.toLowerCase() === (commerce?.activity || '').toLowerCase()
                            )
                    )
                );
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
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
