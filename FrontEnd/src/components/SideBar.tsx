import { Drawer } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import client from '../config/client';
import profile_pic from "../assets/profile_pic.jpg"
import { User, useAuthContext } from '../context/AuthContext';
import Skeleton from '../components/Skeleton';
import mongoose from 'mongoose';
import { FaSearch } from 'react-icons/fa';


const SideBar = ({ open, setOpen, toggleDrawer }) => {

    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const { user, chats, setChats, setSelectedChats } = useAuthContext();


    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }


    const fetchUsers = async () => {
        setLoading(true);
        const { data } = await client.get(`/user?search=${query}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        setUsers(data);
        setLoading(false);
    }

    const accessChat = async (userId: mongoose.Types.ObjectId) => {

        const { data } = await client.post(`/chat/create`, { userId }, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            }
        });

        // Add to chats if the chat is not present in it.
        if (!chats.find((c: User) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChats(data);
        // setLoadingChats(false);
        // onClose();

    };

    return (
        <Drawer
            open={open}
            onClose={toggleDrawer(false)}
        >
            <div className='w-[300px] bg-white flex flex-col px-5 py-5 gap-5'>
                <div className='w-full mt-3'>
                    <h1 className='font-medium text-xl'>Search Users</h1>
                </div>
                <div className='flex items-center justify-between gap-5 mt-5'>
                    <div className='w-[80%] h-8'>
                        <input
                            value={query}
                            type="text"
                            className='w-full h-full outline-none ring-2 ring-black rounded-sm px-2'
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='w-[15%] h-9 flex items-center'>
                        <button
                            className='w-full h-full bg-black rounded-md flex items-center justify-center'
                            onClick={fetchUsers}
                        >
                            <FaSearch size={17} color='#FFF' />
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    {
                        isLoading ? <Skeleton /> :
                            users?.map((usr: User, idx: number) => {
                                return (
                                    <div
                                        key={idx}
                                        className='w-full bg-slate-200 flex items-center py-3 px-2 rounded-lg gap-2 cursor-pointer'
                                        onClick={() => accessChat(usr._id!)}
                                    >
                                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                                            <img src={profile_pic} className='w-full h-full' />
                                        </div>
                                        <div className='h-full flex-1 flex flex-col overflow-hidden'>
                                            <span className='text-sm'>{usr.username}</span>
                                            <p className='text-xs  whitespace-nowrap text-ellipsis'><span className='font-bold'>Email: </span>{usr.email}</p>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </Drawer>
    )
}

export default SideBar