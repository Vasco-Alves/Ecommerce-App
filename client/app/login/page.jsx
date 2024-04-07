
import React from 'react'
import Link from 'next/link'

const LoginPage = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 to-slate-800">
            <div className="bg-white w-96 h-full p-10 rounded flex flex-col gap-5 justify-between shadow-2xl bg-opacity-60">
                <Link className="bg-blue-500 text-white p-4 rounded hover:bg-sky-700 text-center"
                    href={'/login/userlogin'}>
                    I'm a user
                </Link>
                <Link className="bg-blue-500 text-white p-4 rounded hover:bg-sky-700 text-center"
                    href={'/login/businesslogin'}>
                    I'm a business
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;