
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const CommercePage = () => {
    const searchParams = useSearchParams();
    const businessCIF = searchParams.get('cif');

    const [commerce, setCommerce] = useState('');
    const [loading, setLoading] = useState(true);

    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    const totalVotes = commerce.upvotes + commerce.downvotes;
    const score = totalVotes === 0 ? 0 : ((commerce.upvotes / totalVotes) * 5);

    const saveChanges = async () => {
        try {
            commerce.score = parseFloat(score.toFixed(2));
            const token = localStorage.getItem('token');
            if (!token)
                return;

            const response = await fetch(`http://localhost:3000/api/auth/commerce/${commerce._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(commerce)
            });

            if (!response.ok)
                throw new Error('Error updating commerce.');

        } catch (error) {
            console.error(error);
        }
    }

    const handleUpvote = () => {
        const updatedCommerce = { ...commerce, upvotes: commerce.upvotes + 1 };
        setCommerce(updatedCommerce);
    }

    const handleDownvote = () => {
        const updatedCommerce = { ...commerce, downvotes: commerce.downvotes + 1 };
        setCommerce(updatedCommerce);
    }


    const addReview = () => {
        const newReview = prompt('Enter your review:');
        if (!newReview)
            return;

        const updatedReviews = [...commerce.reviews, newReview];
        const updatedCommerce = { ...commerce, reviews: updatedReviews };
        setCommerce(updatedCommerce);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/comercio/${businessCIF}`);
                const data = await response.json();

                setCommerce(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        }

        fetchData();
    }, [businessCIF]);


    useEffect(() => { if (commerce) saveChanges(); }, [commerce]);

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
                        <div className="flex flex-col gap-7">
                            <div className="flex flex-row justify-between">
                                <h1 className="font-bold text-5xl">{commerce.name}</h1>
                                <div className="flex flex-row gap-3">
                                    <button onClick={handleUpvote}
                                        className="px-4 py-2 rounded-lg border-2 font-bold border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white">
                                        Like
                                    </button>
                                    <button onClick={handleDownvote}
                                        className="px-4 py-2 rounded-lg border-2 font-bold border-red-700 text-red-700 hover:bg-red-700 hover:text-white">
                                        Dislike
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 mt-5">
                                <p className="text-2xl"><span className="font-bold">Activity: </span>{commerce.activity}</p>
                                <p className="text-2xl"><span className="font-bold">Score: </span>{score.toFixed(1)} / 5</p>
                            </div>
                            <div className=" mt-2 grid grid-cols-1 w-full gap-2 border-l-2 border-l-gray-700 pl-4">
                                {/* <h2 className="text-lg"><span className="font-bold">CIF: </span>{commerce.cif}</h2> */}
                                <h2 className="text-lg"><span className="font-bold">Phone: </span>{commerce.phone}</h2>
                                <h2 className="text-lg"><span className="font-bold">Email: </span>{commerce.email}</h2>
                                <h2 className="text-lg"><span className="font-bold">City: </span>{commerce.city}</h2>
                            </div>
                        </div>
                        <div className="mt-14 grid xl:grid-cols-2 gap-10">
                            <div className="border-t-2 border-b-2 border-black py-6">
                                <h2 className="text-xl font-bold">About us:</h2>
                                <div className="px-3 mt-7 w-full text-justify">
                                    {commerce.description}
                                </div>
                            </div>
                            <div className="border-t-2 border-b-2 border-black py-6">
                                <h2 className="text-xl font-bold">Reviews:</h2>
                                <ul className="mt-7 px-3 list-disc">
                                    {commerce.reviews.map(r => (<li key={r}>{r}</li>))}
                                </ul>
                                <button type="button"
                                    className="mt-10 px-4 py-2 rounded-lg border-2 font-bold border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white"
                                    onClick={addReview}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
}

export default CommercePage;