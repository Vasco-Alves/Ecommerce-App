
'use client';

import { useState, useEffect } from 'react';

import Commerce from './components/Commerce';
import AddCommerceModal from './components/AddCommerceModal.js';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const router = useRouter();

    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    const [commerceList, setCommerceList] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openModal = () => { setModalOpen(true) };
    const closeModal = () => { setModalOpen(false) };

    const addCommerce = (newCommerce) => {
        setCommerceList([...commerceList, newCommerce]);

        // Petición POST para guardar comercios
        fetch('/api/commerces', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCommerce)
        }).then(res => res.json()).then(data => console.log(data));
    };

    const deleteCommerce = (id) => {
        setCommerceList(commerceList.filter(c => c.id !== id));

        // Petición DELETE para eliminar comercio
        fetch('/api/commerces', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        }).then(res => res.json()).then(data => console.log(data));
    }

    // Petición GET
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/commerces');
                const data = await response.json();

                setCommerceList(data.commerces);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="min-h-screen min-w-full flex flex-col items-center bg-gradient-to-r from-teal-400 to-teal-700 pb-7">

            {/* Navbar */}
            <nav className="fixed top-0 bg-slate-50 h-16 flex flex-row justify-between items-center min-w-full 
                px-5 w-1/2 shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px]">
                <h1 className="text-center sm:text-xl md:text-2xl font-bold">Admin Dashboard</h1>
                <div className="flex flex-row items-center gap-3">
                    <span className="font-bold text-lg">Search:</span>
                    <input
                        type="text"
                        className="p-2 bg-slate-50 border-b-gray-300 border-b-2 focus:outline-none focus:border-b-gray-500"
                        placeholder="Name..."
                        onChange={(e) => setNameFilter(e.target.value.toLowerCase())}
                    />
                    <input
                        type="text"
                        className="p-2 bg-slate-50 border-b-gray-300 border-b-2 focus:outline-none focus:border-b-gray-500"
                        placeholder="City..."
                        onChange={(e) => setCityFilter(e.target.value.toLowerCase())}
                    />
                </div>
                <div className='flex flex-row items-center gap-3'>
                    <button
                        onClick={openModal}
                        className="bg-teal-700 hover:bg-teal-500 text-white md:text-xl p-2.5 rounded">
                        Add
                    </button>
                    <button
                        onClick={() => router.replace('/')}
                        className="bg-teal-700 hover:bg-teal-500 text-white md:text-xl p-2.5 rounded">
                        Log Out
                    </button>
                </div>

                {isModalOpen && (<AddCommerceModal onClose={closeModal} onAddCommerce={addCommerce} />)}
            </nav>

            {!loading && <div className="mt-24 w-11/12 p-5 rounded bg-opacity-80 bg-slate-50 shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px]">
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
                    {commerceList.filter((c) =>
                        c.name.toLowerCase().includes(nameFilter) &&
                        c.city.toLowerCase().includes(cityFilter))
                        .map((c) => (
                            <Commerce key={c.id}
                                id={c.id}
                                name={c.name}
                                cif={c.cif}
                                city={c.city}
                                email={c.email}
                                phone={c.phone}
                                coverImg={c.cover}
                                isModalOpen={isModalOpen}
                                deleteCommerce={deleteCommerce}
                            />
                        ))}
                </div>
            </div>
            }
        </div>
    );
}

export default AdminPage;
