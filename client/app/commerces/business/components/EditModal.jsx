
'use client';

import React from 'react';
import { useEffect, useState } from 'react';

const EditModal = ({ onClose, onEdit, setCommerce, commerce }) => {

    const [interestsData, setInterestsData] = useState([]);

    const handleChange = (e) => {
        setCommerce({ ...commerce, [e.target.name]: e.target.value });
    }

    const saveChanges = () => {
        onEdit(commerce);
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
                        <p className="font-bold">Name: </p>
                        <input
                            type="text"
                            name="name"
                            value={commerce.name}
                            onChange={handleChange}
                            placeholder="Name..."
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">Activity: </p>
                        <select
                            name="activity"
                            value={commerce.activity}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded">
                            <option value="">Select an activity...</option>
                            {interestsData.map((interest, index) => (
                                <option key={index} value={interest}>{interest}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">CIF: </p>
                        <input
                            type="text"
                            name="cif"
                            value={commerce.cif}
                            onChange={handleChange}
                            placeholder="CIF..."
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">City: </p>
                        <input
                            type="text"
                            name="city"
                            value={commerce.city}
                            onChange={handleChange}
                            placeholder="City..."
                            className="p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className="font-bold">Description: </p>
                        <textarea
                            name="description"
                            value={commerce.description}
                            onChange={handleChange}
                            placeholder="Description..."
                            className="p-2 border border-gray-300 rounded w-full h-60 resize-none" />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">Cover Image: </p>
                        <input
                            type="text"
                            name="cover"
                            value={commerce.cover}
                            onChange={handleChange}
                            placeholder="Cover Image..."
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 justify-end">
                    {/* <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border-2 font-bold border-black hover:bg-black hover:text-white">
                        Cancel
                    </button> */}
                    <button
                        onClick={saveChanges}
                        className="px-4 py-2 rounded-lg border-2 font-bold border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
