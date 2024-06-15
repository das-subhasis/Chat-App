import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAuthContext } from '../../context/AuthContext';

const Signup = () => {

    const { signup } = useAuthContext();

    const [user, setUser] = useState({ username: '', email:'', password: '', pic: '' })

    const handleSignup = (e: FormEvent) => {
        e.preventDefault();
        const { username, email, password, pic } = user;
        signup(username, password, email, pic);
        setUser({ username: '', email:'', password: '', pic: '' });
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    console.log(user.pic);
    return (
        <div className='flex-1 flex justify-center items-center'>
            <div className='container mx-auto w-[500px] h-[500px] ring-2 ring-black rounded-xl flex flex-col px-10 py-5'>
                <div className='flex items-center justify-center mt-11'>
                    <h1 className='text-2xl font-medium'>Come on Let's Talk</h1>
                </div>
                <div className='w-full h-fit flex-1 flex items-center'>
                    <form
                        className='flex flex-col justify-center items-center gap-5 w-full'
                        onSubmit={handleSignup}
                    >
                        <input
                            type="text"
                            placeholder='Username'
                            name='username'
                            value={user.username}
                            className='placeholder:text-black w-4/5 p-2 outline-none ring-2 ring-black rounded-sm focus-within:ring-indigo-700 placeholder:transition-colors duration-300 ease-in-out '
                            onChange={changeHandler}
                            required
                        />
                        <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            value={user.email}
                            className='placeholder:text-black w-4/5 p-2 outline-none ring-2 ring-black rounded-sm focus-within:ring-indigo-700 placeholder:transition-colors duration-300 ease-in-out '
                            onChange={changeHandler}
                            required
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
                        <input
                            type="file"
                            name='pic'
                            value={user.pic}
                            className='placeholder:text-black w-4/5 p-2 outline-none ring-2 ring-black rounded-sm focus-within:ring-indigo-700 placeholder:transition-colors duration-300 ease-in-out '
                            accept='image/jpg, image/jpg'
                            onChange={changeHandler}
                        />
                        <div className='mt-4'>
                            <button
                                className='bg-black px-5 py-2 rounded-md text-white'
                            >Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup