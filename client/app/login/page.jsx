
import React from 'react'
import Link from 'next/link'

const LoginPage = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 to-slate-800">
            <div className="bg-white w-96 h-96 p-10 rounded flex flex-col gap-5 justify-between shadow-2xl bg-opacity-60">
                <Link className="flex items-center justify-center bg-blue-500 h-1/2 text-white p-4 rounded hover:bg-sky-700 text-center text-3xl"
                    href={'/login/userlogin'}>
                    I'm a user
                </Link>
                <Link className="flex items-center justify-center bg-blue-500 h-1/2 text-white p-4 rounded hover:bg-sky-700 text-center text-3xl"
                    href={'/login/businesslogin'}>
                    I'm a business
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;