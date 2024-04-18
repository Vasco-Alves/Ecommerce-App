
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const CommercePage = () => {
    const searchParams = useSearchParams();

    const businessId = searchParams.get('id');
    const [commerce, setCommerce] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/commerces');
                const data = await response.json();

                setCommerce(data.commerces.find(c => c.id === businessId));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        }

        fetchData();
    }, [businessId]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-0 bg-center bg-cover"
            style={{ backgroundImage: `url(/${commerce.cover})` }}>
            {loading ?
                (<h1 className="text-2xl">Loading...</h1>) :
                (<div className="h-auto w-full bg-blue shadow-2xl">
                    {/* Cover Image */}
                    <div className="h-96 w-full bg-black bg-cover bg-center" style={{ backgroundImage: `url(/${commerce.cover})` }} />

                    {/* Info */}
                    <div className="h-2/3 w-full flex flex-col bg-white p-16">
                        <div className="flex flex-col gap-4">
                            <h1 className="font-bold text-5xl mb-7">{commerce.name}</h1>
                            <p className="text-2xl"><span className="font-bold">Activity: </span>{commerce.activity}</p>
                            <p className="text-2xl"><span className="font-bold">Score: </span>{commerce.score} / 5</p>
                        </div>

                        <div className=" mt-10 grid grid-cols-1 w-full gap-2 border-l-2 border-l-gray-700 pl-4">
                            <h2 className="text-lg"><span className="font-bold">CIF: </span>{commerce.cif}</h2>
                            <h2 className="text-lg"><span className="font-bold">Phone: </span>{commerce.phone}</h2>
                            <h2 className="text-lg"><span className="font-bold">Email: </span>{commerce.email}</h2>
                            <h2 className="text-lg"><span className="font-bold">City: </span>{commerce.city}</h2>
                        </div>

                        <div className="mt-16 grid xl:grid-cols-2 gap-10">
                            <div className="border-t-2 border-b-2 border-black py-6">
                                <h2 className="text-xl font-bold">About us:</h2>
                                <div className="px-3 mt-7 w-full text-justify">
                                    {commerce.description}
                                </div>
                            </div>
                            <div className="border-t-2 border-b-2 border-black py-6">
                                <h2 className="text-xl font-bold">Reviews:</h2>
                                <ul className="mt-7 px-3 list-disc">
                                    {commerce.reviews.map((text, index) => (
                                        <li key={index}>{text}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
}

export default CommercePage;