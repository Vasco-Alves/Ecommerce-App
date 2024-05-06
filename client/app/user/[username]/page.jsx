
'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditModal from '../components/EditModal';

const UserHome = ({ params }) => {
    const username = params.username;
    const router = useRouter();

    const [cityFilter, setFilter] = useState('');
    const [activityFilter, setActivityFilter] = useState('');

    const [commerceList, setCommerceList] = useState([]);
    const [user, setUser] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openModal = () => { setModalOpen(true) };
    const closeModal = () => { setModalOpen(false) };

    const saveChanges = (updatedUser) => {
        // TODO 

        // setUser(updatedUser);

        // // Petición PUT para actualizar datos del usuario
        // fetch('/api/users', {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedUser)
        // }).then(res => res.json()).then(data => console.log(data));
    }

    const deleteUser = () => {
        // TODO 

        // // Petición DELETE para eliminar usuario
        // fetch('/api/users', {
        //     method: 'DELETE',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username })
        // }).then(res => res.json()).then(router.replace('/'));
    }

    useEffect(() => {
        // Petición GET de comercios
        const fetchCommerces = async () => {
            try {
                // const response = await fetch('/api/commerces');
                const response = await fetch('http://localhost:3000/api/comercio');
                const data = await response.json();

                setCommerceList(data);
            } catch (error) {
                console.error('Error fetching commerce data:', error);
            }
        }

        // Petición GET de información del usuario
        const fetchUserData = async () => {
            try {
                const user = await fetch(`http://localhost:3000/api/users/${username}`);
                const data = await user.json();

                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        const token = localStorage.getItem('token');
        if (!token || token === undefined) {
            alert('Token not found');
            router.replace('/');
        }

        fetchCommerces();
        fetchUserData();
    }, []);


    return (
        <div className="absolute min-h-screen min-w-full bg-gradient-to-br from-gray-800 to-cyan-700">
            {/* Navbar */}
            <nav className="flex items-center fixed top-0 h-16 w-full px-5 justify-between bg-slate-50 shadow-xl">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">Search:</span>
                    <input
                        type="text"
                        className="p-2 w-28 placeholder:text-sm md:w-auto sm:placeholder:text-lg bg-slate-50 border-b-gray-300 border-b-2 focus:outline-none focus:border-b-gray-500"
                        placeholder="City..."
                        onChange={(e) => setFilter(e.target.value.toLowerCase())}
                    />
                    <input
                        type="text"
                        className="p-2 w-28 placeholder:text-sm md:w-auto sm:placeholder:text-lg bg-slate-50 border-b-gray-300 border-b-2 focus:outline-none focus:border-b-gray-500"
                        placeholder="Activity..."
                        onChange={(e) => setActivityFilter(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={openModal}
                        className="text-lg font-bold">{username.toUpperCase()}</button>
                    <button
                        onClick={() => { router.replace('/'); localStorage.removeItem('token') }}
                        className="bg-cyan-700 hover:bg-cyan-500 text-white md:text-xl p-2.5 rounded">
                        Log Out
                    </button>
                </div>
            </nav>

            {!loading && <div className="flex justify-center mt-20 px-3" >
                <div className="h-[calc(100vh-95px)] overflow-y-scroll w-full p-4 bg-slate-100 bg-opacity-80 rounded shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px]">
                    <ul className="grid grid-cols-1 2xl:grid-cols-2 gap-10">
                        {commerceList.filter((c) =>
                            c.city.toLowerCase().includes(cityFilter) &&
                            c.activity.toLowerCase().includes(activityFilter)
                        ).map((c, index) => (
                            <li key={index} className="flex flex-col lg:flex-row gap-2">
                                {/* Image */}
                                <Link href={{ pathname: '/commerces/registereduser', query: { id: c.id, user: username } }}
                                    className="h-64 xl:h-full w-full bg-black bg-cover bg-center rounded shadow-[rgba(0,_0,_0,_0.5)_0px_0px_15px] hover:opacity-50"
                                    style={{ backgroundImage: `url(/${c.cover})` }}>
                                </Link>

                                {/* Info */}
                                <div className="lg:w-96 p-4 lg:py-20 bg-white rounded shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px]">
                                    <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center justify-between gap-4 w-full h-full">
                                        <h1 className="font-bold text-center text-3xl xl:text-4xl">{c.name}</h1>
                                        <div className="flex gap-6">
                                            <h3><span className="font-bold">Activity: </span>{c.activity}</h3>
                                            <h3><span className="font-bold">Score: </span>{c.score}</h3>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {isModalOpen &&
                    <EditModal
                        onClose={closeModal}
                        onEdit={saveChanges}
                        onDelete={deleteUser}
                        setUser={setUser}
                        user={user} />
                }
            </div >
            }
        </div >
    );
}

export default UserHome;

// 'use client';

// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const UserHomePage = ({ params }) => {
//     const username = params.username;

//     const router = useRouter();

//     const [cityFilter, setFilter] = useState('');
//     const [activityFilter, setActivityFilter] = useState('');

//     const [commerceList, setCommerceList] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('/api/commerces');
//                 const data = await response.json();

//                 setCommerceList(data.commerces);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching commerce data:', error);
//             }
//         }

//         fetchData();
//     }, []);

//     return (
//         <div className="absolute min-h-screen min-w-full bg-gradient-to-br from-gray-800 to-cyan-700">
//             {/* Navbar */}
//             <nav className="flex items-center fixed top-0 h-16 w-full px-5 justify-between bg-slate-50 shadow-xl">
//                 <div className="flex items-center gap-3">
//                     <span className="font-bold text-lg">Search:</span>
//                     <input
//                         type="text"
//                         className="p-2 w-28 placeholder:text-sm md:w-auto sm:placeholder:text-lg bg-slate-50 border-b-gray-300 border-b-2 focus:outline-none focus:border-b-gray-500"
//                         placeholder="City..."
//                         onChange={(e) => setFilter(e.target.value.toLowerCase())}
//                     />
//                     <input
//                         type="text"
//                         className="p-2 w-28 placeholder:text-sm md:w-auto sm:placeholder:text-lg bg-slate-50 border-b-gray-300 border-b-2 focus:outline-none focus:border-b-gray-500"
//                         placeholder="Activity..."
//                         onChange={(e) => setActivityFilter(e.target.value.toLowerCase())}
//                     />
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <div className="text-lg font-bold">{username.toUpperCase()}</div>
//                     <button
//                         onClick={() => router.replace('/')}
//                         className="bg-cyan-700 hover:bg-cyan-500 text-white md:text-xl p-2.5 rounded">
//                         Log Out
//                     </button>
//                 </div>
//             </nav >

//             {!loading && <div className="flex justify-center mt-20 p-8" >
//                 <div className="h-[calc(100vh-145px)] overflow-y-scroll w-full p-4 bg-slate-100 bg-opacity-80 rounded shadow-[rgba(0,_0,_0,_0.5)_0px_0px_10px]">
//                     <ul className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
//                         {commerceList.filter((c) =>
//                             c.city.toLowerCase().includes(cityFilter) &&
//                             c.activity.toLowerCase().includes(activityFilter)
//                         ).map((c) => (
//                             <li key={c.id} className="flex flex-col xl:flex-row gap-2">
//                                 {/* Image */}
//                                 <Link href={{ pathname: '/commerces/publicuser', query: { id: c.id } }}
//                                     className="h-64 xl:h-full w-full bg-black bg-cover bg-center rounded shadow-[rgba(0,_0,_0,_0.5)_0px_0px_15px] hover:opacity-50"
//                                     style={{ backgroundImage: `url(${c.cover})` }}>
//                                 </Link>

//                                 {/* Info */}
//                                 <div className="flex flex-col sm:flex-row xl:flex-col xl:items-start sm:items-center py-4 px-10 xl:p-8 xl:w-2/3 gap-7 xl:gap-5 bg-white w-full rounded
//                                      shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px]">
//                                     <div className="flex flex-col md:flex-row gap-3">
//                                         <h1 className="font-bold text-3xl xl:text-4xl">{c.name}</h1>
//                                         <div>
//                                             <h3><span className="font-bold">Activity: </span>{c.activity}</h3>
//                                             <h3><span className="font-bold">Score: </span>{c.score}</h3>
//                                         </div>
//                                     </div>
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 xl:grid-cols-1 w-full border-l-2 border-l-gray-700 pl-4">
//                                         <h2 className="text-sm xl:text-lg"><span className="font-bold">CIF: </span>{c.cif}</h2>
//                                         <h2 className="text-sm xl:text-lg"><span className="font-bold">Phone: </span>{c.phone}</h2>
//                                         <h2 className="text-sm xl:text-lg"><span className="font-bold">Email: </span>{c.email}</h2>
//                                         <h2 className="text-sm xl:text-lg"><span className="font-bold">City: </span>{c.city}</h2>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div >
//             }
//         </div>
//     );
// }

// export default UserHomePage;



// // 'use client';

// // import { useSearchParams } from 'next/navigation';
// // import { useRouter } from 'next/router';
// // import React, { useState, useEffect } from 'react';

// // const UserHomePage = () => {
// //     const router = useRouter();
// //     const { username } = router.query;


// //     const [cityFilter, setFilter] = useState('');
// //     const [activityFilter, setActivityFilter] = useState('');

// //     const [commerceList, setCommerceList] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await fetch('/api/commerces');
// //                 const data = await response.json();

// //                 setCommerceList(data.commerces);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error('Error fetching commerce data:', error);
// //             }
// //         }

// //         fetchData();
// //     }, []);

// //     return (
// //         <div className="absolute min-h-screen min-w-full bg-gradient-to-br from-gray-800 to-cyan-700">
// //             {/* Navbar */}
// //             <div className="flex items-center justify-between p-5 h-16 w-full bg-white">
// //                 <h1>User Page for {username}</h1>
// //                 <input type="text" className="h-7 bg-slate-800" />
// //                 <button type="button" onClick={() => console.log(searchParams)}>clickme</button>
// //             </div>
// //         </div>
// //     )
// // }

// // export default UserHomePage;
