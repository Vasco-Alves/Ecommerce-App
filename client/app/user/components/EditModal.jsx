
'use client';

import React, { useState, useEffect } from 'react';

const EditModal = ({ onClose, onEdit, onDelete, setUser, user }) => {

    const [interestsData, setInterestsData] = useState([]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleCheckboxChange = (interest) => {
        const updatedInterests = user.interests.includes(interest)
            ? user.interests.filter(item => item !== interest)
            : [...user.interests, interest];

        setUser({ ...user, interests: updatedInterests });
    }

    const handleOffersChange = () => {
        setUser({ ...user, enableOffers: !user.enableOffers });
    }

    const saveChanges = () => {
        onEdit(user);
        onClose();
    }

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await fetch('/api/interests');
                const data = await response.json();

                setInterestsData(data.interests);
            } catch (error) {
                console.error('Error fetching interests data:', error);
            }
        }

        fetchInterests();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex flex-col gap-6 w-1/2 bg-white p-8 rounded shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px]">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-center">Edit Info</h2>
                    <div className="mt-7 flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">City: </p>
                        <input
                            type="text"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                            placeholder="City..."
                            className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">Gender: </p>
                        <select
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-row items-center gap-5">
                        <p className="font-bold">Offers: </p>
                        <input
                            name="enableOffers"
                            className="w-4 h-4 rounded"
                            type="checkbox"
                            checked={user.enableOffers}
                            onChange={handleOffersChange}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between gap-5">
                        <p className="font-bold self-start">Interests: </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto gap-x-12 xl:gap-x-20">
                            {interestsData.map((interest) => (
                                <div key={interest} >
                                    <input
                                        type="checkbox"
                                        id={interest}
                                        name={interest}
                                        checked={user.interests.includes(interest)}
                                        onChange={() => handleCheckboxChange(interest)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={interest} className="text-sm">{interest}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 justify-between">
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 rounded-lg border-2 font-bold border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            Delete
                        </button>
                        <button
                            onClick={saveChanges}
                            className="px-4 py-2 rounded-lg border-2 font-bold border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;