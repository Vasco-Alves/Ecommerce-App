
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RegisterPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const [interestsData, setInterestsData] = useState([]);
    const [password2, setPassword2] = useState('');

    const [formData, setFormData] = useState({
        type: 'user',
        username: '',
        email: '',
        password: '',
        age: undefined,
        gender: '',
        city: '',
        interests: [],
        enableOffers: true,
    });

    const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }

    const handleContinue = () => {
        if (!formData.username || !formData.email || !formData.password || !password2) {
            alert("Please fill all inputs.");
            return;
        }

        if (formData.password !== password2) {
            alert("Passwords don't correspond!");
            return;
        }

        setStep(2);
    }

    const handleCheckboxChange = (name, value) => {
        if (name === 'interests') {
            const updatedInterests =
                formData.interests.includes(value) ?
                    formData.interests.filter((interest) => interest !== value) :
                    [...formData.interests, value];

            setFormData({ ...formData, [name]: updatedInterests });
        } else
            setFormData({ ...formData, [name]: value });
    }

    const handleRegister = async () => {
        if (!formData.city || !formData.age) {
            alert("Please fill all inputs.");
            return;
        }

        try {
            // Petición POST al backend
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                alert('Datos incorrectamente introducidos.');
                throw new Error('Datos incorrectamente introducidos.');
            }

            const data = await response.json();

            localStorage.setItem('token', data.token);
            router.push(`/user/${data.user}`);

        } catch (error) {
            console.error('Error al registrarse', error);
            setStep(1);
        }
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
        <div className="absolute min-h-screen min-w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-blue-300">
            <div className="text-5xl font-bold mb-9 text-white">Register</div>
            <div className="bg-white bg-opacity-20 p-10 rounded-lg w-96 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
                {step === 1 && (<div className="flex flex-col gap-6">
                    {/* Step 1: Basic information */}
                    <div>
                        <h2 className="text-lg font-semibold">Username</h2>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="block w-full mt-2 p-3 border rounded"
                            placeholder="Guest123"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Email</h2>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full mt-2 p-3 border rounded"
                            placeholder="email@example.com"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Password</h2>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="block w-full mt-2 p-3 border rounded"
                            placeholder="••••••••••••"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Retype password</h2>
                        <input
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            className="block w-full mt-2 p-3 border rounded"
                            placeholder="••••••••••••"
                        />
                    </div>
                    <button
                        onClick={handleContinue}
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-sky-700">
                        Continue
                    </button>
                </div>)}

                {step === 2 && (<div className="flex flex-col gap-10">
                    {/* Step 2: Additional information */}
                    <div>
                        <h2 className="text-lg font-semibold">City</h2>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="block w-full mt-2 p-3 border rounded"
                            placeholder="Madrid..."
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-center">
                            <h2 className="text-lg font-semibold">Age</h2>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="block w-24 mt-2 p-3 border rounded"
                                placeholder="18-99"
                            />
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <h2 className="text-lg font-semibold">Enable Offers</h2>
                            <input
                                name="enableOffers"
                                className="w-4 h-4 rounded"
                                type="checkbox"
                                checked={formData.enableOffers}
                                onChange={(e) => handleCheckboxChange(e.target.name, e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4">
                        <h2 className="text-lg font-semibold">Interests</h2>
                        <div className="grid grid-cols-2 mx-auto gap-x-10">
                            {interestsData.map((interest) => (
                                <div key={interest} >
                                    <input
                                        type="checkbox"
                                        id={interest}
                                        name={interest}
                                        checked={formData.interests.includes(interest)}
                                        onChange={() => handleCheckboxChange('interests', interest)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={interest} className="text-sm">{interest}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleRegister}
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-sky-700">
                        Sign In
                    </button>
                </div>)}
            </div>
        </div>
    );

    // return (
    //     <div className="absolute min-h-screen min-w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-blue-300">
    //         <div className="text-5xl font-bold mb-9  text-white">Sign In</div>
    //         <div className="flex flex-col bg-white bg-opacity-20 p-10 rounded-lg w-96 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
    //             <div>
    //                 <h2 className="text-lg font-semibold">Username</h2>
    //                 <input
    //                     type="text"
    //                     name="username"
    //                     value={formData.username}
    //                     onChange={handleInputChange}
    //                     className="block w-full mt-2 p-3 border rounded"
    //                     placeholder="Guest123"
    //                 />
    //             </div>
    //             <div>
    //                 <h2 className="text-lg font-semibold">Email</h2>
    //                 <input
    //                     type="email"
    //                     name="email"
    //                     value={formData.email}
    //                     onChange={handleInputChange}
    //                     className="block w-full mt-2 p-3 border rounded"
    //                     placeholder="email@example.com"
    //                 />
    //             </div>
    //             <div>
    //                 <h2 className="text-lg font-semibold">Password</h2>
    //                 <input
    //                     type="password"
    //                     name="password"
    //                     value={formData.password}
    //                     onChange={handleInputChange}
    //                     className="block w-full mt-2 p-3 border rounded"
    //                     placeholder="••••••••••••"
    //                 />
    //             </div>
    //             <div>
    //                 <h2 className="text-lg font-semibold">Retype password</h2>
    //                 <input
    //                     type="password"
    //                     value={password2}
    //                     onChange={(e) => setPassword2(e.target.value)}
    //                     className="block w-full mt-2 p-3 border rounded"
    //                     placeholder="••••••••••••"
    //                 />
    //             </div>
    //             <div>
    //                 <h2 className="text-lg font-semibold">City</h2>
    //                 <input
    //                     type="text"
    //                     name="city"
    //                     value={formData.city}
    //                     onChange={handleInputChange}
    //                     className="block w-full mt-2 p-3 border rounded"
    //                     placeholder="Madrid..."
    //                 />
    //             </div>
    //             <div className="mb-6 flex flex-row justify-evenly gap-7">
    //                 <div className="gap-3">
    //                     <h2 className="text-lg font-semibold">Age</h2>
    //                     <input
    //                         type="number"
    //                         name="age"
    //                         value={formData.age}
    //                         onChange={handleInputChange}
    //                         className="block w-24 mt-2 p-3 border rounded"
    //                         placeholder="18-99"
    //                     />
    //                 </div>
    //                 <div className="flex flex-row items-center mt-6 gap-4">
    //                     <h2 className="text-lg font-semibold">Enable Offers</h2>
    //                     <input
    //                         name="enableOffers"
    //                         className="w-4 h-4 rounded"
    //                         type="checkbox"
    //                         checked={formData.enableOffers}
    //                         onChange={(e) => handleCheckboxChange(e.target.name, e.target.checked)}
    //                     />
    //                 </div>
    //                 <div>
    //                     <h2 className="text-lg font-semibold">Interests</h2>
    //                     <div className="flex flex-wrap gap-4 mt-2">
    //                         {interestsData.map((interest) => (
    //                             <div key={interest} className="flex items-center">
    //                                 <input
    //                                     type="checkbox"
    //                                     id={interest}
    //                                     name={interest}
    //                                     checked={formData.interests.includes(interest)}
    //                                     onChange={() => handleCheckboxChange('interests', interest)}
    //                                     className="mr-2"
    //                                 />
    //                                 <label htmlFor={interest} className="text-sm">{interest}</label>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //             </div>
    //             <button
    //                 onClick={handleRegister}
    //                 className="w-full bg-blue-500 text-white p-3 rounded hover:bg-sky-700">
    //                 Sign In
    //             </button>
    //         </div>
    //     </div >
    // );
}

export default RegisterPage;