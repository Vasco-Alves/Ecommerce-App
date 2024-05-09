
import React, { useState } from 'react';

const Commerce = ({ id, name, cif, city, email, phone, coverImg, isModalOpen, deleteCommerce }) => {
    const [isDeleteHovered, setIsHovered] = useState(false);

    return (
        <div className="h-auto rounded-lg inline-flex bg-red-600">
            {/* Image */}
            <div
                className="w-4/5 bg-black bg-cover bg-center rounded-l-lg shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px]"
                style={{ backgroundImage: `url(${coverImg})` }}>
            </div>

            {/* Info */}
            <div className="h-auto flex flex-col justify-between bg-white w-full p-7 rounded-r-lg
            shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px]">
                <div className="flex flex-col gap-3 md:flex-row justify-between mb-7 items-center">
                    <h1 className="font-bold text-3xl">{name}</h1>
                    <p className="text-xs text-gray-400">id: {id}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-auto">
                    <h2><span className="font-bold">CIF: </span>{cif}</h2>
                    <h2><span className="font-bold">Phone: </span>{phone}</h2>
                    <h2><span className="font-bold">Email: </span>{email}</h2>
                    <h2><span className="font-bold">City: </span>{city}</h2>
                </div>
            </div>
            <div
                className={`${isDeleteHovered ? 'w-28' : 'w-5'} flex justify-center place-items-center transition-all duration-300`}
                onMouseEnter={() => { if (!isModalOpen) setIsHovered(true) }}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* TODO when modal is open make cursor a pointer even while hovering */}
                <img
                    src="/trashcan.png"
                    className={`w-8 h-8 transition-opacity duration-300 ${isDeleteHovered ? 'opacity-100 hover:cursor-pointer' : 'opacity-0'}`}
                    onClick={() => { if (!isModalOpen) deleteCommerce(cif) }}
                />
                {/* <button className={`w-5 h-5 bg-white rounded-full transition-opacity duration-300 ${isDeleteHovered ? 'opacity-100' : 'opacity-0'}`} onClick={() => { if (!isModalOpen) alert(123) }} /> */}
            </div>
        </div>
    );
}

export default Commerce;
