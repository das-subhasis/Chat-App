import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';

const Login = () => {

    const { login } = useAuthContext();

    const [user, setUser] = useState({ username: '', password: '' })

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const { username, password } = user;
        login(username, password);
        setUser({ username: '', password: '' });
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        
    }
    return (
        <div className='flex-1 flex justify-center items-center'>
            <div className='container bg-white mx-auto w-[500px] h-[300px] ring-2 ring-indigo-400 rounded-xl flex flex-col px-10 py-5 gap-10'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-2xl font-medium'>Login</h1>
                </div>
                <div className='w-full'>
                    <form
                        className='flex flex-col justify-center items-center gap-5'
                        onSubmit={handleLogin}
                    >
                        <input
                            type="text"
                            placeholder='Username'
                            name='username'
                            value={user.username}
                            className='placeholder:text-black w-4/5 p-2 outline-none ring-2 ring-black rounded-sm focus-within:ring-indigo-700 placeholder:transition-colors duration-300 ease-in-out '
                            onChange={changeHandler}
                            required
                            autoComplete='off'
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={user.password}
                            className='placeholder:text-black w-4/5 p-2 outline-none ring-2 ring-black rounded-sm focus-within:ring-indigo-700 placeholder:transition-colors duration-300 ease-in-out '
                            onChange={changeHandler}
                            required
                        />
                        <div className='mt-4'>
                            <button
                                className='bg-black px-5 py-2 rounded-md text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black'
                            >Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login