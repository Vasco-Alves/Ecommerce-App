
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const CommercePage = () => {
    const searchParams = useSearchParams();
    const commerceId = searchParams.get('id');

    const [commerce, setCommerce] = useState('');
    const [loading, setLoading] = useState(true);

    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    const totalVotes = upvotes + downvotes;
    const score = totalVotes === 0 ? 0 : (upvotes / totalVotes) * 5;

    const saveChanges = () => {
        commerce.upvotes = upvotes;
        commerce.downvotes = downvotes;
        commerce.score = parseFloat(score.toFixed(1));

        // Petición PUT para actualizar los datos del comercio
        fetch('/api/commerces', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commerce)
        }).then(res => { return res.json() }).then(data => console.log(data))
            .catch(error => console.error('Error updating commerce data:', error));
    }

    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
        saveChanges();
    }

    const handleDownvote = () => {
        setDownvotes(downvotes + 1);
        saveChanges();
    }

    const addReview = () => {
        const newReview = prompt('Enter your review:');
        if (newReview) {
            const updatedReviews = [...commerce.reviews, newReview];
            setCommerce((prevCommerce) => {
                return { ...prevCommerce, reviews: updatedReviews };
            });
        }
    }

    useEffect(() => {
        // Petición GET para obtener información del comercio
        const fetchData = async () => {
            try {
                const response = await fetch('/api/commerces');
                const data = await response.json();

                setCommerce(data.commerces.find(c => c.id === commerceId));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        }

        fetchData();
    }, [commerceId]);

    useEffect(() => {
        if (commerce) {
            setUpvotes(commerce.upvotes);
            setDownvotes(commerce.downvotes);
        }
    }, [commerce]);

    // Use useEffect to call saveChanges when commerce is updated
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