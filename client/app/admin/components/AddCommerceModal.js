
import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

const AddCommerceModal = ({ onClose, onAddCommerce }) => {
    const [formData, setFormData] = useState({
        name: '',
        cif: '',
        city: '',
        email: '',
        phone: '',
        cover: '',
        description: '',
        activity: '',
        images: [],
        reviews: [],
        score: 0,
        upvotes: 0,
        downvotes: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddCommerce = () => {
        // const newCommerce = { ...formData, id: uuidv4() };
        onAddCommerce(formData);

        // Reset form data to its initial state
        setFormData({
            name: '',
            cif: '',
            city: '',
            email: '',
            phone: '',
            cover: '',
            description: '',
            activity: '',
            images: [],
            reviews: [],
            score: 0,
            upvotes: 0,
            downvotes: 0
        });

        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex flex-col gap-6 bg-white p-8 rounded shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px]">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-center">Add New Commerce</h2>
                    <div className="mt-7 flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">Name: </p>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name..."
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">CIF: </p>
                        <input
                            type="text"
                            name="cif"
                            value={formData.cif}
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
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City..."
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">Email: </p>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-5">
                        <p className="font-bold">Phone: </p>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="612 123 123"
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    {/* Add more form fields as needed */}
                </div>
                <div className="flex flex-row gap-2 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border-2 font-bold border-black hover:bg-black hover:text-white">
                        Cancel
                    </button>
                    <button
                        onClick={handleAddCommerce}
                        className="px-4 py-2 rounded-lg border-2 font-bold border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCommerceModal;
