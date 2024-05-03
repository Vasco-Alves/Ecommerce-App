
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'

const UserLoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const Push = (data) => {
  //   if (data.status !== 200) {
  //     alert('Email or password incorrect.');
  //     return;
  //   }

  //   const username = data.user.username;

  //   // Conforme el tipo de utilizador, envía a una página web distinta
  //   switch (data.user.type) {
  //     case 'admin':
  //       router.push('/admin');
  //       break;

  //     case 'user':
  //       router.push(`/user/${username}`);
  //       break;

  //     default:
  //       break;
  //   }
  // }

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill all inputs.');
      return;
    }

    const user = { email: email, password: password }

    try {
      // Petición POST al backend
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(user)
      });

      const data = response.json();

      localStorage.setItem('token', data.token);

      // Redirecciona a la pagina principal
      switch (data.type) {
        case 'admin':
          router.push('/admin');
          break;

        case 'user':
          router.push(`/user/${data.username}`);
          break;

        default:
          break;
      }

    } catch (error) {
      console.error("Datos incorrectos");
    }

    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(user)
    // }).then(res => res.json()).then(data => Push(data));
  }

  return (
    <div className="absolute min-h-screen min-w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-slate-800">
      <div className="text-5xl font-bold mb-9  text-white">Log In</div>
      <div className="bg-white bg-opacity-60 p-10 rounded-lg w-96 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <div className="mb-6">
          <label className="text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mt-2 p-3 border rounded"
            placeholder="email@example.com"
          />
        </div>
        <div className="mb-6">
          <label className="text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mt-2 p-3 border rounded"
            placeholder="••••••••••••"
          />
        </div>
        <div className="flex flex-row gap-3">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-opacity-50 hover:bg-stone-800 hover:bg-opacity-50 bg-stone-600 text-white p-3 rounded">
            Cancel
          </button>
          <button type="button"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLoginPage;
